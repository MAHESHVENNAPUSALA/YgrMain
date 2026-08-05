import re

with open('hr/api_views.py', 'r', encoding='utf-8') as f:
    content = f.read()

# For each DashboardAPIView, we want to inject on_leave logic if not already present.
views_to_update = ['EmployeeDashboardAPIView', 'HRDashboardAPIView', 'TLDashboardAPIView', 'ManagerDashboardAPIView', 'MDDashboardAPIView']

for view_name in views_to_update:
    # Find the def get(self, request): in the class
    pattern = rf'(class {view_name}\(APIView\):.*?def get\(self, request\):.*?)(return Response\()'
    
    def replacer(match):
        prefix = match.group(1)
        suffix = match.group(2)
        if "on_leave_count" in prefix:
            return match.group(0) # already updated
        
        injection = """
        today_date = timezone.localdate()
        on_leave_qs = Leave.objects.filter(status='Final Approved', from_date__lte=today_date, to_date__gte=today_date)
        on_leave_today = [{"name": l.user.get_full_name() or l.user.username, "emp_id": l.user.emp_id, "role": l.user.role} for l in on_leave_qs]
        on_leave_count = on_leave_qs.count()
        """
        # We need to add them to the Response dict.
        # But replacing 'return Response({' with 'return Response({"on_leave_today": on_leave_today, "on_leave_count": on_leave_count, '
        return prefix + injection + '\n        ' + suffix.replace('return Response({', 'return Response({\n            "on_leave_today": on_leave_today,\n            "on_leave_count": on_leave_count,')
        
    content = re.sub(pattern, replacer, content, flags=re.DOTALL)

with open('hr/api_views.py', 'w', encoding='utf-8') as f:
    f.write(content)
