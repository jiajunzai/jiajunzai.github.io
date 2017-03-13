##类JQ库

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这几天跟着老师做了一个类似于`jQuery`的库，做的时候该怎么不懂得就是怎么不懂，完全是跟着老师做。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;做库的时候最大的困难就是要兼容ie8，大家都知道ie8和ie9就是一道坎，本来我们是玩代码的，现在是代码玩我们。学web两个多月了，发现自己残了好多，头发扎堆的发白，幸好不是掉头发，不然就成地中海了，哈哈哈~~~<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前期学html和css还好可以完全跟上老师是讲的内容，也能理解运用。可是到了javascript的时候真的是一个头两个大。白发就是从这时开始长（香菇，蓝瘦）。在学习上明知道这是个坑，也还是要往里跳的，不然不跳一下你就不知道这个坑有多深。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现在给大家分享一下几个类jq代码，发现`bug`欢迎大家指出<br>

##代码：
（以下用法同jquery一样）<br>

- `$()`获取元素，可查找#id/.class/tag
- `each()`遍历对象下的每一个元素
- `addClass()`增加class
- `removeClass()`删除class
- `append()`把子节点插入父节点的最后
- `prepend()`把子节点插入父节点的第一
- `css()`css样式，可设置多个属性
- `attr()`获取和设置属性getAttribute
- `siblings()`找到同级所有
- [`remove()`自身删除，并且返回自身](#remove)
- `next()`找到下一个元素节点
- `prev()`找到上一个元素节点
- `on()`事件绑定，可以设置委托事件
- `off()`删除事
- 


	(function(){

	//查找元素的方法	
	function searchElements(selector){
		
		//字面量声明数组
		var result = [];

		//判断传过来的参数是不是string对象
		if(typeof selector == "string"){
			
			//变量声明一个正则表达式
			var reg = /^[#\.a-zA-Z]/;

			//匹配传过来的参数
			if(reg.test(selector)){

				var first = selector[0];

				//传递过来的是id
				if(first == "#"){
					var elem = document.getElementById(selector.slice(1));
					result = elem ? [elem] : [];

				//传过来的是class	
				}else if(first == "."){

					//先找到所有元素
					var elems = document.getElementsByTagName("*");
					var len = elems.length;

					//循环元素
					for(var i = 0; i < len; i++){

						//获取元素的className
						var name = elems[i].className;

						//把字符串分割成数组再用join方法用###连接
						var string = "###" + name.split(" ").join("###") + "###";

						//用search判断匹配string是否包含有selecto.slice(1)
						if(string.search("###" + selector.slice(1) + "###") != -1){

							//用push把elems[i]插入result
							result.push(elems[i]);
						}
					}
				}else{

					//传过来的是TagName
					var elems = document.getElementsByTagName(selector);

					//把集合转换成数组
					result = [].slice.call(elems,0);
				}
			}
		
		//用nodeType判断是不是元素节点
		}else if(selector.nodeType == 1){
			result.push(selector);
		}
		return result;
	}


	// 构造函数
	function Init(selector){

		var arr = searchElements(selector);	
		var len = arr.length;

		this.length = len;

		for(var i = 0; i < len; i++){
			this[i] = arr[i]
		}
	}

							//css
						
	// 获取样式表的样式
	function getStyle(elem,style){//obj attr
		if(elem.currentStyle){
			return elem.currentStyle[style];
		}else{
			return window.getComputedStyle(elem,false)[style];
		}
	}

	// 给样式数字添加px单位
	function addPx(property,value){
		var object = {
			"z-index" : 1,
			"opacity" : 1
		}
		arr = [1,1];
		arr[0]
		object["z-index"]
		if(!object[property]){
			value += "px";
		}
		return value;
	}

	//存储事件的对象
	var events = {};
	var only = 0;


	//构造函数的方法
	Init.prototype = {
		
		//循环操作当前this对象下的每一个元素（this对象是一个类数组）
		each : function(callback){
			for(var i = 0; i < this.length ; i++){
				callback.call(this[i],i,this[i]);
			}
		},

		//增加class
		addClass : function(name){
			this.each(function(i,e){
				if($(e).hasClass(name) == false){
					e.className += " " + name;
				}
			})
		},

		//检索是否有需要的class
		hasClass : function(name){
			var arr = this[0].className.split(" ");
			var isExist = false;

			for(var i = 0; i < arr.length; i++){
				if(arr[i] == name){
					isExist = true;
				}
			}
			return isExist;
		},

		//删除class
		removeClass : function(name){
			
			// 达枝方法
			this.each(function(i,e){
					if($(e).hasClass(name)){
						var className = e.className;
						var newClass = className.replace(name,"");
						e.className = newClass;
					}			
			})

			//正则方法
			// this.each(function(i,e){
			// 		if($(e).hasClass(name)){
			// 			var className = " " + e.className + " ";
			// 			if(reg.test(className)){
			// 				var new_name = className.replace(" " + name, "");
			// 				e.className = new_name;
			// 			}	
			// 		}
			// })
		},
		
		//把子节点插入父节点的最后	
		append : function(element){
			this.each(function(i,e){
				if(typeof element == "string"){
					e.insertAdjacentHTML("beforeend",element);
				}else if(e.nodeType == 1){
					var elem = element.cloneNode(true);
					e.appendChild(elem);
				}
			})
		},


		//把子节点插入父节点的最后
		appendTo : function(parent){
			var self = this;

			//用instanceof判断传过来的parent是不是$()构造出来的
			if(parent instanceof Init){
				parent.each(function(i,e){
					if(e.nodeType == 1){
						var elem = self[0].cloneNode(true);
						e.insertAdjacentElement("beforeend",elem);
					}
				})
			}
		},
		//把子节点插入父节点里的第一
		prepend : function(parent){        
			this.each(function(i,e){
				if(typeof element == "string"){
					e.insertAdjacentHTML("afterbegin",element);
				}else if(e.nodeType == 1){
					var elem = element.cloneNode(true);
					e.insertAdjacentElement("afterbegin",elem);
				}
			})
		},

		//把子节点插入父节点里的第一
		prependTo : function(parent){
			var self = this;
			if(parent instanceof Init){
				parent.each(function(i,e){
					if(e.nodeType == 1){
						var elem = self[0].cloneNode(true);
						e.insertAdjacentElement("afterbegin",elem);
					}
				})
			}
		},

						//css
						
		//样式
		css : function(property,value){
			var arg_len = arguments.length;//用arguments来获取传过来的所参数

			//获取css
			if(arg_len == 1 && typeof property == "string"){
				return getStyle(this[0],property);
			}

			//设置css属性
			if(arg_len == 2 && typeof property == "string"){
				if(typeof value == "number"){
					value = addPx(property,value);
				}
				this[0].style[property] = value;			
			}

			//设置多个css
			if(typeof property == "object"){
				var value;
				/*var property = {"height":100,"background":"orange"}
				property["height"]
		*/
				// 用key in 循环对象
				for(var key in property){
					if(typeof property[key] == "number"){
						value = addPx(key,property[key]); //key属性名 property[key]属性值
					}else{
						value = property[key]; //"orange"
					}

					this[0].style[key] = value;//$("#id").style["background"] = "orange";
												//$("#id").style.backfround = "orange";
				}
			}
		},

		//属性
		attr : function(property,value){
			var arg_len = arguments.length;

			//获取属性
			if(arg_len == 1 && typeof property == "string"){
				return this[0].getAttribute(property);
			}

			//设置
			if(arg_len == 2 && typeof property == "string"){
				this[0].setAttribute(property,value);
			}

			//设置多个
			if(typeof property == "object"){
				for(var key in property){
					this[0].setAttribute(key,property[key]);
				}
			}
		},

		//找到同级
		siblings : function(){
			var newDom = $("");
			var all = this[0].parentNode.children;//获取所有同级
			var index = 0;
	
			for(var i = 0; i < all.length; i++){
				if(all[i] != this[0]){ 
					newDom[index] = all[i]; //把all[i]变成对象
					index++;

				}
			}
			newDom.length = index; //赋予length长度

			return newDom;
		},
<div name="remove" id="remove"></div>
		//自身删除
		//并且返回自身
		remove : function(){
			this.each(function(i,e){
				var parent = e.parentNode; //找到父级
				parent.removeChild(e);    //从父级删除自己
			})
			return this;
		},

		//找到下一个元素节点
		next : function(){
			var that = this[0];

			function aaa(){
				var bro = that.nextSibling;
				if(bro.nodeType == 1){       //= 1; 元素节点 	
					return bro;	
				}else if(bro.nodeType == 3){    //= 3; 文本节点		
					that = bro;		
					return aaa();
				}else if(bor.nodeType == null){
					return null;
				}
			}			
			return aaa();		
		},


	    //找到上一个元素节点
		prev : function(){
			var that = this[0];

			function bbb(){
				var pr = that.previousSbiling;

				if(pr.nodeType == 3){
					that = pr;
					return bbb();
				}else if(pr.nodeType == 1){
					return pr.
				}else if(pr.nodeType == null){
					return null;
				}
			}
			return bbb();
		},
	
	
		//找到上一个元素
		/*next : function(){
			
			var arr = $("");
			var parent = this[0].parentNode;
			var childs = parent.children;
			for(var i = 0; i<childs.length;i++){
					if(this[0] == childs[i] && i < childs.length - 1){
						arr.push(childs[(i+1)])
					}
				}
			return arr;
		},

		//找到下一个元素
		prev : function(){
			
			var arr = $("");
			var parent = this[0].parentNode;
			var childs = parent.children;
			for(var i = 0; i<childs.length;i++){
					if(this[0] == childs[i] && i > 0){
						arr.push(childs[(i-1)])
					}
				}
			return arr;
		}, */

		
		//事件绑定
		on : function(type,fn){
			this.each(function(i,e){

				//事件名的唯一
				only++;
				var name = "handle" + only;

				//把事件和事件名添加到events对象
				events[name] = fn;
				
				//绑定事件
				addEvent(e,type,fn);

				if(!e.eventName){
					e.eventName = {};
				}

				if(!e.eventName[type]){
					e.eventName[type] = [];
				}

				/*把事件名称添加到该元素的eventName属性上
					eventName是一个对象
				
					eventName = {
						"click" : [handle1];
					}*/

				e.eventName[type].push(name);
			})
		},

		//事件删除
		off : function(){
			this.each(function(i,e){
				if(e.eventName){

					//找到该元素下要删除的事件类型的事件名
					var arr  = e.eventName[type];
					for(var i = 0; i < arr.length; i++){

						//匹配events对象下的函数
						removeEvent(e,type,events[arr[i]]);
					}
				}
			})
		},


		//把Dom对象转换成类数组
		push: [].push,
		sort: [].sort,
		splice: [].splice
	
	}

	function Dom(selector){
		return new Init(selector);

	}

	window.$ = Dom;
	}())





















































































































































































































































































































































































































































































































































































































































































