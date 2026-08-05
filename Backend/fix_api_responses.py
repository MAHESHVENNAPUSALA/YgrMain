import sys
import re

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# EmployeeDashboardAPIView
text = text.replace(
    '"announcements": announcements_data,\n        }, status=status.HTTP_200_OK)',
    '"announcements": announcements_data,\n            "performance_data": performance_data,\n        }, status=status.HTTP_200_OK)'
)

# HRDashboardAPIView
text = text.replace(
    '"holiday_stats": holiday_stats,\n        }, status=status.HTTP_200_OK)',
    '"holiday_stats": holiday_stats,\n            "performance_data": hr_performance_data,\n        }, status=status.HTTP_200_OK)'
)

# TLDashboardAPIView
text = text.replace(
    '"day_labels": day_labels,\n        }, status=status.HTTP_200_OK)',
    '"day_labels": day_labels,\n            "performance_data": team_performance_data,\n        }, status=status.HTTP_200_OK)'
)

# ManagerDashboardAPIView
text = text.replace(
    '"team_leads_list": team_leads_list,\n        }, status=status.HTTP_200_OK)',
    '"team_leads_list": team_leads_list,\n            "performance_data": mgr_performance_data,\n        }, status=status.HTTP_200_OK)'
)

# MDDashboardAPIView
text = text.replace(
    '"announcements": announcements_data,\n        }, status=status.HTTP_200_OK)',
    '"announcements": announcements_data,\n            "performance_data": md_performance_data,\n        }, status=status.HTTP_200_OK)'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Injected performance data")
