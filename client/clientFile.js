const net = require('net');

const client = new net.Socket();

const fs = require('fs');

// client.bufferSize = 1024;
// console.log(client.bufferSize);

client.connect(9517,'127.0.0.1',()=>{

    // client.bufferSize = 1024;
    

    console.log('Connected');
    let data = fs.readFileSync(process.argv[2], { encoding: 'base64' });

    client.write(process.argv[2]);
    console.log("Send file : "+process.argv[2]);

    client.write(data.length.toString());
    console.log("Total size : "+data.length);

    setTimeout(() => {
        client.write(data);
    }, 100);
    
    console.log("Send complete");
})

client.on('data', function(data) {
    console.log('\n');
	console.log('Server: ' + data);
});
client.on('close', function() {
	console.log('Connection closed');
});