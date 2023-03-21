const http = require("http");

    const host = 'localhost';
    const port = 8000;

    const requestListener = function (req, res) {
        // Establecemos el tipo de contenido
        /*
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.write(`{"alumno": "estudiando"}`)
    res.end(`{"message": "This is a JSON response"}`);
    */
   //HTML
   /*
   res.setHeader('Content-Type', 'text/html');
   res.writeHead(200);
    res.write("<h1>HolaMundo<h1>");
    res.end();
    */
   //csv
   res.setHeader('Content-Type', 'text/csv');
   res.writeHead(200);
    
    res.end('nombre,ciudad \njuan,sevilla');
};

    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });