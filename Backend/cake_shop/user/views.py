from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializer import CustomUserSerializer

class CustomUserCreateView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Returning serializer.data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# login code
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(username=username)
            if user.password == password:  # Still insecure; should hash!
                return Response({
                    "message": "Login successful",
                    "username": user.username
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        

# retrive
        from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser

@method_decorator(csrf_exempt, name='dispatch')
class RetrieveUsernameView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            username = request.data.get("username")

            if not username:
                return JsonResponse({'error': 'username is required'}, status=400)

            user = CustomUser.objects.filter(username=username).first()

            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

            return JsonResponse({'username': user.username})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
