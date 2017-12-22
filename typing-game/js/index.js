window.onload = function(){
	function game(){
		this.clientw = document.documentElement.clientWidth;
		this.clienth = document.documentElement.clientHeight-130;
		this.letterArr =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; 
		// this.letterArr = ["a.jpg","b.jpg","c.jpg","d.jpg","e.jpg","f.jpg","g.jpg","h.jpg","i.jpg","j.jpg","k.jpg","l.jpg"];
		this.letterLen = 3;
		this.speed =3;
		this.spans =[];
		this.die = 50;
		this.sore = 0;
		//this.currSore = 0;
		//this.num =10;
		//this.currArr =[];
		//this.currPosArr=[];
		this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
		this.new_gk=document.getElementsByClassName("new_gk")[0];
 		this.dieEle=document.getElementsByClassName("shengming")[0].getElementsByTagName("span")[1];
		this.width = this.clientw/this.letterLen/2;
		this.step=10;
 		this.aa=1;
		this.dieEle.innerHTML=this.die;
	}
	game.prototype={
		play:function(){
			//将字母显示到body里面;
			this.getLetter(this.letterLen);
			this.move();
			this.key();
		},
		key:function(){
			var that = this;
			document.onkeydown = function(e){
				var ev = e||window.event;
				var code = String.fromCharCode(ev.keyCode);
				for(var i=0;i<that.spans.length;i++){
					if(that.spans[i].innerHTML == code){
						document.body.removeChild(that.spans[i]);
						that.spans.splice(i,1);
						that.getLetter(1);
						that.sore++;
						that.soreEle.innerHTML=that.sore;
						if(that.sore%that.step==0){
	                      that.aa++;
	                      that.new_gk.innerHTML =("第"+that.aa+"关");
	                      that.next();
	                  }
					}
				}
			}
		},
		next:function(){
	      clearInterval(this.t);
	      for(var i=0;i<this.spans.length;i++){
	         document.body.removeChild(this.spans[i]);
	      }
	        this.spans=[];
	        this.speed = this.aa+2;
	        this.letterLen = this.aa+2;

	        this.play();


	    },
		move:function(){
			var that = this;
			this.t =setInterval(function(){
				for(var i=0;i<that.spans.length;i++){
					var top = that.spans[i].offsetTop+that.speed;
					that.spans[i].style.top = top+"px";
					if(top>that.clienth){
						document.body.removeChild(that.spans[i]);
						that.spans.splice(i,1);
						that.getLetter(1);
						that.die--;
						that.dieEle.innerHTML=that.die;
						if(that.die == 0){
							alert('game over');
							location.reload();
						}
					}

				}
			},100)
		},
		getLetter:function(num){
			//先获取到指定的字母;
			var arr=this.getRand(num);
	        var posArr=[];
	        var eleArr=[];
	        for(var i=0;i<arr.length;i++){
	            var span=document.createElement("span");
	            span.setAttribute("class","span-name span-"+arr[i]+"");
	            span.innerHTML=arr[i]


	            var x=(100+(this.clientw-200)*Math.random());
	            var y=(100*Math.random());
	            var width=this.width;
	            // while (this.check1(posArr,x,width)){
	            //    x=(50+(this.clientw-200)*Math.random());
	            // }
	             posArr.push({minx:x,maxx:x+width});
	            span.style.cssText="position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;font-size:0px;";
	            document.body.appendChild(span);
	           // eleArr.push(span);
	            this.spans.push(span);
	        }
       	// return eleArr;
		},
		getRand:function(num){
			var arr =[];
			for(var i=0;i<num;i++){
				var rand = Math.floor(this.letterArr.length*Math.random());
				while(this.check(arr,this.letterArr[rand])){
					rand = Math.floor(this.letterArr.length*Math.random());
				}
				arr.push(this.letterArr[rand]);
			}
			return arr;
			

		},
		check:function(arr,val){
			for(var i=0;i<arr.length;i++){
				if(arr[i] ==val){
					return true;
				}
			}
			return false;
		},
		check1:function(arr,x,width){
			for(var i=0;i<arr.length;i++){
				if(!(x+width<arr[i].minx||arr[i].maxx<x)){
					return true;
				}
			}
			return false;
		}
	};
	var games = new game();
	games.play();
 	var guanqia=document.getElementsByClassName("guanqia")[0];
 	var guanqia_nandu = document.getElementsByClassName("guanqia_nandu")[0];
 	var choose = guanqia_nandu.getElementsByTagName('span');
 	guanqia.onclick = function(){
	      clearInterval(games.t); 		
 		  this.style.display ='none';
 		  guanqia_nandu.style.display = 'block';
 	};
 	for(var i=0;i<choose.length;i++){
 		choose[i].onclick = function(){
 			guanqia_nandu.style.display ='none';
 		  	guanqia.style.display = 'block';
 		  	games.aa = Number(this.innerHTML);
			console.log(games.aa);
 		  	games.new_gk.innerHTML =("第"+games.aa+"关") ;
			for(var i=0;i<games.spans.length;i++){
				document.body.removeChild(games.spans[i]);
			}
			console.log(games.spans,games.letterLen);
			games.spans=[];
			games.speed = games.aa+2;
			games.letterLen = games.aa+2;

			games.play();
 		  	
 		}
 	}

};