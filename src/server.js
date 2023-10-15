const express = require("express");
const app = express();
const routes = require("./routes")
const db = require("./database")
const port = 8080;

app.use(express.json());
app.use(routes);

app.listen(port, ()=>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
})

