function snake() {
	this.squre=new Image();//声明小方格图片
	this.squre.src='snake/img/4.png'
	this.squre1=new Image();
	this.squre1.src='snake/img/1.png'
	this.squre2=new Image();
	this.squre2.src='snake/img/2.png'
	this.squre3=new Image();
	this.squre3.src='snake/img/3.png'
	this.bg=new Image();
	this.bg.src='snake/img/bg.png'
	//水果
	this.fruit1=new Image();
	this.fruit1.src="snake/img/apple.png";
	this.fruit2=new Image();
	this.fruit2.src="snake/img/coconut.png";
	//四个方位 图片
	this.arrow=new Image();
	this.arrow.src="snake/img/arrow.png";
	this.mask=new Image();
	this.mask.src="snake/img/mask.png";
	
	//26个字母
	words=[];
	words[0]=new Image();
	words[0].src="snake/img/a.png";
	words[1]=new Image();
	words[1].src="snake/img/b.png";
	words[2]=new Image();
	words[2].src="snake/img/c.png";
	words[3]=new Image();
	words[3].src="snake/img/d.png";
	words[4]=new Image();
	words[4].src="snake/img/e.png";
	words[5]=new Image();
	words[5].src="snake/img/f.png";
	words[6]=new Image();
	words[6].src="snake/img/g.png";
	words[7]=new Image();
	words[7].src="snake/img/h.png";
	words[8]=new Image();
	words[8].src="snake/img/i.png";
	words[9]=new Image();
	words[9].src="snake/img/j.png";
	
	words[10]=new Image();                      
	words[10].src="snake/img/k.png";
	words[11]=new Image();
	words[11].src="snake/img/l.png";
	words[12]=new Image();
	words[12].src="snake/img/m.png";
	words[13]=new Image();
	words[13].src="snake/img/n.png";
	words[14]=new Image();
	words[14].src="snake/img/o.png";
	words[15]=new Image();
	words[15].src="snake/img/p.png";
	words[16]=new Image();
	words[16].src="snake/img/q.png";
	words[17]=new Image();
	words[17].src="snake/img/r.png";
	words[18]=new Image();
	words[18].src="snake/img/s.png";
	
	words[19]=new Image();
	words[19].src="snake/img/t.png";
	words[20]=new Image();
	words[20].src="snake/img/u.png";
	words[21]=new Image();
	words[21].src="snake/img/v.png";
	words[22]=new Image();
	words[22].src="snake/img/w.png";
	words[23]=new Image();
	words[23].src="snake/img/x.png";
	words[24]=new Image();
	words[24].src="snake/img/y.png";
	words[25]=new Image();
	words[25].src="snake/img/z.png";
	
	
	this.init = function(){
		this.offsetX=0;
		this.offsety=0;
		
		this.foods = [];
		this.letters=[100,115,115,111,104,102,102,113,120,114,114,119];
		
		for(var i=0;i<this.letters.length;i++){
			var num = Math.random();//Math.random()：得到一个0到1之间的随机数
			num = Math.ceil(100+num * 25);
			if(this.letters.length<26){
				this.letters.push(num);
				//console.log(this.letters);
			}
		}
				
		//写死的食物		
		this.foods[0] = new food(11,2);
		this.foods[1] = new food(6,9);
		this.foods[2] = new food(5,3);
		this.foods[3] = new food(7,6);
		this.foods[4] = new food(15,6);
		this.foods[15] = new food(2,7);
		this.foods[6] = new food(12,8);
		this.foods[7] = new food(9,4);
		this.foods[8] = new food(10,7);
		this.foods[19] = new food(1,1);
		
		this.foods[10] = new food(4,8);
		this.foods[11] = new food(14,1);
		this.foods[12] = new food(6,1);
		this.foods[13] = new food(16,9);
		this.foods[14] = new food(4,6);
		this.foods[5] = new food(14,4);
		this.foods[16] = new food(10,0);
		this.foods[17] = new food(3,10);
		this.foods[18] = new food(9,10);
		this.foods[9] = new food(11,5);
		
		for(x in this.foods){
			this.foods[x].letter=this.letters[x];
		}		
		eatArr=[];
				
		this.map=new map(18,11);//实例化地图 传参
		this.snk=new snk(this);//实例化蛇 把map传进去
		this.isrun = false;	
	}
	
	this.init();
	this.rend = function() {
		FrameDraw(this.bg,.5,.5,1,1,0);
		
		this.map.clear();//清除重复的的方块
		this.snk.show();
		for(var z =0;z<this.foods.length;z++){
			this.foods[z].show(this.map);//地图上画出食物
		}
		for (var i=0;i<this.map.row;i++){
			for(var j=0;j<this.map.col;j++){
				if(this.map.board[i][j]==0){
					//FrameDraw(this.squre,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),0.8/(this.map.row-1),0.8/(this.map.col-1),0);
				}
				if(this.map.board[i][j]==1){
					FrameDraw(this.squre1,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),0.8/(this.map.row-1),0.8/(this.map.col-1),0);
				}
				if(this.map.board[i][j]==3){
					FrameDraw(this.squre3,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),0.8/(this.map.row-1),0.8/(this.map.col-1),0);
				}
				if(this.map.board[i][j]>=100){//画食物
					FrameDraw(this.squre1,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),1/(this.map.row-1),1/(this.map.col-1),0);
					FrameDraw(words[this.map.board[i][j]-100],0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),0.8/(this.map.row-1),0.8/(this.map.col-1),0);						
				}
				if(this.map.board[i][j]==2){
					if(this.snk.ang==0){
						FrameDraw(this.squre2,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),1.5/(this.map.row-1),1.5/(this.map.col-1),270);
						//console.log("往右移")
						//画指示箭头
						
						}
						else if(this.snk.ang==1){FrameDraw(this.squre2,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),1.5/(this.map.row-1),1.5/(this.map.col-1),180);
						//console.log("往下移")						
						}
						else if(this.snk.ang==2){FrameDraw(this.squre2,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),1.5/(this.map.row-1),1.5/(this.map.col-1),0);
						//console.log("往上移")
						}
						else if(this.snk.ang==3){FrameDraw(this.squre2,0.05+i*(1-0.1)/(this.map.row-1),0.05+j*(1-0.1)/(this.map.col-1),1.5/(this.map.row-1),1.5/(this.map.col-1),90);
						//console.log("往左移")
						}
					this.heads_x = 0.05 + i * (1 - 0.1) / (this.map.row - 1);
					this.heads_y = 0.05 + j * (1 - 0.1) / (this.map.col - 1);
				}
				//FrameDraw(this.right,0.5,0.5,0.2,0.2,0);
			}
		}
		FrameDraw(this.fruit1,.92,.35,.13,.18,0);
		FrameDraw(this.fruit2,.93,.1,.13,.18,0);
				
		//FrameDraw(this.right,0.5,0.5,0.2,0.2,0);
		//console.log(this.snk.body[this.snk.body.length-1][0])//遍历蛇身体 取到蛇脑袋位置	
		//console.log(i,j)
		//右
		if(count%60<=25){
			FrameDraw(this.arrow,this.snk.body[this.snk.body.length-1][0]*(1-0.1)/(this.map.row-1)+0.15,
		0.05+this.snk.body[this.snk.body.length-1][1]*(1-0.1)/(this.map.col-1),1.3/(this.map.row-1),1/(this.map.col-1),180);
		//下
		FrameDraw(this.arrow,0.05+this.snk.body[this.snk.body.length-1][0]*(1-0.1)/(this.map.row-1),
		0.22+this.snk.body[this.snk.body.length-1][1]*(1-0.1)/(this.map.col-1),1.3/(this.map.row-1),1/(this.map.col-1),90);
		//向上
		FrameDraw(this.arrow,0.05+this.snk.body[this.snk.body.length-1][0]*(1-0.1)/(this.map.row-1),
		0.05+this.snk.body[this.snk.body.length-1][1]*(1-0.1)/(this.map.col-1)-0.18,1.3/(this.map.row-1),1/(this.map.col-1),270);
		//向左
		FrameDraw(this.arrow,this.snk.body[this.snk.body.length-1][0]*(1-0.1)/(this.map.row-1)-0.05,
		0.05+this.snk.body[this.snk.body.length-1][1]*(1-0.1)/(this.map.col-1),1.3/(this.map.row-1),1/(this.map.col-1),360);
		}
		
		//FrameDraw(this.mask,.5,.5,1,1,0); 遮罩层 游戏结束
		
	}
	this.work = function() {
		if(this.isrun){
			if(count%25 == 0){
				this.snk.move();
			}
		}
	}
	this.exec = function(rx,ry) {
		if(this.isrun == false){
			this.isrun = true;
			return;
		}
		//console.log(rx,ry);
		this.h_x = Math.abs(rx - this.heads_x);
		this.h_y = Math.abs(ry - this.heads_y) * 0.5625;
	
		if(rx - this.heads_x > 0 && this.h_x >= this.h_y) {//根据蛇脑袋位置判断往哪里移动			
				if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]-1&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]){
					this.snk.ang = 0;
				}								
			//防止直接掉头		
			//this.snk.move(); //鼠标点击事件 右
		}
		if(rx - this.heads_x <= 0 && this.h_x > this.h_y) {		
				if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]+1&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]){
					this.snk.ang = 3;
				}			
			//this.snk.ang = 3;
			//this.snk.move(); //鼠标点击事件 左
		}
		if(ry - this.heads_y < 0 && this.h_y >= this.h_x) {			
				if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]+ 1){
					this.snk.ang = 2;
				}											
			//this.snk.ang = 2;
			//this.snk.move(); //鼠标点击事件 上
		}
		if(ry - this.heads_y >= 0 && this.h_y > this.h_x) {						
				if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]-1){
					this.snk.ang = 1;
				}											
			//this.snk.ang = 1;
			//this.snk.move(); //鼠标点击事件 下
		}
		//world.boards[world.page].snk.move();			
	}
	this.keyevent = function(x) {//键盘事件
		console.log(x);
		if(this.isrun == false){
			this.isrun = true;
			return;
		}
		if(x==37||x==65){//往左
			if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]+1&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]){
					this.snk.ang = 3;
				}
		}else if(x==39||x==68){//往右
			if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]-1&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]){
					this.snk.ang = 0;
				}
		}else if(x==87||x==38){//往上
			if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]-1){
					this.snk.ang = 2;
				}	
		}else if(x==83||x==40){//往下
			if(this.snk.body[this.snk.body.length-1][0]!=this.snk.body[this.snk.body.length-2][0]&&
				this.snk.body[this.snk.body.length-1][1]!=this.snk.body[this.snk.body.length-2][1]-1){
					this.snk.ang = 1;
				}	
		}
		
	}
}

