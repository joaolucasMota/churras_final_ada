class Churrasco {
    constructor(private homens: number, private mulheres: number, private criancas: number) {}
  
    private calcularCarne(): number {
      const carnePorHomen = 0.4;
      const carnePorMulher = 0.32;
      const carnePorCrianca = 0.2;
  
      return this.homens * carnePorHomen + this.mulheres * carnePorMulher + this.criancas * carnePorCrianca;
    }
  
    private calcularPaoDeAlho(): number {
      const paoDeAlhoPorAdulto = 2;
      const paoDeAlhoPorCrianca = 1;
  
      return (this.homens + this.mulheres) * paoDeAlhoPorAdulto + this.criancas * paoDeAlhoPorCrianca;
    }
  
    private calcularCarvao(): number {
      const carvaoPorPessoa = 1;
      return (this.homens + this.mulheres + this.criancas) * carvaoPorPessoa;
    }
  
    private calcularRefrigerante(): number {
      const garrafaRefrigerantePorPessoas = Math.ceil((this.homens + this.mulheres + this.criancas) / 5);
      return garrafaRefrigerantePorPessoas;
    }
  
    private calcularCerveja(): number {
      const cervejaPorPessoa = 3;
      const totalAdultos = this.homens + this.mulheres;
      return totalAdultos * cervejaPorPessoa;
    }
  
    private data(): string {
      const dataAtual = new Date();
      const dia = dataAtual.getDate();
      const mes = dataAtual.getMonth() + 1;
      const ano = dataAtual.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }
  
    public calcularTodos(): any {
      const totalAdultos = this.homens + this.mulheres;
      const totalPessoas = this.homens + this.mulheres + this.criancas;
      const totalPaoDeAlho = this.calcularPaoDeAlho();
      const totalCarvao = this.calcularCarvao();
      const totalCarne = this.calcularCarne();
      const totalCerveja = this.calcularCerveja();
      const totalRefrigerante = this.calcularRefrigerante();
      const data = this.data();
      const parametrosEdit = { homens: this.homens, mulheres: this.mulheres, criancas: this.criancas };
  
      return {
        totalAdultos: totalAdultos,
        totalPessoas: totalPessoas,
        totalPaoDeAlho: totalPaoDeAlho,
        totalCarvao: totalCarvao,
        totalCarne: totalCarne,
        totalCerveja: totalCerveja,
        totalRefrigerante: totalRefrigerante,
        data: data,
        parametrosEdit: parametrosEdit,
      };
    }
  }
  
  export default Churrasco;
  