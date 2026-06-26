from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "first_name", "last_name", "role", "is_staff", "is_active")
        read_only_fields = ("id", "is_staff", "is_active")

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        # Try to authenticate
        user = authenticate(username=username, password=password)
        
        if user is None:
            raise AuthenticationFailed('No active account found with the given credentials')
        
        if not user.is_active:
            raise AuthenticationFailed('User account is disabled')
        
        attrs['user'] = user
        return super().validate(attrs)
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role
        token['is_staff'] = user.is_staff
        
        return token
