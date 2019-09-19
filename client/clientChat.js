const net = require('net');

const client = new net.Socket();

const fs = require('fs');
var input = process.stdin;
input.setEncoding('utf-8');


client.connect(9517,'127.0.0.1',()=>{

    console.log('Connected');
    input.on('data', function (data) {
        client.write(data);
    });

})

client.on('data', function(data) {
    console.log('\n');
	console.log('Server: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
});