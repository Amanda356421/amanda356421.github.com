/*
	所有类型的飞机
*/

function SmallEnemy(){
	// 3-5
	var s = parseInt(Math.random()*3 + 3);
	Enemy.call(this,1,s,['image/enemy1.png','image/enemy1-bang.gif'],10);
}
SmallEnemy.prototype.__proto__ = Enemy.prototype;

function MiddleEnemy(){
	// 2-4
	var s = parseInt(Math.random()*3 + 2);
	Enemy.call(this,4,s,['image/enemy2.png','image/enemy2-bang.gif'],50);
}
MiddleEnemy.prototype.__proto__ = Enemy.prototype;


function LargeEnemy(){
	// 2-3
	var s = parseInt(Math.random()*2 + 2);
	Enemy.call(this,10,s,['image/enemy3.png','image/enemy3-bang.gif'],200);
}
LargeEnemy.prototype.__proto__ = Enemy.prototype;

/*
	盾牌
*/
function Shield(){
	// 3-5
	var s = parseInt(Math.random()*3 + 3);
	Enemy.call(this,0,s,['image/shield.png',''],200,1);
}
Shield.prototype.__proto__ = Enemy.prototype;

/*
	盾牌
*/
function UFO(){
	// 3-5
	var s = parseInt(Math.random()*3 + 3);
	Enemy.call(this,0,s,['image/ufo1.png',''],200,2);
}
UFO.prototype.__proto__ = Enemy.prototype;