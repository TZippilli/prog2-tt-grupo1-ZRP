module.exports = function(sequelize, DataTypes) {
    let alias = "Producto";
    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : DataTypes.INTEGER
        },
        clienteId: {
            type : DataTypes.INTEGER
        },
        nombreProduct: {
            type : DataTypes.STRING
        },
        imagenProduct: {
            type : DataTypes.STRING
        },
        descripcionProduct: {
            type : DataTypes.STRING 
        },
        createdAt: {
            type : DataTypes.STRING
        },
        updatedAt: {
            type : DataTypes.STRING
        },
        deletedAt: {
            type : DataTypes.STRING
        }
    };

    let config = {
        tableName: "products",
        timestamps: false,
        underscored: false
    };
    
    let Productos = sequelize.define(alias, cols, config);
    
    return Productos;
};