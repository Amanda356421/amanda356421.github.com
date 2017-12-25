/*
	敌机
*/
function Enemy(blood,speed,imgs,score,type){
	this.left = 0;
	this.top = 0;
	this.blood = blood;//血量
	this.speed = speed;//速度
	this.imgs = imgs;//爆炸前和爆炸后的图片路径
	this.score = score;//死亡后得到的分数
	this.type = type || 0; //0 敌机  1盾牌  2散弹
}
Enemy.prototype = {
	constructor: Enemy,
	init: function(){
		var img = document.createElement('img');
		img.src = this.imgs[0];
		Engine.game.appendChild(img);

		this.self = img;

		//处理位置
		var _this = this;
		img.onload = function(){
			_this.left = parseInt( Math.random()*(320-img.offsetWidth) );
			_this.top  = - img.offsetHeight;
			img.style.left = _this.left + 'px';
			img.style.top = _this.top + 'px';
		}

		//生成编号，并装入引擎的enemy中
		this.id = Math.random();
		Engine.enemy[this.id] = this;
	},
	move: function(){
		this.top += this.speed;
		this.self.style.top = this.top + 'px';

		//如果存在血条，血条运动
		if(this.bloodImg){
			this.bloodImg.style.left = this.left + 'px';
			this.bloodImg.style.top = this.top + this.self.offsetHeight + 5 + 'px';
		}

		//越界判断
		if(this.top > 568+this.self.offsetHeight){
			this.destroy();
		}

		if(Engine.isOver) return;

		//判断与英雄机是否相撞
		if( Engine.isCompact( this.self , Hero.self)){
			//自己销毁
			this.destroy();
			//如果是敌机
			if(this.type == 0 && Hero.protectTime <= 0){
				//英雄机死亡
				Hero.die();
			}else if(this.type == 1){
				//英雄机处于保护状态
				Hero.protect();
			}else if(this.type == 2){
				//英雄机发射高强度子弹
				Hero.shootStrong();
			}
			
		}
	},
	bang: function(){
		if(this.imgs[1] == '') return;
		var img  = document.createElement('img');
		img.src = this.imgs[1];
		img.style.left = this.left + 'px';
		img.style.top = this.top  + 'px';
		Engine.game.appendChild(img);
		setTimeout(function(){
			img.remove();
		},500);
	},
	//销毁
	destroy: function(){
		//从页面消失
		this.self.remove();
		//血条消失
		this.bloodImg && this.bloodImg.remove();
		this.bang();

		//从内存消失
		delete Engine.enemy[this.id];
	},
	showBlood: function(){
		if(this.blood <= 0) {
			if(!this.bloodImg) return;
			this.bloodImg.remove();
			delete this.bloodImg;
			return;
		}
		if(!this.bloodImg){
			var img = document.createElement('img');
			img.src = "image/blood"+this.blood+'.png';
			img.style.left = this.left + 'px';
			img.style.top = this.top + this.self.offsetHeight + 5 + 'px';
			Engine.game.appendChild(img);
			this.bloodImg = img;
		}else{
			this.bloodImg.src = "image/blood"+this.blood+'.png';
		}
	}
};