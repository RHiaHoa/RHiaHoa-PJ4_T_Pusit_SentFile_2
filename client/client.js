const net = require('net');

const client = new net.Socket();

const fs = require('fs');

const frameSize = 15;

const Frame = (data,no)=>{
    return {
        seq:no,
        data:data
    };
};

const FrameHash = (frame)=>{
    return Buffer.from(JSON.stringify(frame)).toString('base64');
};

client.connect(9517,'127.0.0.1',()=>{
    let No = 1;
    console.log('Connected');
    console.log("\n");

    console.log('Start send frame');
    console.log("\n");
    
    let readStream = fs.createReadStream(process.argv[2], { highWaterMark: frameSize });

    readStream
        .on('data', function (chunk) {

            let frame = Frame(chunk.toString(),No);
            let frameHash = FrameHash(frame);
            console.log("Frame("+No+")");
            console.log(frame);
            console.log("base64 => "+frameHash);
            console.log("\n");
            No++;
            setTimeout(() => {
                client.write(frameHash);
            }, 100*No);
            
        })
        .on('end', function () {
            setTimeout(() => {
                client.end();
            }, 100*No);
            console.log('End send frame');
            console.log("\n");
        });
})
