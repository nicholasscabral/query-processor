// views.js

function getHomePage() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Gerador de Árvore de Consulta Otimizada</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }

        .container {
          width: 90%;
          max-width: 800px;
          margin: 40px auto;
          background-color: #fff;
          padding: 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 18px;
          margin-bottom: 10px;
          color: #555;
        }

        textarea {
          font-size: 16px;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          resize: vertical;
          height: 150px;
        }

        button {
          align-self: center;
          font-size: 18px;
          padding: 12px 24px;
          color: #fff;
          background-color: #007BFF;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Gerador de Árvore de Consulta Otimizada</h1>
        <form action="/process" method="post">
          <label for="query">Insira a Consulta SQL:</label>
          <textarea id="query" name="query" required></textarea>
          <button type="submit">Gerar Árvore de Consulta</button>
        </form>
      </div>
    </body>
    </html>
  `;
}

function getResultPage(elements) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Árvore de Consulta Otimizada</title>
      <script src="https://unpkg.com/cytoscape/dist/cytoscape.min.js"></script>
      <script src="https://unpkg.com/dagre@0.8.5/dist/dagre.min.js"></script>
      <script src="https://unpkg.com/cytoscape-dagre/cytoscape-dagre.js"></script>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }

        .container {
          width: 90%;
          max-width: 1000px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        #cy {
          width: 100%;
          height: 800px;
          border: 1px solid #ccc;
          margin-bottom: 20px;
        }

        #back-button {
          display: block;
          margin: 0 auto;
          font-size: 16px;
          padding: 10px 20px;
          color: #007BFF;
          background-color: #fff;
          border: 2px solid #007BFF;
          border-radius: 5px;
          cursor: pointer;
          text-align: center;
        }

        #back-button:hover {
          background-color: #007BFF;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Árvore de Consulta Otimizada</h1>
        <div id="cy"></div>
        <button id="back-button" onclick="window.history.back()">Voltar</button>
      </div>
      <script>
        const elements = ${elements};

        // Inicializar o Cytoscape
        cytoscape.use(cytoscapeDagre);

        const cy = cytoscape({
          container: document.getElementById("cy"),
          elements: elements,
          style: [
            {
              selector: "node",
              style: {
                label: "data(label)",
                "text-valign": "center",
                "text-halign": "center",
                "background-color": "#61bffc",
                color: "#000",
                "font-size": "20px",
                padding: "20px",
                shape: "roundrectangle",
                "border-width": 2,
                "border-color": "#000",
                "text-wrap": "wrap",
                "text-max-width": "250px",
                width: "250px",
                height: "150px",
              },
            },
            {
              selector: "edge",
              style: {
                width: 4,
                "line-color": "#666",
                "target-arrow-color": "#666",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier",
              },
            },
          ],
          layout: {
            name: "dagre",
            rankDir: "TB",
            nodeSep: 50,
            edgeSep: 10,
            rankSep: 100,
            ranker: "network-simplex",
          },
          zoom: 1,
          minZoom: 0.5,
          maxZoom: 2,
        });
      </script>
    </body>
    </html>
  `;
}

function getErrorPage(errorMessage) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Erro ao Processar a Consulta</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }

        .container {
          width: 90%;
          max-width: 800px;
          margin: 40px auto;
          background-color: #fff;
          padding: 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }

        h1 {
          color: #d9534f;
        }

        p {
          font-size: 18px;
          color: #333;
        }

        button {
          font-size: 16px;
          padding: 10px 20px;
          color: #007BFF;
          background-color: #fff;
          border: 2px solid #007BFF;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #007BFF;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Erro ao Processar a Consulta</h1>
        <p>${errorMessage}</p>
        <button onclick="window.history.back()">Voltar</button>
      </div>
    </body>
    </html>
  `;
}

module.exports = {
  getHomePage,
  getResultPage,
  getErrorPage,
};
