(function(){
	var wrap = document.querySelectorAll(".wra");
	var divs = document.querySelectorAll(".top");
	var btns = document.querySelectorAll(".btn");
	for(i = 0; i < btns.length; i++){
		btns[i].index = i;	
		btns[i].addEventListener("touchstart",function(){
			for(var j = 0; j < btns.length; j++){
				divs[j].classList.remove("active");
				btns[j].classList.remove('active');
			}
			this.classList.add("active");
			divs[this.index].classList.add("active");
		});
	}		
}());
(function(){
	var rems = document.getElementsByTagName("i");
	var aTop = document.getElementsByClassName("top");
	console.log(aTop);
	for(var i=0; i<rems.length; i++){
		rems[i].index = i;
		aTop[i].index2 = i;
		rems[i].addEventListener("touchstart",function(){
			var parents = document.getElementsByClassName("wrap")[0];
			for(var j=0; j<rems.length; j++){
				if(this.index == aTop[j].index2){
					parents.removeChild(aTop[j]);
				}
			}
		});
	}
}());