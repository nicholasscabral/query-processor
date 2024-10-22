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
// 2. Funcionalidades Principais (Etapa 2)

// Parser - Analisando uma consulta SQL simples (Etapa 2a)
function parseSQL(query) {
  query = query.trim();

  let selectClause = '';
  let fromClause = '';
  let whereClause = '';

  // Extract SELECT clause
  let selectMatch = query.match(/^select\s+(.*?)\s+from\s+/i);
  if (selectMatch) {
    selectClause = selectMatch[1].trim();
    query = query.substring(selectMatch[0].length).trim(); // Remove 'SELECT ... FROM' from the query
  } else {
    throw new Error('Invalid SQL query: SELECT clause not found');
  }

  // Extract WHERE clause, if any
  let whereIndex = query.toLowerCase().indexOf(' where ');
  if (whereIndex !== -1) {
    fromClause = query.substring(0, whereIndex).trim();
    whereClause = query.substring(whereIndex + 7).trim(); // Skip ' where '
  } else {
    fromClause = query;
  }

  // Now, we can parse the FROM and JOIN clauses

  // Extract tables and joins
  let tables = [];
  let joins = [];

  // Start parsing fromClause
  let tokens = fromClause.split(/\s+/);
  let i = 0;

  // First table after FROM
  if (i >= tokens.length) {
    throw new Error('Invalid SQL query: No table specified in FROM clause');
  }

  let currentTable = tokens[i++];
  tables.push({ table: currentTable });

  while (i < tokens.length) {
    let token = tokens[i].toLowerCase();
    if (token === 'join') {
      i++;
      if (i >= tokens.length) {
        throw new Error('Invalid SQL query: Expected table after JOIN');
      }
      let joinTable = tokens[i++];
      if (i >= tokens.length || tokens[i].toLowerCase() !== 'on') {
        throw new Error('Invalid SQL query: Expected ON after JOIN table');
      }
      i++; // Skip 'on'
      if (i >= tokens.length) {
        throw new Error('Invalid SQL query: Expected condition after ON');
      }
      let joinConditionTokens = [];
      while (i < tokens.length && tokens[i].toLowerCase() !== 'join' && tokens[i].toLowerCase() !== 'where') {
        joinConditionTokens.push(tokens[i++]);
      }
      let joinCondition = joinConditionTokens.join(' ');
      joins.push({
        table: joinTable,
        condition: joinCondition
      });
    } else {
      i++;
    }
  }

  // Extract columns from SELECT clause
  const columns = selectClause.split(',').map(col => col.trim());

  // Collect all tables
  let allTables = tables.map(t => t.table);
  joins.forEach(join => {
    allTables.push(join.table);
  });

  // Verify that all tables exist in the schema
  allTables.forEach(tableName => {
    const tableNameLower = tableName.toLowerCase();
    const tableNameInSchema = Object.keys(databaseSchema.tables).find(t => t.toLowerCase() === tableNameLower);
    if (!tableNameInSchema) {
      throw new Error(`Tabela '${tableName}' não encontrada no banco de dados`);
    }
  });

  // Verify that all columns exist in their respective tables
  columns.forEach(column => {
    const [tableName, columnName] = column.split('.');
    if (!tableName || !columnName) {
      throw new Error(`Invalid column format: '${column}'. Expected 'TableName.ColumnName'`);
    }
    const tableNameLower = tableName.toLowerCase();
    const columnNameLower = columnName.toLowerCase();
    const tableNameInSchema = Object.keys(databaseSchema.tables).find(t => t.toLowerCase() === tableNameLower);

    if (!tableNameInSchema) {
      throw new Error(`Tabela '${tableName}' não encontrada no banco de dados`);
    }

    const tableSchema = databaseSchema.tables[tableNameInSchema];
    const columnExists = Object.keys(tableSchema.columns).some(col => col.toLowerCase() === columnNameLower);

    if (!columnExists) {
      throw new Error(`Coluna '${columnName}' não encontrada na tabela '${tableName}'`);
    }
  });

  return {
    columns,
    tables: tables.map(t => t.table),
    joins,
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
  // Step 1: Apply join heuristics
  const rootNode = {
    name: 'PROJECTION',
    columns: parsedQuery.columns,
    children: []
    // Removemos executionOrder aqui
  };

  // Não precisamos mais do orderCounter aqui

  // Step 2: Reduce tuples - Apply selections as early as possible
  const tableNodes = {};

  // Handle the main table
  const mainTable = parsedQuery.tables[0];
  let mainTableNode = {
    name: `TABLE: ${mainTable}`,
    table: mainTable
    // Removemos executionOrder aqui
  };

  // If there is a WHERE clause that applies to this table, add a selection node
  let selectionNodes = [];

  if (parsedQuery.whereClause && parsedQuery.whereClause.includes(mainTable)) {
    let selectionNode = {
      name: `SELECTION: ${mainTable}`,
      condition: parsedQuery.whereClause,
      children: [mainTableNode]
      // Removemos executionOrder aqui
    };
    tableNodes[mainTable] = selectionNode;
    selectionNodes.push(selectionNode);
  } else {
    tableNodes[mainTable] = mainTableNode;
    selectionNodes.push(mainTableNode);
  }

  // Handle joins
  parsedQuery.joins.forEach(join => {
    let joinTable = join.table;
    let joinCondition = join.condition;

    let joinTableNode = {
      name: `TABLE: ${joinTable}`,
      table: joinTable
      // Removemos executionOrder aqui
    };

    // If WHERE clause applies to this table, add selection node
    let joinSelectionNode = null;
    if (parsedQuery.whereClause && parsedQuery.whereClause.includes(joinTable)) {
      joinSelectionNode = {
        name: `SELECTION: ${joinTable}`,
        condition: parsedQuery.whereClause,
        children: [joinTableNode]
        // Removemos executionOrder aqui
      };
    }

    tableNodes[joinTable] = joinSelectionNode || joinTableNode;

    // Now create join node between previous node and this node
    let previousNode = selectionNodes.pop(); // Pop the last node
    let newJoinNode = {
      name: `JOIN (CONDITION: ${joinCondition})`,
      condition: joinCondition,
      children: [previousNode, joinSelectionNode || joinTableNode]
      // Removemos executionOrder aqui
    };
    selectionNodes.push(newJoinNode); // Push the join node back
  });

  rootNode.children = selectionNodes;

  return rootNode;
}

function assignExecutionOrder(node) {
  let order = 0;

  function traverse(node) {
    if (!node) return;

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        traverse(child);
      });
    }

    // Assign executionOrder after children
    node.executionOrder = ++order;
  }

  traverse(node);
}


// Otimização da Árvore de Consulta
function optimizeQueryTree(queryTree) {
  // Aplicar heurísticas para reduzir campos
  function optimizeNode(node, parentColumns) {
    if (node && node.name.startsWith('PROJECTION') && node.columns) {
      node.name = `PROJECTION: ${node.columns.join(', ')}`;
      node.columns = node.columns.filter(column => parentColumns.includes(column));
    }

    if (node && node.children) {
      node.children.forEach(child => optimizeNode(child, node.columns || parentColumns));
    }
  }

  optimizeNode(queryTree, queryTree.columns || []);
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

    // Atribuir a ordem de execução correta
    assignExecutionOrder(optimizedTree);

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