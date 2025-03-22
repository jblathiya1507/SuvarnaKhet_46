from rest_framework import serializers

class RoleMaster(serializers.Serializer):
    role_id = serializers.IntegerField()
    role_name = serializers.CharField()
    status = serializers.IntegerField()
    
class ManagementTeam(serializers.Serializer):
    volunteer_id = serializers.IntegerField()
    role_id = serializers.IntegerField()
    name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    status = serializers.IntegerField()

class Team(serializers.Serializer):
    team_id = serializers.IntegerField()
    team_name = serializers.CharField()
    status = serializers.IntegerField()
    qr_code = serializers.CharField()
    
class Students(serializers.Serializer):
    team_id = serializers.IntegerField()
    std_id = serializers.IntegerField()
    std_name = serializers.CharField()
    std_mo_no = serializers.CharField()
    std_email = serializers.CharField()
    std_university = serializers.CharField()
    std_technology = serializers.CharField()
    std_food_preference = serializers.CharField()
    qr_code = serializers.CharField()
    status = serializers.IntegerField()

class TechAssistentTeamAssign(serializers.Serializer):
    team_id = serializers.IntegerField()
    volunteer_id = serializers.IntegerField()
    status = serializers.IntegerField()
    system_datetime = serializers.DateTimeField()
    
class TrackActivity(serializers.Serializer):
    std_id = serializers.IntegerField()
    team_id = serializers.IntegerField()
    volunteer_id = serializers.IntegerField()
    role_id = serializers.IntegerField()
    system_datetime = serializers.DateTimeField()
    
class TrackHelp(serializers.Serializer):
    team_id = serializers.IntegerField()
    volunteer_id = serializers.IntegerField()
    description = serializers.CharField()
    status = serializers.IntegerField()
    created_datetime = serializers.DateTimeField()
    resolved_datetime = serializers.DateTimeField()