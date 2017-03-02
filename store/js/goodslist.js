//ȡ������������
(function(){

	var del =document.querySelector(".delete-search");
	var input = document.querySelector(".search-input");

	del.addEventListener("touchstart",function(){
		input.value = " ";
	}); 

}());


//��������jq����
// ��Ʒ�б�����޼���
(function(){

	var content = $(".content");
	var winh = $(window).height();
	var ul = $("#like-ul");

	/*
	 * describe: �������ص��ĵ���Ƭ�����Ҳ��뵽content
	 * arguments : content , Ҫ���뵽������
	 * return �����ز����div jq����
	*/

	function appendLoading(content){

		var html = "";
		var wrap;

		html = '<div class="loading"><img src="img/icon_loading.png"><span>���ڼ���</span></div>';

		wrap = $(html)
		
		$(content).append(wrap);

		return wrap; 	

	}

	var loading = appendLoading(content)[0];
	var loadTop = 0;
	var isFinish = false;

	$(window).on("scroll",function(){

		//��ȡ����ӵ�div����Ļ�����ĸ߶�
		loadTop = loading.getBoundingClientRect().top;

			if(loadTop < winh && !isFinish){
				ajaxLoad();
				isFinish = true;
			}
	})


	function ajaxLoad(){
		$.ajax({
		  type: "GET",
		  url: "goods.json",
		  //data: { name: "John", location: "Boston"}
		}).done(function( obj ){

			var html = "";

			for(var key in obj){
				html += '<li><a href="#"><img src=" '+ obj[key]["img"] +' "><p>'+ obj[key]["describe"] +'</p><span><i>��</i>'+ obj[key]["price"] +'</span><s>��'+ obj[key]["s"] +'</s></a></li>';	
			}

			// setTimeoutΪ�˲������ã�������������Ҫ
			setTimeout(function(){
				ul.append(html)
				isFinish = false;
			},1000)
		});
	}

}());


(function(){
	//�۸����ʾ����
	$(".price").on("touchstart",function(){
		$(".price-layer").toggle();
	});

	
	//�ص�����
	$(".to-top").on("touchstart",function(){
		$('body,html').animate({ scrollTop: 0 }, 500); 
	});
}());


!function(){
	var select = $(".select");
	var aside = $(".side");
	var body = $("body");

	select.on("touchstart",function(){
		aside.css({
			left : 0
		});
		body.toggleClass("overflow");
	});

	//����side
	function sideHidden(){
		body.toggleClass("overflow");
		aside.css({
			left : "100%"
		});
	}

	var curX;
	var tarX;
	var sidew = $(".side").width();
	var smain = $(".side-main").width();
	var figure = sidew - smain;

	aside.on("touchstart",function(e){

		//��ȡ��һ����ָ���¼�����changedTouches[0]
		//��ȡ��һ����ָ��x��
		//console.log(e.changedTouches[0]);
		
		curX = e.changedTouches[0].pageX;

		//�󶨵Ĵ��ƶ�����
		aside.on("touchmove",function(e){
			tarX = e.changedTouches[0].pageX;

			//�ж�x���ƶ�������30����
			if(tarX - curX > 30){
				sideHidden();
			}
		});

		//�����͸��ɸѡ����ʧ
		// if(figure > curX){
		// 	sideHidden();
		// }
	});
}();



// ɸѡ�ĵ���¼�
(function(){
	var wrap = document.querySelector(".side-main");
	var btns = wrap.querySelectorAll(".ctrl");
	var shows = wrap.querySelectorAll(".con");
	var time = document.querySelector(".time-con");
	var as = time.querySelectorAll("a");
	
	
	for(var i = 0; i < btns.length; i++){
		btns[i].index = i;
		btns[i].toggle = true;
		btns[i].addEventListener("touchstart",function(){

			this.style.borderBottom = "none";
			if(this.toggle){
				shows[this.index].style.display = "block";
				this.classList.add("show");
				this.toggle = false;
			}else{
				shows[this.index].style.display = "none";
				this.classList.remove("show");
				this.toggle = true;
			}

			for(var j = 0; j < btns.length; j++){
				if(this.index != j){
					btns[j].toggle = true;
					shows[j].style.display = "none";
					btns[j].classList.remove("show");
				}
			}
		});
	}

	for(var i = 0; i < as.length; i++){
		var off = true;		
		
		as[i].addEventListener("touchstart",function(){
			if(off){
				this.classList.add("active");
				off = false;
				
			}else{
				this.classList.remove("active");
				off = true;
			}		
		});

	}





}());