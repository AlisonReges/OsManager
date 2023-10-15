const { Model, DataTypes } = require("sequelize");

class Access extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, { sequelize: connection, timestamps: false, tableName: "access_level" })
    }

    static associate(models) {
        this.hasOne(models.User, { foreignKey: "access_level_id", as: "access_level" })
    }
}

module.exports = Access;