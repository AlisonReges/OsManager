const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const User = require("../models/User")
const Address = require("../models/Address");
const Client = require("../models/Client");
const Equipment = require("../models/Equipment");
const Access = require("../models/Access");
const Contact = require("../models/Contact");
const Product = require("../models/Product");
const OsInternalView = require("../models/OsInternalView");
const Status = require("../models/Status");
const OsProducts = require("../models/OsProducts");

const connection = new Sequelize(dbConfig);

User.init(connection);
User.sync()

Access.init(connection);
Access.sync();

Address.init(connection);
Address.sync()

Client.init(connection);
Client.sync()

Equipment.init(connection);
Equipment.sync()

Contact.init(connection);
Contact.sync()

Product.init(connection);
Product.sync()

OsInternalView.init(connection);
OsInternalView.sync()

Status.init(connection);
Status.sync()

OsProducts.init(connection);
OsProducts.sync()

//Associações
Client.associate(connection.models);
Address.associate(connection.models);
Equipment.associate(connection.models)
Contact.associate(connection.models);
OsInternalView.associate(connection.models);
Product.associate(connection.models);
Status.associate(connection.models);

module.exports = connection;