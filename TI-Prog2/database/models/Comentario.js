module.exports = function(sequelize, DataTypes) {
    let alias = "Comentario";
    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : DataTypes.INTEGER
        },
        productId: {
            type : DataTypes.INTEGER
        },
        clienteId: {
            type : DataTypes.INTEGER
        },
        comentario: {
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
        tableName: "comentarios",
        timestamps: false,
        underscored: false
    };
    
    let Comentarios = sequelize.define(alias, cols, config);
    return Comentarios;
};