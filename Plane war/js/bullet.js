/*
	子弹构造函数
*/
function Bullet(l,t,speedx){
	this.l = l;
	this.t = t;
	this.self = null;
	this.top = 0;
	this.left = 0;
	this.speedY = 5;//速度
	this.speedx = speedx || 0;//向右移动的速度
	this.id = '';//子弹编号
}
Bullet.prototype = {
	constructor: Bullet,
	init: function(){
		var img = document.createElement('img');
		img.src = 'image/bullet1.png';
		Engine.game.appendChild(img);

		this.self = img;

		//处理位置
		var _this = this;
		img.onload = function(){
			_this.left = _this.l - img.offsetWidth/2;
			_this.top  = _this.t - img.offsetHeight;
			img.style.left = _this.left + 'px';
			img.style.top = _this.top + 'px';
		}

		//生成子弹编号，并装入引擎的bullet中
		this.id = Math.random();
		Engine.bullet[this.id] = this;
	},
	move: function(){
		this.top -= this.speedY;
		this.left += this.speedx;
		this.self.style.top = this.top + 'px';
		this.self.style.left = this.left + 'px';

		var l = this.left < - this.self.offsetWidth,
			r = this.right > Engine.game.offsetWidth + this.self.offsetWidth,
			t = this.top <= -this.self.offsetHeight;
		//越界判断
		if(l || r || t){
			this.destroy();
		}
		if(Engine.isOver) return;
		//是否与敌机相撞
		for(var i in Engine.enemy){
			if( Engine.isCompact( this.self,Engine.enemy[i].self)  && Engine.enemy[i].type==0){
				//子弹销毁
				this.destroy();

				Engine.enemy[i].blood--;
				Engine.enemy[i].showBlood();
				if(Engine.enemy[i].blood <= 0 && Engine.enemy[i].type == 0){
					//统计得分
					Engine.updateScore(Engine.enemy[i].score);
					//敌机销毁
					Engine.enemy[i].destroy();
				}
			}
		}
		//判断是否与boss撞击
		if(Engine.bossStatus && Engine.isCompact( this.self,Boss.self) ){
			this.destroy();
			Boss.hurt();
		}
	},
	//销毁
	destroy: function(){
		//从页面消失
		this.self.remove();
		//从内存消失
		delete Engine.bullet[this.id];
	}
};