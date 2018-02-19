const http=require('http');
const chalk=require('chalk');
const path=require('path');
const conf=require('./config/defaultConfig');
const route=require('./helper/route');

const server = http.createServer((req , res)=>{
    let filePath=path.join(conf.root,decodeURI(req.url));//组成一个访问地址
    route(req,res,filePath);
    //res.statusCode=233;
    //res.setHeader('Content-Type','text/html; charset=utf-8');
    // res.setHeader('Content-Type','text/plain');
    // res.writeHead(233, {'Content-Type': 'text/html; charset=utf-8'});
    /*  res.write(``); */
    // res.end(filePath);
});

server.listen(conf.port,conf.hostname,()=>{
      const addr = `http://${conf.hostname}:${conf.port}`;
      console.info(`Server started at ${chalk.green(addr)}`);
});
