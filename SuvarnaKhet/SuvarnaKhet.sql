CREATE TABLE UsersFarmers(
    uf_id SERIAL PRIMARY KEY,
    uf_name VARCHAR(255),
    uf_email VARCHAR(255),
    uf_mobile VARCHAR(10),
    uf_gender VARCHAR(20),
    uf_dob DATE,
    uf_address TEXT,
    uf_city VARCHAR(255),
    uf_state VARCHAR(255),
    uf_pincode VARCHAR(6),
    status INTEGER,
    create_datetime TIMESTAMP
);

CREATE TABLE Farm(
    uf_id INTEGER REFERENCES UsersFarmers(uf_id),
    farm_id SERIAL PRIMARY KEY,
    fm_address TEXT,
    fm_city VARCHAR(255),
    fm_state VARCHAR(255),
    fm_pincode VARCHAR(6),
    fm_certificate VARCHAR(255),
    fm_area VARCHAR(255),
    status INTEGER,
    create_datetime TIMESTAMP
);

CREATE TABLE RoleMaster(
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(255),
    status INTEGER,
    create_datetime TIMESTAMP
);

insert into RoleMaster(role_name,status,create_datetime) values('Super Admin', 1, now());
insert into RoleMaster(role_name,status,create_datetime) values('Admin', 1, now());
insert into RoleMaster(role_name,status,create_datetime) values('Farmer', 1, now());
insert into RoleMaster(role_name,status,create_datetime) values('Customer', 1, now());
insert into RoleMaster(role_name,status,create_datetime) values('Delivery Partner', 1, now());
insert into RoleMaster(role_name,status,create_datetime) values('Warehouse Manager', 1, now());



CREATE TABLE ManagementTeam(
    role_id INTEGER REFERENCES RoleMaster(role_id),
    mt_id SERIAL PRIMARY KEY,
    mt_name VARCHAR(255),
    mt_email VARCHAR(255),
    mt_password VARCHAR(255),
    mt_mobile VARCHAR(10),
    mt_emergency_contact VARCHAR(10),
    mt_gender VARCHAR(20),
    mt_dob DATE,
    mt_address TEXT,
    mt_city VARCHAR(255),
    mt_state VARCHAR(255),
    mt_pincode VARCHAR(6),
    mt_indentity_proof VARCHAR(255),
    status INTEGER,
    create_datetime TIMESTAMP
);

CREATE TABLE VehicleDetail(
    mt_id INTEGER REFERENCES ManagementTeam(mt_id),
    v_id SERIAL PRIMARY KEY,
    v_name VARCHAR(255),
    v_type VARCHAR(255),
    v_number VARCHAR(255),
    v_licence VARCHAR(10),
    status INTEGER,
    create_datetime TIMESTAMP
);

CREATE TABLE Category(
    c_id SERIAL PRIMARY KEY,
    c_name VARCHAR(255),
    status INTEGER,
    create_datetime TIMESTAMP
);

insert into Category(c_name,status,create_datetime) values('Vegetables', 1, now());
insert into Category(c_name,status,create_datetime) values('Fruits', 1, now());
insert into Category(c_name,status,create_datetime) values('Grains', 1, now());



CREATE TABLE Products(
    c_id INTEGER REFERENCES Category(c_id),
    p_id SERIAL PRIMARY KEY,
    p_name VARCHAR(255),
    p_image VARCHAR(255),
    p_price VARCHAR(255),
    p_qty VARCHAR(10),
    p_description TEXT,
    status INTEGER,
    create_datetime TIMESTAMP
);

insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(1,'Tomatoes', 'Tomatoes.jpg','35','1kg','Fresh tomatoes',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(1,'Potatoes', 'Potatoes.jpg','35','1kg','Fresh Potatoes',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(2,'Apples', 'Apples.jpg','35','1kg','Fresh Apples',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(2,'Mangoes', 'Mangoes.jpg','35','1kg','Fresh Mangoes',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(3,'Wheat', 'Wheat.jpg','500','20kg','Natural Farming Product',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(3,'Bajra', 'Bajra.jpg','500','20kg','Natural Farming Product',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(1,'Spinach', 'Spinach.jpg','35','1kg','Fresh Spinach',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(1,'Methi', 'Methi.jpg','35','1kg','Fresh Methi',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(2,'Bananas', 'Bananas.jpg','35','1kg','Fresh Bananas',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(2,'Pomogranate', 'Pomogranate.jpg','35','1kg','Fresh Pomogranate',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(3,'Chana', 'Chana.jpg','500','20kg','Natural Farming Product',1,now());
insert into Products(c_id,p_name,p_image,p_price,p_qty,p_description,status,create_datetime) values(3,'Bajra', 'Wheat.jpg','500','20kg','Natural Farming Product',1,now());




CREATE TABLE Cart(
    uf_id INTEGER REFERENCES UsersFarmers(uf_id),
    p_id INTEGER REFERENCES Products(p_id),
    cart_id SERIAL PRIMARY KEY,
    qty INTEGER,
    status INTEGER,
    create_datetime TIMESTAMP
);

CREATE TABLE Orders(
    cart_id INTEGER REFERENCES Cart(cart_id),
    p_id INTEGER REFERENCES Products(p_id),
    uf_id INTEGER REFERENCES UsersFarmers(uf_id),
    order_id SERIAL PRIMARY KEY,
    payment_id VARCHAR(255),
    payment_amount VARCHAR(255),
    payment_type VARCHAR(255),
    status INTEGER,
    create_datetime TIMESTAMP
);

CREATE TABLE Delivery(
    order_id INTEGER REFERENCES Orders(order_id),
    mt_id INTEGER REFERENCES ManagementTeam(mt_id),
    delivery_id SERIAL PRIMARY KEY,
    pick_address VARCHAR(255),
    delivery_address VARCHAR(255),
    verification_qr VARCHAR(255),
    status INTEGER,
    create_datetime TIMESTAMP
);

CREATE TABLE SellRequest(
    uf_id INTEGER REFERENCES UsersFarmers(uf_id),
    p_id INTEGER REFERENCES Products(p_id),
    mt_id INTEGER REFERENCES ManagementTeam(mt_id),
    request_id SERIAL PRIMARY KEY,
    p_price VARCHAR(10),
    bid_price VARCHAR(10),
    p_qty INTEGER,
    status INTEGER,
    create_datetime TIMESTAMP
);


CREATE TABLE MenuMaster(
    menu_id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES RoleMaster(role_id),
    menu_name VARCHAR(255),
    menu_link VARCHAR(255),
    status INTEGER,
    create_datetime TIMESTAMP
);

insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(1,'Manage Admin','/manage_admin',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(1,'Manage Farmer','/manage_farmer',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(1,'Manage Customer','/manage_customer',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(1,'Manage Delivery Partner','/manage_delivery_partner',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(1,'Manage Warehouse Manager','/manage_warehouse_manager',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(2,'Manage Sell Request','/manage_sale_request',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(2,'Farmer Profile Approval','/Farmer_Profile_Approval',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(2,'Delivery Partner Profile Approval','/delivery_partner_profile_aproval',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(3,'Sell Request','/sale_request',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(3,'Manage Selling','/manage_salling',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(5,'Manage Order','/manage_order',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(5,'Manage Payment','/manage_payment',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(6,'View Inventory','/view_inventory',1,now());
insert into MenuMaster(role_id,menu_name,menu_link,status,create_datetime)values(6,'Receive Order','/receive_order',1,now());

