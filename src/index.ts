import { config } from "./config/config.js";
import { router } from "./http/apiServer.js";
import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const swaggerDocument = YAML.load('./openapi.yaml');


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use(router);

app.use('/openapi-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.static("public"));

app.use((req, res) => {
    res.status(404).sendFile("notfound.html", { root: "public" });
});

app.listen(config.server, () => {
    console.log(`Servidor rodando em localhost:${config.server}`);
});