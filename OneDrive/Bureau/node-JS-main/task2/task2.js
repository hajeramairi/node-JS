const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<center><h1>Hello Node!!!!</h1></center>\n');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});