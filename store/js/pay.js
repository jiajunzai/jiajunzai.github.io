(function(){

	var way_list = document.getElementsByClassName("way_list")[0];
	var lis = way_list.getElementsByTagName("li");
	var btns = way_list.getElementsByTagName("i");
	var last = btns[btns.length-1];
	var last2 = lis[btns.length-1];
	
	for(var i = 0; i < btns.length; i++){
		btns[i].index = i;
		btns[i].addEventListener("touchstart",function(){
			if(last){
				last.classList.remove("active");
			}
			this.classList.add("active");
			last = this;

			if(last2){
				last2.classList.remove("active");
			}
			lis[this.index].classList.add("active");
			last2 = lis[this.index];
		});
	}
}());