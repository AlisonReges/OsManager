const { Model, DataTypes } = require("sequelize");

class OsInternalView extends Model {
    static init(connection) {
        super.init({
            opening_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW, //Verificar depois a necessidade desse default ou se é melhor retirar
            },
            closing_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            equipment_obs: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            internal_obs: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            discount: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 0
            },
            client_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "clients",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            equipment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "equipment",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            contact_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'contacts',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            status_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                references: {
                    model: 'status',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }
        },
            {
                sequelize: connection,
                timestamps: false,
                tableName: "os_internal_views",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: "client_id", as: "client" });
        this.belongsTo(models.Equipment, { foreignKey: "equipment_id", as: "equipment" });
        this.belongsTo(models.Contact, { foreignKey: "contact_id", as: "contact" });
        this.belongsTo(models.Status, { foreignKey: "status_id", as: "status" });

        this.belongsToMany(models.Product, { foreignKey: "os_internal_id", through: "os_products", as: "products", timestamps: false })
    }
}

module.exports = OsInternalView;
