(function(){

  var functArr = [];
  var isLoaded = false;


  document.addEventListener("DOMContentLoaded", function(){
    isLoaded = true;
    callAllWaitingFuncts();
  });

  function callAllWaitingFuncts(){
    for (var i = 0; i < functArr.length; i++) {
      functArr[i].call();
    }
    functArr = [];
  }


  function DOMNodeCollection(argsArray){
    this.args = argsArray;
  }

  DOMNodeCollection.prototype.html = function(html){
    if(typeof html === "undefined"){
      return this.args[0].innerHTML;
    }else{
      for (var i = 0; i < this.args.length; i++) {
        this.args[i].innerHTML = html;
      }
    }
  };

  DOMNodeCollection.prototype.empty = function(){
    this.html("");
  };

  DOMNodeCollection.prototype.append = function(newStuff){
    if(typeof newStuff !== "string"){
      var htmlString = "";
      for (var i = 0; i < newStuff.args.length; i++) {
        htmlString += newStuff.args[i].outerHTML;
      }
      newStuff = htmlString;
    }
    for (var i = 0; i < this.args.length; i++) {
      this.args[i].innerHTML += newStuff;
    }
  };

  DOMNodeCollection.prototype.attr = function(attribute, value){
    for (var i = 0; i < this.args.length; i++) {
      this.args[i].setAttribute(attribute, value);
    }
  };

  DOMNodeCollection.prototype.addClass = function(classname){
    for (var i = 0; i < this.args.length; i++) {
      this.args[i].classList.add(classname);
      console.log(classname);
    }
  };

  DOMNodeCollection.prototype.removeClass = function(classname){
    for (var i = 0; i < this.args.length; i++) {
      this.args[i].classList.remove(classname);
    }
  };

  DOMNodeCollection.prototype.children = function(){
    var children = [];
    for (var i = 0; i < this.args.length; i++) {
      var htmlChildren = this.args[i].children;
      var childrenArray = [].slice.call(htmlChildren);
      children = children.concat(childrenArray);
    }
    return new DOMNodeCollection(children);
  };

  DOMNodeCollection.prototype.parent = function(){
    var parents = [];
    for (var i = 0; i < this.args.length; i++) {
      var htmlParent = this.args[i].parentElement;
      parents.push(htmlParent);
    }
    parents = parents;
    return new DOMNodeCollection(parents);
  };

  DOMNodeCollection.prototype.find = function(selector){
    var found = [];
    for (var i = 0; i < this.args.length; i++) {
      var thisFound = this.args[i].querySelectorAll(selector);
      var thisFoundArr = [].slice.call(thisFound);
      found = found.concat(thisFoundArr);
      console.log("thisFound", found);
    }

    return new DOMNodeCollection(found);
  };

  DOMNodeCollection.prototype.remove = function(){
    for (var i = 0; i < this.args.length; i++) {
      this.args[i].outerHTML = "";
    }
  };

  DOMNodeCollection.prototype.on = function(eventType, callback){
    for (var i = 0; i < this.args.length; i++) {
      this.args[i].addEventListener(eventType, callback);
    }
  };

  DOMNodeCollection.prototype.off = function(eventType, callback){
    for (var i = 0; i < this.args.length; i++) {
      this.args[i].removeEventListener(eventType, callback);
    }
  };

  function getElem(selector){
    var elems = document.querySelectorAll(selector);
    var arr = [].slice.call(elems);
    var dNode = new DOMNodeCollection(arr);
    return dNode;
  }


  window.$l = function(selector){
    if(typeof selector === "string"){
      if( /<[a-z][\s\S]*>/i.test(selector) ){
          selector = selector.replace("<", "");
          selector = selector.replace(">", "");
          selector = selector.replace("/", "");

          var newElem = document.createElement(selector);
          return new DOMNodeCollection(newElem);
      }
      var out = getElem(selector);
      return out;
    }
    if(selector instanceof HTMLElement){
      selector = [selector];
      return new DOMNodeCollection(selector);
    }
    if (typeof selector === "function"){
      if (isLoaded){
        selector.call();
      }else{
        functArr.push(selector);
      }
    }
  };

  var $l = window.$l;

  $l.extend = function(){
    var objects = [].slice.call(arguments);
    var keys;

    for (var i = 1; i < objects.length; i++) {
      keys = Object.keys(objects[i]);
      for (var j = 0; j < keys.length; j++) {
        objects[0][keys[j]] = objects[i][keys[j]];
      }
    }
    return objects[0];
  };

  $l.ajax = function(optionsHash){
    var defaultHash = {
      type: "GET",
      url: "/",
      success: function(){console.log("Rainbows!!!");},
      error: function(){console.log("An error occured.");}
    };
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == XMLHttpRequest.DONE){
        if(xmlhttp.status === 200 || xmlhttp.status === 300){
          optionsHash.success();
          console.log("response: "+xmlhttp.responseText);
        }else{
          optionsHash.error();
        }
      }
    };

    optionsHash = $l.extend(defaultHash, optionsHash);
    xmlhttp.open(optionsHash.type, optionsHash.url);
    xmlhttp.send();
  };




})();
