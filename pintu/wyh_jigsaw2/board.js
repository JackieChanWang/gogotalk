function wyh_jigsaw2() {
    //判断修改颜色    暂时用不到
    this.color_exactness = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.color_wrong = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //判断进程     暂时没用
    this.start = [0, 0];
    this.status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    /*储存字符串用来判断游戏成功*/
    this.str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    this.str_chars = "";
    //储存当前点击x,y轴数值
    this.coordinate_rxnum = 0; //储存当前x坐标
    this.coordinate_rynum = 0; //储存当前y坐标
    //储存空格方框的xy坐标
    //大格子的坐标
    this.lattice_rx = 0.3;
    this.lattice_ry = 0.5;
    this.lattice_w = 0.05625 * 9;
    this.lattice_h = .9;
    //空格方框的长宽
    this.coordinate_w = [0.05625 * 3 * .85, 0.05625 * 2.25 * .84, 0.05625 * 1.8 * .84];
    this.coordinate_h = [0.3 * .75, 0.225 * .76, 0.18 * .75];
    //图片的基础间距x，y坐标
    this.picture_rx = [0.33125 - .17, 0.3105 - .16, 0.29775 - .16];
    this.picture_ry = [0.2 + .13, 0.1625 + .14, 0.14 + .145];
    //小方框的数值数据3x3
    this.rw = this.coordinate_w[0];
    this.rh = this.coordinate_h[0];
    this.coordinate_rx = [this.picture_rx[0], this.picture_rx[0] + this.rw, this.picture_rx[0] + this.rw * 2, this.picture_rx[0], this.picture_rx[0] + this.rw, this.picture_rx[0] + this.rw * 2, this.picture_rx[0], this.picture_rx[0] + this.rw, this.picture_rx[0] + this.rw * 2];
    this.coordinate_ry = [this.picture_ry[0], this.picture_ry[0], this.picture_ry[0], this.picture_ry[0] + this.rh, this.picture_ry[0] + this.rh, this.picture_ry[0] + this.rh, this.picture_ry[0] + this.rh * 2, this.picture_ry[0] + this.rh * 2, this.picture_ry[0] + this.rh * 2];
    //按鈕的坐標
    this.push_rx = [.62, .62, .62];
    this.push_ry = [.6, .72, .85];
    this.push_w = .1;
    this.push_h = .1;
    /*this.left1 = new Image();
     this.left1.src = "wyh_jigsaw2/img/1.png";
     this.left2 = new Image();
     this.left2.src = "wyh_jigsaw2/img/2.png";
     this.left3 = new Image();
     this.left3.src = "wyh_jigsaw2/img/3.png";*/
    // this.text = [this.left1, this.left2, this.left3];
    //开关按钮
    this.open = new Image();
    this.open.src = "wyh_jigsaw2/img/open.png";
    this.close = new Image();
    this.close.src = "wyh_jigsaw2/img/close.png";
    //判断点击的第几个
    this.num = -1; //非常重要滴
    //判断是第几组片
    this.num_index = 0; //非常重要滴
    this.Changelevel = 0; //更换图片 未使用
    //判断图片次序
    this.index_bool = 0;
    this.index_num1 = -1;
    this.index_num2 = -1;
    this.index_char = -1;
    /*选中框*/
    this.xuanzhong = new Image();
    this.xuanzhong.src = 'wyh_jigsaw2/img/xuanzhong.png';
    /*完成图*/
    this.good1 = new Image();
    this.good1.src = 'wyh_jigsaw2/img/l1.png';
    this.good2 = new Image();
    this.good2.src = 'wyh_jigsaw2/img/l2.png';
    this.good3 = new Image();
    this.good3.src = 'wyh_jigsaw2/img/l3.png';
    this.good = [this.good1, this.good2, this.good3];
    //成功图片
    this.win1 = new Image();
    this.win1.src = "wyh_jigsaw2/img/a0.png";
    this.win2 = new Image();
    this.win2.src = "wyh_jigsaw2/img/a1.png";
    this.win3 = new Image();
    this.win3.src = "wyh_jigsaw2/img/a2.png";
    //取消页面
    this.cancel = new Image();
    this.cancel.src = "wyh_jigsaw2/img/cancel.png";
    //时间
    this.time = 0;
    //步数
    this.walk = 0;
    //点击开始游戏
    this.startNum = 0;
    this.startFlag = true;
    //成功之后图片移动
    this.moveCard = [.05, 0, .3375 * .55, .533 * .75];
    this.endCard = [.55, .8];
    this.num_suiji = [];
    var suijis = 9;
    this.rend = function () {
        //去除重复的图片
        for (x in this.coordinate_rx) {
            if (this.num_suiji.length < this.coordinate_rx.length) {
                var num = suiji();
                for (y in this.num_suiji) {
                    if (this.num_suiji[y] == num) {
                        return;
                    }
                }
                this.num_suiji.push(num);
            }
            //画画不解释
            FrameDraw(this.imgList[this.num_index].img[this.num_suiji[x]], this.coordinate_rx[x], this.coordinate_ry[x], this.coordinate_w[this.num_index], this.coordinate_h[this.num_index], 0)
        }
        for (x in this.push_rx) {
            // FrameDraw(this.imgList[0].img[0], this.push_rx[x], this.push_ry[x], this.push_w, this.push_h, 0);
            /* 初级 高级 字体 */
            // FrameDraw(this.text[x], 2.8, this.push_rx[x] - 0.048, this.push_ry[x], '#fff');
            // FrameDraw(this.text[x], this.push_rx[x], this.push_ry[x], this.push_w, this.push_h, 0)
        }
        //右上角整图
        FrameDraw(this.good[this.num_index], .84, .25, .51 * .2, .906 * .2, 0);
        //计时
        num = Math.floor(this.time / 50);
        FrameTxt("所用时间:", 4, .25, .15, '#34d331');
        FrameTxt(num + 's', 5, .36, .15, '#34d331');
        //步数计数
        FrameTxt('移动次数：', 4, .77, .63, '#fff');
        FrameTxt(this.walk, 4, .89, .63, '#fff');
        //开始
        if (this.startFlag == true) {
            FrameTxt("开始游戏", 4, .8, .485, '#fff');
        } else if (this.startFlag == false) {
            FrameTxt("暂停游戏", 4, .8, .485, '#fff');
            // FrameDraw(this.cancel, .5, .5, 1, 1);
        }
        if (this.index_num1 != -1) {
            FrameDraw(this.xuanzhong, this.coordinate_rx[this.num], this.coordinate_ry[this.num], this.coordinate_w[this.num_index], this.coordinate_h[this.num_index], 0)
        }
        //成功图片
        if (this.str_chars == "abcdefghi") {
            FrameDraw(this.win1, this.moveCard[0], this.moveCard[1], this.moveCard[2], this.moveCard[3]);
            this.startFlag = true;
            this.startNum = 0;
        } else if (this.str_chars == "abcdefghijkmlnop") {
            FrameDraw(this.win2, this.moveCard[0], this.moveCard[1], this.moveCard[2], this.moveCard[3]);
            this.startFlag = true;
            this.startNum = 0;
        } else if (this.str_chars == "abcdefghijkmlnopqrstuvwxy") {
            FrameDraw(this.win3, this.moveCard[0], this.moveCard[1], this.moveCard[2], this.moveCard[3]);
            this.startFlag = true;
            this.startNum = 0;
        }
    };
    this.work = function () { //执行
        if (this.str_chars == "abcdefghi" || this.str_chars == "abcdefghijkmlnop" || this.str_chars == "abcdefghijkmlnopqrstuvwxy") {
            if (this.moveCard[0] >= .3105) {
                return;
            }
            dx = this.endCard[0] - this.moveCard[1];
            dy = this.endCard[1] - this.moveCard[1];
            if (dx * dx + dy * dy < .0005) {
                return
            }
            speed = .005;
            dz = Math.sqrt(dx * dx + dy * dy);
            this.moveCard[0] += dx / dz * speed;
            this.moveCard[1] += dy / dz * speed;
            this.moveCard[2] += .002;
            this.moveCard[3] += .002;
            return
        }
        if (this.startNum == 1 && this.startFlag == false) {
            this.time++;
        }
    };
    this.exec = function (rx, ry) { //点击事件

        //点击开始
        if (rx > .754 && ry > .43 && rx < .92 && ry < .513) {
            this.startNum = 1;
            this.startFlag = !this.startFlag;    //结束
        }
        if (this.startNum >= 1 && this.startFlag == false) {
            /* 点击图片之间的替换 */
            if (rx > this.lattice_rx - this.lattice_w / 2 && rx < this.lattice_rx + this.lattice_w / 2 &&
                ry > this.lattice_ry - this.lattice_h / 2 && ry < this.lattice_ry + this.lattice_h / 2) {
                for (x in this.coordinate_rx) {
                    if (rx > this.coordinate_rx[x] - this.coordinate_w[this.num_index] / 2 && rx < this.coordinate_rx[x] + this.coordinate_w[this.num_index] / 2 && ry > this.coordinate_ry[x] - this.coordinate_h[this.num_index] / 2 && ry < this.coordinate_ry[x] + this.coordinate_h[this.num_index] / 2) {
                        //判断过关了
                        if (this.str_chars == "abcdefghi" || this.str_chars == "abcdefghijkmlnop" || this.str_chars == "abcdefghijkmlnopqrstuvwxy") {
                            this.index_num1 = -1;
                            return
                        }
                        this.num = x;
                        if (this.index_bool == 1 && this.index_num1 != x) {
                            this.index_num2 = x;
                            //数据转换
                            this.index_char = this.num_suiji[this.index_num2];
                            this.num_suiji[this.index_num2] = this.num_suiji[this.index_num1];
                            this.num_suiji[this.index_num1] = this.index_char;
                            this.index_num1 = -1; //数据初始化
                            this.index_num2 = -1;
                            this.index_bool = 0;
                            this.walk++;    //步数加
                            this.str_chars = [];
                            for (j in this.str) {
                                this.str_chars += this.str[this.num_suiji[j]];
                            }
                        } else if (this.index_bool == 0) {
                            this.index_bool = 1;
                            this.index_num1 = x;

                        } else if (this.index_bool == 1 && this.index_num1 == x) {
                            this.index_bool = 0;
                            this.index_num1 = -1;
                        }
                        return false;
                    }
                }
            }
        } else {

        }
        // 修改游戏难易程度
        // 游戏正在进行时，选择游戏难度弹出页面
        if (this.startNum == 0) {
            for (x in this.push_rx) {
                if (rx > this.push_rx[x] - this.push_w && rx < this.push_rx[x] + this.push_w && ry > this.push_ry[x] - this.push_h && ry < this.push_ry[x] + this.push_h) {
                    if (x != 3) {
                        /*储存空格方框的xy坐标*/
                        this.coordinate_rx = [];
                        this.coordinate_ry = [];
                        this.num_suiji = [];
                        this.walk = 0;
                        this.time = 0;
                        this.startNum = 0;
                        this.str_chars = [];
                        this.str = [];
                        this.moveCard = [.05, 0, .3375 * .55, .533 * .75];
                        this.endCard = [.55, .8];

                        //小方框的数值数据3x3
                        this.rw = this.coordinate_w[x];
                        this.rh = this.coordinate_h[x];
                        //小方框的数值数据3x3
                        /*储存字符串用来判断游戏成功*/
                        if (x == 0) {
                            this.str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
                            this.coordinate_rx = [this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2];
                            this.coordinate_ry = [this.picture_ry[x], this.picture_ry[x], this.picture_ry[x], this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2];
                            suijis = 9;
                        } else if (x == 1) {
                            this.str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'l', 'n', 'o', 'p'];
                            this.coordinate_rx = [this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3];
                            this.coordinate_ry = [this.picture_ry[x], this.picture_ry[x], this.picture_ry[x], this.picture_ry[x], this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 3];
                            suijis = 16;
                        } else if (x == 2) {
                            this.str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'l', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'];
                            this.coordinate_rx = [this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x] + this.rw * 4, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x] + this.rw * 4, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x] + this.rw * 4, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x] + this.rw * 4, this.picture_rx[x], this.picture_rx[x] + this.rw, this.picture_rx[x] + this.rw * 2, this.picture_rx[x] + this.rw * 3, this.picture_rx[x] + this.rw * 4];
                            this.coordinate_ry = [this.picture_ry[x], this.picture_ry[x], this.picture_ry[x], this.picture_ry[x], this.picture_ry[x], this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 2, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 3, this.picture_ry[x] + this.rh * 4, this.picture_ry[x] + this.rh * 4, this.picture_ry[x] + this.rh * 4, this.picture_ry[x] + this.rh * 4, this.picture_ry[x] + this.rh * 4];
                            suijis = 25;
                        }
                        //判断是第几组片
                        this.num_index = x;
                    }
                }
            }
        }

    };
    this.keyevent = function (x) {
    };
    this.imgstart = function (data) { //根据this.imgstart数组的数量创建图片
        var temp = [];
        for (var x = 0; x < data.length; x++) {
            //清空相应数组以及集合
            data[x].img = [];
            temp[x] = {};
            temp[x].img = [];
            /*第一组图片 通过循环添加图片到数组中*/
            if (x == 0) {
                for (var i = 1; i <= 9; i++) {
                    data[x].img.push('wyh_jigsaw2/img/L1/' + i + '.png')
                }
            }
            /*第二组图片 通过循环添加图片到数组中*/
            if (x == 1) {
                for (var i = 0; i < 16; i++) {
                    data[x].img.push('wyh_jigsaw2/img/L2/' + (i + 1) + '.png')
                }
            }
            /*第三组图片  通过循环添加图片到数组中*/
            if (x == 2) {
                for (var i = 0; i < 25; i++) {
                    data[x].img.push('wyh_jigsaw2/img/L3/' + (i + 1) + '.png')
                }
            }
            for (j in data[x].img) {
                temp[x].img[j] = new Image(); //实例化图片
                temp[x].img[j].src = data[x].img[j];
            }
        }
        return temp;
    };
    this.imgList = this.imgstart([{
        img: []
    }, {
        img: []
    }, {
        img: []
    }]);

    function suiji() {
        var num = parseInt(Math.random() * suijis);
        return num;
    }
}