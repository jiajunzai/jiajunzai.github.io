
// 尺寸选择层
(function(){
	var btn = document.querySelector(".size");
	var show = document.querySelector(".size-tier");
	var off = show.querySelector("em");

	btn.addEventListener("touchstart",function(){	
		show.style.display = "block";
		
		size(".size-s");
		amount();
	});

	off.addEventListener("touchstart",function(){
		show.style.display = "none";
	});

 	function size(name){
 		var div = document.querySelector(name);
 		var btns = div.querySelectorAll("span");
 		
 		for(var i = 0; i < btns.length; i++){ 	
 			btns[i].off = true;
 			btns[i].index = i;
 			btns[i].addEventListener("touchstart",function(){				
 				if(this.off){ 				
 					this.classList.add("active");
 					this.off = false;				
 				}else{
 					this.classList.remove("active");
 					this.off = true;
 				}
 				for(var i = 0; i < btns.length; i++){ 	
 					if(i != this.index){
 						btns[i].classList.remove("active");
 						btns[i].off = true;
 					}
 				}
 			});	
 		}
 	}


 	function amount(){
 		var div = document.querySelector(".amount");
 		var left = div.querySelector(".L");
 		var right = div.querySelector(".R");
 		var con = div.querySelector(".content-amo");
 		var i = 1;


 		left.addEventListener("touchstart",function(){
 			if(i > 1){
 				i--;
 				con.innerHTML = i;
 			}		
 		});
 		
 		
 		right.addEventListener("touchstart",function(){
 			i++;
 			con.innerHTML = i;
 		});


 	}











}());