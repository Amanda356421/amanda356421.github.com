var Hero = {
	self: null,
	left: 0,
	top: 0,
	life: 3,
	allHeart: document.querySelectorAll('.life img'),
	imgs: ['image/hero.gif','image/hero-bang.gif'],
	proTimer: null,//受保护时间定时器,
	protectTime: 0,//受保护时间
	ufoNum: 0,//发射散弹次数
	init: function(){
		var img = document.createElement('img');
		img.src = this.imgs[0];
		img.className = "hero";
		Engine.game.appendChild(img);

		this.self = img;
		//处理位置
		var _this = this;
		img.onload = function(){
			_this.left = (Engine.game.offsetWidth - img.offsetWidth)/2;
			_this.top  = Engine.game.offsetHeight - img.offsetHeight;
			img.style.left = _this.left + 'px';
			img.style.top = _this.top + 'px';

			//添加移动
			_this.move();
			//发射子弹
			_this.shoot();
		}
	},
	//飞机移动
	move: function(){
		var _this = this;
		document.onmousemove = function(e){
			e = e || window.event;
			// offsetLeft  offsetTop  元素距离父元素左边缘和上边缘的位置
			var l = e.clientX - Engine.game.offsetLeft - _this.self.offsetWidth/2;
			var t = e.clientY - Engine.game.offsetTop - _this.self.offsetHeight/2;

			//获取飞机最大left和最大top值
			var lmax = Engine.game.offsetWidth - _this.self.offsetWidth;
			var bmax = Engine.game.offsetHeight - _this.self.offsetHeight;

			//边界处理
			l = l < 0 ? 0 : (l > lmax ? lmax : l);
			t = t < 0 ? 0 : (t > bmax ? bmax : t);

			_this.self.style.left = l + 'px';
			_this.self.style.top = t + 'px';

			//更新 left  top
			_this.left  =l;
			_this.top = t;
		}
	},
	//飞机发子弹
	shoot: function(){
		var _this = this;
		//每隔100毫秒发一次子弹
		this.shootTimer = setInterval(function(){
			var l = _this.left + _this.self.offsetWidth/2;
			new Bullet(l,_this.top).init();
		},350);
		
	},
	bang: function(){
		var img  = document.createElement('img');
		img.src = this.imgs[1];
		img.style.left = this.left + 'px';
		img.style.top = this.top  + 'px';
		Engine.game.appendChild(img);
		setTimeout(function(){
			img.remove();
		},500);
	},
	die: function(){
		this.life--;
		this.allHeart[0].remove();
		this.allHeart = document.querySelectorAll('.life img');
		if(this.life <= 0){
			this.destroy();
		}
	},
	destroy: function(){
		//从页面销毁
		this.self.remove();
		//爆炸
		this.bang();
		//停止发射子弹
		clearInterval(this.shootTimer);
		//游戏结束
		Engine.gameOver();
		//从内存中销毁
		//delete Hero;
	},
	protect: function(){
		this.protectTime += 3000;
		this.self.className = 'protect';
		var _this = this;
		//判断是否已经在计时
		if(!this.proTimer){
			this.proTimer = setInterval(function(){
				_this.protectTime -= 100;
				if(_this.protectTime <= 0) {
					clearInterval(_this.proTimer);
					_this.proTimer = null;
					_this.self.className = '';
				}
			},100);
		}
	},
	//散弹发射
	shootStrong: function(){
		this.ufoNum += 3;
		var _this = this;
		if(!this.ufoTimer){
			this.ufoTimer = setInterval(function(){
				_this.ufoNum--;
				for(var i=0; i<10; i++){
					var l = _this.left + _this.self.offsetWidth/2;
					new BulletStrong(l,_this.top,-5+i).init();
				}
				if(_this.ufoNum <= 0){
					clearInterval(_this.ufoTimer);
					_this.ufoTimer = null;
				}
			},300);
		}
		
	}
};