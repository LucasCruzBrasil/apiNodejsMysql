
--14 de setembro 

create table if not exists imagem_colaborador(
id_imagem int not null primary key auto_increment,
id_colaborador int,
caminhho varchar(255),
foreign key (id_colaborador) references colaborador (id_colaborador)

);