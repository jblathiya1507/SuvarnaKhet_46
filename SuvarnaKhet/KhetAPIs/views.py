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
        SELECT uf_role_id, uf_name, uf_email, uf_mobile, uf_gender, uf_dob, uf_address, uf_city, uf_state, uf_pincode, status, uf_id
        FROM UsersFarmers 
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by uf_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   "uf_role_id": row[0],
            "uf_name": row[1],
            "uf_email": row[2],
            "uf_mobile": row[3],
            "uf_gender": row[4],
            "uf_dob": row[5],
            "uf_address": row[6],
            "uf_city": row[7],
            "uf_state": row[8],
            "uf_pincode": row[9],
            "status": row[10],
            "uf_id": row[11],
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
            INSERT INTO UsersFarmers (uf_name, uf_email, uf_mobile, uf_gender, uf_dob, uf_address, uf_city, uf_state, uf_pincode, status, create_datetime)
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




@api_view(['GET'])
def farm_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT uf_id,farm_id, fm_address, fm_city, fm_state, fm_pincode, fm_certificate, fm_area, status,
        FROM Farm 
    """


    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by farm_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   "uf_id" :  row[0],
            "farm_id" : row[1],
            "uf_name": row[2],
            "fm_address": row[3],
            "fm_city": row[4],
            "fm_state": row[5],
            "fm_pincode": row[6],
            "fm_certificate": row[7],
            "fm_area": row[8],
            "uf_state": row[9],
        }
        for row in rows
    ]

    return Response(data)


@api_view(['POST'])
def farm_post(request):
    serializer = Farm(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO Farm (fm_address, fm_city, fm_state, fm_pincode, fm_certificate, fm_area, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING farm_id
        """


        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['fm_address'],
                data['fm_city'],
                data['fm_state'],
                data['fm_pincode'], 
                data['fm_certificate'],
                data['fm_area'],
                data['status'],
                data['create_datetime'], 
            ])
            
            uf_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","uf_id":uf_id[0]}, status=201)

    return Response(serializer.errors, status=400)


