

export class Produto {
    codigoDeBarras: string;
    qtdEstoque: number;

    constructor(codigoDeBarras?: string, qtdEstoque?: number) {
        this.codigoDeBarras = codigoDeBarras;
        this.qtdEstoque = qtdEstoque;
    }
}
