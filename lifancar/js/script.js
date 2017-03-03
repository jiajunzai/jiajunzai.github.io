//返回前缀
var prefix = function(){
	var div = document.createElement("div");
	var cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
	div.style.cssText = cssText;
	var style = div.style;
	if(style.webkitTransition){
		return "webkit";
	}
	if(style.MozTransition){
		return "moz";
	}
	if(style.oTransition){
		return "o";
	}
	if(style.msTransition){
		return "ms";
	}
	return " ";
}();

//大的轮播图
(function(){

	var slide = document.getElementsByClassName("slide")[0];
	var ul = slide.getElementsByTagName("ul")[0];
	var btn1 = slide.getElementsByClassName("btn1")[0];
	var btn2 = slide.getElementsByClassName("btn2")[0];
	var ali = ul.getElementsByTagName("li");
	var ali_w = ali[0].offsetWidth;
	var len = ali.length;
	var index = 0;
	var finish = false;
	var transitionend = prefix + "TransitionEnd";  //用来绑定transition事件
	var timer = null;
	
	//设置ul的宽度
	ul.style.width = len * ali_w + "px";

	//执行下一张事件
	btn2.addEventListener("click",function(){
		next();
	});

	//执行上一张事件
	btn1.addEventListener("click",function(){
		prev();
	});

	//自动执行滚动
	function run(){
		timer = setTimeout(function(){
			next();
			run();
		},2000);
	}
	run();

	//鼠标移入
	slide.addEventListener("mouseover",function(){
		clearTimeout(timer);
	});

	//鼠标移出
	slide.addEventListener("mouseout",function(){
		run();
	});

	// 下一张事件
	function next(){
		if(!finish){
			finish = true;
			index++;
			if(index == len){
				index = 0;
			}

			ul.style.transform = "translateX(-" + (ali_w * index) +"px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			})
		}
	}

	//上一张事件
	function prev(){
		if(!finish){
			finish = true;
			index--;
			if(index < 0){
				index = len -1; 
			}
			ul.style.transform = "translateX(-" + (ali_w * index) +"px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			})
		}
	}
}());

//第二个轮播图
(function(){
	var slide = document.getElementsByClassName("box1-3show")[0];
	var ul = slide.getElementsByClassName("box1-3ul2")[0];
	var ali = ul.getElementsByTagName("li");
	var btns = document.getElementsByClassName("box1-3btn")[0];
	var btn1 = btns.getElementsByTagName("span")[0];	
	var btn2 = btns.getElementsByTagName("span")[1];
	var ali_w = ali[0].offsetWidth;
	var index = 0;
	var len = ali.length;
	var finish = false;
	var transitionend = prefix + "TransitionEnd";
	var timer = true;

	ul.style.width = len * ali_w + "px";

	btn2.addEventListener("click",function(){
		next();
	});
	btn1.addEventListener("click",function(){
		prev();
	});
	function run(){
		timer = setTimeout(function(){
			next();
			run();
		},2000);
	}
	run();

	ul.addEventListener("mouseover",function(){
		clearTimeout(timer);
	});
	ul.addEventListener("mouseout",function(){
		run();
	});

	function next(){
		if(!finish){
			finish = true;
			index++;
			if(index == len){
				index = 0;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) +"px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			})
		}
	}

	function prev(){
		if(!finish){
			finish = true;
			index--;
			if(index < 0){
				index = len - 1;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) + "px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			});
		}
	}

}());

// 引擎轮播图
(function(){
	var slide = document.getElementsByClassName("box2-5-2")[0];
	var ul = slide.getElementsByTagName("ul")[0];
	var ali = ul.getElementsByTagName("li");
	var btn2 = document.getElementsByClassName("box2-5-2btnLeft")[0];
	var btn1 = document.getElementsByClassName("box2-5-2btnRight")[0];
	var transitionend = prefix + "TransitionEnd";
	var finish = false;
	var index = 0; 
	var ali_w = ali[0].offsetWidth;
	var len = ali.length;
	var timer = null;
	
	ul.style.width = len * ali_w + "px";

	btn1.addEventListener("click",function(){
		next();
	});
	btn2.addEventListener("click",function(){
		prev();
	});

	function run(){
		timer = setTimeout(function(){
			next();
			run();
		},2000)
	}
	run();

	ul.addEventListener("mouseover",function(){
		clearTimeout(timer);
	});
	ul.addEventListener("mouseout",function(){
		run();
	});
	
	function next(){
		if(!finish){
			finish = true;
			index++;
			if(index == len){
				index = 0;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) + "px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			});
		}
	}
	function prev(){
		if(!finish){
			finish = true;
			index--;
			if(index < 0){
				index = len-1;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) + "px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			});
		}
	}
}());

//科技轮播图
(function(){
	var slide = document.getElementsByClassName("box3-content-2")[0];
	var ul = slide.getElementsByTagName("ul")[0];
	var ali = ul.getElementsByTagName("li");
	var btns = document.getElementsByClassName("box3-contentBtn")[0];
	var btn2 = btns.getElementsByTagName("span")[0];
	var btn1 = btns.getElementsByTagName("span")[1];
	var len = ali.length;
	var ali_w = ali[0].offsetWidth;
	var index = 0;
	var finish = false;
	var timer = null;
	var transitionend = prefix + "TransitionEnd";

	ul.style.width = ali_w * len + "px";

	btn1.addEventListener("click",function(){
		next();
	});	
	btn2.addEventListener("click",function(){
		prev();
	});

	function run(){
		timer = setTimeout(function(){
			next();
			run();
		},2000)
	}
	run();

	ul.addEventListener("mouseover",function(){
		clearTimeout(timer);
	});
	ul.addEventListener("mouseout",function(){
		run();
	});

	function next(){
		if(!finish){
			finish = true;
			index++;
			if(index == len){
			 	index = 0;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) + "px)";
			ul.addEventListener("transitionend",function(){				
				finish = false;
			});
		}
	}
	function prev(){
		if(!finish){
			finish = true;
			index--;
			if(index < 0){
				index =len-1;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) + "px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			});
		}
	}
}());

//体验轮播图
(function(){
	var slide = document.getElementsByClassName("box4-img")[0];
	var ul = slide.getElementsByTagName("ul")[0];
	var ali = ul.getElementsByTagName("li");
	var btns = document.getElementsByClassName("box4ImgBtn")[0];
	var btn2 = btns.getElementsByTagName("span")[0];
	var btn1 = btns.getElementsByTagName("span")[1];
	var ali_w = ali[0].offsetWidth;
	var len = ali.length;
	var index = 0;
	var finish = false;
	var timer = null;
	var transitionend = prefix + "TransitionEnd";

	ul.style.width = ali_w * len + "px";

	btn1.addEventListener("click",function(){
		next();
	});

	btn2.addEventListener("click",function(){
		prev();
	});

	function run(){
		timer = setTimeout(function(){
			next();
			run();
		},2000);
	}
	run();

	ul.addEventListener("mouseover",function(){
		clearTimeout(timer);
	});
	ul.addEventListener("mouseout",function(){
		run();
	});

	function next(){
		if(!finish){
			finish = true;
			index++;
			if(index == len){
				index = 0;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) +"px)";
			ul.addEventListener("transitionend",function(){
				finish = false;
			});
		}
	}

	function prev(){
		if(!finish){
			finish = true;
			index--;
			if(index < 0){
				index = len-1;
			}
			ul.style.transform = "translateX(-" + (ali_w * index) +"px)"
			ul.addEventListener("transitionend",function(){
				finish = false;
			});
		}
	}

}());