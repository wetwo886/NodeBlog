"use strict"
function define(options, parentClass) {
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


    if ('baseClass' in this) {


      //var _base = function () { };
      //_base.prototype = new this['baseClass']();

      (function (scope) {

        for (var key in scope.base) {
          if (scope.base[key] && scope.base.hasOwnProperty(key)) {
            console.log(scope.base[key].prototype);
            //if (scope.base.hasOwnProperty(key)) {

            scope.base[key].prototype.call(scope);
            //}
          }
        }
      })(this);


      //console.log(this['baseClass'].prototype);

      //this['baseClass'].prototype.call(this);

      //this.base = new Object();
      //this.base = new this['baseClass']();
      //console.log(this.base.prototype);
      //this.base.prototype.call(this);


      // this['baseClass'].call(this.base);
      //console.log(this['baseClass'].constructor);
      //this.base.property.call(this);

      //  console.log(scope);
    }

    this.options = options;
    this.ctored = true;
  };

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
  sub_class.prototype['baseClass'] = Base;

  copyProp(options, sub_class);




  //sub_class.prototype.onBase = function (args) {
  //    //this.base[''].call(this);

  //    console.log(args.);


  //    //args.callee.apply(this.base,args);
  //}

  //sub_class.prototype['base'].call()

  //sub_class.prototype.onBase = (function () {
  //    parentClass.prototype['base'].call(sub_class, arguments);
  //})();           



  //sub_class.prototype['base'] = (function () {
  //    return function () {
  //        console.log(this);
  //       return this['base'].call(this);
  //    }
  //})();


  return sub_class;
}
