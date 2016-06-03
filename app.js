// 引用 fs（filestream） 模块
var fs = require("fs");
var exec = require('child_process').exec
//var update = process.argv[2] || 61350;//61448
//var last = process.argv[2];//61350

var getSvn = function(last, update, lastList){
  exec("svn log -v -r "+ last +":"+ update +" https://10.0.0.55/svn/tshow/web/game-activity", function (err, stdout, stderr){
    if (err) throw err
    var regu = /([AMD])\ (\/[\w-\.\/]+\.[\w]+)/g;
    var re = new RegExp(regu);
    var str = stdout;
    //re.exec(str);//RegExp.$1
    //console.log( "lastIndex=" + re.lastIndex ); // lastIndex=0
    var value = null;
    var newList = new Array();
    while( value = re.test(str) ){
      newList.push(RegExp.$1+" "+RegExp.$2);
    }
    for (var i = 0; i < lastList.length; i++){
      for (var j = 0; j < newList.length; j++){
        newList[j] == lastList[i] && newList.splice(j,1);
      }
    }
    console.log(newList);
  });
}

var getUpdateVersion = function(last){
  exec("svn info https://10.0.0.55/svn/tshow/web/game-activity",'utf-8', function (err, stdout, stderr){
    if (err) throw err
    var regu = /([\u2E80-\u9FFF+]:)\ (\d+)/g;
    var re = new RegExp(regu);
    var str = stdout;
    var value = null;
    while( value = re.test(str) ){
      var update  = RegExp.$2
    }
    getLastContent(last, update);
  });
}

var getLastVersion = function(){
  // 1、读文件
  fs.readFile("num.txt",'utf-8', function (error, fileData) {
    if (error) {
      // 出现错误
    }
    // 操作fileData
    var last = fileData;
    getUpdateVersion(last);
  });
}

var getLastContent = function(last, update){
  exec("svn log -v -r "+ last +" https://10.0.0.55/svn/tshow/web/game-activity", function (err, stdout, stderr){
    if (err) throw err
    var regu = /([AMD])\ (\/[\w-\.\/]+\.[\w]+)/g;
    var re = new RegExp(regu);
    var str = stdout;
    var value = null;
    var lastList = new Array();
    while( value = re.test(str) ){
      lastList.push(RegExp.$1+" "+RegExp.$2);
    }
    getSvn(last, update, lastList);
  });
}

getLastVersion();



/*// 2、写文件
 fs.writeFile("num.txt", update, function (error) {
 if (error) {
 // 出现错误
 }
 // 继续操作
 console.log('It\'s saved!');
 });*/
// 3、追加内容
/*fs.appendFile("content.txt", RegExp.$1+" "+RegExp.$2+" ", function (error) {
 if (error) {
 // 出现错误
 }
 // 继续操作
 });*/