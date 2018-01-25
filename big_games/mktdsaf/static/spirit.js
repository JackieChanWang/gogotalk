function PaperSets(srcs){//简单帧动画
	this.imgs=[];
	for(x in srcs){
		this.imgs[x]=new Image();
		this.imgs[x].src= srcs[x];		
	}
	this.papernum= this.imgs.length;
	this.show= function(speed,px,py,sx,sy,angle){//动画速度，坐标x，坐标y，尺寸x，尺寸y，旋转角度
		FrameDraw(this.imgs[parseInt(count*speed)%this.papernum],px,py,sx,sy,angle);
	}
}