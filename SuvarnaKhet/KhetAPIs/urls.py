from django.urls import path
from .views import *
urlpatterns = [
    #path('admin/', admin.site.urls),
    path('role_master_get/', role_master_get, name='role_master_get'),
    path('role_master_create/', role_master_post, name='role_master_create'),
    path('role_master_update/', role_master_update, name='role_master_update'),
    path('role_master_delete/', role_master_delete, name='role_master_delete'),
    
    path('management_team_get/', management_team_get, name='management_team_get'),
    path('management_team_create/', management_team_post, name='management_team_create'),
    path('management_team_update/', management_team_update, name='management_team_update'),
    path('management_team_delete/', management_team_delete, name='management_team_delete'),
    
    path('team_get/', team_get, name='team_get'), 
    path('team_create/', team_post, name='team_create'), 
    path('team_update/', team_update, name='team_update'),
    path('team_delete/', team_delete, name='team_delete'),
    
    path('students_get/', students_get, name='students_get'),
    path('students_create/', students_post, name='students_create'),
    path('students_update/', students_update, name='students_update'),
    path('students_delete/', students_delete, name='students_delete'),
    
    path('tech_team_assign/', tech_team_assign_get, name='tech_team_assign'),
    path('tech_team_assign_create/', tech_team_assign_post, name='tech_team_assign_create'),
    path('tech_team_assign_update/', tech_team_assign_update, name='tech_team_assign_update'),
    path('tech_team_assign_delete/', tech_team_assign_delete, name='tech_team_assign_delete'),
    
    path('track_activity_get/', trackactivity_get, name='track_activity_get'),
    path('track_activity_create/', trackactivity_post, name='track_activity_create'),
    path('track_activity_update/', trackactivity_update, name='track_activity_update'),
    path('track_activity_delete/', trackactivity_delete, name='track_activity_delete'),
    
    path('track_help/', trackhelp_get, name='track_help'),#
    path('track_help_create/', trackhelp_post, name='track_help_create'),
    path('track_help_update/', trackhelp_update, name='track_help_update'),#
    path('track_help_delete/', trackhelp_delete, name='track_help_delete'),
    
    path('not_taken_lunch/', not_taken_lunch, name='not_taken_lunch'),
    path('not_taken_dinner/', not_taken_dinner, name='not_taken_dinner'),
]