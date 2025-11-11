data Item = Item { nome :: String, categoria :: String, preco :: Double }
    deriving (Show)

data Status = Aberta | Finalizada | Cancelada
    deriving (Show, Eq)

data CompraZelda = CompraZelda { itens :: [Item], status :: Status }
    deriving (Show)

precoItem :: Item -> Double
precoItem (Item _ _ p) = p

calculaSubtotal :: [Item] -> Double
calculaSubtotal = sum . map precoItem

calculaDesconto :: Double -> Double
calculaDesconto total
    | total > 200 = total * 0.10
    | otherwise   = 0.0

valorFinal :: CompraZelda -> Double
valorFinal compra
    | status compra == Cancelada = 0.0
    | otherwise = subtotal - desconto + frete
    where
        subtotal = calculaSubtotal (itens compra)
        desconto = calculaDesconto subtotal
        frete
            | subtotal > 200 = 0.0
            | otherwise      = 15.0

espada   = Item "Espada Mestra" "Arma" 250.0
poção    = Item "Pocao de Vida" "Pocao" 50.0
escudo   = Item "Escudo Hyliano" "Equipamento" 180.0
bomba    = Item "Bombas" "Arma" 40.0

compra1 = CompraZelda [espada, poção] Aberta
compra2 = CompraZelda [escudo, bomba] Aberta
compra3 = CompraZelda [poção, bomba] Cancelada

main :: IO ()
main = do
    putStrLn "Compra 1:"
    print (itens compra1)
    putStr "Valor final: R$ "
    print (valorFinal compra1)

    putStrLn "\nCompra 2:"
    print (itens compra2)
    putStr "Valor final: R$ "
    print (valorFinal compra2)

    putStrLn "\nCompra 3:"
    print (itens compra3)
    putStr "Valor final: R$ "
    print (valorFinal compra3)
