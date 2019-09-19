const net = require('net');
const fs = require('fs');
const server = net.createServer({allowHalfOpen:true},function(client) {

    // client.write('Hello Client\r\n');
    // console.log(client.bufferSize);

    // client.buffer = Buffer.alloc(4 * 1024);
    
    let fileName = "";
    let filesize = 0;
    let all;
    let fullSize = -1;

    client.on('data', function(data) {
        if(fileName==""){

            fileName = data.toString();
            console.log("File receive : "+fileName);
            
        }else if(fullSize<0&&fileName!=""){
            fullSize = parseInt(data.toString());
            console.log("Total size : "+fullSize+" byte");
            
        }else{
            if (data.toString()=="fileend") {
                console.log("fileend");
                return true;
            }
            filesize += data.length
            console.log("Total size : "+filesize);
            // console.log("Total size : "+(fullSize-filesize));
            
            // console.log("Received size : "+data.length+" byte");
            if (all==undefined) {
                all = data
            }else{
                all = Buffer.concat([all, data]);
            }
            
            if(filesize==fullSize){
                console.log("Write file "+fileName+" complete");
                
                fs.writeFile("./file/"+new Date().getTime()+"_"+fileName, all.toString(), "base64",(err)=>{});

                fullSize=-1;
                filesize=0;
                fileName="";
            }
        }
    });
});

server.listen(9517, '127.0.0.1',null,()=>{
    console.log("Server start");
});