const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            access_level_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "access_level", key: "id" },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"

            }
        }, { sequelize: connection, timestamps: false })
    }

    static associate(models){
        this.belongsTo(models.Access, {foreignKey:"access_level_id", key:"id"})
    }
}

module.exports = User;