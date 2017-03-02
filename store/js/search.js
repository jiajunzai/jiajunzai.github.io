
//取消删除搜索框内容
(function(){

	var del = document.querySelector(".delete-search");
	var input = document.querySelector(".search-input");

	del.addEventListener("touchstart",function(){
		input.value = '';
	})

}());


(function(){

	var enter = document.querySelector(".enter");
	var input = document.querySelector(".search-input");
	var list = document.querySelector(".store-list");
	var clear = document.querySelector(".clear");
	var store = []; 

	// 模拟手机点击搜索事件
	enter.addEventListener("touchstart",function(){
		setHistory();

		//重新加载整个页面window的方法
		location.reload();
	});

	// 页面一打开初始化li
	localforage.getItem('keystore').then(function(value){
		//value 就是keystore里面的一个数组；
		//如果存在的话就执行这个函数
		value && createHistory(value);
	});

	// 设置localstorage
	function setHistory(){

		//获取搜索框的值
		var key = input.value;

		//获取localstorage下面是插件的获取结构
		//localforage.getItem('自定义名', function(err, value){ }
		localforage.getItem('keystore', function(err, value){
		   
			if(value == null){

				store.push(key);

				//下面是插件的设置的结构
				//localforage.setItem('自定义名', 数组)
				localforage.setItem('keystore', store)

			}else{

				// 如果存在keystore；
				store = value;

				if(store.indexOf(key) == -1){

					store.unshift(key);

					// 如果数组长度超出，截取数组
					store.length > 5 && (store.length = 5);

					localforage.setItem('keystore', store);
				}
			}
		});	
	}

	// 创建生成li
	function createHistory(arr){

		var html = "";

		//循环传过来的参数
		arr.forEach(function(e,i){
			html += "<li>"+ e +"</li>"
		})

		list.innerHTML = html;
	}

	// 删除localstorage
	clear.addEventListener("touchstart",function(){
		localforage.clear().then(function(){
			list.innerHTML = "";

			//重新设置keystore为空，因为clear数组还有空的内容
			localforage.setItem('keystore', []);
		})
	})

}());