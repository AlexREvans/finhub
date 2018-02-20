create table if not exists transaction ( 
    id int,
    transaction_name varchar(100) not null,
    source varchar(100) not null,
    amount int not null
);