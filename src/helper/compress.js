const {createGzip,createDeflate} = require('zlib');
//引入压缩算法
module.exports=(rs,req,res)=>{
  const acceptEncoding=req.headers['accept-encoding'];
  if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
    return rs;
  }else if(acceptEncoding.match(/\bgizp\b/)){
    res.setHeader('Content-Encoding','gizp');
    return rs.pipe(createGzip());
  }else if(acceptEncoding.match(/\bdeflate\b/)){
    res.setHeader('Content-Encoding','deflate');
    return rs.pipe(createDeflate());
  }
}
