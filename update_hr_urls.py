urls_path = r"D:\YgrMain\YgrMain\Backend\hr\urls.py"

with open(urls_path, "r", encoding="utf-8") as f:
    text = f.read()

target = "path('api/joining-letters/<int:pk>/send-email/', api_views.JoiningLetterSendEmailAPIView.as_view(), name='api_joining_letter_send_email'),"

relieving_urls = """path('api/joining-letters/<int:pk>/send-email/', api_views.JoiningLetterSendEmailAPIView.as_view(), name='api_joining_letter_send_email'),

    # Relieving Letters Management
    path('api/relieving-letters/', api_views.RelievingLetterAPIView.as_view(), name='api_relieving_letters'),
    path('api/relieving-letters/<int:pk>/', api_views.RelievingLetterDetailAPIView.as_view(), name='api_relieving_letter_detail'),
    path('api/relieving-letters/<int:pk>/action/', api_views.RelievingLetterActionAPIView.as_view(), name='api_relieving_letter_action'),
    path('api/relieving-letters/<int:pk>/preview/', api_views.RelievingLetterPreviewAPIView.as_view(), name='api_relieving_letter_preview'),
    path('api/relieving-letters/<int:pk>/download/', api_views.RelievingLetterDownloadAPIView.as_view(), name='api_relieving_letter_download'),
    path('api/relieving-letters/<int:pk>/send-email/', api_views.RelievingLetterSendEmailAPIView.as_view(), name='api_relieving_letter_send_email'),
    path('api/relieving-letters/<int:pk>/audit/', api_views.RelievingLetterAuditAPIView.as_view(), name='api_relieving_letter_audit'),

    # Salary Components Configuration
    path('api/salary-components/', api_views.SalaryComponentAPIView.as_view(), name='api_salary_components'),
    path('api/salary-components/<int:pk>/', api_views.SalaryComponentDetailAPIView.as_view(), name='api_salary_component_detail'),"""

if target in text:
    text = text.replace(target, relieving_urls)
    with open(urls_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully added relieving letter & salary component URLs!")
else:
    print("Target not found in urls.py!")

