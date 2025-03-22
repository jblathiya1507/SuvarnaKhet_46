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

CREATE TABLE Cart(
    uf_id INTEGER REFERENCES UsersFarmers(uf_id),
    p_id INTEGER REFERENCES Products(p_id),
    cart_id SERIAL PRIMARY KEY,
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