const net = require('net');

const fs = require('fs');

const server = net.createServer({allowHalfOpen:true},function(client) {

    client.txt = "";

    client.write('Hello Client\r\n');

    client.on('data', function(data) {
        let frameHash = data.toString();

        let frame = Buffer.from(frameHash, 'base64').toString('utf8');
        let frameObj = JSON.parse(frame);

        console.log("Frame("+frameObj.seq+")");
        console.log(frameObj);
        console.log("base64 => "+frameHash);
        console.log("Data to UpperCase => "+frameObj.data.toUpperCase());
        console.log("");

        client.txt += frameObj.data.toUpperCase();

    });
    client.on('end', function(data) {
        fs.writeFileSync('server.txt', client.txt);
        console.log("Save file success");
    });

});

server.listen(9517, '127.0.0.1',null,()=>{

    console.log("Server start");
    
});