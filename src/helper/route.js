
const fs=require('fs');
const path=require('path');
const Handlebars=require('handlebars');
const promisify=require('util').promisify;//将回调变一下
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);
const config=require('../config/defaultConfig');
const mime=require('./mime');
const compress=require('./compress');//解压缩
const range=require('./range');//范围请求

const tplPath=path.join(__dirname,'../template/dir.tpl');//拼成一个绝对地址
const source=fs.readFileSync(tplPath);//这里可以用同步的方式
const template=Handlebars.compile(source.toString());  //传一个字符串参数初始化

module.exports=async function(req,res,filePath){
    try{
      const stats=await stat(filePath);

      if(stats.isFile()){
        const contentType=mime(filePath);
        res.statusCode=200;
        res.setHeader('Content-Type',contentType);
      /* fs.readFile(filePath,(err.data)=>{
        res.end(data);
      }) *///读取速度比较慢
      let rs;
      const {code, start, end}=range(stats.size,req,res);
      if(code === 200){ //不是否涉及范围请求
        res.statusCode=200;
        rs=fs.createReadStream(filePath);
      }else{
        res.statusCode=206;
        rs=fs.createReadStream(filePath,{start,end});
      }
      if(filePath.match(config.compress)){
        rs=compress(rs,req,res);
      }
      rs.pipe(res);
      }else if(stats.isDirectory()){
        const files=await readdir(filePath);

        // res.setHeader('Content-Type','text/plain');
        res.setHeader('Content-Type','text/html; charset=utf-8');
        const dir=path.relative(config.root,filePath); //获得1相对2的相对路径
        const data={
          title:path.basename(filePath), //传过去的title
          dir:dir?`/${dir}`:'',               //从根路径开始
          files:files.map(file=>{
           return{
            file,
            icon:mime(file)
          }
          })                        //传过去的文件名
        };
        res.end(template(data));
      }
    }catch(ex){
      // console.error(ex);
      res.statusCode=404;
      res.setHeader('Content-Type','text/plain');
      res.end(`${filePath} 什么鬼！${ex}`);
      // ${ex}
      return;
    }
}
