function init(){
/*--------------------------------------some flag ---------------------------------------*/	

	imgbkg= new Image();
	imgbkg.src= "static/bkg.jpg";


	if(SizeY>SizeX*0.5625){
		framepx=0;		
		framesx=SizeX;
		framepy=(SizeY-SizeX*0.5625)/2;
		framesy=SizeX*0.5625;
	}
	else{
		framepx=(SizeX-SizeY/0.5625)/2;
		framesx=SizeY/0.5625;
		framepy=0;
		framesy=SizeY;
	}

	count=0;
	world= new World();
	Pagenum=0;

}