@api_view(['PUT'])
def farm_update(request):
    farm_id = request.query_params.get('farm_id')

    if not farm_id:
        return Response({"error": "farm_id is required as a query parameter"}, status=400)

    serializer = Farm(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE Farm
            SET {update_fields}
            WHERE farm_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [farm_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def farm_delete(request):
    farm_id = request.query_params.get('farm_id')

    if not farm_id:
        return Response({"error": "uf_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM Farm
        WHERE farm_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [farm_id])

    return Response({"message": "Record deleted successfully"}, status=200)


@api_view(['GET'])
def rolemaster_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT role_name, status, role_id
        FROM RoleMaster 
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by role_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {
            "role_name": row[0],
            "status": row[1],
            "role_id" : row[2]
        }
        for row in rows
    ]

    return Response(data)


@api_view(['POST'])
def rolemaster_post(request):
    serializer = RoleMaster(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO RoleMaster (role_name, status, create_datetime)
            VALUES (%s, %s, %s) RETURNING role_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['role_name'],
                data['create_datetime'], 
            ])
            
            role_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","role_id":role_id[0]}, status=201)

    return Response(serializer.errors, status=400)


@api_view(['PUT'])
def rolemaster_update(request):
    role_id = request.query_params.get('role_id')

    if not role_id:
        return Response({"error": "role_id is required as a query parameter"}, status=400)

    serializer = RoleMaster(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE RoleMaster
            SET {update_fields}
            WHERE role_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [role_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def rolemaster_delete(request):
    role_id = request.query_params.get('farm_id')

    if not role_id:
        return Response({"error": "role_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM RoleMaster
        WHERE role_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [role_id])

    return Response({"message": "Record deleted successfully"}, status=200)


@api_view(['GET'])
def management_team_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT role_id, mt_id, mt_name, mt_email, mt_password, mt_mobile, mt_emergency_contact, mt_gender, mt_dob, mt_address,mt_city,mt_state, mt_pincode,mt_indentity_proof,status
        FROM ManagementTeam
    """



    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by mt_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   "role_id" : row[0],
            "mt_id" : row[1],
            "mt_name": row[2],
            "mt_email": row[3],
            "mt_password": row[4],
            "mt_mobile": row[5],
            "mt_emergency_contact": row[6],
            "mt_gender": row[7],
            "mt_dob": row[8],
            "mt_address": row[9],
            "mt_city": row[10],
            "mt_state": row[11],
            "mt_pincode": row[12],
            "mt_indentity_proof": row[13],
            "status": row[14],
            "create_datetime": row[15],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def management_team_post(request):
    serializer = ManagementTeam(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO ManagementTeam (mt_name, mt_email, mt_password, mt_mobile, mt_emergency_contact, mt_gender, mt_dob, mt_address, mt_city,mt_state,mt_pincode,mt_indentity_proof, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING mt_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['mt_name'],
                data['mt_email'],
                data['mt_password'],
                data['mt_mobile'], 
                data['mt_emergency_contact'],
                data['mt_gender'],
                data['mt_dob'],
                data['mt_address'], 
                data['mt_city'],
                data['mt_state'],
                data['mt_pincode'],
                data['mt_indentity_proof'],
                data['status'],
                data['create_datetime'],  
            ])
            
            mt_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","mt_id":mt_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def management_team_update(request):
    mt_id = request.query_params.get('mt_id')

    if not mt_id:
        return Response({"error": "mt_id is required as a query parameter"}, status=400)

    serializer = ManagementTeam(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE ManagementTeam
            SET {update_fields}
            WHERE mt_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [mt_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def management_team_delete(request):
    mt_id = request.query_params.get('mt_id')

    if not mt_id:
        return Response({"error": "mt_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM ManagementTeam
        WHERE mt_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [ManagementTeam])

    return Response({"message": "Record deleted successfully"}, status=200)



@api_view(['GET'])
def vehicle_detail_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT  v_name, v_type, v_number, v_licence, status,mt_id, v_id
        FROM VehicleDetail 
    """



    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by uf_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   
            "v_name": row[0],
            "v_type": row[1],
            "v_number": row[2],
            "v_licence": row[3],
            "status": row[4],
            "mt_id" : row[5],
            "v_id" : row[6]
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def vehicle_detail_post(request):
    serializer = VehicleDetail(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO VehicleDetail (v_name, v_type, v_number, v_licence, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s) RETURNING v_id
        """
 
        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['v_name'],
                data['v_type'],
                data['v_number'],
                data['v_licence'], 
                data['status'],
                data['create_datetime'], 
            ])
            
            v_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","v_id":v_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def vehicle_detail_update(request):
    v_id = request.query_params.get('v_id')

    if not v_id:
        return Response({"error": "v_id is required as a query parameter"}, status=400)

    serializer = VehicleDetail(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE VehicleDetail
            SET {update_fields}
            WHERE v_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [v_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def vehicle_detail_delete(request):
    v_id = request.query_params.get('v_id')

    if not v_id:
        return Response({"error": "v_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM VehicleDetail
        WHERE uf_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [v_id])

    return Response({"message": "Record deleted successfully"}, status=200)



@api_view(['GET'])
def category_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT c_id, c_name, status
        FROM Category 
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by c_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   
            "c_id" : row[0],
            "c_name": row[1],
            "status": row[2],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def category_post(request):
    serializer = Category(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO Category (c_name, status, create_datetime)
            VALUES (%s, %s, %s) RETURNING c_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['c_name'],
                data['status'],
                data['status'],
            ])
            
            c_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","c_id":c_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def category_update(request):
    c_id = request.query_params.get('c_id')

    if not c_id:
        return Response({"error": "uf_id is required as a query parameter"}, status=400)

    serializer = Category(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE Category
            SET {update_fields}
            WHERE c_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [c_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def category_delete(request):
    c_id = request.query_params.get('c_id')

    if not c_id:
        return Response({"error": "c_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM Category
        WHERE c_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [c_id])

    return Response({"message": "Record deleted successfully"}, status=200)



@api_view(['GET'])
def products_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT  p_name, p_image, p_price, p_qty, p_description, status, c_id, p_id
        FROM Products 
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by p_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {
            "p_name": row[0],
            "p_image": row[1],
            "p_price": row[2],
            "p_qty": row[3],
            "p_description": row[4],
            "status": row[5],
            "c_id": row[6],
            "p_id": row[7],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def products_post(request):
    serializer = UsersFarmers(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO Products (p_name, p_image, p_price, p_qty, p_description, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING p_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['p_name'],
                data['p_image'],
                data['p_price'],
                data['p_qty'], 
                data['p_description'],
                data['status'],
                data['create_datetime'], 
            ])
            
            p_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","p_id":p_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def products_update(request):
    p_id = request.query_params.get('p_id')

    if not p_id:
        return Response({"error": "p_id is required as a query parameter"}, status=400)

    serializer = Products(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE Products
            SET {update_fields}
            WHERE p_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [p_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def products_delete(request):
    p_id = request.query_params.get('p_id')

    if not p_id:
        return Response({"error": "uf_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM Products
        WHERE p_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [p_id])

    return Response({"message": "Record deleted successfully"}, status=200)


@api_view(['GET'])
def cart_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT uf_id, p_id, cart_id, qty, status
        FROM Cart
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by cart_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   "uf_id" : row[0],
            "p_id" : row[1],
            "cart_id" :row[2],
            "qty" :row[3],
            "status": row[4],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def cart_post(request):
    serializer = Cart(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
      
        query = """
            INSERT INTO Cart (uf_id, p_id, qty, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s) RETURNING cart_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['uf_id'],
                data['p_id'],
                data['qty'],
                data['status'],
                data['create_datetime'], 
            ])
            
            cart_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","cart_id":cart_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def cart_update(request):
    cart_id = request.query_params.get('cart_id')

    if not cart_id:
        return Response({"error": "cart_id is required as a query parameter"}, status=400)

    serializer = Cart(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE Cart
            SET {update_fields}
            WHERE cart_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [cart_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def cart_delete(request):
    cart_id = request.query_params.get('cart_id')

    if not cart_id:
        return Response({"error": "cart_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM Cart
        WHERE cart_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [cart_id])

    return Response({"message": "Record deleted successfully"}, status=200)

@api_view(['GET'])
def orders_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT cart_id, p_id, uf_id, payment_id, payment_amount, payment_type, status, order_id, create_datetime
        FROM Orders 
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by order_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   "cart_id": row[0],
            "p_id" : row[1],
            "uf_id": row[2],
            "payment_id": row[3],
            "payment_amount": row[4],
            "payment_type": row[5],
            "status": row[6],
            "order_id": row[7],
            "create_datetime": row[8]
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def orders_post(request):
    serializer = Orders(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO Orders (cart_id, p_id, uf_id, payment_id, payment_amount, payment_type, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING order_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['cart_id'],
                data['p_id'],
                data['uf_id'],
                data['payment_id'],
                data['payment_amount'],
                data['payment_type'],
                data['status'],
                data['create_datetime'], 
            ])
            
            order_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","order_id":order_id[0]}, status=201)
    print(serializer.errors)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def orders_update(request):
    order_id = request.query_params.get('order_id')

    if not order_id:
        return Response({"error": "order_id is required as a query parameter"}, status=400)

    serializer = Orders(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE Orders
            SET {update_fields}
            WHERE order_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [order_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def orders_delete(request):
    order_id = request.query_params.get('order_id')

    if not order_id:
        return Response({"error": "order_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM Orders
        WHERE order_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [order_id])

    return Response({"message": "Record deleted successfully"}, status=200)


@api_view(['GET'])
def delivery_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT order_id, mt_id, delivery_id, pick_address, delivery_address, verification_qr, status, order_id, mt_id, delivery_id
        FROM Delivery 
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by uf_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {
            "pick_address": row[0],
            "delivery_address": row[1],
            "verification_qr": row[2],
            "status": row[3],
            "order_id": row[4],
            "mt_id": row[5],
            "status": row[6],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def delivery_post(request):
    serializer = Delivery(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO Delivery (mt_id, order_id, pick_address, delivery_address, verification_qr, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING delivery_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['mt_id'],
                data['order_id'],
                data['pick_address'],
                data['delivery_address'],
                data['verification_qr'],
                data['status'],
                data['create_datetime'], 
            ])
            
            delivery_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","delivery_id":delivery_id[0]}, status=201)

    print(serializer.errors)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def delivery_update(request):
    delivery_id = request.query_params.get('uf_id')

    if not delivery_id:
        return Response({"error": "delivery_id is required as a query parameter"}, status=400)

    serializer = Delivery(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE Delivery
            SET {update_fields}
            WHERE delivery_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [delivery_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delivery_delete(request):
    delivery_id = request.query_params.get('delivery_id')

    if not delivery_id:
        return Response({"error": "uf_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM Delivery
        WHERE delivery_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [delivery_id])

    return Response({"message": "Record deleted successfully"}, status=200)

@api_view(['GET'])
def sell_request_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT uf_id, p_id, mt_id, request_id, p_price, bid_price, p_qty, status
        FROM SellRequest
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by request_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   
            "uf_id": row[0],
            "p_id": row[1],
            "mt_id": row[2],
            "request_id": row[3],
            "p_price": row[4],
            "bid_price": row[5],
            "p_qty": row[6],
            "status": row[7],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def sell_request_post(request):
    serializer = SellRequest(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO SellRequest (uf_id, p_id, p_price, p_qty, bid_price, mt_id, status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING request_id
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['uf_id'],
                data['p_id'],
                data['p_price'],
                data['p_qty'],
                data['bid_price'],
                data['mt_id'],
                data['status'],
                data['create_datetime'], 
            ])
            
            request_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","request_id":request_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def sell_request_update(request):
    request_id = request.query_params.get('request_id')

    if not request_id:
        return Response({"error": "request_id is required as a query parameter"}, status=400)

    serializer = SellRequest(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE SellRequest
            SET {update_fields}
            WHERE request_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [request_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def sell_request_delete(request):
    request_id = request.query_params.get('request_id')

    if not request_id:
        return Response({"error": "uf_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM SellRequest
        WHERE SellRequest = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [SellRequest])

    return Response({"message": "Record deleted successfully"}, status=200)


@api_view(['GET'])
def menu_master_get(request):
    filters = request.query_params.dict()

    query = """
        SELECT menu_id, role_id, menu_name, menu_link, status
        FROM  MenuMaster
    """

    if filters:
        query += " WHERE " + " AND ".join([f"{key} = %s" for key in filters.keys()])
        
    query += "order by menu_id"

    with connection.cursor() as cursor:
        cursor.execute(query, list(filters.values()))
        rows = cursor.fetchall()

    data = [
        {   "menu_id": row[0],
            "role_id": row[1],
            "menu_name": row[2],
            "menu_link": row[3],
            "status": row[4],
        }
        for row in rows
    ]

    return Response(data)

@api_view(['POST'])
def menu_master_post(request):
    serializer = UsersFarmers(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        query = """
            INSERT INTO MenuMaster (menu_name, menu_link,status, create_datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING menu_id
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [
                data['menu_name'],
                data['menu_link'],
                data['status'],
                data['create_datetime'], 
            ])
            
            menu_id = cursor.fetchone()

        return Response({"message": "Record inserted successfully","uf_id":menu_id[0]}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def menu_master_update(request):
    menu_id = request.query_params.get('menu_id')

    if not menu_id:
        return Response({"error": "menu_id is required as a query parameter"}, status=400)

    serializer = MenuMaster(data=request.data, partial=True)

    if serializer.is_valid():
        data = serializer.validated_data

        if not data:
            return Response({"error": "No fields provided to update"}, status=400)

        update_fields = ", ".join([f"{key} = %s" for key in data.keys()])
        query = f"""
            UPDATE MenuMaster
            SET {update_fields}
            WHERE menu_id = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, list(data.values()) + [menu_id])

        return Response({"message": "Record updated successfully"}, status=200)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def menu_master_delete(request):
    menu_id = request.query_params.get('menu_id')

    if not menu_id:
        return Response({"error": "menu_id is required as a query parameter"}, status=400)

    query = """
        DELETE FROM MenuMaster
        WHERE menu_id = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [menu_id])

    return Response({"message": "Record deleted successfully"}, status=200)



