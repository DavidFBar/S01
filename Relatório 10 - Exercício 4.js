class IRastreavel{
  rastrearLocal(lat, long){ // lat e long sao strings
    throw new Error("O metodo deve ser implementado!");
  }
}
class Hunter extends IRastreavel{
  nome;
  idade;
  #local;
  
  constructor(nome, idade, local){ 
    super();
    this.nome = nome;
    this.idade = idade;
    this.#local = local;
  }
  
  rastrearLocal(lat, long){
    console.log(`${this.nome} esta rastreando o local nas coordenadas (${lat}, ${long}).`);
  }
  
}
class Batalhao extends IRastreavel{
  #hunters; // set
  
  constructor(hunters = new Set()) {
    super();
    if (hunters instanceof Set && [...hunters].every(h => h instanceof Hunter)) { // verificar se o dado enviado eh um set de objetos hunter
      this.#hunters = hunters;
    } else {
      console.log("Algum dos dados inseridos não corresponde com os objetos esperados");
    }
  }
  
  rastrearLocal(lat, long){
    console.log(`O batalhao esta rastreando o local nas coordenadas (${lat}, ${long}).`)
  };
  
  adicionarHunter(hunter){
    if(hunter instanceof Hunter){
    this.#hunters.add(hunter);
    console.log(`O hunter ${hunter.nome} foi adicionado ao batalhao`)
    }else{
      console.log("O dado inserido nao corresponde com o objeto esperado");
    }
  }
  
  getNumHunters(){ // conta quantos hunters tem no batalhao
    console.log(`O batalhao possui ${this.#hunters.size} hunters`);
    return this.#hunters.size;
  }
  
}
class Especialista extends Hunter{
  constructor(nome, idade, local, habilidade){ // adicionei elementos pra completar as informacoes
    super(nome, idade, local);
    this.habilidade = habilidade;
  }
  
  rastrearLocal(lat, long){
    console.log(`${this.nome} esta rastreando o local nas coordenadas (${lat}, ${long}).`);
  }
}
class Manipulador extends Hunter{
  constructor(nome, idade, lat, long, habilidade){ 
    super(nome, idade, lat, long);
    this.habilidade = habilidade;
  }
  
  rastrearLocal(lat, long){
    console.log(`${this.nome} esta rastreando o local nas coordenadas (${lat}, ${long}).`);
  }
  
}

gon = new Hunter("Gon", 14, "Serra da Mantiqueira");
kurapika = new Especialista("Kurapika", 19, "Itapecinica da Serra", "Chain Jail");
ze = new Manipulador("Ze", 30, "Santa Rita do Sapucai", "Phantom Cheesebread");

const hunters = new Set();
hunters.add(gon);
hunters.add(kurapika);
bataiao = new Batalhao(hunters);

gon.rastrearLocal("100", "300");
kurapika.rastrearLocal("500","800");
bataiao.getNumHunters();
bataiao.adicionarHunter(ze);
bataiao.getNumHunters();
bataiao.rastrearLocal("420", "67");
