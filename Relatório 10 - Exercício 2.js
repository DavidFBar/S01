class IExplorador{
  explorarTerritorio(territorio){
    throw new Error("O metodo deve ser implementado!");
  }
}

class Esquadrao extends IExplorador{
  
  lider;
  membros;
  
  constructor(lider, membrosIniciais = []){
    super();
    this.lider = lider;
    this.membros = [];
    membrosIniciais.forEach(m => this.adicionarMembro(m)); // adiciona os membros m para o vetor
  }
  
  adicionarMembro(soldado){
    if(soldado instanceof Soldado){
      this.membros.push(soldado);
      console.log(`Soldado ${soldado.nome} adicionado ao esquadrao.`)
    }else{
      console.log("O objeto nao eh um soldado!") // pra caso o usuario tente adicionar algo q nn seja Soldado
    }
  }
  
  relatarStatus(){
    this.membros.forEach(m => console.log(`${m.nome} esta no esquadrao`));
  }
  
  explorarTerritorio(territorio){
    console.log(`O esquadrao liderado por ${this.lider} explorou o territorio ${territorio}!`);
  }
}
class Soldado extends IExplorador{
  nome;
  #gear;
  
  constructor(nome, modeloGear){
    super();
    this.nome = nome;
    this.#gear = new ODM_Gear(modeloGear)
  }
  
  explorarTerritorio(territorio){
    console.log(`O soldado ${this.nome} explorou o territorio ${territorio}!`);
  }
  
  verificarEquipamento() {
        console.log(`Equipamento de ${this.nome}: ${this.#gear.modelo} (Gas restante: ${this.#gear.getGas()})`);
  }
    
  usarGas(quantidade) {
    console.log(`O soldado ${this.nome} esta usando o gas...`)
    this.#gear.usarGas(quantidade);
  }
  
}
class ODM_Gear{
  modelo;
  #gasRestante;
  
  constructor(modelo){
    this.modelo = modelo;
    this.#gasRestante = 100;
  }
  
  usarGas(quantidade){
    if(this.#gasRestante >= quantidade){
      this.#gasRestante -= quantidade;
      console.log(`${quantidade} de gas usado. Restante: ${this.#gasRestante}`);
    }else{
      console.log(`Quantidade de gas insuficiente para uso.`)
    }
  }
  
  getGas(){
    return this.#gasRestante;
  }

}

soldado1 = new Soldado("Fred Durst", "Mascara vermelha");
soldado2 = new Soldado("Courtney LaPlante", "Mascara preta");
soldado3 = new Soldado("Jon Davis", "Mascara da dor");

const soldados = [soldado1, soldado2];

esquadrao = new Esquadrao("Levi", soldados);

esquadrao.explorarTerritorio("Santa Rita do Sapucai");

esquadrao.adicionarMembro(soldado3);

soldado2.usarGas(10);

soldado1.verificarEquipamento();

soldado3.explorarTerritorio("Pouso Alegre");

soldado2.verificarEquipamento();
