SELECT
    p.id_venda,
    p.data_pagamento AS data_do_pagamento,
    p.valor_do_pagamento,
    i.codigo_imovel,
    i.descricao_imovel,
    t.tipo AS tipo_imovel
FROM pagamento p
INNER JOIN imovel i ON p.codigo_imovel = i.codigo_imovel
INNER JOIN tipo_imovel t ON i.tipo_imovel = t.id;