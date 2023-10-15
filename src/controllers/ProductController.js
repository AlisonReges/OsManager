const capWords = require("../functions/capWords");
const Product = require("../models/Product");

module.exports = {
    async index(req, res) {
        try {
            const products = await Product.findAll();
            return res.json(products);
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async store(req, res) {
        try {
            let { name, price, value, min } = req.body;
            name = capWords(String(name));
            const found = await Product.findOne({ where: { name } })
            if (found) {
                return res.status(400).json({ error: "Product already exists" })
            }

            const product = await Product.create({ name, price, value, min })
            return res.json(product)
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async delete(req, res) {
        try {
            const { product_id } = req.body;
            const product = await Product.findByPk(product_id);
            if (!product) {
                res.status(400).json({ error: "Product not found" });
            }

            await Product.destroy(
                {
                    where: {
                        id: product_id
                    }
                }
            )
            return res.json({ message: "Product deleted successfully" });
        } catch (error) {
            return res.status(400).json({ error: "Consult the administrator for more information" });
        }
    },
    async update(req, res) {
        let { name, price, value, min, product_id } = req.body;
        name = capWords(String(name));

        const product = await Product.findByPk(product_id);
        if (!product) {
            res.status(400).json({ error: "Product not found" });
        }

        await Product.update(
            {
                name,
                price,
                value,
                min
            }, {
            where: {
                id: product_id
            }
        }
        );

        return res.json({
            messege: "Product changed successfully"
        });
    }
}