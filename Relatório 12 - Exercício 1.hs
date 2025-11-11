data Bebida = Bebida { nome :: String, tipoBebida :: String, preco :: Double }
    deriving (Show)

data StatusPedido = Aberto | Entregue | Cancelado
    deriving (Show, Eq)

data Pedido = Pedido { bebidas :: [Bebida], statusPedido :: StatusPedido }
    deriving (Show)

precoBebida :: Bebida -> Double
precoBebida (Bebida _ _ p) = p

calculaSubtotal :: [Bebida] -> Double
calculaSubtotal listaBebidas = sum (map precoBebida listaBebidas)


valorTotalPedido :: Pedido -> Double
valorTotalPedido pedido
    | statusPedido pedido == Cancelado = 0.0
    | otherwise = subtotal + taxaServico
    where
        subtotal = calculaSubtotal (bebidas pedido)
        taxaServico = 5.0  -- taxa fixa de serviço

primeiraBebida :: Pedido -> String
primeiraBebida pedido =
    case bebidas pedido of
        []    -> "Nenhuma bebida no pedido."
        (x:_) -> nome x

bebida1 = Bebida "Cafe Expresso" "Cafe" 7.0
bebida2 = Bebida "Cha Verde" "Cha" 6.5
bebida3 = Bebida "Suco de Laranja" "Suco" 8.0
bebida4 = Bebida "Cappuccino" "Cafe" 9.5

pedido1 = Pedido [bebida1, bebida4] Aberto
pedido2 = Pedido [bebida2, bebida3] Entregue
pedido3 = Pedido [bebida1, bebida3] Cancelado

main :: IO ()
main = do

    putStr "Pedido 1 (Aberto) - Valor Total: R$ "
    print (valorTotalPedido pedido1)

    putStr "Pedido 2 (Entregue) - Valor Total: R$ "
    print (valorTotalPedido pedido2)

    putStr "Pedido 3 (Cancelado) - Valor Total: R$ "
    print (valorTotalPedido pedido3)

    putStrLn "\nPrimeira bebida no Pedido 2:"
    putStrLn (primeiraBebida pedido2)
