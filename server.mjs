import http from 'http';
import { URL } from 'url';

const serverless = require('serverless-http');

import database from './database.json' with { type: 'json' };

const server = http.createServer((req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const params = Object.fromEntries(reqUrl.searchParams.entries());
    res.writeHead(200, { 'Content-Type': 'application/json' });

    

    if (Object.keys(params).length === 0) {
        res.end(JSON.stringify({ error: 'No parameters provided' }));
    } 
    
    else{
        if (!params.Username || !params.Password) {
            res.end(JSON.stringify({ error: 'Username and Password required' }));
            return;
        }
        const user = database.find(user => user.Username === params.Username && user.Password === params.Password);
        if (!user) {
            res.end(JSON.stringify({ error: 'Invalid Username or Password' }));
            return;
        }
        const UserData = database.find(user => user.Username === params.Username);
        res.end(JSON.stringify(UserData));
    }

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});