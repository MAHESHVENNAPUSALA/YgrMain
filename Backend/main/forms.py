from .models import *
from django import forms
class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = '__all__'
 

class BlogForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = ['title', 'image', 'short_description', 'content', 'category', 'is_published', 'is_featured']


from django import forms
from .models import InternshipRegistration

class InternshipForm(forms.ModelForm):
    class Meta:
        model = InternshipRegistration
        fields = '__all__'