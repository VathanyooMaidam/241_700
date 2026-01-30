//ทำการ import โมดูลที http
const http = require('http');
const host = 'localhost';
const port = 8000;

//กำหนดค่า server

const requireListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello World! this is my first backend server.');
}
//run server
const server = http.createServer(requireListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});