function map(x,y){
	this.row= x;
	this.col= y;
	this.board=[];//定义空数组
	for (var i=0;i<x;i++){
		this.board[i]=[];
		for(var j=0;j<y;j++){
			this.board[i][j]=0;
		}
	}
	this.clear=function(){
		for (var i=0;i<x;i++){
			this.board[i]=[];
			for(var j=0;j<y;j++){
				this.board[i][j]=0;
			}
		}	
	}	
}

function snk(snake){
	this.snake = snake;
	this.map=this.snake.map;//获取map 变成自己的map
	this.foods = this.snake.foods ;
	this.ang=1;
	this.body=[[2,3],[2,4]];//蛇身体
	this.show=function(){//创建show方法
		for(x in this.body){
			if(x==0){
				this.map.board[this.body[x][0]][this.body[x][1]]=1;//蛇尾巴
			}else if(x==this.body.length-1){
				this.map.board[this.body[x][0]][this.body[x][1]]=2;//蛇脑袋 在地图绘制
				
			}
			else{
				this.map.board[this.body[x][0]][this.body[x][1]]=eatArr[x-1];
			}
		}
	}
	this.move=function(){
		if(this.ang==0){//判断往右移
			dict= [this.body[this.body.length-1][0]+1,this.body[this.body.length-1][1]];
		}
		else if(this.ang==1){//往下
			dict= [this.body[this.body.length-1][0],this.body[this.body.length-1][1]+1];
		}
		else if(this.ang==2){//往上
			dict= [this.body[this.body.length-1][0],this.body[this.body.length-1][1]-1];
		}
		else if(this.ang==3){//往左
			dict= [this.body[this.body.length-1][0]-1,this.body[this.body.length-1][1]];
		}
		
		if(dict[0]>=18||dict[0]<0||dict[1]<0||dict[1]>=11){
			//console.log(eatArr);
			//console.log(this.body)
			alert("撞墙");
			this.snake.init();
			return;}
		
		if(("|"+this.body.join("|")+"|").indexOf("|"+dict.join(",")+"|")!=-1){
			if(this.body[this.body.length-2][0]==dict[0]&&this.body[this.body.length-2][1]==dict[1]){
				return;
			}//防止脑袋钻到身体里
			
			alert("你要自残啊");
			this.snake.init();
			return;
		}
		
		if(this.map.board[dict[0]][dict[1]]<100){
			this.body.splice(0,1);
		}else{
			eatArr.push(this.map.board[dict[0]][dict[1]]);
			//console.log(this.map.board[dict[0]][dict[1]])
			
			console.log(this.body[this.body.length-1][0])//遍历蛇身体 取到蛇脑袋位置	
			
			//console.log(eatArr);//吃进去的字母 数组
			var eatString=eatArr.join(",");
			//console.log(eatString);
			
			for(var i = 0;i<this.foods.length;i++){
				if(this.foods[i].foodPosition[0] == dict[0]&&this.foods[i].foodPosition[1] == dict[1]){
					this.foods.splice(i,1);
					
				}
			}
		}
		
		this.body.push(dict);
		var appleString='100,115,115,111,104';
		var coconutString='102,114,102,114,113,120,119';
		//console.log(appleString)
		//console.log(eatArr);
		var eatString=eatArr.join(",");
		if(dict[0]>=16&&dict[1]<5&&dict[1]>=3&&this.body.length==7&&appleString==eatString){
			console.log(eatArr);		
			alert("撞到苹果了");
			console.log(this.body);
			this.body.splice(1,5);
			return;}
			else if(dict[0]>=16&&dict[1]<2&&dict[1]>=0&&this.body.length==9&&coconutString==eatString){
				alert("撞到椰子");
				this.body.splice(1,7);
				return;
			}
	}	
}

function food(x,y){
	this.letter=0;
	this.food=new Image();
	this.food.src='snake/img/3.png';
	this.food.src='snake/img/1.png';
	this.foodPosition=[x,y];
	this.show = function(map){
		map.board[this.foodPosition[0]][this.foodPosition[1]] = this.letter;
		
	}
}