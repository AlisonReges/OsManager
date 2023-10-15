const { Sequelize, Op } = require("sequelize");
const OsInternalView = require("../models/OsInternalView");
const Client = require("../models/Client");
const Equipment = require("../models/Equipment");
const Contact = require("../models/Contact");
const Status = require("../models/Status");
const Product = require("../models/Product");
const Address = require("../models/Address");

module.exports = {
    async index(req, res) {
        try {
            const os_internal = await OsInternalView.findAll({
                include: [
                    {
                        model: Client,
                        as: "client",
                        attributes: ["id", "name", "doc"]
                    },
                    {
                        model: Equipment,
                        as: "equipment",
                        where: {
                            id: Sequelize.col("OsInternalView.equipment_id")
                        }, attributes: ["id", "serial", "brand", "model"]
                    },
                    {
                        model: Contact,
                        as: "contact",// Deve corresponder ao alias definido na associação no modelo
                        attributes: ["id", "name", "office", "email", "telephone"]
                    },
                    {
                        model: Status,
                        as: "status",
                        attributes: ["name"]
                    },
                    {
                        model: Product,
                        as: "products",
                        attributes: ["id", "name", "price"],
                        through: { attributes: [] }
                    }
                ], attributes: ["id", "opening_date", "closing_date", "equipment_obs", "internal_obs", "discount"]
            });
            return res.json(os_internal);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async search(req, res) {
        try {
            const params = req.query;

            const oneClient = await OsInternalView.findAll({
                include: [
                    {
                        model: Client,
                        as: "client",
                        attributes: ["id", "name", "doc"],
                        where: { [Op.or]: [{ doc: { [Op.like]: `%${params.search}%` } }, { name: { [Op.like]: `%${params.search}%` } }] },
                    },
                    {
                        model: Equipment,
                        as: "equipment",
                        where: {
                            id: Sequelize.col("OsInternalView.equipment_id")
                        }, attributes: ["id", "serial", "brand", "model"]
                    },
                    {
                        model: Contact,
                        as: "contact",// Deve corresponder ao alias definido na associação no modelo
                        attributes: ["id", "name", "office", "email", "telephone"]
                    },
                    {
                        model: Status,
                        as: "status",
                        attributes: ["name"]
                    },
                    {
                        model: Product,
                        as: "products",
                        attributes: ["id", "name", "price"],
                        through: { attributes: [] }
                    }
                ], attributes: ["id", "opening_date", "closing_date", "equipment_obs", "internal_obs", "discount"]
            });

            if (!oneClient || oneClient.length === 0) {
                return res.status(500).json({ error: "Client not exist" })
            }
            return res.json(oneClient);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async store(req, res) {
        try {
            const {
                opening_date,
                closing_date,
                equipment_obs,
                internal_obs,
                discount,
                client_id,
                equipment_id,
                contact_id,
                status_id,
                addProducts_id //Pode ser um array com os id dos produtos a serem adicionados a OS.
            } = req.body;

            const client = await Client.findByPk(client_id, {
                include: [{
                    model: Contact,
                    as: "contacts"
                }, {
                    model: Equipment,
                    as: "equipment"
                }, {
                    model: Address,
                    as: "address"
                }]
            })

            //Validação se o cliente existe.
            if (!client) {
                return res.status(400).json({
                    error: "Client not found"
                })
            }

            //Validação se o contato pertence ao cliente
            const existContact = client.contacts.some(obj => obj.id === contact_id);
            if (!existContact) {
                return res.status(400).json({
                    error: "Contact does not belong to this client"
                })
            }

            //Validação se o equipamento pertence ao cliente
            const existEquip = client.equipment.some(obj => obj.id === equipment_id);
            if (!existEquip) {
                return res.status(400).json({
                    error: "Equipment does not belong to this client"
                })
            }

            const os_internal = await OsInternalView.create({
                opening_date,
                closing_date,
                equipment_obs,
                internal_obs,
                discount,
                client_id,
                equipment_id,
                contact_id,
                status_id
            });

            return res.json(os_internal);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async delete(req, res) {
        try {
            const { os_id } = req.body;
            const found = await OsInternalView.findByPk(os_id);
            if (!found) {
                return res.status(400).json({
                    error: "Internal OS does not exist"
                })
            }
            await OsInternalView.destroy({
                where: {
                    id: os_id
                }
            });
            return res.json({
                messege: "Internal OS deleted successfully"
            })
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async update(req, res) {
        try {
            const {
                closing_date,
                equipment_obs,
                internal_obs,
                discount,
                client_id,
                equipment_id,
                contact_id,
                status_id,
                os_id,
                addProducts_id,
                delProducts_id
            } = req.body;

            const osInternal = await OsInternalView.findByPk(os_id);
            if (!osInternal) {
                return res.status(400).json({
                    error: "Internal OS does not exist"
                })
            }
            if (addProducts_id.length > 0) {
                await osInternal.addProduct(addProducts_id);
            };

            if (delProducts_id.length > 0) {
                await osInternal.removeProduct(delProducts_id)
            }

            await osInternal.update({
                closing_date,
                equipment_obs,
                internal_obs,
                discount,
                client_id,
                equipment_id,
                contact_id,
                status_id
            })
            return res.json({
                messege: "Internal OS changed successfully"
            })
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    }
}; 
