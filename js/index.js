function Sky(option) {
  this.ctx = option.ctx;
  this.bgImg = option.bgImg;
  this.skyX = option.skyX;
  this.skySpeed = 2;
}

Sky.prototype = {
  constructor: Sky,
  drawSky: function () {
    this.skyX -= this.skySpeed;
    if (this.skyX < -this.bgImg.width) {
      this.skyX = this.skyX + 2 * this.bgImg.width;
    }
    this.ctx.drawImage(this.bgImg, this.skyX, 0);
  }
};

function Bird(option) {
  this.ctx = option.ctx;
  this.birdImg = option.birdImg;

  this.imgW = option.birdImg.width / 3;
  this.imgH = option.birdImg.height;
  this.imgX = 0;
  this.imgY = 0;
  this.canvasX = 100;
  this.canvasY = 100;
  this.g = 0.0005;
  this.col = 0;
  this.speed = 0;
  this.maxLean = 45;
  this.curLean = 0;
  this.maxSpeed = 0.5;
}

Bird.prototype = {
  constructor: Bird,
  drawBird: function (offsetTime) {
    /*变换截取位置，呈现扑动翅膀的效果*/
    this.col = (this.col + 1) % 3;
    this.imgX = this.imgW * this.col;

    /*计算两次绘画间的小鸟高度变化和速度变化*/
    var offsetY = this.speed * offsetTime + this.g * offsetTime * offsetTime / 2;
    this.canvasY = this.canvasY + offsetY;
    this.speed = this.speed + this.g * offsetTime;

    /*绘制小鸟*/
    this.ctx.save();
    /*计算小鸟当前的倾斜角度*/
    this.curLean = (this.curLean < this.maxLean) ? (this.speed * this.maxLean / this.maxSpeed) : this.maxLean;
    this.ctx.translate(this.canvasX + this.imgW / 2, this.canvasY + this.imgH / 2);
    this.ctx.rotate(Math.PI / 180 * this.curLean);

    this.ctx.drawImage(this.birdImg, this.imgX, this.imgY, this.imgW, this.imgH, -this.imgW / 2, -this.imgH / 2, this.imgW, this.imgH);
    this.ctx.restore();
  }
};

function Land(option) {
  this.ctx = option.ctx;
  this.landImg = option.landImg;
  this.x = option.x;
  this.y = option.y;
  this.speed = 2;
}

Land.prototype = {
  constructor: Land,
  drawLand: function () {
    // console.log(this.x);
    this.x -= this.speed;
    if (this.x < -this.landImg.width) {
      this.x += this.landImg.width * 4;
    }
    this.ctx.drawImage(this.landImg, this.x, this.y);
  }
};

function Pipes(option) {
  this.ctx = option.ctx;
  this.topPipe = option.topPipe;
  this.bottomPipe = option.bottomPipe;
  this.topX = option.x;
  this.topY = 0;
  this.bottomX = option.x;
  this.bottomY = 0;
  this.speed = 2;
  this.getY();
}

Pipes.prototype = {
  constructor: Pipes,
  drawPipes: function () {
    this.topX -= this.speed;
    this.bottomX -= this.speed;
    if (this.topX < -this.topPipe.width * 3) {
      this.topX += this.topPipe.width * 3 * 6;
      this.bottomX += this.topPipe.width * 3 * 6;
      this.getY();
    }

    this.ctx.drawImage(this.topPipe, this.topX, this.topY);
    this.ctx.rect(this.topX, this.topY, this.topPipe.width, this.topPipe.height);
    this.ctx.drawImage(this.bottomPipe, this.bottomX, this.bottomY);
    this.ctx.rect(this.bottomX, this.bottomY, this.bottomPipe.width, this.bottomPipe.height);

  },
  getY: function () {
    this.topY = -(Math.random() * 240 + 130);
    this.bottomY = this.topY + 420 + 150;
  }
}

