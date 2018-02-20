const http=require('http');
const chalk=require('chalk');
const path=require('path');
const conf=require('./config/defaultConfig');
const route=require('./helper/route');
const open=require('./helper/open');//自动打开浏览器

class Server {
  constructor(config) {
    this.conf = Object.assign({},conf,config);
  }

  start(){
    const server = http.createServer((req , res)=>{
      let filePath=path.join(this.conf.root,decodeURI(req.url));//组成一个访问地址
      route(req,res,filePath,this.conf);
      //res.statusCode=233;
      //res.setHeader('Content-Type','text/html; charset=utf-8');
      // res.setHeader('Content-Type','text/plain');
      // res.writeHead(233, {'Content-Type': 'text/html; charset=utf-8'});
      /*  res.write(``); */
      // res.end(filePath);

  });

  server.listen(this.conf.port,this.conf.hostname,()=>{
        const addr = `http://${this.conf.hostname}:${this.conf.port}`;
        console.info(`Server started at ${chalk.green(addr)}`);
        open(addr);
      });
  }
}


module.exports = Server;
