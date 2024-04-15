CREATE SCHEMA dbzrp;

USE dbzrp;

CREATE TABLE users (
/* 	nombreColumna 		tipoDato 		Restricciones */
    id 					INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email 				VARCHAR(250) 	UNIQUE NOT NULL,
    nombre 				VARCHAR(250) 	NOT NULL,
    contrasenia 		VARCHAR(250) 	NOT NULL,
    fecha				DATETIME 		NOT NULL,
    numeroDocumento 	INT 			NOT NULL,
    foto 				VARCHAR(250) 	NOT NULL,	
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    deletedAt 			TIMESTAMP 		NULL
    );

    
CREATE TABLE products (

/*   nombreColumna      tipoDato        Restricciones */
    id                  INT             UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    clienteId           INT             UNSIGNED,
    nombreProduct       VARCHAR(250)    NOT NULL,
    imagenProduct       VARCHAR(250)    NOT NULL,
    descripcionProduct  VARCHAR(250)    NOT NULL,
    createdAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ,
    updatedAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       NULL,
    FOREIGN KEY (clienteId) REFERENCES users(id)
    );


CREATE TABLE comentarios (

/*  nombreColumna       tipoDato        Restricciones */

    id                  INT             UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    productId           INT             UNSIGNED,
    clienteId           INT             UNSIGNED,
    comentario          VARCHAR(250)    NOT NULL,
    createdAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ,
    updatedAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       NULL,

    FOREIGN KEY (clienteId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
    );

