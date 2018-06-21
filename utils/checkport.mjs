import net from 'net';
//检查端口占用的方法
export async function  checkport(port){
    let server  = net.createServer().listen(port)
    let rlt = new Promise(resolve=>{

        server.on("listening", async ()=>{
            if(server){
                server.close();
                resolve(false);
            }else{
                resolve(true);
            }
        });

        server.on("error",async (err)=>{
            if (err.code === 'EADDRINUSE') { // 端口已经被使用
                resolve(true);
                console.log('The port【' + port + '】 is occupied, please change other port.')
               }
        })

    });
     
    return await rlt;

}


