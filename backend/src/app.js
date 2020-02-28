const express = require('express');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const database = require('./database/mongoose');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3333, '192.168.24.139');