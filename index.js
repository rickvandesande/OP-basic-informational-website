const http = require('http');
const fs  = require('fs');
const path = require('path');

// Create server
const server = http.createServer((req, res) => {
    
    //  Build FilePath
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Identify extension
    const extension = path.extname(filePath);
    
    // Set default Content-Type
    let contentType = 'text/html';

    // Logic to change Content-Type
    switch (extension) {
        case '.css':
            contentType = 'text/css';
        break;
        case '.js':
            contentType = 'text/javascript';
        break;
        case '.jpg':
            contentType = 'image/jpeg';
        break;
        case '.png':
            contentType = 'image/png';
        break;
        case '.pdf':
            contentType = 'application/pdf';
        break;
        case '.json':
            contentType = 'application/json';
        break;
    }

    fs.readFile(filePath, (err, content)=> {
        if (err) {
            // HANDLE 404 errors
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=>{
                    res.writeHead(404);
                    res.end(content);
                })
            } else {
            // HANDLE other errors
                res.writeHead(500);
                res.end(`Something went wrong with your request`);
            }
        } else {
            res.writeHead(200, {'Content-Type' : contentType});
            res.end(content);
        }
    })
})
const PORT = 8080;
server.listen(PORT, ()=> console.log('Server running...'));