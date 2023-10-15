const { Model, DataTypes } = require("sequelize");
const { associate } = require("./OsInternalView");

class Status extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false

            }
        }, { sequelize: connection, timestamps: false, tableName: "status" })
    }
    static associate(models) {
        this.hasMany(models.OsInternalView, { foreignKey: "status_id", as: "status" });
    }
}


module.exports = Status;