"use strict"

var sync = module.exports = function (todolist, callback) {
    //待执行事件
    this.todolist = todolist;
    //事件流完成的回调
    this.callback = callback;
    //待执行任务列表
    this.task = [];
    var self = this;
    //添加任务
    this.todolist.forEach(function (task) {
        self.task.push(function (next, data) {
            task && task(next, data);
        });
    });



}
//@params   index   指定执行的任务，不指定则为从第一个开始
//@params   cbData  最后任务返回的数据信息
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
    var self = this;
    //指定下一步任务
    task(function (error, data) {
        //发生
        if (error) {
            throw new Error('execute sync task error，task index ' + index + ':' + error);
        }
        self.execute(++index, data);
    }, cbData);
}



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


