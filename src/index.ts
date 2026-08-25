import { config } from "./config/config.js";
import { router } from "./http/apiServer.js";
import express from "express";

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use(router);

app.listen(config.server, () => {
    console.log(`Servidor rodando em localhost:${config.server}`);
});