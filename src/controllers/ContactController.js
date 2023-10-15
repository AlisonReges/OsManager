const Contact = require("../models/Contact");
const Client = require("../models/Client");
const capWords = require("../functions/capWords");
const onlyNumbers = require("../functions/onlyNumbers");
const validateAndNormalizeEmail = require("../functions/validateAndNormalizeEmail");

module.exports = {
    async store(req, res) {
        try {
            const { client_id } = req.params;
            let { name, office, email, telephone } = req.body;
            const client = await Client.findByPk(client_id);
            if (!client) {
                return res.status(400).json({ error: "Client not found" })
            }
            name = capWords(String(name));
            office = capWords(String(office));
            telephone = onlyNumbers(telephone);
            email = validateAndNormalizeEmail(String(email))

            if (!email) {
                return res.status(400).json({ error: "Invalid email" });
            }

            const contact = await Contact.create({ name, office, email, telephone, client_id });
            return res.json(contact);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async index(req, res) {
        try {
            const { client_id } = req.params;
            const client = await Client.findByPk(client_id, {
                include: [{
                    model: Contact,
                    as: "contacts",
                    attributes: ["id", "name", "office", "email", "telephone"]
                }],
                attributes: ["id", "name", "doc"]
            });
            if (!client) {
                return res.status(400).json({ error: "Client not found" })
            }
            return res.json(client);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async delete(req, res) {
        try {
            const { contact_id } = req.body;
            const contact = await Contact.findByPk(contact_id);
            if (!contact) {
                return res.status(400).json({
                    error: "Contact does not exist"
                })
            }

            await Contact.destroy({
                where: {
                    id: contact_id
                }
            })
            return res.json({ message: "Contact successfully deleted" });
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async update(req, res) {
        try {
            let {
                contact_id,
                name,
                office,
                email,
                telephone
            } = req.body;

            name = capWords(String(name));
            office = capWords(String(office));
            telephone = onlyNumbers(telephone);
            email = validateAndNormalizeEmail(String(email))

            const contact = await Contact.findByPk(contact_id);
            if (!contact) {
                return res.status(400).json({ error: "Contact does not exist" })
            }

            await Contact.update({
                name,
                office,
                email,
                telephone
            }, {
                where: {
                    id: contact_id
                }
            });

            return res.json({ message: "Contact changed successfully" })
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    }
}
