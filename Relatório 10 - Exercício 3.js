class Diario{
  
  #autor;
  criaturasAvistadas;
  num;
  enigmas;
  
  constructor(autor, criaturas){ // acrescentei as criaturas avistadas no construtor 
    this.#autor = autor;
    this.enigmas = [];
    if (Array.isArray(criaturas) && criaturas.every(c => c instanceof Criatura)) {
      this.criaturasAvistadas = criaturas // verificando se as instancias sao vetores do objeto desejado
    } else {
    console.log("O dado inserido nao eh um array de Criaturas");
  }
}
  
  getAutor(){
    return this.#autor;
  }
  
  adicionarEnigma(enigma){
    if (enigma instanceof Map) {
      this.enigmas.push(enigma);
      console.log("Enigma adicionado ao diario!");
    } else {
      console.log("O dado inserido não eh um Map valido.");
    }
  }
  
  decodificar(chave, num){ // nn tava claro oq era pra fazer com essa funcao entao inventei uma logica
    // só pode decodificar se a chave == autor
    if (chave === this.#autor) {
      const enigma = this.enigmas.find(e => e.get("Numero") === num); // percorre o vetor pra encontrar o elemento 
      if (enigma) {
        console.log(`Enigma ${num} decifrado: as pegadas misteriosas eram de um Pe Grande!`);
      } else {
        console.log("Numero de enigma nao encontrado");
      }
    } else {
      console.log("Chave incorreta! Decodificacao negada");
    }
  }
}

class Personagem{
  
  nome;
  idade;
  
  constructor(nome, idade){
    this.nome = nome;
    this.idade = idade;
  }
  
}

class Protagonista extends Personagem{
  
  diario;
  
  constructor(nome, idade, diario){ // acrescentei o diario no construtor pra ficar melhor a implementacao
    super(nome, idade);
    if(diario instanceof Diario){
      this.diario = diario;
    }else{
      console.log("O dado inserido nao eh um objeto Diario");
    }
  }
  
}

class Criatura{
  
  nome;
  perigoso; // bool
  
  constructor(nome, perigoso){
    this.nome = nome;
    this.perigoso = perigoso;
  }
}

class CabanaMisterio{
  
  visitantes;
  funcionarios;
  
  constructor(funcionarios, visitantes){ // eu acrescentei esses no construtor e tirei o diario pq nn fazia sentido ele estar aqui
    if (Array.isArray(funcionarios) && Array.isArray(visitantes) &&
  funcionarios.every(f => f instanceof Personagem) && visitantes.every(v => v instanceof Personagem)) {
    // tbm verificando se as instancias sao vetores dos objetos desejados
  this.funcionarios = funcionarios;
  this.visitantes = visitantes;
    } else {
  console.log("Algum dos dados inseridos nao corresponde com os objetos esperados");
    }
  }
  
  listarFuncionarios(){
     this.funcionarios.forEach(f => console.log(`${f.nome}`));
  }
  
}

criatura1 = new Criatura("Gnomo", true);
criatura2 = new Criatura("Metamorfo", true);
criatura3 = new Criatura("Fantasma Categoria 1", false);
soos = new Personagem("Soos", 22);
wendy = new Personagem("Wendy", 15);
stanley = new Personagem("Stanley", 67)
joao = new Personagem("Joao", 30);
sergio = new Personagem("Sergio", 42);
joana = new Personagem("Joana", 20);

const visitantes = [joao, sergio, joana];
const funcionarios = [stanley, soos, wendy];
const criaturas = [criatura1, criatura2, criatura3];
const enigmas = new Map(); // usando map para os enigmas
enigmas.set("Numero", 1);
enigmas.set("Enigma", "Pegada misteriosa");

cabana = new CabanaMisterio(funcionarios, visitantes);
diario3 = new Diario("Stanford", criaturas);
dipper = new Protagonista("Dipper", 13, diario3);

cabana.listarFuncionarios();
diario3.adicionarEnigma(enigmas);
diario3.decodificar("McGucket", 1);
diario3.decodificar("Stanford", 1);
