const net = require('net');
const fs = require('fs');

var input = process.stdin;
input.setEncoding('utf-8');

const server = net.createServer(function(client) {

    client.write('Hello Client\r\n');

    client.on('data', function(data) {
        let txt = data.toString();
        console.log('\n');
        console.log("Client : "+txt);
        
    });

    input.on('data', function (data_in) {
        client.write(data_in);
    });
});

server.listen(9517, '127.0.0.1',null,()=>{
    console.log("Server start");
});