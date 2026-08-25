export class TipoImovel {

    public constructor(
        private readonly id: number,
        private readonly tipo: string
    ) {}

    public getId(): number {
        return this.id;
    }

        public getTipo(): string {
        return this.tipo;
    }
}