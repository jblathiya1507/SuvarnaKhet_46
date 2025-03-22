from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import connection
from rest_framework import status
from .serializers import *
from django.http import JsonResponse

# RoleMaster
@api_view(['GET'])
def users_farmers_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT uf_id, uf_name, uf_email, uf_mobile, uf_gender, uf_dob, uf_address, uf_city, uf_state, uf_pincode, status
        FROM UsersFarmers RETURNING uf_id
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by uf_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {
            "uf_name": row[0],
            "uf_email": row[1],
            "uf_mobile": row[2],
            "uf_gender": row[3],
            "uf_dob": row[4],
            "uf_address": row[5],
            "uf_city": row[6],
            "uf_state": row[7],
            "uf_pincode": row[8],
            "status": row[9],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def users_farmers_post(request):
    serializer = UsersFarmers(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO RoleMaster (uf_name, uf_email, uf_mobile, uf_gender, uf_dob, uf_address, uf_city, uf_state, uf_pincode, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING uf_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['uf_name'],
                data['uf_email'],
                data['uf_mobile'],
                data['uf_gender'], 
                data['uf_dob'],
                data['uf_address'],
                data['uf_city'],
                data['uf_state'], 
                data['uf_pincode'],
                data['status'],
                data['create_datetime'], 
            ])
            
            uf_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","uf_id":uf_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def users_farmers_update(request):
    uf_id = request.query_params.get('uf_id')

    if not uf_id:
        return Response({"error": "uf_id is required as a query parameter"}, status=400)

    serializer = UsersFarmers(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE UsersFarmers
            SET {update_fields}
            WHERE uf_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [uf_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def users_farmers_delete(request):
    uf_id = request.query_params.get('uf_id')

    if not uf_id:
        return Response({"error": "uf_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM UsersFarmers
        WHERE uf_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [uf_id])

    return Response({"message": "Record deleted successfully"}, status=200)


