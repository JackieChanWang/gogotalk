/**
 * Created by Administrator on 2017/9/27.
 */

arr = [0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,1,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,1,0,0,1,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,1,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,1,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0 ];
arrs = [];

function sunsaolei() {
	//  音效
	this.audio = new Audio();
	this.audio.src = "sunsaolei/sound/boom.mp3";
	this.yes = new Audio();
	this.yes.src = "sunsaolei/sound/yes.mp3";
	this.music = new Audio();
	this.music.src = "sunsaolei/sound/music.mp3";
	this.back = new Image();
	this.back.src = "sunsaolei/img/back.png";
	this.white = new Image();
	this.white.src = "sunsaolei/img/floor.png";
	this.timg = new Image();
	this.timg.src = "sunsaolei/img/timg.jpg";
	this.right = new Image();
	this.right.src = "sunsaolei/img/right.png";
	
	this.question = new Image();
	this.question.src = "sunsaolei/img/question.png";
	this.choose = new Image();
	this.choose.src  ="sunsaolei/img/choose.png";
	this.pai = new Image();
	this.pai.src = "sunsaolei/img/pai.png";
	
	
	
    
    // 胜利手势
    this.win = new Image();
    this.win.src = "sunsaolei/img/win.png";
	//  爆炸后的图片
	this.bao = new Image();
	this.bao.src = "sunsaolei/img/bao.png";
	//  放大镜
	this.big = new Image();
	this.big.src = "sunsaolei/img/big.png"
	//  蒙版
	this.ban = new Image();
	this.ban.src = "sunsaolei/img/tansparent.png";
	this.shwo = true;
	//  炸弹
	this.boom = new Image();
	this.boom.src = "sunsaolei/img/boom.png";
	this.bo = new Image();
	this.bo.src  ="sunsaolei/img/bo.png";
    
    //  判断是否显示手势
    this.hands = 0;
    //  分数
    this.score = 0;
    // 画出炸弹的状态值
    this.drawstatus = [0,0,0,0,0];
	//  判断对与错
	this.trueoff = -1;
	//  是否画地板
	this.drawfloor = -1;
	//  画地板
	this.big_rx = 0;
	this.big_ry = 0;
	this.movefoo = true;
	this.bofoo = -1;
    //  判断点击的哪一个。
	this.count = -1;
	//  点击错误了之后
	this.gameover = [-1,-1,-1,-1,-1];
	this.map = new map(13, 9);
	this.boomstatus = [1,1,1,1,1];
	this.booms = new boom("sunsaolei/img/boom.png");
	this.rend = function() {

		
		FrameDraw(this.back, .5, .5, 1, 1, 0);
		
		for(var i = 0; i < this.map.row; i++) {
			for(var j = 0; j < this.map.col; j++) {
				if(this.map.arr[i][j] == 0) {
					FrameDraw(this.white, 0.15 + i * 0.7 / (this.map.row - 1), 0.15 + j * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
				} else if(this.map.arr[i][j] == 1) { 
//                  FrameDraw(this.white, 0.15 +i * 0.7 / (this.map.row - 1), 0.15 +j * 0.7 / (this.map.col - 1), 0.56 / (this.map.row - 1), 0.56 / (this.map.col - 1), 0);

//                  if(this.drawfloor == -1){	
	                    //  画炸弹图
//						if(this.drawstatus[0] == 0){
//							FrameDraw(this.white, 0.15 +i * 0.7 / (this.map.row - 1), 0.15 +j * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
//						}else if(this.drawstatus[1] == 0){
//							FrameDraw(this.white, 0.15 +i * 0.7 / (this.map.row - 1), 0.15 +j * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
//						}else if(this.drawstatus[2] == 0){
//							FrameDraw(this.white, 0.15 +i * 0.7 / (this.map.row - 1), 0.15 +j * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
//						}else if(this.drawstatus[3] == 0){
//							FrameDraw(this.white, 0.15 +i * 0.7 / (this.map.row - 1), 0.15 +j * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
//						}else if(this.drawstatus[4] == 0){
//							FrameDraw(this.white, 0.15 +i * 0.7 / (this.map.row - 1), 0.15 +j * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
//						}
//			 		}
                    
                    
                 
                
				}
				FrameTxt("分 数 : "+this.score,2.5,.48,.045,"black");
			}
		}

		FrameDraw(this.booms, 0.05, 0.05, 0.3, 0.5, 0);
        
        //   原本的土地
        if(this.drawstatus[0] == 0){
			FrameDraw(this.white, 0.15 +this.map.i[0] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[0] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
		}
		if(this.drawstatus[1] == 0){
			FrameDraw(this.white, 0.15 +this.map.i[1] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[1] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
		}
		if(this.drawstatus[2] == 0){
			FrameDraw(this.white, 0.15 +this.map.i[2] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[2] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
		}
		if(this.drawstatus[3] == 0){
			FrameDraw(this.white, 0.15 +this.map.i[3] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[3] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
		}
		if(this.drawstatus[4] == 0){
			FrameDraw(this.white, 0.15 +this.map.i[4] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[4] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);
		}
        
        
        //   选择正确，土地变成粉色
        if(this.drawstatus[0] == 1){
        	FrameDraw(this.right, 0.15 +this.map.i[0] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[0] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[1] == 1){
        	FrameDraw(this.right, 0.15 +this.map.i[1] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[1] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[2] == 1){
        	FrameDraw(this.right, 0.15 +this.map.i[2] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[2] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[3] == 1){
        	FrameDraw(this.right, 0.15 +this.map.i[3] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[3] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[4] == 1){
        	FrameDraw(this.right, 0.15 +this.map.i[4] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[4] * 0.7 / (this.map.col - 1), 0.64 / (this.map.row - 1), 0.64 / (this.map.col - 1), 0);

        }
        
        
        
        
        //  选择错误，炸弹爆炸
        if(this.drawstatus[0] == 2){
        	FrameDraw(this.bao, 0.15 +this.map.i[0] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[0] * 0.7 / (this.map.col - 1), 1.4 / (this.map.row - 1), 1.4 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[1] == 2){
        	FrameDraw(this.bao, 0.15 +this.map.i[1] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[1] * 0.7 / (this.map.col - 1), 1.4 / (this.map.row - 1), 1.4 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[2] == 2){
        	FrameDraw(this.bao, 0.15 +this.map.i[2] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[2] * 0.7 / (this.map.col - 1), 1.4 / (this.map.row - 1), 1.4 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[3] == 2){
        	FrameDraw(this.bao, 0.15 +this.map.i[3] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[3] * 0.7 / (this.map.col - 1), 1.4 / (this.map.row - 1), 1.4 / (this.map.col - 1), 0);

        }
        if(this.drawstatus[4] == 2){
        	FrameDraw(this.bao, 0.15 +this.map.i[4] * 0.7 / (this.map.row - 1), 0.15 +this.map.j[4] * 0.7 / (this.map.col - 1), 1.4 / (this.map.row - 1), 1.4 / (this.map.col - 1), 0);

        }
        
        
        
        if(this.trueoff != 0){
        	//  放大镜
			if(this.movefoo) {
				FrameDraw(this.big, this.big_rx+0.03, this.big_ry+0.05, .18, .30, 0);
				//  移动到相应的位置显示炸弹在放大镜上。
				if(this.bofoo >= 0 && this.gameover[this.bofoo] == -1){
					FrameDraw(this.bo, 0.15 +this.map.i[this.bofoo] * 0.7 / (this.map.row - 1),0.15 +this.map.j[this.bofoo] * 0.7 / (this.map.col - 1), .05, .075, 0);
				}
			}
        }
		
		
		
		
		//  点击对应的炸弹弹出蒙版，出现选择。
		if(this.count == 0 && this.gameover[0] == -1) {
			FrameDraw(this.ban, .5, .5, 1, 1, 0);
			FrameDraw(this.question,.5,.2,.42,.16);
			FrameDraw(this.pai,.5,.43,.18,.32,0);
			FrameDraw(this.choose,.5,.67,.23,.11);
			FrameDraw(this.choose,.5,.8,.23,.11);
		}
		if(this.count == 1 && this.gameover[1] == -1) {
			FrameDraw(this.ban, .5, .5, 1, 1, 0);
			FrameDraw(this.question,.5,.2,.42,.16);
			FrameDraw(this.pai,.5,.43,.18,.32,0);
			FrameDraw(this.choose,.5,.67,.23,.11);
			FrameDraw(this.choose,.5,.8,.23,.11);
		}
		if(this.count == 2 && this.gameover[2] == -1) {
			FrameDraw(this.ban, .5, .5, 1, 1, 0);
			FrameDraw(this.question,.5,.2,.42,.16);
			FrameDraw(this.pai,.5,.43,.18,.32,0);
			FrameDraw(this.choose,.5,.67,.23,.11);
			FrameDraw(this.choose,.5,.8,.23,.11);
		}
		if(this.count == 3 && this.gameover[3] == -1) {
			FrameDraw(this.ban, .5, .5, 1, 1, 0);
			FrameDraw(this.question,.5,.2,.42,.16);
			FrameDraw(this.pai,.5,.43,.18,.32,0);
			FrameDraw(this.choose,.5,.67,.23,.11);
			FrameDraw(this.choose,.5,.8,.23,.11);
		}
		if(this.count == 4 && this.gameover[4] == -1) {
			FrameDraw(this.ban, .5, .5, 1, 1, 0);
			FrameDraw(this.question,.5,.2,.42,.16);
			FrameDraw(this.pai,.5,.43,.18,.32,0);
			FrameDraw(this.choose,.5,.67,.23,.11);
			FrameDraw(this.choose,.5,.8,.23,.11);
		}

        
        if(this.score == 100){
    		this.hands++;
            FrameDraw(this.win,0.5,0.5,Math.min(0.45,0.5*(50+this.hands)/100),Math.min(0.9,1*(50+this.hands)/100),Math.abs(count%40-20));
        }
        
		

	};
	this.work = function() {
		
		 if(this.score == 100 && this.hands == 0){
            this.music.play();
         }
          
	};
	//   放大镜移动到何处显示炸弹
	this.validate = function(movex,movey){
		if(this.count == -1){
			canvas.style.cursor = "none";
		}else{
			canvas.style.cursor = "auto";
		}
		
		this.big_rx = movex;
		this.big_ry = movey;
		
		//  判断显示的范围
		if(movex>((0.15 +this.map.i[0] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && movex<((0.15 +this.map.i[0] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && movey>((0.15 + this.map.j[0] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && movey<((0.15 + this.map.j[0] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1)))){
              this.bofoo = 0;
              
		}
		else if(movex>((0.15 +this.map.i[1] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && movex<((0.15 +this.map.i[1] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && movey>((0.15 + this.map.j[1] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && movey<((0.15 + this.map.j[1] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.bofoo = 1;
       }
       else if(movex>((0.15 +this.map.i[2] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && movex<((0.15 +this.map.i[2] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && movey>((0.15 + this.map.j[2] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && movey<((0.15 + this.map.j[2] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.bofoo = 2;
       }
       else if(movex>((0.15 +this.map.i[3] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && movex<((0.15 +this.map.i[3] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && movey>((0.15 + this.map.j[3] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && movey<((0.15 + this.map.j[3] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.bofoo = 3;
       }
       else if(movex>((0.15 +this.map.i[4] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && movex<((0.15 +this.map.i[4] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && movey>((0.15 + this.map.j[4] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && movey<((0.15 + this.map.j[4] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.bofoo = 4;
       }
       else{
       	   this.bofoo = -1;
       }
       
       
       
		
	}

	
	this.exec = function(rx, ry) {
			
//		console.log(rx,ry);
       //  this.i = [2, 4, 4, 8, 11];
	   //  this.j = [1, 4, 7, 5, 2];
	   //  点击炸弹
       if(rx>((0.15 +this.map.i[0] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && rx<((0.15 +this.map.i[0] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && ry>((0.15 + this.map.j[0] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && ry<((0.15 + this.map.j[0] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.count = 0;
       	    this.trueoff = 0;
       	    console.log(this.trueoff+"--------------");
       }
       else if(rx>((0.15 +this.map.i[1] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && rx<((0.15 +this.map.i[1] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && ry>((0.15 + this.map.j[1] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && ry<((0.15 + this.map.j[1] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.count = 1;
       	    this.trueoff = 0;
       }
       else if(rx>((0.15 +this.map.i[2] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && rx<((0.15 +this.map.i[2] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && ry>((0.15 + this.map.j[2] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && ry<((0.15 + this.map.j[2] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.count = 2;
       	    this.trueoff = 0;
       }
       else if(rx>((0.15 +this.map.i[3] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && rx<((0.15 +this.map.i[3] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && ry>((0.15 + this.map.j[3] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && ry<((0.15 + this.map.j[3] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.count = 3;
       	    this.trueoff = 0;
       }
       else if(rx>((0.15 +this.map.i[4] * 0.7 / (this.map.row - 1))-(0.56 / (this.map.row - 1))) && rx<((0.15 +this.map.i[4] * 0.7 / (this.map.row - 1))+(0.56 / (this.map.row - 1))) && ry>((0.15 + this.map.j[4] * 0.7 / (this.map.col - 1))-(0.56 / (this.map.col - 1))) && ry<((0.15 + this.map.j[4] * 0.7 / (this.map.col - 1))+ (0.56 / (this.map.col - 1))))
       {

       	    this.count = 4;
       	    this.trueoff = 0;
       }else{
       	    this.trueoff = -1;
       }
       
        
        //  点击选项，完成选择
		if(this.count >= 0 && this.trueoff != 0) {
			if(this.count == 0) {
				//  点击对应的答案，看是否正确，执行。
				if(rx > 0.38 && rx < 0.61 && ry > 0.61 && ry < 0.71) {
					console.log("正确");
					this.boomstatus[1] = -1;
					this.yes.play();
					this.count = -1;
					this.gameover[0] = 0;
					this.score += 20;
					//  画土地
					this.drawstatus[0] = 1;
					
				} else if(rx > 0.38 && rx < 0.61 && ry > 0.74 && ry < 0.84) {
//					console.log("错误");
					this.boomstatus[0] = 2;
					this.audio.play();
					this.count = -1;
					this.gameover[0] = 0;
					this.score -= 20;
					this.drawstatus[0] = 2;
//					this.drawfloor = 0;
				}
			}
			if(this.count == 1) {
				if(rx > 0.38 && rx < 0.61 && ry > 0.61 && ry < 0.71) {
					console.log("true");
					this.boomstatus[1] = -1;
					this.yes.play();
					this.count = -1;
					this.gameover[1] = 0;
					this.score += 20;
					this.drawstatus[1] = 1;
				} else if(rx > 0.38 && rx < 0.61 && ry > 0.74 && ry < 0.84) {
					console.log("false");
					this.boomstatus[1] = 2;
					this.audio.play();
					this.count = -1;
					this.gameover[1] = 0;
					this.score -= 20;
					this.drawstatus[1] = 2;
					this.drawfloor = 0;
				}
			}
			if(this.count == 2) {
				if(rx > 0.38 && rx < 0.61 && ry > 0.61 && ry < 0.71) {
					console.log("true");
					this.boomstatus[2] = -1;
					this.yes.play();
					this.count = -1;
					this.gameover[2] = 0;
					this.score += 20;
					this.drawstatus[2] = 1;
				} else if(rx > 0.38 && rx < 0.61 && ry > 0.74 && ry < 0.84) {
					console.log("false");
					this.boomstatus[2] = 2;
					this.audio.play();
					this.count = -1;
					this.gameover[2] = 0;
					this.score -= 20;
					this.drawstatus[2] = 2;
				}
			}
			if(this.count == 3) {
				
				if(rx > 0.38 && rx < 0.61 && ry > 0.61 && ry < 0.71) {
					console.log("true");
					this.boomstatus[3] = -1;
					this.yes.play();
//					this.right = 3;
					this.count = -1;
					this.gameover[3] = 0;
					this.score += 20;
					this.drawstatus[3] = 1;
				} else if(rx > 0.38 && rx < 0.61 && ry > 0.74 && ry < 0.84) {
					console.log("false");
					this.boomstatus[3] = 2;
					this.audio.play();
					this.count = -1;
					this.gameover[3] = 0;
					this.score -= 20;
					this.drawstatus[3] = 2;
				}
			}
			if(this.count == 4) {
				
				if(rx > 0.38 && rx < 0.61 && ry > 0.61 && ry < 0.71) {
					console.log("true");
					this.boomstatus[4] = -1;
					this.yes.play();
//					this.right = 4;
					this.count = -1;
					this.gameover[4] = 0;
					this.score += 20;
					this.drawstatus[4] = 1;
				} else if(rx > 0.38 && rx < 0.61 && ry > 0.74 && ry < 0.84) {
					console.log("false");
					this.boomstatus[4] = 2;
					this.audio.play();
					this.count = -1;
					this.gameover[4] = 0;
					this.score -= 20;
					this.drawstatus[4] = 2;
				}
			}
			return false;
		};
        


	};
	
	this.data = [
	
		['1、bannar', '2、apple'],
		['1、book', '2、movie'],
		['1、basketball', '2、football'],
		['1、dance', '2、sing'],
		['1、wirte', '2、read']
	    
	];

	this.keyevent = function(x) {
         
         
         
	};
	
    
}

function map(x, y) {
	
	this.row = x;
	this.col = y;
	this.arr = [];
	this.i = [2, 4, 4, 8, 11];
	this.j = [1, 4, 7, 5, 2];
//	this.boomx = [0.228,0.452,0.644,0.708,0.836];
//	this.boomy = [0.329,0.614,0.443,0.1,0.786];
	
	for(var i = 0; i < x; i++) {
		this.arr[i] = [];
		
		for(var j = 0; j < y; j++) {
			this.arr[i][j] = arr[i * y + j];
		}
		
	}
	
}

function boom(s) {
	this.src = s;
}