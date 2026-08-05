import os
import re

# Fix serializers.py
serializers_path = r"E:\ygrpannel0\Backend\hr\serializers.py"
with open(serializers_path, "r", encoding="utf-8") as f:
    serializers_content = f.read()

task_serializer_old = """class TaskSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    class Meta:
        model = Task
        fields = [
            'id',
            'task_name',
            'description',
            'start_date',
            'end_date',
            'status',
            'project',
        ]"""

task_serializer_new = """class TaskSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    members = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            'id',
            'task_name',
            'description',
            'start_date',
            'end_date',
            'status',
            'project',
            'members',
        ]

    def get_members(self, obj):
        if obj.assigned_to:
            return [{
                "id": obj.assigned_to.id,
                "name": obj.assigned_to.get_full_name() or obj.assigned_to.username,
                "role": obj.assigned_to.role
            }]
        return []"""

if task_serializer_old in serializers_content:
    serializers_content = serializers_content.replace(task_serializer_old, task_serializer_new)
    print("Updated TaskSerializer in serializers.py")
else:
    # Try with normalized line endings / spaces
    print("Warning: exact string not found in serializers.py. Trying regex match...")
    pattern = r"class TaskSerializer\(serializers\.ModelSerializer\):.*?fields = \[[^\]]+\]"
    serializers_content = re.sub(pattern, task_serializer_new, serializers_content, flags=re.DOTALL)
    print("Replaced TaskSerializer with regex in serializers.py")

with open(serializers_path, "w", encoding="utf-8") as f:
    f.write(serializers_content)

# Fix api_views.py TaskAPIView post method
api_views_path = r"E:\ygrpannel0\Backend\hr\api_views.py"
with open(api_views_path, "r", encoding="utf-8") as f:
    api_views_content = f.read()

task_api_post_old_start = "    def post(self, request):"
# Find where def post starts inside class TaskAPIView
task_api_class_start = api_views_content.find("class TaskAPIView")
post_start_offset = api_views_content.find(task_api_post_old_start, task_api_class_start)
# Find the end of def post (next def or class)
next_def_match = re.search(r"^\s+(def|class) ", api_views_content[post_start_offset+20:], re.MULTILINE)
post_end_offset = post_start_offset + 20 + next_def_match.start() if next_def_match else len(api_views_content)

task_api_post_new = """    def post(self, request):
        user = request.user
        if user.role not in ['TeamLead', 'Manager', 'HR', 'MD']:
            return Response({"detail": "Access Denied: You do not have permissions to assign tasks."}, status=status.HTTP_403_FORBIDDEN)
            
        task_name = request.data.get('task_name')
        description = request.data.get('description', '')
        project_id = request.data.get('project')
        priority = request.data.get('priority', 'Medium')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        due_time = request.data.get('due_time')
        estimated_hours = request.data.get('estimated_hours')
        
        member_ids = request.data.get('members', [])
        if not member_ids and request.data.get('assigned_to'):
            member_ids = [request.data.get('assigned_to')]
            
        if not task_name or not project_id or not member_ids:
            return Response({"detail": "Task name, Project, and Assigned Employee(s) are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        project = get_object_or_404(Project, id=project_id)
        
        # Verify permissions per role
        if user.role == 'TeamLead':
            if not project.assigned_teams.filter(lead=user).exists():
                return Response({"detail": "You do not lead a team on this project."}, status=status.HTTP_403_FORBIDDEN)
        elif user.role == 'Manager':
            if project.assigned_manager != user:
                return Response({"detail": "You are not the manager of this project."}, status=status.HTTP_403_FORBIDDEN)
                
        last_task = None
        for assigned_to_id in member_ids:
            assigned_to = get_object_or_404(User, id=assigned_to_id)
            if assigned_to.role not in ['Employee', 'TeamLead']:
                continue
                
            # Verify employee is in TL's team if creator is TL
            if user.role == 'TeamLead':
                if not Team.objects.filter(lead=user, members=assigned_to).exists() and assigned_to != user:
                    return Response({"detail": f"Can only assign tasks to employees in your team: {assigned_to.username} is not in your team."}, status=status.HTTP_400_BAD_REQUEST)
            
            task = Task.objects.create(
                task_name=task_name,
                description=description,
                project=project,
                priority=priority,
                start_date=start_date or timezone.localdate(),
                end_date=end_date or timezone.localdate(),
                due_time=due_time or None,
                estimated_hours=estimated_hours or None,
                assigned_to=assigned_to,
                created_by=user,
                status='Pending'
            )
            
            if 'file' in request.FILES:
                task.file = request.FILES['file']
                task.save()
                
            # Notification
            Notification.objects.create(
                recipient=assigned_to,
                title="New Task Assigned",
                message=f"You have been assigned a new task: {task_name}."
            )
            last_task = task
            
        if not last_task:
            return Response({"detail": "No valid employees selected to assign task."}, status=status.HTTP_400_BAD_REQUEST)
            
        from .serializers import TaskSerializer
        serializer = TaskSerializer(last_task)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
"""

api_views_content = api_views_content[:post_start_offset] + task_api_post_new + api_views_content[post_end_offset:]
print("Updated TaskAPIView post in api_views.py")

with open(api_views_path, "w", encoding="utf-8") as f:
    f.write(api_views_content)
