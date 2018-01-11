const http=require('http');
const chalk=require('chalk');
const conf=require('./config/defaultConfig');

const server = http.createServer((req , res)=>{
    // res.statusCode=233;
    // res.setHeader('Content-Type','text/html; charset=utf-8');
    // res.setHeader('Content-Type','text/plain');
    res.writeHead(233, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
        123456453
    </body>
    </html>
    `);
    res.end();
});
// sad
server.listen(conf.port,conf.hostname,()=>{
      const addr = `http://${conf.hostname}:${conf.port}`;
      console.info(`Server started at ${chalk.green(addr)}`);
});

// eslint-disable-next-line
console.log(123);

// alert(11);

// console.log(123);
// console.log(123);


