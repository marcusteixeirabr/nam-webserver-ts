import { config } from "../config/config.js";
import { TipoImovel } from "../model/TipoImovel.js";
import { Imovel } from "../model/Imovel.js";
import { Pagamento } from "../model/Pagamento.js";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2/promise";
import { Temporal } from "@js-temporal/polyfill";

const conn = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    dateStrings: true, // MySQL DATE/DATETIME vira string, sem conversão de fuso
});

interface PagamentoRow extends RowDataPacket {
    id_venda: number;
    data_do_pagamento: string; // Temporal.PlainDate
    valor_do_pagamento: string; // Decimal
    codigo_imovel: number;
    descricao_imovel: string;
    tipo_id: number;
    tipo_imovel: string;
}

const SELECT_ALL = `
SELECT
p.id_venda,
p.data_pagamento AS data_do_pagamento,
p.valor_do_pagamento,
i.codigo_imovel,
i.descricao_imovel,
t.id AS tipo_id,
t.tipo AS tipo_imovel
FROM pagamento p
JOIN imovel i ON p.codigo_imovel = i.codigo_imovel
JOIN tipo_imovel t ON i.tipo_imovel = t.id
`;

export async function buscarTodos(): Promise<Pagamento[]> { 
    try {
        const [rows] = await conn.query<PagamentoRow[]>(SELECT_ALL);
        return rows.map(mapearLinha);
        
    } catch (error: unknown) {
        throw new Error(`Erro ao buscar pagamentos no banco de dados: ${error}`);
    }
}

function mapearLinha(row: PagamentoRow): Pagamento {
    const tipoImovel = new TipoImovel(
        row.tipo_id,
        row.tipo_imovel
    );

    const imovel = new Imovel(
        row.codigo_imovel,
        row.descricao_imovel,
        tipoImovel
    );

    return new Pagamento(
        row.id_venda,
        Temporal.PlainDate.from(row.data_do_pagamento),
        row.valor_do_pagamento,
        imovel
    );
}