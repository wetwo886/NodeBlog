//@description    文章相关路由控制
//@author         wetwo886

//获取route配置
var route = require('./config');

//获取View配置
var viewTemplates = route.getViewTemplates();

/// <summary>列表路由</summary>
/// <param name="req" type="Object">请求参数</param>
/// <param name="res" type="Object">响应对象</param>
exports.index = function (req, res) {
  //渲染页面
  res.render(viewTemplates.global.console);
}

