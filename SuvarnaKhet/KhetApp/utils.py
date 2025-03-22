from django.db import connection

def get_uf_data(email):
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