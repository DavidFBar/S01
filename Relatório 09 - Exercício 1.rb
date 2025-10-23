class Drink
  attr_reader :nome  

  def initialize(nome, preco_base)
    @nome = nome
    @preco_base = preco_base
  end
  
  def preco_base
    @preco_base
  end 
  
  def preco_base=(novo_valor)
    @preco_base = novo_valor if novo_valor.is_a?(Numeric) && novo_valor.positive?
  end
  
  def to_s 
    "Drink: #{@nome}, Preço base: #{@preco_base}"
  end
  
  def to_s
    
  end
  
end

class DrinkLenda < Drink
  attr_accessor :anos_desde_criacao
  
  def initialize(nome, preco_base, anos_desde_criacao)
    super(nome, preco_base)
    @anos_desde_criacao = anos_desde_criacao
  end
  
  def preco_final
    @preco_base + @anos_desde_criacao * 5
  end
  
  def to_s
    
  end
  
end

# Entrada do usuário
nome = gets.chomp
preco = gets.chomp.to_i
anosDesdeCriacao = gets.chomp.to_i

bebida = DrinkLenda.new(nome, preco, anosDesdeCriacao)

puts "Bebida: #{bebida.nome} - Preço final: $#{bebida.preco_final}"
