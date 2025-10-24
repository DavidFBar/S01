class Musico
  
  attr_reader :nome
  
  def initialize(nome, instrumento)
    @nome = nome
    @instrumento = instrumento
    
  end
  
  def tocar_partitura(peca)
  raise NotImplementedError, "Este método deve ser implementado nas subclasses"
  end
end

class Pianista < Musico
  
  def tocar_partitura(peca)
    puts "#{@nome} está tocando piano!"
  end

end

class Violinista < Musico
  
  def tocar_partitura(peca)
    puts "#{@nome} está tocando violino!"
  end
  
end

class Maestro
  
  def initialize(musicos)
    @musicos = musicos
  end
  
  def iniciar_ensaio(peca)
    @musicos.each { |m| m.tocar_partitura(peca) }
  end
  
  def mudar_foco(estado)
  @musicos.map { |m| "#{m.nome} agora está #{estado}!" }
  end
  
end

peca = gets.chomp

musico1 = Violinista.new("Romeu", "Violao")
musico2 = Pianista.new("Roberto", "Piano")

musicos = [musico1, musico2]

maestro = Maestro.new(musicos)
maestro.iniciar_ensaio(peca)
msg = maestro.mudar_foco("Concentrado")
puts msg
