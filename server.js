const http = require('http');
const host = 'localhost';
const port = 3000;

const routes = {
    '/': 'Node HTPP server',
    '/books': 'Books page',
    '/authors': 'Authors list'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(routes[req.url]);
});

server.listen(port, host, () => {
    console.log(`Server is runnig on http://${host}:${port}`);
});