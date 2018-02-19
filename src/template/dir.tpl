<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <style>
    body{
      margin: 20px;
    }
    a{
      display: block;
      font-size: 16px;
    }
  </style>
</head>
<body>
{{#each files}}
<!-- dir和files在同一个级别的 所以用../-->
<!-- <a href="{{../dir}}/{{this}}">{{this}}</a> -->

    <a href="{{../dir}}/{{file}}">[{{icon}}]{{file}}</a>
{{/each}}
</body>
</html>
