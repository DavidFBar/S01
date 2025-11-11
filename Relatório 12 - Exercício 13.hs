data Banda = Banda { nome :: String, genero :: String, cache :: Double }
    deriving (Show)

data StatusEvento = Ativo | Encerrado | Cancelado
    deriving (Show, Eq)

data Evento = Evento { bandas :: [Banda], status :: StatusEvento }
    deriving (Show)

cacheBanda :: Banda -> Double
cacheBanda (Banda _ _ c) = c

calculaSubtotal :: [Banda] -> Double
calculaSubtotal = sum . map cacheBanda

custoTotalEvento :: Evento -> Double
custoTotalEvento evento
    | status evento == Cancelado = 0.0
    | otherwise = subtotal + taxaProducao
    where
        subtotal = calculaSubtotal (bandas evento)
        taxaProducao = subtotal * 0.20

bandaAbertura :: Evento -> String
bandaAbertura evento =
    case bandas evento of
        []    -> "Nenhuma banda cadastrada."
        (x:_) -> "Banda de abertura: " ++ nome x

bandaEncerramento :: Evento -> String
bandaEncerramento evento =
    case bandas evento of
        [] -> "Nenhuma banda cadastrada."
        xs -> "Banda de encerramento: " ++ nome (last xs)

b1 = Banda "Xavlegbmaofffassssitimiwoamndutroabcwapwaeiippohfffx" "Death Metal" 3000.0
b2 = Banda "Peace Without You" "Bubblegum Pop" 6500.0
b3 = Banda "N3rd FdD" "Nu Metal" 3000.0
b4 = Banda "Korn" "Nu Metal" 4500.0

evento1 = Evento [b1, b2, b3] Ativo
evento2 = Evento [b4, b3] Encerrado
evento3 = Evento [b1, b4] Cancelado

main :: IO ()
main = do

    putStrLn "\nEvento 1:"
    print (bandas evento1)
    putStrLn (bandaAbertura evento1)
    putStrLn (bandaEncerramento evento1)
    putStr "Custo total: R$ "
    print (custoTotalEvento evento1)

    putStrLn "\nEvento 2:"
    print (bandas evento2)
    putStrLn (bandaAbertura evento2)
    putStrLn (bandaEncerramento evento2)
    putStr "Custo total: R$ "
    print (custoTotalEvento evento2)

    putStrLn "\nEvento 3:"
    print (bandas evento3)
    putStrLn (bandaAbertura evento3)
    putStrLn (bandaEncerramento evento3)
    putStr "Custo total: R$ "
    print (custoTotalEvento evento3)
