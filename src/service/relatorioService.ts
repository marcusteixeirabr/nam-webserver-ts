import {  Pagamento } from "../model/Pagamento.js";
import { Decimal } from "decimal.js";
import { Temporal } from "@js-temporal/polyfill";

export function totalPorImovel(pagamentos: Pagamento[]): Record<string, number> {
    const agrupado = pagamentos.reduce<Record<string, Decimal>>((acc, venda) => {
        const codigo = venda.getImovel().getCodigo();
        if (!acc[codigo]) {
            acc[codigo] = new Decimal(0);
        }
        acc[codigo] = acc[codigo].plus(venda.getValorPagamento()); 
        return acc;      
    }, {});
    return Object.fromEntries(
        Object.entries(agrupado).map(([codigo, valor]) => [codigo, valor.toNumber()])
    );
}

export function totalPorMes(pagamentos: Pagamento[]): Record<string, number> {
        
    const agrupado = pagamentos.reduce<Record<string, Decimal>>((acc, venda) => {
        const mesAno = venda.getDataPagamento().toPlainYearMonth().toString();
        if (!acc[mesAno]) {
            acc[mesAno] = new Decimal(0);
        }
        acc[mesAno] = acc[mesAno].plus(venda.getValorPagamento());
        return acc
        }, {}
    );

    return Object.fromEntries(
        Object.entries(agrupado)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([mesAno, valor]) => [mesAno.split("-").reverse().join("/"), valor.toNumber()])
    );
}

export function percentualPorTipo(pagamentos: Pagamento[]): Record<string, number> {
    const totalGeral = pagamentos.reduce((acc, venda): Decimal => {
        acc = acc.plus(venda.getValorPagamento());
        return acc;
    }, new Decimal(0));

    const agrupado = pagamentos.reduce<Record<string, Decimal>>((acc, venda) => {
        const tipo = venda.getImovel().getTipoImovel().getTipo();
        if (!acc[tipo]) {
            acc[tipo] = new Decimal(0);
        }
        acc[tipo] = acc[tipo].plus(venda.getValorPagamento());
        return acc;
        }, {}
    );

    return Object.fromEntries(
        Object.entries(agrupado)
            .map(([tipo, valor]) => [tipo, valor
                .dividedBy(totalGeral)
                .times(100)
                .toDecimalPlaces(2)
                .toNumber()])
    )

}