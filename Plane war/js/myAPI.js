
/*
	获取元素的样式
*/
function css(elem,type){
	//如果浏览器支持 getComputedStyle，使用getComputedStyle获取
	if(window.getComputedStyle){
		return window.getComputedStyle(elem)[type];
	}
	return elem.currentStyle[type];
}

/*
	show，用于显示某个元素
*/
function show(elem){
	elem.style.display = 'block';
}

/*
	hide，用于隐藏某个元素
*/
function hide(elem){
	elem.style.display = 'none';
}

/**
	next  查找元素的后一个兄弟元素
	@param
		elem  元素
*/
function next(elem){
	//判断是否有后一个节点
	if(!elem.nextSibling) return null;
	//判断是否为元素节点（节点类型为1 代表是元素节点）
	if(elem.nextSibling.nodeType == 1)  return elem.nextSibling;
	//继续往后找
	return next(elem.nextSibling);
}


/**

*/
function preventDefault(e){
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

/**
	事件绑定
	@param
		elem  元素
		type  事件类型
		fn    处理函数
*/
function addEventListener(elem,type,fn){
	//判断元素是否支持  addEventListener
	if(elem.addEventListener){
		elem.addEventListener(type,fn);
	}else{
		elem.attachEvent('on'+type,fn);
	}
}

/**
	给一个或者多个元素添加class
*/
function addClass(elem,classN){
	//做兼容  把单个元素转化为数组（可遍历）
	elem = (elem.length == undefined) ? [elem] : elem;
	
	var reg = new RegExp('(^|\\s)' + classN + '(\\s|$)');
	//循环  给每个元素添加class
	for(var i=elem.length-1; i>=0; i--){
		if(!reg.test( elem[i].className) ){
			elem[i].className += ' ' + classN;
		}
	}
}

/**
	去除元素的class
*/
function removeClass(elem,classN){
	//做兼容  把单个元素转化为数组（可遍历）
	elem = (elem.length == undefined) ? [elem] : elem;

	var reg = new RegExp('(^|\\s)' + classN + '(\\s|$)');

	//循环
	for(var i=elem.length-1; i>=0; i--){
		elem[i].className = elem[i].className.replace(reg,' ');
	}
}

/**
	运动函数

	@param
		elem  元素
		json  需要改变的样式集合
		time  运动时间
		type  运动类型
		fn    运动完成需要做的事情

	更改说明：
		1、可以同时改变多个属性

	{
		width: 500,
		height: 300
	}

	{
		width: 1,
		height: 2
	}

*/
function animate(elem,json,time,type,fn){
	time = time || 500;
	type = type || 'linear';
	elem.timer = {
		length: 0
	};
	//console.log(timer);
	for(let style in json){

		//获取初值
		let start = parseFloat( css(elem,style) ) || 0;
		//变化量
		let c = parseFloat( json[style] ) - start;

		//运动开始时的时间
		let startTime = new Date();

		elem.timer.length++;
		elem.timer[style] = setInterval(function(){
			//获取当前时刻
			var nowTime = new Date();
			//求出从运动开始到现在的时间
			var t = Math.min(nowTime - startTime,time);
			//通过运动曲线获取当前时刻的样式值
			var val = tween[type](t,start,c,time);
			elem.style[style] = val + (style=='opacity'?'':'px');
			//判断当前样式是否运动完成
			if(t >= time){
				clearInterval( elem.timer[style] );
				//样式运动完成，删除当前的标志
				delete elem.timer[style];
				elem.timer.length--;
				//判断是否运动结束（所有的样式运动完毕）
				if(elem.timer.length <= 0){
					fn && fn();
				}
			}
		},13);
	}
}

/**
	清除元素的动画
	@param
		elem 元素
*/
function stop(elem){
	for(var i in elem.timer){
		i != 'length' && clearInterval(elem.timer[i]);
	}
}

/* 
	运动曲线函数

	参数说明：
		t:已经运动的时间（从运动开始到现在经过的时间）
		b:初始值（start）（运动前的样式值）
		c:变化量（end-start）（终值和初值的差）
		d:持续时间（总时间）（运动时间）

	返回值：当前时间的样式值
*/
var tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	}
};