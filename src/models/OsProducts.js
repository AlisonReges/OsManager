const { Model, DataTypes } = require("sequelize");
const OsInternalView = require("./OsInternalView");
const Product = require("./Product");

class OsProducts extends Model {
    static init(connection) {
        super.init({
            os_internal_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "os_internal_views",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }

        }, { sequelize: connection, timestamps: false, tableName: "os_products", timestamps: false });
    }
    static associate(models) {
        OsInternalView.belongsToMany(Products, { through: OsProducts })
        Product.belongsToMany(OsInternalView, { through: OsProducts })
    }
}

module.exports = OsProducts;