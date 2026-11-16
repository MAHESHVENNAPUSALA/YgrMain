from rest_framework import serializers
from .models import (
    InternshipRegistration,
    InternshipInterview,
    InternshipOffer,
    OnboardingTask,
    InternshipExamSession,
    InternshipExamAnswer,
    InternshipExamViolation
)

class InternshipRegistrationSerializer(serializers.ModelSerializer):
    latest_exam_score = serializers.SerializerMethodField()
    exam_proctoring_status = serializers.SerializerMethodField()

    class Meta:
        model = InternshipRegistration
        fields = '__all__'
        read_only_fields = [
            'registration_id', 'status', 'amount_paid', 'created_at',
            'base_amount', 'gst_amount', 'total_amount', 'razorpay_order_id'
        ]

    def get_latest_exam_score(self, obj):
        last_session = obj.exam_sessions.order_by('-id').first()
        if last_session and last_session.score is not None:
            return last_session.score
        return None

    def get_exam_proctoring_status(self, obj):
        last_session = obj.exam_sessions.order_by('-id').first()
        if last_session:
            return {
                'status': last_session.proctoring_status,
                'warning_count': last_session.warning_count,
                'tab_switches': last_session.total_tab_switches,
                'fullscreen_exits': last_session.total_fullscreen_exits,
                'blur_events': last_session.total_blur_events,
                'submission_reason': last_session.submission_reason,
            }
        return None

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

class InternshipExamViolationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipExamViolation
        fields = '__all__'

class InternshipExamSessionSerializer(serializers.ModelSerializer):
    violations = InternshipExamViolationSerializer(many=True, read_only=True)

    class Meta:
        model = InternshipExamSession
        fields = '__all__'
