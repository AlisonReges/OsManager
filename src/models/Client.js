const { Model, DataTypes } = require("sequelize");

class Client extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            doc: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            observations: {
                type: DataTypes.TEXT
            }
        }, { sequelize: connection, timestamps: false })
    }

    static associate(models) {
        this.hasOne(models.Address, { foreignKey: "client_id", as: "address" })
        this.hasMany(models.Equipment, { foreignKey: "client_id", as: "equipment" })
        this.hasMany(models.Contact, { foreignKey: "client_id", as: "contacts" })
        this.hasMany(models.OsInternalView, { foreignKey: "client_id", as: "osInternalView" })
    }
}

module.exports = Client;