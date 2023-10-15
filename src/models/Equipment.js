const { Model, DataTypes } = require("sequelize");

class Equipment extends Model {
    static init(connection) {
        super.init({
            serial: {
                type: DataTypes.STRING,
                allowNull: false
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false
            },
            model: {
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
        }, { sequelize: connection, timestamps: false })
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: "client_id", as: "client" });
    }
}

module.exports = Equipment;