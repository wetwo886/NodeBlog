//@description  模拟执行同步任务队列
//@author       wetwo886

//@示例
//var Sync = require('./common/sync');
//var sync = new Sync([step1, step2, step3], function (data) {
//    console.log(data);
//});
//function step1(next) {
//    next(null, 'a');
//}
//function step2(next, data) {
//    data = data + 'b';
//    next(null, data);
//}
//function step3(next, data) {
//    data = data + 'c';
//    next(null, data);
//}
//sync.execute();

"use strict"
/// <summary>初始化同步任务</summary>
/// <param name="todolist" type="Array[Function]">待执行的方法组，严格按照加入的顺序来执行</param>
/// <param name="callback" type="Function">队列执行完成后执行的回调函数</param>
var sync = module.exports = function (todolist, callback) {
  //待执行事件
  this.todolist = todolist;
  //事件流完成的回调
  this.callback = callback;
  //待执行任务列表
  this.task = [];
  //当前作用域
  var scope = this;
  //添加任务
  this.todolist.forEach(function (task) {
    //添加至任务队列
    scope.task.push(function (next, data) {
      task && task(next, data);
    });
  });
}
/// <summary>执行任务队列</summary>
/// <param name="index" type="Number">执行的任务索引，无则表示从第一个开始</param>
/// <param name="cbData" type="Object">上一次任务执行完成后传递的数据</param>
sync.prototype.execute = function (index, cbData) {
  //获取任务索引
  !index && (index = 0);
  //判断任务是够已经执行完成
  if (index === this.todolist.length) {
    this.callback(cbData);
    return;
  }
  //获取任务
  var task = this.task[index];
  //作用域
  var scope = this;
  //指定下一步任务
  task(function (error, data) {
    //发生错误，终止任务队列，并抛出异常
    if (error) {
      throw new Error('execute sync task error，task index ' + index + ':' + error);
    }
    //执行下一个任务
    scope.execute(++index, data);
  }, cbData);
}


