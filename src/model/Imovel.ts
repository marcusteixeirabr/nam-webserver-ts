import { TipoImovel } from "./TipoImovel.js";

// aqui getters e setters têm que vir explícitos, certo?
export class Imovel {
    public constructor(
        private readonly codigo: number,
        private readonly descricao: string,
        private readonly tipoImovel: TipoImovel
    ) {}

        public getCodigo(): number {
            return this.codigo;
        }

        public getDescricao(): string {
            return this.descricao;
        }

        public getTipoImovel(): TipoImovel {
            return this.tipoImovel;
        }
}