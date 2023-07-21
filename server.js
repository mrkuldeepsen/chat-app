const express = require('express');
const os = require('os');
const cluster = require('cluster');

const { handleError } = require('./app/utils/errorhandler');

const PORT = process.env.PORT || 4000;

const cpuNums = os.cpus().length;

console.log('cpu nums >>>', cpuNums);

if (cluster.isPrimary) {

    for (let i = 0; i < cpuNums; i++) {
        cluster.fork();

    }

    cluster.on('exit', () => {
        cluster.fork();
    })

} else {
    const app = express()
    app.get('*', (req, res) => {
        handleError('Hunn Smart!', req, res,)
    })

    app.listen(PORT, () => {
        console.log(`Server is running port on ${PORT}`)
    })
}