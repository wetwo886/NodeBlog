/*tool class*/
/*
 *@描述:用于定义类以及类的继承
 *@参数:
 *     options:Object,需要定义类的属性
 *     parentClass:Array|Function, 当传递数组时,数组第一项必须为Function,其余选项可为Object或者Function
 *
 *@示例：
 *      var ClassA=define({p1:'ClassA.p1',get:function(){console.log(this.p1)}});
 *      var ClassB=defint({p1:'ClassB.p1',get:function(){var baseget=this.base.get();console.log(this.p1+','+baseget) }},ClassA);
 *      var c=new ClassB({p1:'xxx',ctor:function(){}});
 *      this.base.method为父类对应的方法
 *      ctor:在实例化对象的时候会自动调用，子类中如果存在ctor，则复写父类中的ctor，类似于其他语言中的构造函数
 */

"use strict"
exports.define = function (options, parentClass) {
  if (!options) {
    throw 'no sub class';
  }
  var toString = Object.toString;
  var Base = function () { }
  var notOverrides = ['options', 'base'];

  var copyProp = function (source, target) {
    for (var key in source) {
      if ((source.hasOwnProperty(key) || source.isPrototypeOf(key)) && isCanOverride(key)) {
        target.prototype[key] = source[key];
      }
    }
    return target;
  }

  var isCanOverride = function (prop) {
    for (var key in notOverrides) {
      if (key === prop) {
        return false;
      }
    }
    return true;
  }

  if (parentClass) {
    //toString.call(parentClass) === '[object Array]' is error :Function.prototype.toString is not generic 
    if (parentClass instanceof Array) {
      for (var i = 0, len = parentClass.length; i < len; i++) {
        if (i === 0) {
          if (!(parentClass[i] instanceof Function)) {
            throw new Error('super class must be Function');
          }
          sub_class.prototype = new parentClass[i]();
          Base.prototype = new parentClass[i]();
        }
        else {
          copyProp(parentClass[i], sub_class);
          copyProp(parentClass[i], Base);
        }
      }
    }
    else {
      sub_class.prototype = new parentClass();
      Base.prototype = new parentClass();
    }
  }


  sub_class.prototype['base'] = new Base();
  copyProp(options, sub_class);


  var sub_class = function (options) {
    if (options) {
      for (var key in options) {
        if (isCanOverride(key)) {
          this[key] = options[key];
        }
      }
    }

    if ('ctor' in this) {
      this['ctor'].call(this);
    }

    this.options = options;
    this.ctored = true;
  };



  return sub_class;
}

//传入时间
var formatDate = exports.formatDate = function (date) {
  if (date) {
    if (toStr.call(date) === '[object Date]') {
      throw new Error('not date type');
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay();
    return year + '-' + month + '-' + day;
  }
  else {
    return formatDate(new Date());
  }
}


var toStr = exports.toStr = function () {
  return Object.toString;
}