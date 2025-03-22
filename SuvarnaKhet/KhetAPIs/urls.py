from django.urls import path
from .views import *
urlpatterns = [
    #path('admin/', admin.site.urls),
    path('users_farmers_get/', users_farmers_get, name='users_farmers_get'),
    path('users_farmers_post/', users_farmers_post, name='users_farmers_post'),
    path('users_farmers_update/', users_farmers_update, name='users_farmers_update'),
    path('users_farmers_delete/', users_farmers_delete, name='users_farmers_delete'),
    
    path('farm_get/', farm_get, name='farm_get'),
    path('farm_post/', farm_post, name='farm_post'),
    path('farm_update/', farm_update, name='farm_update'),
    path('farm_delete/', farm_delete, name='farm_delete'),
    
    path('rolemaster_get/', rolemaster_get, name='rolemaster_get'), 
    path('rolemaster_post/', rolemaster_post, name='rolemaster_post'), 
    path('rolemaster_update/', rolemaster_update, name='rolemaster_update'),
    path('rolemaster_delete/', rolemaster_delete, name='rolemaster_delete'),
    
    path('management_team_get/', management_team_get, name='management_team_get'),
    path('management_team_post/', management_team_post, name='management_team_post'),
    path('management_team_update/', management_team_update, name='management_team_update'),
    path('management_team_delete/', management_team_delete, name='management_team_delete'),
    
    path('vehicle_detail_get/', vehicle_detail_get, name='vehicle_detail_get'),
    path('vehicle_detail_post/', vehicle_detail_post, name='vehicle_detail_post'),
    path('vehicle_detail_update/', vehicle_detail_update, name='vehicle_detail_update'),
    path('vehicle_detail_delete/', vehicle_detail_delete, name='vehicle_detail_delete'),
    
    path('category_get/', category_get, name='category_get'),
    path('category_post/', category_post, name='category_post'),
    path('category_update/', category_update, name='category_update'),
    path('category_delete/', category_delete, name='category_delete'),
    
    path('products_get/', products_get, name='products_get'),#
    path('products_post/', products_post, name='products_post'),
    path('products_update/', products_update, name='products_update'),#
    path('products_delete/', products_delete, name='products_delete'),
    
    path('cart_get/', cart_get, name='cart_get'),#
    path('cart_post/', cart_post, name='cart_post'),
    path('cart_update/', cart_update, name='cart_update'),#
    path('cart_delete/', cart_delete, name='cart_delete'),

    path('orders_get/', orders_get, name='orders_get'),#
    path('orders_post/', orders_post, name='orders_post'),
    path('orders_update/', orders_update, name='orders_update'),#
    path('orders_delete/', orders_delete, name='orders_delete'),

    path('delivery_get/', delivery_get, name='delivery_get'),#
    path('delivery_post/', delivery_post, name='delivery_post'),
    path('delivery_update/', delivery_update, name='delivery_update'),#
    path('delivery_delete/', delivery_delete, name='delivery_delete'),

    path('sell_request_get/', sell_request_get, name='sell_request_get'),#
    path('sell_request_post/', sell_request_post, name='sell_request_post'),
    path('sell_request_update/', sell_request_update, name='sell_request_update'),#
    path('sell_request_delete/', sell_request_delete, name='sell_request_delete'),

    path('menu_master_get/', menu_master_get, name='menu_master_get'),#
    path('menu_master_post/', menu_master_post, name='menu_master_post'),
    path('menu_master_update/', menu_master_update, name='menu_master_update'),#
    path('menu_master_delete/', menu_master_delete, name='menu_master_delete'),
]