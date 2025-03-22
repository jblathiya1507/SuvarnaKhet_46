from rest_framework import serializers

class UsersFarmers(serializers.Serializer):
    uf_role_id = serializers.IntegerField()
    uf_name = serializers.CharField()
    uf_email = serializers.CharField()
    uf_mobile = serializers.CharField()
    uf_gender = serializers.CharField()
    uf_address = serializers.CharField()
    uf_city = serializers.CharField()
    uf_state = serializers.CharField()
    uf_pincode = serializers.IntegerField()
    uf_dob = serializers.DateField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()
    
class Farm(serializers.Serializer):
    uf_id = serializers.IntegerField()
    fm_address = serializers.CharField()
    fm_city = serializers.CharField()
    fm_state = serializers.CharField()
    fm_pincode = serializers.IntegerField()
    fm_certificate = serializers.CharField()
    fm_area = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

class RoleMaster(serializers.Serializer):
    role_name = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()
    
class ManagementTeam(serializers.Serializer):
    role_id = serializers.IntegerField()
    mt_name = serializers.CharField()
    mt_email = serializers.CharField()
    mt_password = serializers.CharField()
    mt_mobile = serializers.CharField()
    mt_address = serializers.CharField()
    mt_city = serializers.CharField()
    mt_state = serializers.CharField()
    mt_pincode = serializers.IntegerField()
    mt_identity_proof = serializers.CharField()
    mt_emergency_contact = serializers.CharField()
    mt_gender = serializers.CharField()
    mt_dob = serializers.DateField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()


class VehicleDetail(serializers.Serializer):
    mt_id = serializers.IntegerField()
    v_name = serializers.CharField()
    v_type = serializers.CharField()
    v_number = serializers.CharField()
    v_licence = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

class Category(serializers.Serializer):
    c_name = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

class Products(serializers.Serializer):
    c_id = serializers.IntegerField()
    p_name = serializers.CharField()
    p_image = serializers.CharField()
    p_price = serializers.CharField()
    p_qty = serializers.CharField()
    p_description = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()
    
class Cart(serializers.Serializer):
    uf_id = serializers.IntegerField()
    p_id = serializers.IntegerField()
    qty = serializers.IntegerField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

class Orders(serializers.Serializer):
    cart_id = serializers.IntegerField()
    p_id = serializers.IntegerField()
    uf_id = serializers.IntegerField()
    payment_id = serializers.CharField()
    payment_amount = serializers.CharField()
    payment_type = serializers.CharField() 
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

class Delivery(serializers.Serializer):
    mt_id = serializers.IntegerField()
    order_id = serializers.IntegerField()
    pick_address = serializers.CharField()
    deliver_address =  serializers.CharField()
    verification_qr = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

class SellRequest(serializers.Serializer):
    uf_id = serializers.IntegerField()
    p_id = serializers.IntegerField()
    mt_id = serializers.IntegerField()
    p_price = serializers.CharField()
    p_qty = serializers.CharField()
    bid_price = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

class MenuMaster(serializers.Serializer):
    role_id = serializers.IntegerField()
    menu_name = serializers.CharField()
    menu_link = serializers.CharField()
    status = serializers.IntegerField()
    create_datetime = serializers.DateTimeField()

