module.exports = {
  "extends": "eslint:recommended",

  //规则
  "rules":{
    "no-console":["error",{//012 2代表error
      "allow":["warn","error","info"]
    }]
  },
  //解析器
  "parser":"babel-eslint",
  //解析器参数
  "parserOptions":{
    "ecmaVersion":6,
    "sourceType":"script"
  },
  //环境
  "env":{
    "node":true,
    "es6":true,
    "mocha":true
  },
  "globals":{
    //"window":true
  }
};

