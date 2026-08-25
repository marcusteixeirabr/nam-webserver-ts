import { Imovel } from "./Imovel.js";
import { Decimal } from 'decimal.js';
import { Temporal } from "@js-temporal/polyfill";

export class Pagamento {
    private readonly valorPagamento: Decimal;

    public constructor(
        private readonly idVenda: number,
        private readonly dataPagamento: Temporal.PlainDate,
        valorPagamento: string,
        private readonly imovel: Imovel
    ) {
        this.valorPagamento = new Decimal(valorPagamento);
    }

    public getIdVenda(): number {
        return this.idVenda;
    }

    public getDataPagamento(): Temporal.PlainDate {
        return this.dataPagamento;
    }

    public getValorPagamento(): Decimal {
        return this.valorPagamento;
    }

    public getImovel(): Imovel {
        return this.imovel;
    }
}
