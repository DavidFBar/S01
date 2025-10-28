class Pokemon{

  #vida; // a vida deve ser mantida privada e só modificada internamente
  nome;
  tipo;
  atk;

  constructor(nome, tipo, vidaInicial, atk){ // eu adicionei uma variavel de dano base pra fazer os calculos do ataque
    this.nome = nome;
    this.tipo = tipo;
    this.#vida = vidaInicial;
    this.atk = atk;
  }

  get Vida(){ // getter da vida do pokemon
    return this.#vida;
  }

  receberDano(dano){
    if (dano > 0) {
      this.#vida -= dano;
    }
    console.log(`${this.nome} recebeu ${dano} de dano! Vida restante: ${this.#vida}`);
  }

  atacar(alvo){
    console.log(`${this.nome} ataca genericamente ${alvo.nome}!`);
    const danoBase = this.atk;
    alvo.receberDano(danoBase);
  }
  
  curar(qnt) {
    if (qnt > 0) {
      this.#vida += qnt;
      console.log(`${this.nome} curou-se em ${qnt} pontos! Vida atual: ${this.#vida}`);
    }
  }

}

class PokemonFogo extends Pokemon {
  bonusAtaque;

  constructor(nome, vidaInicial, atk, bonusAtaque){
    super(nome, "Fogo", vidaInicial, atk);
    this.bonusAtaque = bonusAtaque;
  }

  atacar(alvo){
    console.log(`${this.nome} ataca ${alvo.nome} com Fire Blast!`);
    const danoBase = this.atk;
    alvo.receberDano(danoBase + this.bonusAtaque);
  }
  
}

class PokemonAgua extends Pokemon{
  curaBase;

  constructor(nome, vidaInicial, atk, curaBase){
    super(nome, "Agua", vidaInicial, atk);
    this.curaBase = curaBase;
  }

  atacar(alvo){
    console.log(`${this.nome} ataca ${alvo.nome} com Hydro Pump!`);
    const danoBase = this.atk;
    alvo.receberDano(danoBase);
    this.curar(this.curaBase);
  }

}

const typhlosion = new PokemonFogo("Typhlosion", 100, 20, 5);
const feraligatr = new PokemonAgua("Feraligatr", 110, 19, 2);
const generico = new Pokemon("Genericomon", "Generico" , 50, 1);

typhlosion.atacar(feraligatr);
feraligatr.atacar(typhlosion);
generico.atacar(feraligatr);
