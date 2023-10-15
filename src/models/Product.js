const { Model, DataTypes } = require("sequelize");

class Product extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            min: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        }, { sequelize: connection, timestamps: false, tableName: "products" })
    }
    static associate(models) {

        this.belongsToMany(models.OsInternalView, { foreignKey: "product_id", through: "os_products", as: "osInterna", timestamps: false });
    }
}

module.exports = Product;