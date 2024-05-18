CREATE TABLE persons (
    id_person serial PRIMARY KEY,
    login_person VARCHAR ( 50 ) UNIQUE NOT NULL,
    password_person VARCHAR ( 50 ) NOT NULL,
    dorm_num_person INT NOT NULL,
    remember_me_person CHARACTER VARYING []
);

CREATE TABLE services (
    id_service serial PRIMARY KEY,
    id_person INT REFERENCES persons ( id_person ) ON DELETE CASCADE,
    service VARCHAR ( 100 ),
    date_time_service DATE NOT NULL,
    message_service text
);

CREATE TABLE ads (
    id_ads serial PRIMARY KEY,
    id_person INT REFERENCES persons ( id_person ) ON DELETE CASCADE,
    dorm_num_ads INT NOT NULL,
    info_ads VARCHAR ( 1000 ),
    price_ads INT,
    alternative_payment_ads VARCHAR ( 100 ),
    list_photo_ads CHARACTER VARYING []
);

CREATE TABLE dorm_docs (
    id_dd serial PRIMARY KEY,
    id_person INT REFERENCES persons ( id_person ) ON DELETE CASCADE,
    name_dd VARCHAR ( 50 ),
    path_to_doc_dd VARCHAR NOT NULL
);

CREATE TABLE persons_docs (
    id_doc serial PRIMARY KEY,
    id_person INT REFERENCES persons ( id_person ) ON DELETE CASCADE,
    name_doc VARCHAR ( 50 ),
    path_to_doc VARCHAR
);

CREATE TABLE machines (
    id_machine serial PRIMARY KEY,
    num_machine INT NOT NULL,
    dorm_num_machine INT NOT NULL,
    type_machine VARCHAR ( 10 ) NOT NULL,
    is_broken boolean NOT NULL
);

CREATE TABLE records_machines (
    id_record_machine serial PRIMARY KEY,
    id_person INT REFERENCES persons ( id_person ) ON DELETE CASCADE,
    dorm_num_rm INT NOT NULL,
    id_machine INT REFERENCES machines ( id_machine ) ON DELETE CASCADE,
    start_time_rm timestamp,
    end_time_rm timestamp
);

CREATE TABLE news (
    id_new serial PRIMARY KEY,
    text_new VARCHAR ( 10000 ),
    list_photo_new CHARACTER VARYING []
);