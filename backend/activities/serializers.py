from rest_framework import serializers
from .models import CoCurricularActivity

class CoCurricularActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CoCurricularActivity
        fields = "__all__"
