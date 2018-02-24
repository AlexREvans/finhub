create table if not exists transaction (     
    id int not null auto_increment,
    transaction_name varchar(100) not null,
    source varchar(100) not null,
    tag varchar(100) null,
    amount int not null,

    primary key(id)
);