data Servico = Servico { nomeServico :: String, tipoServico :: String, precoBase :: Double }
    deriving (Show)

data StatusAtendimento = EmAndamento | Finalizado | Cancelado
    deriving (Show, Eq)

data Atendimento = Atendimento { servicos :: [Servico], statusAtendimento :: StatusAtendimento }
    deriving (Show)

precoServico :: Servico -> Double
precoServico (Servico _ _ p) = p

calculaSubtotal :: [Servico] -> Double
calculaSubtotal = sum . map precoServico

-- soma todos os preços; se houver >3 serviços aplica +25%; se o total (após bônus) >500 aplica -10%
bonusEspiritual :: [Servico] -> Double
bonusEspiritual ss =
    let sub = calculaSubtotal ss
        comBonus = if length ss > 3 then sub * 1.25 else sub
        comDesconto = if comBonus > 500 then comBonus * 0.90 else comBonus
    in comDesconto

valorFinalAtendimento :: Atendimento -> Double
valorFinalAtendimento a
    | statusAtendimento a == Cancelado = 0.0
    | otherwise = bonusEspiritual (servicos a)

descricaoPrimeiroServico :: Atendimento -> String
descricaoPrimeiroServico a =
    case servicos a of
        []    -> "Nenhum serviço no atendimento."
        (s:_) -> nomeServico s ++ " - " ++ tipoServico s

s1 = Servico "Banho 1" "Banho" 120.0
s2 = Servico "Massagem 1" "Massagem" 200.0
s3 = Servico "Banquete 1" "Banquete" 250.0
s4 = Servico "Banho 2" "Banho" 80.0
s5 = Servico "Massagem 2" "Massagem" 60.0

a1 = Atendimento [s1,s4,s5,s2] EmAndamento
a2 = Atendimento [s2,s3] Finalizado
a3 = Atendimento [s1,s3] Cancelado
a4 = Atendimento [s1,s2,s3,s4] Finalizado

main :: IO ()
main = do

    putStrLn "\nAtendimento 1:"
    print (servicos a1)
    putStrLn (descricaoPrimeiroServico a1)
    putStr "Valor final: R$ "
    print (valorFinalAtendimento a1)

    putStrLn "\nAtendimento 2:"
    print (servicos a2)
    putStrLn (descricaoPrimeiroServico a2)
    putStr "Valor final: R$ "
    print (valorFinalAtendimento a2)

    putStrLn "\nAtendimento 3:"
    print (servicos a3)
    putStrLn (descricaoPrimeiroServico a3)
    putStr "Valor final: R$ "
    print (valorFinalAtendimento a3)

    putStrLn "\nAtendimento 4:"
    print (servicos a4)
    putStrLn (descricaoPrimeiroServico a4)
    putStr "Valor final: R$ "
    print (valorFinalAtendimento a4)
