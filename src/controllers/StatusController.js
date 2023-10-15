const Status = require("../models/Status");
const capWords = require("../functions/capWords");

module.exports = {
    async index(req, res) {
        const status = await Status.findAll();
        res.json(status);
    },


    async store(req, res) {
        let { name } = req.body;
        name = capWords(String(name));

        const found = await Status.findOne({ where: { name } })
        if (found) {
            return res.status(400).json({ error: "Status already exists" })
        }
        const status = await Status.create({ name });
        return res.json(status)
    }
}