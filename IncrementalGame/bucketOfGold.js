var cx = document.querySelector("#bucketOfGold").getContext("2d");
cx.canvas.width=window.innerWidth;
cx.canvas.height=window.innerHeight;

class Item {
	constructor(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}

class Bucket extends Item{
	constructor(x,y,width,height) {
		super(x,y,width,height);
	}
	draw() {
			cx.beginPath(); //base
			cx.arc(this.x+this.width/2,this.y+this.height/2,this.width/2,0.1*Math.PI,0.9*Math.PI);
			cx.strokeStyle = "gold";
			cx.fillStyle ="#330000";
			cx.lineWidth = 30;
			cx.stroke();
			cx.fill();
		}
	}

	class Coins {
		constructor () {
			this.arr = [];
			this.coinsRemoved = 0;
		}
		add () {
			this.arr.push(new Coin(cx.canvas.width*0.45, 0, 50, 50));

		}
		hitBucket() {
			for (let i = 0; i < this.arr.length; i++) {
				if (this.arr[i].y+this.arr[i].height/2 >= bucket.y+bucket.width/4) {
					this.remove(i);
				}
			}
		}
		fall() {
			for (let i = 0; i < this.arr.length; i++) {
				this.arr[i].y+=10;
			}
		}
		remove(i) {
			this.arr.splice(i,1);
			this.coinsRemoved++;
		}
		draw() {
			for (let i = 0; i < this.arr.length; i++) {
				this.arr[i].draw();
			}
		}
		update() {
			this.fall();
			this.hitBucket();
			this.draw();
		}
	}

	class Coin extends Item{
		constructor (x,y,width, height) {
			super(x,y,width,height);
		}
		draw () {
		cx.beginPath(); //base
		cx.arc(this.x,this.y,this.width/2,0,2*Math.PI);
		cx.strokeStyle = "gold";
		cx.fillStyle ="#ffff00";
		cx.lineWidth = 50;
		cx.stroke();
		cx.fill();
	}
}


function drawAll() {
	cx.clearRect(0,0, cx.canvas.width, cx.canvas.height);
	bucket.draw();
	coins.update();
	window.requestAnimationFrame(drawAll);
}



