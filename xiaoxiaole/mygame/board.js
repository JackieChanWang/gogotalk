
function mygame() {
	this.bg = new Image();
	this.bg.src = "mygame/img/bg-1.jpg";
	this.bg2 = new Image();
	this.bg2.src = "mygame/img/bg-2.png";
	this.black = new Image();
	this.black.src = "mygame/img/black.jpg";
	
	this.chick = new Image();
	this.chick.src = "mygame/img/chick.png";
	this.chick_bad = new Image();
	this.chick_bad.src = "mygame/img/chick-bad.png";
	this.chick_good = new Image();
	this.chick_good.src = "mygame/img/chick-good.jpg";
	this.chick_prety = new Image();
	this.chick_prety.src = "mygame/img/chick-prety.jpg";
	
	this.frog = new Image();
	this.frog.src = "mygame/img/frog.png";
	this.frog_bad = new Image();
	this.frog_bad.src = "mygame/img/frog-bad.png";
	this.frog_good = new Image();
	this.frog_good.src = "mygame/img/frog-good.jpg";
	
	this.cat = new Image();
	this.cat.src = "mygame/img/cat.png";
	this.cat_bad = new Image();
	this.cat_bad.src = "mygame/img/cat-bad.jpg";
	this.cat_good = new Image();
	this.cat_good.src = "mygame/img/cat-good.png";
	
	this.game_bg = new Image();
	this.game_bg.src = "mygame/img/game-bg.png";
	
	this.start_btn = new Image();
	this.start_btn.src = "mygame/img/btn.png";
	
	var srcs = [],Url;
	for(i=0;i<71;i++ ){
		Url = "mygame/img/win/win_"+(i+1)+".JPG";
		srcs[i] = Url;
	};
	this.win = new PaperSets(srcs);
	/*参数*/
	this.status = 0;
	this.start_big = 1;//开始按钮动效
	this.foods = [this.frog,this.chick,this.cat,this.black];//食物仓库
	this.foods_status = [];//食物状态
	this.foods_remove_arr = [];//最终被消除的食物
	this.foods_remove_all_arr = [];//被消除的食物介质仓库
	this.foods_remove_foo = false;//是否有食物会被消除
	//食物的x,y坐标
	this.foods_rx = [];
	this.foods_ry = [];
	//格子的宽高
	this.room_w = 0.0704;
	this.room_h = 0.1188;
	//食物移动的方向
	this.food_direct = -1;
	for(j=0;j<7;j++){
	  for(i=0;i<7;i++){
		  this.foods_rx[i*7+j] = 0.29+0.07*j;
		  this.foods_ry[i*7+j] = 0.145+i*0.12;
	  };
   };
	this.food_move_foo = false;//是否可拖动
	this.food_down_move = false;//是否mousedown可移动
	this.click_food_index = -1;//被点击食物的下标
	this.food_speed = 20;
	this.obj;
	this.time = 0;
	this.grades = 0;
	this.remove_tr = -1;//被消除格子的x,y坐标
	this.remove_td = -1;
	this.rend = function() {
		if(this.status <= 0){
			FrameDraw(this.bg,0.5,0.5,1,1.2);
			FrameDraw(this.start_btn,0.5,0.5,.2*this.start_big,.12*this.start_big);
			if(this.status == -1){
				FrameTxt('请稍等，游戏加载中',5,0.35,0.65,"red");
				if(count%8 == 0){
				   FrameTxt('. . . . .',5,0.61,0.65,"red");
				}
			}
		}else if(this.status == 1){
			FrameDraw(this.bg2,0.5,0.5,1,1.2);
			FrameDraw(this.game_bg,0.5,0.5,.5,.85);
			/*game-food*/
			 for(i=0;i<49;i++){
				FrameDraw(this.foods[this.foods_status[i]],this.foods_rx[i],this.foods_ry[i],.055,.09);
			 };
				
		 FrameTxt("time: "+this.time,5,0.02,0.45,"green");
		 FrameTxt("grades: "+this.grades,5,0.02,0.55,this.grades>=0 ? "green" : "red");
	
		};
	};
	this.work = function(){
		if(this.status == -1){
			if(this.time>=15){
				this.status = 0
			}
		}else if(this.status == 0){
			if(count%200 <= 60){
			    this.start_big = Math.abs(count%30-15)*0.03+0.55;
			}else{
				this.start_big = 1;
			};
		}else if(this.status == 1){//正式游戏
			if(this.food_down_move){
				if(this.food_direct == 0){
					if(Math.abs(this.foods_rx[this.click_food_index-1] - this.foods_rx[this.click_food_index] - this.room_w) > 0.0001){
					  this.foods_rx[this.click_food_index-1] += this.room_w/this.food_speed;
					}else{
						this.obj = this.foods_status[this.click_food_index-1];
						this.foods_status[this.click_food_index-1] = this.foods_status[this.click_food_index];
						this.foods_status[this.click_food_index] = this.obj;
						this.obj = this.foods_rx[this.click_food_index];
						this.foods_rx[this.click_food_index] = this.foods_rx[this.click_food_index-1];
						this.foods_rx[this.click_food_index-1] = this.obj;
						this.food_direct = -1;
						this.foods_validate_one(this.click_food_index-1)
					}
				}else if(this.food_direct == 1){
					if(Math.abs(this.foods_rx[this.click_food_index+1] - this.foods_rx[this.click_food_index] + this.room_w) > 0.0001){
					    this.foods_rx[this.click_food_index+1] -= this.room_w/this.food_speed;
					}else{
						this.obj = this.foods_status[this.click_food_index+1];
						this.foods_status[this.click_food_index+1] = this.foods_status[this.click_food_index];
						this.foods_status[this.click_food_index] = this.obj;
						this.obj = this.foods_rx[this.click_food_index];
						this.foods_rx[this.click_food_index] = this.foods_rx[this.click_food_index+1];
						this.foods_rx[this.click_food_index+1] = this.obj;
						this.food_direct = -1;
						this.foods_validate_one(this.click_food_index+1)
					}
				}else if(this.food_direct == 2){
					if(Math.abs(this.foods_ry[this.click_food_index-7] - this.foods_ry[this.click_food_index] - this.room_h) > 0.0001){
					  this.foods_ry[this.click_food_index-7] += this.room_h/this.food_speed;
					}else{
						this.obj = this.foods_status[this.click_food_index-7];
						this.foods_status[this.click_food_index-7] = this.foods_status[this.click_food_index];
						this.foods_status[this.click_food_index] = this.obj;
						this.obj = this.foods_ry[this.click_food_index];
						this.foods_ry[this.click_food_index] = this.foods_ry[this.click_food_index-7];
						this.foods_ry[this.click_food_index-7] = this.obj;
						this.food_direct = -1;
						this.foods_validate_one(this.click_food_index-7)
					}
				}else if(this.food_direct == 3){
					if(Math.abs(this.foods_ry[this.click_food_index+7] - this.foods_ry[this.click_food_index] + this.room_h) > 0.0001){
					    this.foods_ry[this.click_food_index+7] -= this.room_h/this.food_speed;
					}else{
						this.obj = this.foods_status[this.click_food_index+7];
						this.foods_status[this.click_food_index+7] = this.foods_status[this.click_food_index];
						this.foods_status[this.click_food_index] = this.obj;
						this.obj = this.foods_ry[this.click_food_index];
						this.foods_ry[this.click_food_index] = this.foods_ry[this.click_food_index+7];
						this.foods_ry[this.click_food_index+7] = this.obj;
						this.food_direct = -1;
						this.foods_validate_one(this.click_food_index+7)
					}
				}
			};
			if(this.foods_remove_foo){
				if(Math.abs(this.foods_ry[this.remove_td] - 0.145) <= 0.0002){
					this.foods_remove_foo = false;
					this.food_down_move = false;
					return false;
				};
			    for(i=0;i<7;i++){
			    	this.foods_ry[i*7+this.remove_td] += 7*0.12/25
			    }
			}
		};
		  //时间秒表
			if(count%50 == 0){
				this.time++;
			};
	};
	
	this.exec = function(rx,ry){
		/*点击开始*/
		if(rx<0.5+0.06 && rx>0.5-0.06 && ry<0.5+0.1 && ry>0.5-0.1 && this.status == 0){
			this.status = 1;
		};
		/*点击拖动food*/
		if(rx>0.25537 && rx<0.743437 && ry>0.085256 && ry<0.916866 && this.status == 1){
			if(!this.food_down_move){
				this.food_move_foo = true;
				this.get_food_index(rx,ry);
			}
		}
	};
	this.game_food = function(){
		var inde;
		this.foods_status = [];
		for(i=0;i<49;i++){
				 inde = Math.round(Math.random()*100)%3;
				 this.foods_status.push(inde);
		};
	};
	/*this.game_validate = function(){
		var arr = this.foods_status;
		var str = arr.join("");
		var inde;
			arr = str.replace(/1111/g,Math.random() > 0.5 ? 2 : 0);
			arr = str.replace(/2222/g,Math.random() > 0.5 ? 1 : 0);
			arr = str.replace(/0000/g,Math.random() > 0.5 ? 1 : 2);
		    this.foods_status = arr.split('');	
		    for(i=21;i<this.foods_status.length;i++){
		    	if(this.foods_status[i] == this.foods_status[i-7] && this.foods_status[i] == this.foods_status[i-14]  &&this.foods_status[i] == this.foods_status[i-21]){
		    		this.foods_status[i] = this.foods_status[i] !=1 ? 3-this.foods_status[i]-1 : 1;
		    	}
		    }
	}*/
	//消除食物的方法 一字形
	this.foods_validate_one = function(index){
		this.remove_td = index%7;
		this.remove_tr = Math.floor(index/7);
		var arr_a = [],arr_b = [];
		 for(i=0;i<7;i++){
		 	arr_a[i] = this.foods_status[this.remove_tr*7+i];
		 	arr_b[i] = this.foods_status[i*7+this.remove_td];
		 };
		 var str_a = arr_a.join('');
		 var str_b = arr_b.join('');
		 if((str_a.search('1111111') != -1 || str_a.search('0000000') != -1  || str_a.search('2222222')!= -1)){
			//this.foods_remove_all_arr = this.foods_remove_all_arr.concat(arr_a);
			this.foods_animate(this.remove_td,this.remove_tr,0);
		    return true;
		 }else if(str_b.search('1111111') != -1 || str_b.search('0000000') != -1  || str_b.search('2222222')!= -1){
		   //this.foods_remove_all_arr = this.foods_remove_all_arr.concat(arr_b);
			this.foods_animate(this.remove_td,this.remove_tr,1);
		    return true;
		 }
		this.food_down_move = false;
	};
	//消除食物的动作
	this.foods_animate = function(td,tr,type){
		if(type == 0){
			 for(var i=0,arr=[];i<7;i++){
			 	arr[i] = Math.round(Math.random()*100)%3;
			 };
			 this.foods_status.splice(tr*7,7);
			 this.foods_status = arr.concat(this.foods_status);
			 this.grades +=5;
		}else if(type==1){
			this.foods_animate_li(td,7);
		};
	    this.foods_remove_foo = true;
	};
	//消除食物每例的运动
	this.foods_animate_li = function(td,move_y){
		for(i=0; i<move_y;i++){
				this.foods_ry[i*7+td] -= move_y*0.12;
				this.foods_status[i*7+td] =  Math.round(Math.random()*100)%3;
			}
	}
	//消除食物的方法1字形
	this.foods_validate_two = function(index){
		var arr;
		for(i=1;i<4;i++){
			if(this.foods_status[index] != this.foods_status[index-7*i]){
				return false;;
			};
		};
			this.foods_remove_foo = true;
			arr = [index,index-7,index-14,index-21];
			this.foods_remove_all_arr = this.foods_remove_all_arr.concat(arr);
			return true;
	};
	//移动食物
	this.food_move = function(mx,my){
		if(this.food_move_foo && this.food_direct == -1){
			if(this.foods_rx[this.click_food_index] < 0.25537+this.food_move.td*this.room_w){
				this.food_move_foo = false;
				if(this.food_move.td > 0){
				   this.foods_rx[this.click_food_index] = this.foods_rx[this.click_food_index-1];
				    this.foods_ry[this.click_food_index] = this.foods_ry[this.click_food_index-1];
				    this.food_direct = 0;
				    this.food_down_move = true;
				}else{
					this.foods_rx[this.click_food_index] =  0.29;
					this.foods_ry[this.click_food_index] = 0.145+this.food_move.tr*0.12;
					this.food_direct = -1;//向左移
				}
				return false;
			}else if(this.foods_rx[this.click_food_index] > 0.25537+(this.food_move.td+1)*this.room_w){
				this.food_move_foo = false;
				if(this.food_move.td < 6){
				   this.foods_rx[this.click_food_index] = this.foods_rx[this.click_food_index+1];
				    this.foods_ry[this.click_food_index] = this.foods_ry[this.click_food_index+1];
				    this.food_direct = 1;//向右移
				    this.food_down_move = true;
				}else{
					this.foods_rx[this.click_food_index] =  0.29+6*this.room_w;
					this.foods_ry[this.click_food_index] = 0.145+this.food_move.tr*0.12;
					this.food_direct = -1;
				}
				return false;
			};
			this.foods_rx[this.click_food_index] += mx;
			if(this.foods_ry[this.click_food_index] < 0.085256+this.food_move.tr*this.room_h){
				this.food_move_foo = false;
				if(this.food_move.tr >0){
					this.foods_ry[this.click_food_index] = this.foods_ry[this.click_food_index-7];
				   this.foods_rx[this.click_food_index] = this.foods_rx[this.click_food_index-7];
				   this.food_direct = 2;//向上移
				   this.food_down_move = true;
				}else{
					this.foods_rx[this.click_food_index] =  0.29+this.food_move.td*this.room_w;
					this.foods_ry[this.click_food_index] = 0.145;
					this.food_direct = -1;
				}
				return false;
			}else if(this.foods_ry[this.click_food_index] > 0.085256+(this.food_move.tr+1)*this.room_h){
				this.food_move_foo = false;
				if(this.food_move.tr < 6){
					this.foods_ry[this.click_food_index] = this.foods_ry[this.click_food_index+7];
				   this.foods_rx[this.click_food_index] = this.foods_rx[this.click_food_index+7];
				   this.food_direct = 3;//向下移
				   this.food_down_move = true;
				}else{
					this.foods_rx[this.click_food_index] =  0.29+this.food_move.td*this.room_w;
					this.foods_ry[this.click_food_index] = 0.145+6*0.12;
					this.food_direct = -1;
				};
				return false;//向上移
			}
			this.foods_ry[this.click_food_index] += my;
		}
	};
	this.food_move_down = function(){
		if(this.food_direct == -1){
			this.foods_rx[this.click_food_index] = 0.29+0.07*this.food_move.td;
			this.foods_ry[this.click_food_index] = 0.145+0.12*this.food_move.tr;
		};
	};
	//获取移动食物的下标
	this.get_food_index = function(cx,cy) {
		var x = Math.floor((cx-0.25537)/this.room_w);
		var y = Math.floor((cy-0.085256)/this.room_h);
		this.click_food_index = y*7+x;
		rx = 0.29+this.room_w*x;
		ry= 0.145+this.room_h*y;
		this.food_move.td = x;
		this.food_move.tr = y;
	}
	//验证食物
	this.foods_validate = function(){
		for(i=0;i<49;i++){
			this.foods_validate_one(i);
			this.foods_validate_two(i)
		}
		console.log(this.foods_remove_foo )
	};
	//加载完成执行
	 this.game_food();
	// this.game_validate()
}