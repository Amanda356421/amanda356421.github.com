window.onload=function(){
	var ROW = 15,temp = [],ind=0,wbs=1,bbss=1,jsnum = 0,
		dict1 = {},dict2 = {},
		changPerson = true,
		cross,vertical,block,
		width = Math.floor((600-ROW)/ROW) + 'px',
		sence = document.getElementById('sence'),
		blocks = document.getElementsByClassName('block'),
		jushi = document.getElementsByClassName('jushi'),
		wb = document.getElementsByClassName('w-b')[0],
		bbs = document.getElementsByClassName('b-b')[0],
		exit = document.getElementsByClassName('exit')[0],
		again = document.getElementsByClassName('again')[0],
		colorWh = document.getElementsByClassName('color-white')[0],
		colorBla = document.getElementsByClassName('color-black')[0],
		back = document.getElementsByClassName('back')[0],
		alertBox = document.getElementsByClassName('alert-box')[0];
	for(var i=0;i<ROW;i++){
		cross = document.createElement('div');
		cross.setAttribute('id','cross');
		cross.style.width = '600px';
		cross.style.height =  '1px';
		cross.style.background = '#C17017';
		cross.style.position = 'absolute';
		cross.style.top = (600/ROW)/2+(600/ROW)*i+'px';
		sence.appendChild(cross);
		vertical = document.createElement('div');
		vertical.setAttribute('id','vertical');
		vertical.style.width = '1px';
		vertical.style.height =  '600px';
		vertical.style.background = '#C17017';
		vertical.style.position = 'absolute';
		vertical.style.left = (600/ROW)/2+(600/ROW)*i +'px';
		sence.appendChild(vertical);
	}
	for(var i=0;i<ROW;i++){
		for(var j=0;j<ROW;j++){
			block = document.createElement('div');
			block.setAttribute('class','block');
			block.setAttribute('id',i+'_'+j);
			block.style.width = width; 
			block.style.height = width;
			block.style.position = 'relative';
			block.style.zIndex = '3';
			sence.appendChild(block);
		}
	}
	var panDuan = function(id,dict){
		var x = Number(id.split('_')[0]),
			y = Number(id.split('_')[1]),
			tx,ty;
		var hang = 1;
		tx = x;ty = y;
		while(dict[tx+'_'+(ty+1)]){hang++;ty++;}
		tx = x;ty = y;
		while(dict[tx+'_'+(ty-1)]){hang++;ty--;}
		if(hang==5) return true;

		var lie = 1;
		tx = x;ty=y;
		while(dict[(tx-1)+'_'+ty]){lie++;tx--;}
		tx = x;ty = y;
		while(dict[(tx+1)+'_'+ty]){lie++;tx++;}
		if(lie==5) return true;

		var zx = 1;
		tx = x;ty=y;
		while(dict[(tx-1)+'_'+(ty+1)]){zx++;ty++;tx--;}
		tx = x;ty = y;
		while(dict[(tx+1)+'_'+(ty-1)]){zx++;ty--;tx++;}
		if(zx==5) return true;

		var yx = 1;
		tx = x;ty=y;
		while(dict[(tx+1)+'_'+(ty+1)]){yx++;ty++;tx++;}
		tx = x;ty = y;
		while(dict[(tx-1)+'_'+(ty-1)]){yx++;ty--;tx--;}
		if(yx==5) return true;
		return false;
	};
	colorWh.onclick = function(){
		if(temp.length>0){
			return;
		}
		changPerson = true;
		colorBla.setAttribute('class','color-black');
		colorBla.innerHTML = '';
		this.setAttribute('class','color-white curren');
		this.innerHTML = '我先来';
	};
	colorBla.onclick = function(){
		if(temp.length>0){
			return;
		}
		changPerson = false;
		colorWh.setAttribute('class','color-white chose');
		colorWh.innerHTML = '';
		this.setAttribute('class','color-black curren');
		this.innerHTML = '我先来';
	};
	
	back.onclick = function(){
		if(ind <= 0){
			con.innerHTML = ('亲,还悔?你要逆天啊!(⊙﹏⊙)');
			alertBox.style.display = 'block';
			clearAll();
			return;
		}
		blocks[temp[ind-1]].setAttribute('class','block');
		blocks[temp[ind-1]].removeAttribute('hasColor');
		ind--;
	};
	// 退出  再来
	var con = document.getElementsByClassName('con')[0];
	exit.onclick = function(){
		con.innerHTML = '亲,不再玩儿会儿吗(⊙︿⊙)???';

		exit.onclick = function(){
			window.close();
		}
		again.onclick = function(){
			clearAll();
			alertBox.style.display = 'none';
		};
	};
	again.onclick = function(){
		clearAll();
		alertBox.style.display = 'none';
	};
	var clearAll = function(){
		
		for(var i=0;i<jushi.length;i++){
			jushi[i].innerHTML = jsnum;
		}
		for(var i=0;i<temp.length;i++){
			var hy = Number(temp[i]);
			blocks[hy].setAttribute('class','block');
			blocks[hy].removeAttribute('hasColor');
		}
		temp = [];ind=0;dict2={};dict1={};
		wbs=1;bbss=1;
		wb.innerHTML = 0;
		bbs.innerHTML = 0;
		return;
	};
	for(var i=0;i<blocks.length;i++){
		blocks[i].setAttribute('index',i);
		blocks[i].onclick = function(){
			if( this.hasAttribute('hasColor') ){return;}
			var id = this.getAttribute('id');
			temp[ind++] = this.getAttribute('index');
			if(changPerson){
				this.setAttribute('class','block baihas');
				changPerson = false;
				dict1[id] = true;
				wb.innerHTML = wbs++;
				if( panDuan(id,dict1) ){
					jsnum++;	
					alertBox.style.display = 'block';		
					clearAll();
				}
			}else{
				this.setAttribute('class','block heihas');
				changPerson = true;
				dict2[id]=true;
				bbs.innerHTML = bbss++;
				if(panDuan(id,dict2)){
					jsnum++;
					alertBox.style.display = 'block';
					clearAll();
				}
			}
			this.setAttribute('hasColor','true');
		};
	}
	document.onmousedown = function(e){
		e.preventDefault();
	}
};