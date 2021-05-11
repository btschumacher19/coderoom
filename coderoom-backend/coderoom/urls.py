from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

router = DefaultRouter()
router.register(r"users", views.UserViewSet, basename="user")
router.register(r"challenges", views.ChallengeViewSet, basename="challenge")
router.register(r"submissions", views.SubmissionViewSet, basename="submission")

urlpatterns = [
    path('current_user/', views.current_user),
    path('token-auth/', obtain_jwt_token),
    path('user/', views.UserList.as_view()),
    path('change_password/<int:pk>/', views.ChangePasswordView.as_view(), name='auth_change_password'),
]

urlpatterns += router.urls
