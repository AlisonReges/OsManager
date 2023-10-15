const onlyNumbers = require("../functions/onlyNumbers");
const capWords = require("../functions/capWords.js");
const Client = require("../models/Client");
const { Op } = require("sequelize");
const Contact = require("../models/Contact");
const Equipment = require("../models/Equipment");
const Address = require("../models/Address");

module.exports = {
    async index(req, res) {
        try {
            const clients = await Client.findAll({
                include: [{ association: "contacts" }, { association: "equipment" }, { association: "address" }]
            });
            return res.json(clients);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async search(req, res) {
        try {
            const { search } = req.query;
            const clients = await Client.findAll({
                where: {
                    [Op.or]: [
                        {
                            doc: { [Op.like]: `%${search}%` }
                        }, {
                            name: { [Op.like]: `%${search}%` }
                        }
                    ]
                },
                include: [{
                    model: Contact, as: "contacts"
                }, {
                    model: Equipment, as: "equipment"
                }, {
                    model: Address, as: "address"
                }]
            });

            if (!clients || clients.length === 0) {
                return res.status(400).json({ error: "Client does not exist" })
            }

            return res.json(clients);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async store(req, res) {
        try {
            let { name, doc, observations } = req.body;
            name = capWords(String(name));
            doc = onlyNumbers(doc);
            observetions = capWords(String(observations));
            const found = await Client.findOne({ where: { doc } })
            if (found) {
                return res.status(400).json({ error: "Client already exists" })
            }
            const client = await Client.create({ name, doc, observations });
            return res.json(client)
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params
            const client = await Client.findByPk(id)
            if (!client) {
                return res.status(400).json({ error: "Client not already exists" })
            }
            await Client.destroy({
                where: { id: `${req.params.id}` }
            });
            return res.json({ message: "Client deleted successfully" })

        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            let { name, doc, observations } = req.body;
            name = capWords(String(name));
            doc = onlyNumbers(doc);
            observations = capWords(String(observations));
            await Client.update({ name, doc, observations }, { where: { id } });
            return res.json({ message: "Data successfully saved" });
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" })
        }
    }
}