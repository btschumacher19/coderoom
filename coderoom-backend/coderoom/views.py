from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Challenge, Submission
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserSerializerWithToken, ChallengeSerializer, SubmissionSerializer, ChangePasswordSerializer
from rest_framework import generics


# custom permission for GET requests
class GetOrIsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.action == 'retrieve' or request.user and request.user.is_authenticated


# custom permission for POST requests
class PostOrIsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.action == 'create' or request.user and request.user.is_authenticated


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChallengeViewSet(viewsets.ModelViewSet):
    serializer_class = ChallengeSerializer
    permission_classes = (GetOrIsAuthenticated,)

    #return user's challenges if user is authenticated, returns standard queryset if not
    def get_queryset(self):
        if (self.request.user.is_authenticated):
            return Challenge.objects.filter(user=self.request.user) 
        return Challenge.objects.all()
        


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    permission_classes = (PostOrIsAuthenticated,)


class ChangePasswordView(generics.UpdateAPIView):

    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer