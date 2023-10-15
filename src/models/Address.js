const { Model, DataTypes } = require("sequelize");

class Address extends Model {
    static init(connection) {
        super.init({
            street: {
                type: DataTypes.STRING,
                allowNull: false
            },
            number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            complement: {
                type: DataTypes.STRING,
                allowNull: false
            },
            district: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zip_code: {
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
        }, { sequelize: connection, timestamps: false });
    }

    //Associando um tabela a outra
    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: "client_id", as: "client" });
    }
}

module.exports = Address;