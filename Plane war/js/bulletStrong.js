/*
	散弹
*/
function BulletStrong(l,t,speedX){
	Bullet.call(this,l,t,speedX);
}
BulletStrong.prototype.__proto__ = Bullet.prototype;