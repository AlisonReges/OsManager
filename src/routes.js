const express = require("express");
const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const ClientController = require("./controllers/ClientController");
const EquipmentController = require("./controllers/EquipmentController");
const ContactController = require("./controllers/ContactController");
const ProductController = require("./controllers/ProductController");
const OsInternalView = require("./controllers/OsInternalViewController");
const StatusController = require("./controllers/StatusController");
const OsInternalViewController = require("./controllers/OsInternalViewController");
const routes = express.Router();

//Usuários
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

//Status
routes.get("/status", StatusController.index);
routes.post("/status", StatusController.store);

//Clientes
routes.get("/clients", ClientController.index);
routes.get("/clients/search", ClientController.search)
routes.post("/clients", ClientController.store);
routes.delete("/clients/:id", ClientController.delete);
routes.put("/clients/:id", ClientController.update);


//Cliente -> Endereço
routes.get("/client/:client_id/address", AddressController.index);
routes.post("/client/:client_id/address", AddressController.store);
routes.delete("/client/:client_id/address", AddressController.delete);
routes.put("/client/:client_id/address", AddressController.update);

//Cliente -> Equipamentos
routes.get("/client/:client_id/equipment", EquipmentController.index);
routes.post("/client/:client_id/equipment", EquipmentController.store);
routes.delete("/client/:client_id/equipment", EquipmentController.delete);
routes.put("/client/:client_id/equipment", EquipmentController.update);

//Cliente -> Contatos
routes.get("/client/:client_id/contact", ContactController.index);
routes.post("/client/:client_id/contact", ContactController.store);
routes.delete("/client/:client_id/contact", ContactController.delete);
routes.put("/client/:client_id/contact", ContactController.update);

//Produtos
routes.get("/product", ProductController.index);
routes.post("/product", ProductController.store);
routes.delete("/product", ProductController.delete);
routes.put("/product", ProductController.update);


//OS interna
routes.get("/osinternal", OsInternalView.index);
routes.get("/osinternal/search", OsInternalView.search);
routes.post("/osinternal", OsInternalView.store);
routes.delete("/osinternal", OsInternalViewController.delete);
routes.put("/osinternal", OsInternalViewController.update);

module.exports = routes;