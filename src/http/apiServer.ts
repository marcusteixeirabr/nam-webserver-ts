import express from "express";
import { buscarTodos } from "../repository/pagamentoRepository.js";
import { totalPorImovel, totalPorMes, percentualPorTipo } from "../service/relatorioService.js";

export const router = express.Router();



router.get("/api/valor-por-imovel", async (_, res) => {
try {
        const pagamentos = await buscarTodos();
        res.json(totalPorImovel(pagamentos));      
} catch (error: unknown) {
    res.status(500).json({ error: "Erro ao buscar dados" });
}
});

router.get("/api/vendas-por-mes", async (_, res) => {
try {
        const pagamentos = await buscarTodos();
        res.json(totalPorMes(pagamentos));
} catch (error: unknown) {
    res.status(500).json({ error: "Erro ao buscar dados" });
}
});

router.get("/api/percentual-por-tipo", async (_, res) => {
try {
        const pagamentos = await buscarTodos();
        res.json(percentualPorTipo(pagamentos));
} catch (error: unknown) {
    res.status(500).json({ error: "Erro ao buscar dados" });
}
});