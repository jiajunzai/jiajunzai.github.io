(function(){

	evaluate("describe-r");
	evaluate("quality-r");
	evaluate("fuwu-r");
	evaluate("wuliu-r");

	function evaluate(name){
		var wrap = document.getElementsByClassName(name)[0];
		var spans = wrap.getElementsByTagName("span");
		var num = null;

		for(var i = 0; i < spans.length; i++){
			spans[i].index = i;
			spans[i].addEventListener("touchstart",function(){

				num = this.index;
				if(spans[num].className == "active"){
					for(var j=0;j<spans.length;j++){
						spans[j].classList.remove("active");

						for (var a = 0; a<= num; a++) {
							spans[a].classList.add("active");
						}
					}
				}else{
					for (var a = 0; a<= num; a++) {
						spans[a].classList.add("active");
					}
				}

			});
		}
	}

}());