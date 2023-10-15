const capWords = require("../functions/capWords");
const onlyNumbers = require("../functions/onlyNumbers");
const Address = require("../models/Address");
const Client = require("../models/Client")

module.exports = {
    async index(req, res) {
        try {
            const { client_id } = req.params;
            const client = await Client.findByPk(client_id, {
                include: {
                    association: "address",
                    attributes: ["id", "street", "number", "complement", "district", "city", "state", "zip_code"]
                }
            })
            return res.json(client)
        } catch (error) {
            return res.status(500).json({ error: "Consult the administrator for more information" });
        }
    },
    async store(req, res) {
        try {
            const { client_id } = req.params;
            let { street, number, complement, district, city, state, zip_code } = req.body;
            const client = await Client.findByPk(client_id, {
                include: [{
                    model: Address,
                    as: "address"
                }]
            });
            if (!client) {
                return res.status(400).json({ error: "Client not found" });
            } else if (client.address) {
                return res.status(400).json({ error: "Address already registered" })
            }
            street = capWords(String(street));
            complement = capWords(String(complement));
            district = capWords(String(district));
            city = capWords(String(city));
            zip_code = onlyNumbers(zip_code);
            const address = await Address.create({ street, number, complement, district, city, state, zip_code, client_id });
            return res.json(address);
        } catch (error) {
            return res.status(500).json({ error: "Consult the administrator for more information" });
        }
    },
    async delete(req, res) {
        try {
            const { client_id } = req.params;
            const client = await Client.findByPk(client_id, {
                include: {
                    association: "address",
                    attributes: ["id"]
                }
            })
            if (!client) {
                return res.status(400).json({ error: "Client not already exists" })
            } else if (client.address === null) {
                return res.json({ message: "Unregistered address" })
            }
            await Address.destroy({
                where: {
                    id: client.address.id
                }
            })
            return res.json({ message: "Address deleted successfully" })
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async update(req, res) {
        try {
            const { client_id } = req.params;
            let { street, number, complement, district, city, state, zip_code } = req.body;
            const client = await Client.findByPk(client_id, {
                include: [{
                    model: Address,
                    as: "address"
                }]
            });

            if (!client) {
                return res.status(400).json({ error: "Client not found" });
            } else if (client.address === null) {
                return res.status(400).json({ error: "address not found" })
            }
            street = capWords(String(street));
            complement = capWords(String(complement));
            district = capWords(String(district));
            city = capWords(String(city));
            zip_code = onlyNumbers(zip_code);
            await Address.update({
                street,
                number,
                complement,
                district,
                city,
                state,
                zip_code
            }, {
                where: {
                    id: client.address.id
                }
            });
            return res.json({ message: "Address changed successfully" });
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    }
}