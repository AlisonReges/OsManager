const { Model, DataTypes } = require("sequelize");

class Contact extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            office: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            telephone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            client_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "clients", key: "id" },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        }, { sequelize: connection, timestamps: false, tableName: "contacts" })
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: "client_id", as: "client" })
        this.hasMany(models.OsInternalView, { foreignKey: "contact_id", as: "contact" })
    }
}

module.exports = Contact;