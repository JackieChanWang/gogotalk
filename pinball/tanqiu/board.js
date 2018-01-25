function tanqiu() {
    var i = 0;
    //图片
    //开始遮罩，白色背景
    this.graybg = new Image();
    this.graybg.src = "tanqiu/img/gray.png";
    this.startbg = new Image();
    this.startbg.src = "tanqiu/img/white.png";
    this.opa = new Image();
    this.opa.src = "tanqiu/img/opa.png";
    //背景
    this.bg = new Image();
    this.bg.src = "tanqiu/img/back.png";
    this.blue = new Image();
    this.blue.src = "tanqiu/img/blue.png";
    //方块
    this.dict = new Image();
    this.dict.src = "tanqiu/img/floor.png";
    this.dicts = [];
    this.dictsfoo = [];
    this.dicts_index = [];
    for (i = 0; i < 44; i++) {
        this.dicts[i] = this.dict;
        this.dictsfoo[i] = false;
        this.dicts_index[i] = i;
    }
    //弹球
    this.qiu = new Image();
    this.qiu.src = "tanqiu/img/qiu.png";
    //挡板
    this.dangban = new Image();
    this.dangban.src = "tanqiu/img/black.png";
    //胜利
    this.win = new Image();
    this.win.src = "tanqiu/img/win.png";
    //生命值
    this.life = 3;
    //参数
    this.status = -1;
    //分数
    this.fenshu = 0;
    this.gradescolor = "#778";
    //弹球
    this.qiu_w = .0625 * .5;
    this.qiu_h = .1 * .5;
    this.qiu_rx = 0.5;
    this.qiu_ry = 0.923;
    this.direct = 1;//向下
    //开始颜色
    this.startcolor = "#0f0";
    //弹球运动
    this.speed = 2;
    // this.qiu_ang = 0;
    this.fangkuai_index = -1;//被撞击方块下标
    //挡板
    this.guard_rx = 0.5;
    this.guard_cdx = this.qiu_rx;
    this.guard_cdy = this.qiu_ry;
    this.dict_fangkuai_cdx = 0;
    this.dict_fangkuai_cdy = 0.125;
    this.count = 44;    //撞击的方块数量
    //埋藏问题方块的下标
    this.question_dict_arr = [];
    //
    this.answers = [];
    for (i = 0; i < 44; i++) {
        this.answers[i] = new Image();
        this.answers[i].src = "tanqiu/img/answers/" + i + ".png";
    }
    //封装的方法
    this.start = function () {
        if (count % 50 == 0) {
            this.startcolor = (Math.floor(count / 50)) % 2 == 0 ? "#0f0" : "#f00";
        }
        if (this.direct == 1) {     //未开始状态小球上下运动
            if (this.qiu_ry >= 0.88) {
                this.qiu_ry -= 0.0035
            } else {
                this.direct = -1;
            }
        } else if (this.direct == -1) {
            if (this.qiu_ry < 0.923) {
                this.qiu_ry += 0.0035
            } else {
                this.direct = 1;
            }
        }
    };
    //埋藏着问题的方块的下标
    this.question_dict = function (n) {  //n为有问题方块个数
        var arr = [], index;
        for (i = 0; i < 44; i++) {
            arr[i] = i;
        }
        for (i = 0; i < n; i++) {
            index = Math.floor(Math.random() * arr.length);
            this.question_dict_arr.push(arr.splice(index, 1));
        }
    };
    this.question_dict_validate = function (val) {  //问题
        if (this.question_dict_arr.join("$").indexOf("$" + val + "$") != -1) {
            // console.log(this.question_dict_arr);
            // var a = Math.floor(Math.random() * 10);
            // var v = prompt("问题：" + a + " + " + val + " =  ?");
            if (!this.dictsfoo[this.fangkuai_index]) {
                this.status = -2;
            }
            // console.log(this.fangkuai_index, this.dictsfoo[this.fangkuai_index]);
        }
    };

    //撞击方块和挡板
    this.fangkuai = function () {
        if (this.qiu_ry <= this.dict_fangkuai_cdy) {//撞方块
            this.status = 2;//向下
            this.question_dict_validate(this.fangkuai_index);
            this.dicts[this.fangkuai_index] = this.opa;//方块变色
            this.dictsfoo[this.fangkuai_index] = true;
            this.count--;
            console.log(this.count);
        } else if (this.qiu_ry >= 0.923 && this.qiu_ry < 0.933) {  //撞挡板
            if (this.qiu_rx > this.guard_rx - 0.05 && this.qiu_rx < this.guard_rx + 0.05) { //球下落在挡板的位置
                this.status = 1;
                this.guard_cdx = this.qiu_rx;
                this.guard_cdy = this.qiu_ry;
                this.qiu_dict_fangkuai(); //？？？
                this.fenshu += 1;
                this.gradescolor = this.fenshu > 0 ? "#778" : "#f00";
            }
        }
    };
    //挡板移动
    this.guardmove = function (mx) {
        this.guard_rx += mx;
        if (this.guard_rx - .1 / 2 <= 0) {
            this.guard_rx = .1 / 2;
        } else if (this.guard_rx + .1 / 2 >= 1) {
            this.guard_rx = 1 - .1 / 2;
        }
    };
    //方块位置
    this.qiu_dict_fangkuai = function () {  //cdx,cdy 弹球从下往上的起始位置
        this.qiu_dict_fangkuai_index();   //????
        this.dict_fangkuai_cdx = 0.028 + this.fangkuai_index % 22 * 0.045;
        // console.log(this.fangkuai_index);
        this.dict_fangkuai_cdy = 0.04 + Math.floor(this.fangkuai_index / 22) * 0.06 + 0.025 + 0.0175;
    };
    //被碰撞方块下标
    this.qiu_dict_fangkuai_index = function () {
        var index_length = this.dicts_index.length;
        var index = Math.floor(Math.random() * index_length);
        this.fangkuai_index = this.dicts_index[index];
        if (this.fangkuai_index < 22) {//第一排被第二排挡住的时候
            if (!this.dictsfoo[this.fangkuai_index + 22]) {
                this.fangkuai_index = this.fangkuai_index + 22;
                index = this.dicts_index.indexOf(this.fangkuai_index);
            }
        }
        this.dicts_index.splice(index, 1);
    };
    this.rend = function () {
        FrameDraw(this.bg, 0.5, 0.5, 1, 1);
        for (i = 0; i < 44; i++) {
            FrameDraw(this.dicts[i], 0.028 + i % 22 * 0.045, 0.04 + (Math.floor(i / 22) * 0.06), 0.04, 0.05)
        }
        //球
        FrameDraw(this.qiu, this.qiu_rx, this.qiu_ry, this.qiu_w, this.qiu_h);
        //  挡板
        FrameDraw(this.dangban, this.guard_rx, 0.95, .1, .02);
        FrameTxt("得分：" + this.fenshu, 5, 0.005, .5, this.gradescolor);
        FrameTxt("生命：" + this.life, 5, 0.005, .6, "#778");
        if (this.status == -1) {
            FrameDraw(this.graybg, 0.5, 0.5, 1, 1);
            FrameDraw(this.startbg, 0.5, 0.5, 0.2, 0.2);
            FrameTxt("开 始", 9, 0.445, 0.53, this.startcolor);
        } else if (this.status == -2) {
            if (this.fangkuai_index !== -1 && this.dictsfoo[this.fangkuai_index]) {
                FrameDraw(this.answers[this.fangkuai_index], .5, .5, .57, .246)
            }
        }
        /*else {
         FrameDraw(this.blue, 0.95, 0.5, .08, .08);
         FrameTxt(this.status < 0 ? "开始" : "暂停", 5, 0.92, .515, "#fff");
         }*/
        if (this.count <= -6 && this.life >= 0) {
            FrameDraw(this.graybg, 0.5, 0.5, 1, 1);
            FrameDraw(this.win, .5, .5, .2, .4, 0.4 * (Math.abs(count % 600 - 300) - 150));
        }
        if (this.qiu_ry > 1 && this.life <= 0) {
            FrameDraw(this.graybg, 0.5, 0.5, 1, 1);
            FrameTxt("游戏失败", 4, .5, .5, '#000')
        }
    };
    this.work = function () {
        // console.log(this.guard_rx);
        //暂停
        if (this.status == -1 || this.status == -2) {
            document.getElementById('event_canvas').style.cursor = "auto";
        } else {
            document.getElementById('event_canvas').style.cursor = "none";
        }
        if (this.status == -1) {//开始
            this.start();
        } else if (this.status == 0) {
            if (this.qiu_ry < 0.923) {
                this.qiu_ry += 0.004;
            } else {
                this.status = 1;
                this.fangkuai();//获取球体碰撞方块的位置
                this.question_dict(10)
            }
        } else if (this.status == 1) {//向上弹(游戏正式开始)
            this.qiu_ry -= (this.guard_cdy - this.dict_fangkuai_cdy) / 100 * this.speed;
            this.qiu_rx -= (this.guard_cdx - this.dict_fangkuai_cdx) / 100 * this.speed;
            this.direct = -1;
            //球体碰撞方块的位置
            if (this.qiu_ry <= this.dict_fangkuai_cdy) {
                this.fangkuai()
            }
        } else if (this.status == 2) {//向下弹
            if (this.life <= 0) {    //生命值
                this.status = 0;
            } else {
                this.qiu_ry += 0.01;
                this.direct = 1;
                //验证球体碰撞挡板的位置
                if (this.qiu_ry >= 0.923 && this.qiu_ry < 0.933) {
                    this.fangkuai();
                } else if (this.qiu_ry > 1.2) { //挡板没有接住小球
                    //吴正勇dddd
                    this.status = 0;
                    this.qiu_ry = 0.923;
                    this.qiu_rx = this.guard_rx;
                    // this.fenshu -= 3;
                    if (this.life > 0) {
                        this.life -= 1;
                    }
                    this.gradescolor = this.fenshu > 0 ? "#778" : "#f00";
                }
                if (this.count <= 0) {
                    // console.log(this.count);
                    this.status = -2;
                    this.start();
                    console.log(count + "< 0的时候");
                }
            }
        }
    };

    this.exec = function (rx, ry) {
        //答题
        if (this.status == -2) {
            if (this.fangkuai_index !== -1 && this.dictsfoo[this.fangkuai_index]) {
                //todo
                this.status = this.direct == 1 ? 2 : 1;
                // this.status = this.direct = 1;
                // console.log(this.status,11111);
            }
        }
        //点击开始
        if (rx > 0.5 - 0.1 && rx < 0.5 + 0.1 && ry > 0.5 - 0.1 && ry < 0.5 + 0.1 && this.status == -1) {
            this.status = 0;
        }
        /*//暂停取消
         if (rx > 0.95 - 0.04 && rx < 0.95 + 0.04 && ry > 0.5 - 0.04 && ry < 0.5 + 0.04) {
         if (this.status >= 0) {
         this.status = -2;
         } else if (this.status == -2) {
         this.status = this.direct == 1 ? 2 : 1;
         console.log(this.status);
         }
         }*/

    };
    var move_cx;
    this.execmove = function (rx, ry) {  //鼠标移动的位置
        // console.log(rx, ry);
        if (this.status > 0) {
            move_rx = move_cx ? move_cx : rx;
            this.guardmove(rx - move_rx);
            move_cx = rx;
        }
    };
    this.keyevent = function (x) {  //键盘事件
        if (x == 65 || x == 37) {  //左
            this.guard_rx -= .02;
            if (this.guard_rx - .1 / 2 <= 0) {
                this.guard_rx = .1 / 2;
            }
        } else if (x == 68 || x == 39) {
            this.guard_rx += .02;
            if (this.guard_rx + .1 / 2 >= 1) {
                this.guard_rx = 1 - .1 / 2;
            }
        }
    }
}