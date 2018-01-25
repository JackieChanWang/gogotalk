function clearCanvas() { 
	tempContext.clearRect(0, 0, SizeX, SizeY); 
}

function Rending(){
	clearCanvas();

	tempContext.drawImage(imgframe,framepx,framepy,framesx,framesy);

	
	world.rend();


	if(SizeY>SizeX*0.5625){
		tempContext.drawImage(imgbkg,0,0,SizeX,framepy);
		tempContext.drawImage(imgbkg,0,SizeY-framepy,SizeX,framepy);
	}
	else{
		tempContext.drawImage(imgbkg,0,0,framepx,SizeY);
		tempContext.drawImage(imgbkg,SizeX-framepx,0,framepx,SizeY);
	}
}

function RotaleTxt(txt,posx,posy,size,angle,rotx,roty,fs){
	tempContext.fillStyle=fs;
	tempContext.translate(posx,posy);
	tempContext.rotate(-angle*Math.PI/180);
		tempContext.font = 'bold '+framesx*size/1000+'px 楷体 ';
		tempContext.fillText(txt,-rotx*framesx*size/1000,-roty*framesx*size/1000);
	tempContext.rotate(angle*Math.PI/180);
	tempContext.translate(-posx,-posy);
}
function RotalePic(img,posx,posy,sizex,sizey,angle,rotx,roty){//神经病一般的画图函数
	if(angle==0){
		if(img.complete){tempContext.drawImage(img,posx-rotx,posy-roty,sizex,sizey);}
		//console.log(img);
		return;
	}
	tempContext.translate(posx,posy);
	tempContext.rotate(-angle*Math.PI/180);
	
	if(img.complete){tempContext.drawImage(img,-rotx,-roty,sizex,sizey);}
	
	tempContext.rotate(angle*Math.PI/180);
	tempContext.translate(-posx,-posy);
}
function DrawSth(img,posx,posy,sizex,sizey,angle){//绘制图片，支持按一定角度以中心点旋转
	if(angle==0){
		//console.log(img);
		if(img.complete){tempContext.drawImage(img,posx-sizex/2,posy-sizey/2,sizex,sizey);}
		return;
	}
	tempContext.translate(posx,posy);
	tempContext.rotate(-angle*Math.PI/180);
	if(img.complete){tempContext.drawImage(img,-sizex/2,-sizey/2,sizex,sizey);}
	tempContext.rotate(angle*Math.PI/180);
	tempContext.translate(-posx,-posy);
}
function FrameDraw(img,px,py,sx,sy,angle){
	DrawSth(img,framepx+px*framesx,framepy+py*framesy,framesx*sx,framesy*sy,angle);
}
function FrameRotale(img,px,py,sx,sy,angle,rx,ry){
	RotalePic(img,framepx+px*framesx,framepy+py*framesy,framesx*sx,framesy*sy,angle,framesx*rx,framesx*ry);
}

function FrameTxt(txt,size,posx,posy,colour){
	tempContext.font = 'bold '+framesy*size/100+'px 微软雅黑';
	tempContext.fillStyle=colour
	tempContext.fillText(txt, framepx+posx*framesx,framepy+posy*framesy);

}
			