/*
	Boss
*/
var Boss = {
	left: 80,
	top: 60,
	blood: 160,
	self: document.querySelector('.boss'),
	bloodBox: document.querySelector('.boss .boss-blood'),
	init: function(){
		this.self.style.display = 'block';
		this.move();
	},
	//发火炮
	shoot: function(){
		for(var i=0; i<5; i++){
			var img = document.createElement('img');
			img.src="image/fire.png";
			img.className = 'fire';
			Engine.game.appendChild(img);
			
			this.bulletMove(img,(i-2));
		}
	},
	//火炮移动
	bulletMove: function(img,speed){
		var l = this.left + 80;
		var t = this.top + this.self.offsetHeight;
		var _this = this;
		var timer = setInterval(function(){
			l += speed,
			t += 2;
			img.style.left = l + 'px';
			img.style.top = t + 'px';
			if(l<0 || l > 340 || t > 568 ){
				clearInterval(timer);
				img.remove();
			}
			if( Engine.isCompact(img , Hero.self) && !Engine.isOver){
				if(Hero.protectTime <=0 ){
					Hero.die();
				}
				img.remove();
			}
		},13);
	},
	//boss移动
	move: function(){
		var left = parseInt( Math.random()*5) * 40;
		this.left = left;
		var _this = this;
		stop(this.self);
		animate(this.self,{
			left: left
		},1000,'',function(){
			_this.shoot();
			_this.moveTimer = setTimeout(function(){
				_this.move();
			},1100);
		});
	},
	//被击中
	hurt: function(){
		this.blood -= 2;
		this.bloodBox.style.width = this.blood + 'px';
		if(this.blood <= 0){
			this.destroy();
		}
	},
	destroy: function(){
		this.self.remove();
		clearInterval( this.moveTimer );
		
		Engine.gameOver();
	}
};