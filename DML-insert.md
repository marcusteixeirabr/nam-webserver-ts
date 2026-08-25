INSERT INTO `nam_db`.`tipo_imovel` (`tipo`) VALUES
('Apartamento'),
('Casa'),
('Sala Comercial');
-- id 1 = Apartamento, id 2 = Casa, id 3 = Sala Comercial

INSERT INTO `nam_db`.`imovel` (`descricao_imovel`, `tipo_imovel`) VALUES
('Apartamento 100 m2 em condomínio fechado', 1),
('Apartamento 65 m2 no centro da cidade', 1),
('Apartamento 45 m2 tipo studio', 1),
('Casa 150 m2 com quintal e garagem', 2),
('Casa 90 m2 geminada em bairro residencial', 2),
('Casa 200 m2 alto padrão com piscina', 2),
('Sala comercial 40 m2 térreo em galeria', 3),
('Sala comercial 80 m2 em andar alto', 3);
-- codigo_imovel 1..8 na ordem acima

INSERT INTO `nam_db`.`pagamento` (`data_pagamento`, `valor_do_pagamento`, `codigo_imovel`) VALUES
-- Imóvel 1 (Apartamento condomínio)
('2023-08-10', 5000, 1),
('2023-09-10', 5200, 1),
('2023-10-10', 5100, 1),
('2023-12-10', 5300, 1),

-- Imóvel 2 (Apartamento centro)
('2023-08-15', 3200, 2),
('2023-11-15', 3300, 2),
('2024-01-15', 3400, 2),

-- Imóvel 3 (Casa com quintal)
('2023-09-05', 3500, 3),
('2023-10-05', 3600, 3),
('2023-12-05', 3700, 3),

-- Imóvel 4 (Casa geminada)
('2023-08-20', 2800, 4),
('2023-10-20', 2900, 4),
('2023-11-20', 2850, 4),
('2023-12-20', 2950, 4),

-- Imóvel 5 (Sala comercial 40 m2)
('2023-09-12', 4000, 5),
('2023-11-12', 4100, 5),
('2023-12-12', 4200, 5),
('2024-01-12', 4050, 5),

-- Imóvel 6 (Sala comercial 80 m2)
('2023-08-25', 6000, 6),
('2023-09-25', 6100, 6),
('2023-10-25', 6050, 6),
('2023-12-25', 6200, 6),

-- Imóvel 7 (Apartamento studio)
('2023-10-08', 2500, 7),
('2023-11-08', 2550, 7),
('2023-12-08', 2600, 7),
('2024-01-08', 2650, 7),

-- Imóvel 8 (Casa alto padrão)
('2023-08-30', 8300, 8),
('2023-09-30', 8000, 8),
('2023-11-30', 8200, 8),
('2024-01-30', 8100, 8);