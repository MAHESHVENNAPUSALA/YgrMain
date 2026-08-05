import os
code = '''
class StandaloneTeamListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role in ['MD', 'HR']:
            teams = Team.objects.all()
        elif user.role == 'Manager':
            # Teams created by manager's team leads or teams where lead's manager is user
            teams = Team.objects.filter(lead__reporting_manager=user) | Team.objects.filter(id__in=user.projects.values_list('assigned_teams', flat=True))
        elif user.role == 'TeamLead':
            teams = Team.objects.filter(lead=user)
        else:
            teams = Team.objects.filter(members=user)
        serializer = TeamSerializer(teams.distinct(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['MD', 'HR', 'Manager', 'TeamLead']:
            return Response({"detail": "Access Denied."}, status=status.HTTP_403_FORBIDDEN)

        name = request.data.get('name')
        lead_id = request.data.get('lead')
        department = request.data.get('department', 'python_dev')
        description = request.data.get('description', '')
        max_size = request.data.get('max_size', 10)

        if not name:
            return Response({"detail": "Team Name is required."}, status=status.HTTP_400_BAD_REQUEST)

        lead = None
        if lead_id:
            try:
                lead = User.objects.get(id=lead_id, role='TeamLead')
            except User.DoesNotExist:
                return Response({"detail": "Selected Team Lead is invalid."}, status=status.HTTP_400_BAD_REQUEST)

        # TeamLead can only create a team for themselves
        if user.role == 'TeamLead':
            lead = user

        team = Team.objects.create(
            name=name,
            lead=lead,
            department=department,
            description=description,
            max_size=max_size
        )

        notify_user(user, "Team Created", f"Team '{name}' has been successfully created.")
        if lead and lead != user:
            notify_user(lead, "Team Leader Assigned", f"You have been assigned as Team Lead for '{name}'.")

        serializer = TeamSerializer(team)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
'''

with open(r'e:\ygrpannel0\Backend\hr\project_views.py', 'a') as f:
    f.write('\n' + code)
