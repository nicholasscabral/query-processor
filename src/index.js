// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { processQuery } = require('./query-processor');
const { convertToCytoscapeElements } = require('./utils');
const { getHomePage, getResultPage, getErrorPage } = require('./views'); // Importando as funções do views.js
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(getHomePage());
});

app.post('/process', (req, res) => {
  try {
    const query = req.body.query;

    const result = processQuery(query);

    if (result.error) {
      console.error('Erro ao processar a consulta:', result.error);
      res.send(getErrorPage(result.error));
    } else {
      const optimizedTree = result;

      // Convert the query tree to Cytoscape elements
      const elements = JSON.stringify(convertToCytoscapeElements(optimizedTree));

      // Send the HTML page with Cytoscape visualization
      res.send(getResultPage(elements));
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
    res.send(getErrorPage(error.message));
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
