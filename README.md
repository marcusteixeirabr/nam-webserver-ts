# NAM Web Services (TypeScript / Node)

Backend em TypeScript (sem ORM) para o trabalho de Hands on Work VII —
reimplementação em Node do projeto originalmente feito em Java, com o
mesmo comportamento e os mesmos dados.

- Acesso ao banco: `mysql2/promise` (driver puro, sem ORM)
- Processamento de dados: `Array.prototype.reduce`/`map`/`sort` — nenhuma
  agregação é feita via SQL (sem `WHERE`, sem `GROUP BY`)
- Camada web: Express (framework recomendado pelo enunciado/professor)
- Precisão numérica: `decimal.js` (evita erro de arredondamento binário
  em valores monetários, equivalente ao `BigDecimal` do Java)
- Datas: `@js-temporal/polyfill` (`Temporal.PlainDate`, equivalente ao
  `LocalDate` do Java — Node 24 não tem o Temporal nativo, que só chegou
  estável no Node 26)
- Build: TypeScript 7 (`tsc`), execução em dev via `tsx`

## Estrutura

```
src/
├── index.ts                        # ponto de entrada — cria o app Express e sobe o servidor
├── config/
│   └── config.ts                   # lê o .env e exporta a configuração (host, porta, credenciais)
├── model/
│   ├── TipoImovel.ts
│   ├── Imovel.ts                   # composição: tem um TipoImovel
│   └── Pagamento.ts                # composição: tem um Imovel
├── repository/
│   └── pagamentoRepository.ts      # SELECT + JOIN puro (item d), carrega tudo em memória
├── service/
│   └── relatorioService.ts         # as 3 funções da Parte 2, via reduce/map/sort
└── http/
    └── apiServer.ts                # os 3 endpoints REST/GET em JSON (Express Router)
```

## 1. Configurar a conexão

Crie um arquivo `.env` na raiz do projeto (não versionado):

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=nam_db
DB_USER=root
DB_PASSWORD=SUA_SENHA_AQUI
SERVER_PORT=8080
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Rodar em desenvolvimento

```bash
npm run dev
```

Usa `tsx` — roda o TypeScript diretamente, sem gerar `.js` em disco, com
reinício automático a cada alteração salva (`watch`).

## 4. Build e execução "de produção"

```bash
npm run build
npm start
```

`npm run build` compila `src/` para `dist/` via `tsc`; `npm start` roda o
JavaScript já compilado com `node`.

Saída esperada, em qualquer um dos dois modos:

```
Servidor rodando em localhost:8080
```

## 5. Testar

```bash
curl http://localhost:8080/api/valor-por-imovel
curl http://localhost:8080/api/vendas-por-mes
curl http://localhost:8080/api/percentual-por-tipo
```

Ou abra direto no navegador, ou importe no Swagger apontando para
`http://localhost:8080` (útil para a Parte 2, item d — testes via
Swagger). CORS liberado via middleware manual em `index.ts`, necessário
para o Swagger Editor (hospedado em outro domínio) conseguir chamar a
API local.

## Mapeamento com o enunciado

| Item do enunciado | Onde está |
|---|---|
| a. Criar tabelas | `nam_db_schema.sql` (já pronto, mesmo banco do projeto Java) |
| d. Query com JOIN das 3 tabelas, sem WHERE/GROUP BY | `pagamentoRepository.ts` → `SELECT_ALL` |
| e. Código que executa a consulta | `pagamentoRepository.ts` → `buscarTodos()` |
| Parte 2.a — soma por imóvel (gráfico de barras) | `relatorioService.ts` → `totalPorImovel()` |
| Parte 2.b — total por mês/ano (gráfico de linhas) | `relatorioService.ts` → `totalPorMes()` |
| Parte 2.c — percentual por tipo (gráfico de pizza) | `relatorioService.ts` → `percentualPorTipo()` |
| Parte 2.d — respostas em JSON via REST/GET | `apiServer.ts` (3 endpoints) |

## Observações de design

- Nenhuma função usa `for`/`while` tradicional na camada de serviço —
  tudo via `reduce`/`map`/`sort`, por exigência do enunciado. Diferente
  do Java, não existe `Collectors.groupingBy` pronto: o agrupamento é
  montado manualmente dentro do `reduce`.
- POO: `Pagamento` tem um `Imovel`, que tem um `TipoImovel` (composição,
  sem herança — mesmo modelo do projeto Java). Implementado com `class`
  e *parameter properties* (`private readonly campo: Tipo` direto no
  construtor), não com `type`/`interface`/`Record` — essas alternativas
  não sustentam encapsulamento nem imutabilidade reais em runtime.
- Valores monetários passam por `Decimal` durante todo o processamento
  (evita erro de arredondamento binário) e só viram `number` na última
  etapa, ao montar a resposta JSON — mantendo paridade de formato com a
  versão Java.
- Datas do MySQL são lidas como `string` pura (opção `dateStrings: true`
  no driver), evitando ambiguidade de fuso horário, e convertidas para
  `Temporal.PlainDate` explicitamente no repository.
- `.env` fica fora do código-fonte (não versionado) para não precisar
  recompilar ao trocar usuário/senha/porta — carregado via
  `process.loadEnvFile()`, nativo do Node, sem dependência extra.