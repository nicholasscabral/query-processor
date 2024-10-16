// 1. Estrutura do Banco de Dados (Etapa 4) - Usando JSON
const databaseSchema = {
  "schema": "BD_Vendas",
  "tables": {
    "Categoria": {
      "columns": {
        "idCategoria": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "Descricao": {
          "type": "VARCHAR(45)",
          "notNull": true
        }
      }
    },
    "Produto": {
      "columns": {
        "idProduto": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "Nome": {
          "type": "VARCHAR(45)",
          "notNull": true
        },
        "Descricao": {
          "type": "VARCHAR(200)",
          "notNull": false
        },
        "Preco": {
          "type": "DECIMAL(18,2)",
          "notNull": true,
          "default": 0
        },
        "QuantEstoque": {
          "type": "DECIMAL(10,2)",
          "notNull": true,
          "default": 0
        },
        "Categoria_idCategoria": {
          "type": "INT",
          "foreignKey": {
            "references": "Categoria(idCategoria)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        }
      }
    },
    "TipoCliente": {
      "columns": {
        "idTipoCliente": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "Descricao": {
          "type": "VARCHAR(45)",
          "notNull": false
        }
      }
    },
    "Cliente": {
      "columns": {
        "idCliente": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "Nome": {
          "type": "VARCHAR(45)",
          "notNull": true
        },
        "Email": {
          "type": "VARCHAR(100)",
          "notNull": true
        },
        "Nascimento": {
          "type": "DATETIME",
          "notNull": false
        },
        "Senha": {
          "type": "VARCHAR(200)",
          "notNull": false
        },
        "TipoCliente_idTipoCliente": {
          "type": "INT",
          "foreignKey": {
            "references": "TipoCliente(idTipoCliente)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        },
        "DataRegistro": {
          "type": "DATETIME",
          "notNull": true,
          "default": "Now()"
        }
      }
    },
    "TipoEndereco": {
      "columns": {
        "idTipoEndereco": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "Descricao": {
          "type": "VARCHAR(45)",
          "notNull": true
        }
      }
    },
    "Endereco": {
      "columns": {
        "idEndereco": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "EnderecoPadrao": {
          "type": "TINYINT",
          "notNull": true,
          "default": 0
        },
        "Logradouro": {
          "type": "VARCHAR(45)",
          "notNull": false
        },
        "Numero": {
          "type": "VARCHAR(45)",
          "notNull": false
        },
        "Complemento": {
          "type": "VARCHAR(45)",
          "notNull": false
        },
        "Bairro": {
          "type": "VARCHAR(45)",
          "notNull": false
        },
        "Cidade": {
          "type": "VARCHAR(45)",
          "notNull": false
        },
        "UF": {
          "type": "VARCHAR(2)",
          "notNull": false
        },
        "CEP": {
          "type": "VARCHAR(8)",
          "notNull": false
        },
        "TipoEndereco_idTipoEndereco": {
          "type": "INT",
          "foreignKey": {
            "references": "TipoEndereco(idTipoEndereco)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        },
        "Cliente_idCliente": {
          "type": "INT",
          "foreignKey": {
            "references": "Cliente(idCliente)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        }
      }
    },
    "Telefone": {
      "columns": {
        "Numero": {
          "type": "VARCHAR(42)",
          "primaryKey": true,
          "notNull": true
        },
        "Cliente_idCliente": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true,
          "foreignKey": {
            "references": "Cliente(idCliente)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        }
      }
    },
    "Status": {
      "columns": {
        "idStatus": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "Descricao": {
          "type": "VARCHAR(45)",
          "notNull": true
        }
      }
    },
    "Pedido": {
      "columns": {
        "idPedido": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true
        },
        "Status_idStatus": {
          "type": "INT",
          "foreignKey": {
            "references": "Status(idStatus)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        },
        "DataPedido": {
          "type": "DATETIME",
          "notNull": true,
          "default": "Now()"
        },
        "ValorTotalPedido": {
          "type": "DECIMAL(18,2)",
          "notNull": true,
          "default": 0
        },
        "Cliente_idCliente": {
          "type": "INT",
          "foreignKey": {
            "references": "Cliente(idCliente)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        }
      }
    },
    "Pedido_has_Produto": {
      "columns": {
        "idPedidoProduto": {
          "type": "INT",
          "primaryKey": true,
          "notNull": true,
          "autoIncrement": true
        },
        "Pedido_idPedido": {
          "type": "INT",
          "foreignKey": {
            "references": "Pedido(idPedido)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        },
        "Produto_idProduto": {
          "type": "INT",
          "foreignKey": {
            "references": "Produto(idProduto)",
            "onDelete": "NO ACTION",
            "onUpdate": "NO ACTION"
          }
        },
        "Quantidade": {
          "type": "DECIMAL(10,2)",
          "notNull": true
        },
        "PrecoUnitario": {
          "type": "DECIMAL(18,2)",
          "notNull": true
        }
      }
    }
  }
}


const fs = require('fs'); // Importar módulo para escrita de arquivo
const { createCanvas } = require('canvas'); // Importar módulo canvas para salvar a árvore como imagem
const { Graph } = require('graphlib'); // Importar módulo para gerar grafos
// const { graphviz } = require('graphviz-cli'); // Importar graphviz-cli para visualização de grafo

// 2. Funcionalidades Principais (Etapa 2)

// Parser - Analisando uma consulta SQL simples (Etapa 2a)
function parseSQL(query) {
  const selectRegex = /select (.+) from (.+) where (.+)/i;
  const match = query.match(selectRegex);
  if (!match) {
    throw new Error('Consulta SQL inválida');
  }

  const columns = match[1].split(',').map(col => col.trim());
  const tables = match[2].split('join').map(tbl => tbl.trim());
  const whereClause = match[3] ? match[3].trim() : null;

  // Verificar se as tabelas existem no esquema do banco de dados
  tables.forEach(table => {
    const tableName = table.split(' ')[0].toLowerCase(); // Pega o nome da tabela e converte para minúsculo
    const tableNameInSchema = Object.keys(databaseSchema.tables).find(t => t.toLowerCase() === tableName);
    if (!tableNameInSchema) {
      throw new Error(`Tabela '${tableName}' não encontrada no banco de dados`);
    }
  });

  // Verificar se todas as colunas existem nas tabelas
  columns.forEach(column => {
    const [tableName, columnName] = column.split('.');
    const tableNameLower = tableName.toLowerCase();
    const columnNameLower = columnName.toLowerCase();
    const tableNameInSchema = Object.keys(databaseSchema.tables).find(t => t.toLowerCase() === tableNameLower);

    if (!tableNameInSchema) {
      throw new Error(`Tabela '${tableName}' não encontrada no banco de dados`);
    }

    const tableSchema = databaseSchema.tables[tableNameInSchema];
    if (!tableSchema.columns || !Object.keys(tableSchema.columns).find(col => col.toLowerCase() === columnNameLower)) {
      throw new Error(`Coluna '${column}' não encontrada na tabela '${tableName}'`);
    }
  });

  return {
    columns,
    tables,
    whereClause
  };
}

// Geração do Grafo de Operadores (Etapa 2b)
function generateOperatorGraph(parsedQuery) {
  const graph = {
    nodes: [],
    edges: []
  };

  // Adicionando nós para as tabelas e colunas
  parsedQuery.tables.forEach(table => {
    const tableName = table.split(' ')[0];
    graph.nodes.push({ id: tableName, type: 'table' });
  });
  parsedQuery.columns.forEach(column => {
    graph.nodes.push({ id: column, type: 'column' });
  });

  // Adicionando nós para a cláusula WHERE, se houver
  if (parsedQuery.whereClause) {
    graph.nodes.push({ id: 'where', type: 'filter', condition: parsedQuery.whereClause });
  }

  return graph;
}

// Geração da Árvore de Consulta (Passo a Passo)
function generateQueryTree(parsedQuery) {
  // Passo 1: Aplicar heurística de junção
  const rootNode = {
    name: 'PROJECTION',
    columns: parsedQuery.columns,
    children: [],
    executionOrder: 1
  };

  let currentNode = rootNode;
  let orderCounter = 2;

  // Passo 2: Redução de tuplas - Aplicar as seleções o mais cedo possível
  if (parsedQuery.whereClause) {
    const selectionNode1 = {
      name: 'SELECTION',
      condition: 'tb1.id > 300',
      children: [],
      executionOrder: orderCounter++
    };
    const selectionNode2 = {
      name: 'SELECTION',
      condition: 'tb3.sal <> 0',
      children: [],
      executionOrder: orderCounter++
    };

    const tb1Node = {
      name: 'TABLE',
      table: 'Tb1',
      executionOrder: orderCounter++
    };

    selectionNode1.children.push(tb1Node);
    currentNode.children.push(selectionNode1);
    currentNode = rootNode;

    const tb3Node = {
      name: 'TABLE',
      table: 'Tb3',
      executionOrder: orderCounter++
    };

    selectionNode2.children.push(tb3Node);
    currentNode.children.push(selectionNode2);
  }

  // Adicionar os nós de junção para as tabelas
  const joinNode1 = {
    name: 'JOIN',
    condition: 'Tb1.pk = Tb2.fk',
    children: [],
    executionOrder: orderCounter++
  };
  joinNode1.children.push(currentNode.children[0]);
  joinNode1.children.push({
    name: 'PROJECTION',
    columns: ['Pk', 'fk'],
    children: [
      {
        name: 'TABLE',
        table: 'Tb2',
        executionOrder: orderCounter++
      }
    ],
    executionOrder: orderCounter++
  });

  const joinNode2 = {
    name: 'JOIN',
    condition: 'Tb2.pk = Tb3.fk',
    children: [],
    executionOrder: orderCounter++
  };
  joinNode2.children.push(joinNode1);
  joinNode2.children.push(currentNode.children[1]);

  rootNode.children = [joinNode2];

  return rootNode;
}

// Otimização da Árvore de Consulta (Passo 3 - Heurística da Redução de Campos)
function optimizeQueryTree(queryTree) {
  // Aplicar heurísticas para reduzir campos
  queryTree.children.forEach(child => {
    if (child.type === 'selection') {
      child.columns = child.columns ? child.columns.filter(column => queryTree.columns.includes(column)) : child.columns;
    }
  });
  return queryTree;
}

// Processador de Consultas Simples (Etapa 3c)
function processQuery(query) {
  try {
    // Parser
    const parsedQuery = parseSQL(query);

    // Geração do Grafo de Operadores
    const operatorGraph = generateOperatorGraph(parsedQuery);

    // Gerar Árvore de Consulta (Passo a Passo)
    const queryTree = generateQueryTree(parsedQuery);
    // console.log('Árvore de Consulta Inicial:');
    // console.dir(queryTree, { depth: null });

    // Otimizar Árvore de Consulta (Heurísticas)
    const optimizedTree = optimizeQueryTree(queryTree);
    console.log('Árvore de Consulta Otimizada:');
    console.dir(optimizedTree, { depth: null });

    // Visualizar Árvore de Consulta com graphviz-cli
    // visualizeQueryTreeGraph(optimizedTree);
  } catch (error) {
    console.error('Erro ao processar a consulta:', error);
  }
}

// Novos Testes com o esquema BD_Vendas
console.log('--- Teste 1: Consultar Produtos e Categorias ---');
processQuery('SELECT Produto.Nome, Categoria.Descricao FROM Produto JOIN Categoria ON Produto.Categoria_idCategoria = Categoria.idCategoria WHERE Produto.Preco > 100');

// console.log('--- Teste 2: Consultar Pedidos de Clientes ---');
// processQuery('SELECT Cliente.Nome, Pedido.ValorTotalPedido FROM Cliente JOIN Pedido ON Cliente.idCliente = Pedido.Cliente_idCliente WHERE Pedido.DataPedido >= "2023-01-01"');

// console.log('--- Teste 3: Consultar Endereços e Tipos de Endereço ---');
// processQuery('SELECT Endereco.Logradouro, TipoEndereco.Descricao FROM Endereco JOIN TipoEndereco ON Endereco.TipoEndereco_idTipoEndereco = TipoEndereco.idTipoEndereco WHERE Endereco.Cidade = "Fortaleza"');

// console.log('--- Teste 4: Consultar Telefone e Cliente ---');
// processQuery('SELECT Telefone.Numero, Cliente.Nome FROM Telefone JOIN Cliente ON Telefone.Cliente_idCliente = Cliente.idCliente');

// console.log('--- Teste 5: Consultar Pedidos e Produtos Relacionados ---');
// processQuery('SELECT Produto.Nome, Pedido_has_Produto.Quantidade FROM Pedido JOIN Pedido_has_Produto ON Pedido.idPedido = Pedido_has_Produto.Pedido_idPedido JOIN Produto ON Pedido_has_Produto.Produto_idProduto = Produto.idProduto WHERE Pedido.Status_idStatus = 1');