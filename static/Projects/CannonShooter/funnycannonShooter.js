var cx = document.querySelector("canvas").getContext("2d");
cx.canvas.width=window.innerWidth;
cx.canvas.height=window.innerHeight;


class Cannon {
	constructor (x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.spin = 0; //starts at 45 degrees, but its relative
		this.dir = -1;
	}
	drawCannon() {

		//Cannon
		//Wheel


		cx.fillStyle = "black";
		cx.beginPath();
		cx.moveTo(this.x+this.width/8,this.y+this.height/2);
		cx.quadraticCurveTo(this.x, this.y+this.height*0.8, this.x+this.width*0.3, this.y+this.height);
		
		cx.fill();
		cx.stroke();
		cx.beginPath();
		cx.moveTo(this.x+this.width/8,this.y+this.height/2);
		cx.lineTo(this.x+this.width*0.8, this.y+this.height*0.4); //cannon top tip
		cx.stroke();
		cx.lineTo(this.x+this.width*0.9, this.y+this.height*0.6); //cannon botom tip
		cx.stroke();
		cx.lineTo(this.x+this.width*0.3, this.y+this.height);
		cx.stroke();
		

		if (this.spin >= 20 || this.spin <= -70) {
			this.dir = -this.dir;
		}
		cx.translate(this.x+this.width/2, this.y+this.height/2 );
		cx.rotate(this.dir*Math.PI/180);
		cx.translate(-(this.x+this.width/2), -(this.y+this.height/2));
		console.log(this.spin);
		this.spin+=this.dir;

		cx.beginPath();

		cx.arc(this.x+this.width/2,this.y+this.height*0.8,this.width/6,0,2*Math.PI);
		cx.fillStyle = "white";
		cx.fill();		

		cx.stroke();
		
	}
	fire() {
		cannonBalls.addBall(this.x+this.width*0.85+cannonBalls.size, this.y+this.height*0.5-cannonBalls.size, cannonBalls.size);
	}
	applyRotationX(x) {
		return x+r*Math.cos(this.angle);
	}
	applyRotationY(y) {
		return y+r*Math.sin(this.angle);
	}
}

class CannonBalls {
	constructor() {
		this.arr = [];
		this.color = "black";
		this.size = 20;
	}
	addBall(x,y,radius) {
		this.arr.push(new CannonBall(x,y,radius));
	}
	draw() {
		for (let i = 0; i < this.arr.length;  i++) {
			cx.beginPath();
			console.log(this.arr[i].x + " " + this.arr[i].y + " " +  this.arr[i].rad  );
			cx.fillStyle = this.color;
			cx.arc(this.arr[i].x, this.arr[i].y, this.arr[i].rad,0,2*Math.PI);
			cx.fill();
		}
	}
	motion() {
		for (let i = 0; i < this.arr.length;  i++) {
			if (this.arr[i].isFalling) {

			}
			else {
				this.arr[i].x+=5;
			}
		}
	}
}

class CannonBall {
	constructor(x,y,radius) {
		this.x=x;
		this.y=y;
		this.rad=radius;
		this.isFalling = false;
	}
}

document.addEventListener('keydown', (e) => {
	let keyCode = e.keyCode;
	if (keyCode == 32 ) { 
		mainCannon.fire();
	}
});

var cannonBalls = new CannonBalls();

var mainCannon = new Cannon(0, cx.canvas.height-200, 200, 200);
var smallCannon = new Cannon(0, cx.canvas.height/2, 200, 200);

function draw() {
	cx.clearRect(0,0, cx.canvas.width, cx.canvas.height);

	mainCannon.drawCannon();
	cannonBalls.draw();
	cannonBalls.motion();
	requestAnimationFrame(draw);
}

draw();


//smallCannon.drawCannon();