from rest_framework import serializers
from .models import (
    InternshipRegistration,
    InternshipInterview,
    InternshipOffer,
    OnboardingTask,
    InternshipExamSession,
    InternshipExamAnswer
)

class InternshipRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipRegistration
        fields = '__all__'
        read_only_fields = [
            'registration_id', 'status', 'amount_paid', 'created_at',
            'base_amount', 'gst_amount', 'total_amount', 'razorpay_order_id'
        ]

class InternshipInterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipInterview
        fields = '__all__'

class InternshipOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipOffer
        fields = '__all__'

class OnboardingTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnboardingTask
        fields = '__all__'

class InternshipExamSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipExamSession
        fields = '__all__'
