const http=require('http');
const chalk=require('chalk');
const path=require('path');
const fs=require('fs');
const conf=require('./config/defaultConfig');
// eslint-disable-next-line
const promisify=require('util').promisify;//将回调变一下
const server = http.createServer((req , res)=>{
    let filePath=path.join(conf.root,req.url);//组成一个访问地址
    fs.stat(filePath,(err,stats)=>{
      if(err) {
        res.statusCode=404;
        res.setHeader('Content-Type','text/html; charset=utf-8');
        res.end(`${filePath} 找不到啊！`);
        return;
      }
      if(stats.isFile()){
        res.statusCode=200;
        res.setHeader('Content-Type','text/html; charset=utf-8');
       /* fs.readFile(filePath,(err.data)=>{
         res.end(data);
       }) *///读取速度比较慢
        fs.createReadStream(filePath).pipe(res);
      }else if(stats.isDirectory()){
        fs.readdir(filePath,(err,files)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','text/html; charset=utf-8');
        res.end(files.join(','));
        })
      }
    });
  //   res.statusCode=233;
  //   res.setHeader('Content-Type','text/html; charset=utf-8');
  //   // res.setHeader('Content-Type','text/plain');
  //   // res.writeHead(233, {'Content-Type': 'text/html; charset=utf-8'});
  //  /*  res.write(``); */
  //   res.end(filePath);
});

server.listen(conf.port,conf.hostname,()=>{
      const addr = `http://${conf.hostname}:${conf.port}`;
      console.info(`Server started at ${chalk.green(addr)}`);
});
