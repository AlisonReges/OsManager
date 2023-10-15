const Equipment = require("../models/Equipment");
const Client = require("../models/Client");
const onlyNumbers = require("../functions/onlyNumbers");
const capWords = require("../functions/capWords");

module.exports = {
    async index(req, res) {
        try {
            const { client_id } = req.params;
            const client = await Client.findByPk(client_id, {
                include: [{
                    model: Equipment,
                    as: "equipment",
                    attributes: ["id", "serial", "brand", "model"]
                }], attributes: ["id", "name", "doc"]
            });

            if (!client) {
                return res.status(400).json({ error: "Client not found" })
            }
            return res.json(client);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async store(req, res) {
        try {
            //Algoritmo sem verificação se já existe o equipamento cadastrado para algum cliente
            // const { client_id } = req.params;
            // let { serial, brand, model } = req.body;

            // const client = await Client.findByPk(client_id);

            // if (!client) {
            //     res.status(400).json({ error: "Client not found" });
            // }

            // serial = onlyNumbers(serial);
            // brand = capWords(String(brand));
            // model = capWords(String(model));

            // const equipment = await Equipment.create({ serial, brand, model, client_id })
            // return res.json(equipment);


            //Algoritmo com verificação se já existe o equipamento cadastrado para algum cliente
            const { client_id } = req.params;
            let { serial, brand, model } = req.body;
            const client = await Client.findByPk(client_id, {
                attributes: ["id", "name", "doc"]
            });
            if (!client) {
                res.status(400).json({ error: "Client not found" });
            }
            const equipment = await Equipment.findOne({
                where: { serial }
            });

            if (equipment) {
                return res.status(400).json({
                    error: "Equipment already exists",
                    owner: (client)
                })
            }

            const result = await Equipment.create({
                serial,
                brand,
                model,
                client_id
            })
            return res.json(result)
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }

    },

    async delete(req, res) {
        try {
            const { equipment_id } = req.body;
            await Equipment.destroy({
                where: {
                    id: equipment_id
                }
            })
            return res.json({ message: "Equipment deleted successfully" });
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },

    async update(req, res) {
        try {
            let { equipment_id, serial, brand, model } = req.body;
            serial = onlyNumbers(serial);
            brand = capWords(String(brand));
            model = capWords(String(model));

            const equipment = await Equipment.findByPk(equipment_id);
            if (!equipment) {
                return res.status(400).json({
                    error: "Equipment does not exist"
                });
            }
            await Equipment.update({
                serial,
                brand,
                model
            }, {
                where: {
                    id: equipment_id
                }
            });
            return res.json({
                messege: "Equipment changed successfully"
            });
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    }
}