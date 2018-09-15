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

class Ring  {
	constructor () {
		this.inwardRings = 60;
		this.ringsCount = 1;
		this.ringsFramesCount = 0;
		this.ringsFrames = 1;
		this.color = "gold";
	}
}

class Bucket extends Item{
	constructor(x,y,width,height) { //x,y defines middle
		super(x,y,width,height);
		this.innerColor = "black";
		this.outerColor = "	#9f9f60";

		//Pretty primitive way of counting up rings and then having each ring appear for x frames.
		
		this.ringAnimations = [];
	}
	draw() {
			cx.beginPath(); //draws a ellipse
			cx.moveTo(this.x-this.width/2,this.y);
			cx.lineWidth = 1;
			cx.quadraticCurveTo(this.x, this.y-this.height*(1/3), this.x+this.width/2, this.y); //upper half
			cx.stroke();

			cx.beginPath()
			cx.moveTo(this.x-this.width/2,this.y);
			cx.lineWidth = 10;
			cx.quadraticCurveTo(this.x, this.y+this.height*(2/3), this.x+this.width/2, this.y);
			cx.stroke();
			cx.strokeStyle = "gold";
			cx.fillStyle = this.innerColor;
			
			
			cx.fill();
		}
		deleteAnimation(i) {
			this.ringAnimations.splice(i, 1);
		}
		newRingAnimation() {
			this.ringAnimations.push(new Ring);
		}
		hitAnimation () {
			for (let i = 0; i < this.ringAnimations.length ; i++) {
				if (this.ringAnimations[i].ringsCount == this.ringAnimations[i].inwardRings) {
					this.deleteAnimation(i);
					if (this.ringAnimations.length <= 0) {
						break;
					}
				}
				if (this.ringAnimations[i].ringsFramesCount == this.ringAnimations[i].ringsFrames) {
					this.ringAnimations[i].ringsFramesCount = 0;
					this.ringAnimations[i].ringsCount++;
				}
				let tempBucket = new Bucket(this.x,this.y,this.width*(this.ringAnimations[i].ringsCount/this.ringAnimations[i].inwardRings), 
					this.height*(this.ringAnimations[i].ringsCount/this.ringAnimations[i].inwardRings));
				tempBucket.draw();
				this.ringAnimations[i].ringsFramesCount++;
			}
		}
		outwardRings() {
			if (this.ringsCount >= this.inwardRings) {
				this.requestId = undefined;
				this.ringsCount=0;
			}
			let tempBucket = new Bucket(this.x,this.y,this.width*(this.ringsCount/this.inwardRings), this.height*(this.ringsCount/this.inwardRings));
			tempBucket.draw();
			this.ringsCount++;
			this.requestId=window.requestAnimationFrame(() => this.outwardRings());
		}
	}

	class Coins {
		constructor (landingX, landingY) {
			this.arr = [];
			this.coinsRemoved = 0;
			this.landingX =landingX;
			this.landingY = landingY;
		}
		add () {
			this.arr.push(new Coin(this.landingX, 0, 30, 20));

		}
		hitBucket() {
			for (let i = 0; i < this.arr.length; i++) {
				if (this.arr[i].y+this.arr[i].height/2 >= this.landingY) {
					this.remove(i);
					bucket.newRingAnimation();
				}
			}
		}
		fall() {
			for (let i = 0; i < this.arr.length; i++) {
				this.arr[i].y+=5;
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
		console.log(this.width/2);
		cx.arc(this.x,this.y,this.width/2,0,2*Math.PI);
		cx.lineWidth = this.width/4;
		cx.stroke();
		cx.fill();
	}
}


function drawAll() {
	cx.clearRect(0,0, cx.canvas.width, cx.canvas.height);
	bucket.draw();
	coins.update();
}



