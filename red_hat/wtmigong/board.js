arr = [
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 3, 0, 0, 0, 1, 0, 3, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 0, 1, 0, 0, 3, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 3, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 1, 0, 1, 3, 0, 1,
    1, 0, 3, 0, 0, 1, 0, 1, 1,
    1, 0, 1, 1, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 3, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1
];
function wtmigong() {
    this.stop = 0;
    //开始坐标
    this.pos = [1, 3];
    //行走小人的索引
    this.peopleIndex = 0;
    //	this.ss=-1;
    this.Bian = 1;
    this.newArr = [];
    //背景音乐
    this.audio = new Audio();
    this.audio.src = "wtmigong/sound/rang.mp3";
    //点击错误的音乐
    this.error = new Audio();
    this.error.src = "wtmigong/sound/error.mp3";
    //点击正确的音乐
    this.success = new Audio();
    this.success.src = "wtmigong/sound/success.mp3";

    this.block = new Image();
    this.block.src = "wtmigong/img/block1.png";
    this.wall1 = new Image();
    this.wall1.src = "wtmigong/img/wall2.png";
    //方向盘
    this.aspect1 = new Image();
    this.aspect1.src = "wtmigong/img/aspect1.png";
    //失败图片
    this.lose = new Image();
    this.lose.src = "wtmigong/img/lose.png";
    //加载页面
    loading = [];
    for (var i = 0; i < 71; i++) {
        loading[i] = 'wtmigong/img/loading/' + i + '.png';
    }
    this.loading = new PaperSets(loading);

    //遮罩层
    this.shade = new Image();
    this.shade.src = "wtmigong/img/op.png";
    //对号  错号
    this.false1 = new Image();
    this.false1.src = "wtmigong/img/false.png";
    this.true1 = new Image();
    this.true1.src = "wtmigong/img/true.png";
    //说明文字
    this.explain = new Image();
    this.explain.src = "wtmigong/img/explain1.png";
    //得分时间一栏
    this.title = new Image();
    this.title.src = "wtmigong/img/title_02.png";
    //判断
    this.panduan = 0;
    //行走的小人图片
    this.people = [];
    for (var i = 0; i < 4; i++) {
        this.people[i] = new Image();
        this.people[i].src = "wtmigong/img/p" + i + ".png";
    }
    //定义吃的数组
    this.imgs = [];
    for (var i = 0; i < 10; i++) {
        this.imgs[i] = new Image();
        this.imgs[i].src = "wtmigong/img/" + i + ".png";
    }

    //数组的随机判断
    this.imgs.sort(function (a, b) {
        return Math.random() > .5 ? -1 : 1;
    });
    //初始化吃的图片
    this.beginImg = function () {
        //定义吃的数组
        this.imgs = [];
        for (var i = 0; i < 8; i++) {
            this.imgs[i] = new Image();
            this.imgs[i].src = "wtmigong/img/" + i + ".png";
        }
        //数组的随机判断
        /*this.imgs.sort(function (a, b) {
         return Math.random() > .5 ? -1 : 1;
         });*/
    };
    //食物对应的单词
    this.eats = [];
    for (var i = 0; i < 8; i++) {
        this.eats[i] = new Image();
        this.eats[i].src = "wtmigong/img/a" + i + ".png";
    }
    //胜利的手势
    this.win = new Image();
    this.win.src = 'wtmigong/img/win.png';
    /* x轴运动 */
    this.right = 0;
    /* y轴运动 */
    this.top = 0;
    this.map = new map(12, 9);//12,10
    //显示图片
    this.img = 0;
    this.imgStatus = false;
    //定义图片的索引
    this.imgIndex = 0;
    //小人的当前坐标
    this.people_x = 0.05 + this.pos[0] * 0.05;
    this.people_y = 0.08 + this.pos[1] * 0.085;
    //记录坐标
    this.h_x = 0;
    this.h_y = 0;
    //记录封面开始
    this.coverNum = 0;
    //背景音乐播放
    this.played = 0;
    //记录答对次数
    this.winNum = 0;
    //点击开始
    this.timeNum = 3000;
    //  移动方向
    this.move = function (op) {
        if (op == 0) {
            //向右移动
            if (this.map.arr[this.pos[0] + 1][this.pos[1]] == 1) {
                return;
            }
            this.pos[0]++;
            if (this.pos[0] > 12) {
                return
            }
        }
        if (op == 1) {
            //向下移动
            if (this.map.arr[this.pos[0]][this.pos[1] + 1] == 1) {
                return;
            }
            this.pos[1]++;
        }
        if (op == 2) {
            // 起始位置向左移动，跳出
            if (this.pos[0] < 1) {
                return
            }
            //向左移动
            if (this.map.arr[this.pos[0] - 1][this.pos[1]] == 1) {
                return;
            }
            this.pos[0]--;
        }
        //向上移动
        if (op == 3) {
            if (this.map.arr[this.pos[0]][this.pos[1] - 1] == 1) {
                return;
            }
            this.pos[1]--;
        }
        //走到蓝色的时候,显示吃的图片,蓝色图片消失
        if (this.map.arr[this.pos[0]][this.pos[1]] == 3) {
            this.img++;
            if (this.img >= 8) {
                this.img = 0;
            }
            //找出图片的坐标
            this.x = this.pos[0];
            this.y = this.pos[1];
            this.map.arr[this.pos[0]][this.pos[1]] = 3; //直接过去
            this.imgStatus = true;
        }
        this.people_x = 0.05 + this.pos[0] * 0.05; //x
        this.people_y = 0.05 + this.pos[1] * 0.085; //y
    };
    this.rend = function () {
        if (this.coverNum >= 1) {
            for (var i = 0; i < this.map.row; i++) {
                for (var j = 0; j < this.map.col; j++) {
                    FrameDraw(this.block, 0.23 + i * 0.05, 0.2 + j * 0.085, 0.05, 0.085, 0);
                }
            }
            if (this.newArr.length > 0) {
                for (var i = 0; i < this.map.row; i++) {
                    for (var j = 0; j < this.map.col; j++) {
                        if (this.map.arr[i][j] == 3) {
                            this.Bian = 1;
                            this.imgIndex++;
                            if (this.imgIndex >= 8) {
                                this.imgIndex = 0;
                            }
                            //获取图片放大时候的坐标
                            if (i == this.x && j == this.y) {
                                for (x in this.newArr) {
                                    if (this.newArr[x] == this.imgIndex) {
                                        this.Bian = 0;
                                    }
                                }
                                if (this.Bian == 1) {
                                    this.bigIndex = this.imgIndex;
                                    this.Bian = 2;
                                }
                            }
                            for (x in this.newArr) {
                                if (this.newArr[x] == this.imgIndex) {
                                    this.imgs[this.imgIndex] = "";
                                }
                            }
                            FrameDraw(this.imgs[this.imgIndex], 0.23 + i * 0.05, 0.2 + j * 0.085, 0.3125 * .3, 0.555 * .3, 0);
                        }
                        if (this.map.arr[i][j] == 1) {
                            FrameDraw(this.wall1, 0.23 + i * 0.05, 0.2 + j * 0.085, 0.05, .085, 0);
                        }
                    }
                }
            } else {
                for (var i = 0; i < this.map.row; i++) {
                    for (var j = 0; j < this.map.col; j++) {
                        if (this.map.arr[i][j] == 3) {
                            this.imgIndex++;
                            //获取图片放大时候的坐标
                            if (this.imgIndex >= 8) {
                                this.imgIndex = 0;
                            }
                            if (i == this.x && j == this.y) {
                                this.bigIndex = this.imgIndex;
                            }
                            FrameDraw(this.imgs[this.imgIndex], 0.23 + i * 0.05, 0.2 + j * 0.085, 0.3125 * .3, .555 * .3, 0);
                        }
                        if (this.map.arr[i][j] == 1) {  //围墙
                            FrameDraw(this.wall1, 0.23 + i * 0.05, 0.2 + j * 0.085, 0.05, 0.085, 0);
                        }
                    }
                }
            }
            //行走的小人
            FrameDraw(this.people[this.peopleIndex], 0.23 + this.pos[0] * 0.05, 0.18 + this.pos[1] * 0.085, 0.05, 0.085, 0);
            //路程走完胜利手势
            if (this.winNum > 100) {
                FrameDraw(this.shade, .5, .5, 1, 1, 0);
                FrameDraw(this.win, .5, .6, .738 * .8, 1.07 * .8, 0);
                return;
            }
            FrameDraw(this.title, .5, .05, .93, .134);
            // 答对问题数目
            FrameTxt('目前得分：', 4, .12, .06, '#000');
            FrameTxt(this.winNum, 6, .24, .07, '#f00');
            //计时
            num = Math.floor(this.timeNum / 50);
            FrameTxt('所剩时间：', 4, .7, .06, '#000');
            FrameTxt(num + 's', 6, .82, .07, '#f00');
            /* 圆盘方向 */
            // FrameDraw(this.aspect1, .25, .7, .5, .5);
            this.panduan = 0;
            if (this.img != -1 && this.imgStatus) {
                for (x in this.newArr) {
                    if (this.bigIndex == this.newArr[x]) {
                        this.panduan = 1;
                        this.imgStatus = false;
                    }
                }
                if (this.panduan == 0) {
                    FrameDraw(this.shade, .5, .5, 1, 1, 0);
                    FrameDraw(this.imgs[this.bigIndex], .5, .4, .3125 * 1.6, .555 * 1.6, 0);
                    FrameDraw(this.eats[this.bigIndex], .5, .75, .125 * 2, .111 * 2, 0);
                    FrameDraw(this.false1, .2, .7, .3, .3, 0);
                    FrameDraw(this.true1, .8, .7, .3, .3, 0);
                }
            }
        }
        if (this.timeNum <= 0) {
            FrameDraw(this.lose, .5, .55, .737, .811);
        }
        //封面显示
        if (this.coverNum == 0) {
            FrameDraw(this.explain, .5, .5, 1.2, 1.2);
        }
        if (this.load < 150) {
            this.loading.show(.6, .5, .5, .25 * 4, .333 * 4, 0);
        }
    };

    this.work = function () {
        // this.audio.play();
        if (this.coverNum >= 1) {
            if (this.timeNum <= 0 || this.winNum > 100) {
                return
            }
            if (this.load >= 150) {
                this.timeNum--;
            }
            this.load++;
            // console.log(this.load);
        }
    };
    this.exec = function (rx, ry) {
        // console.log(rx, ry);
        //游戏开始
        if (this.coverNum == 0 && rx > .5 - .1725 * 1.49 / 2 && rx < .5 + .1725 * 1.49 / 2 && ry > .85 - .051 * 1.49 / 2 && ry < .85 + .051 * 1.49 / 2) {
            this.coverNum++;
            //加载页面
            this.load = 0;
            console.log(this.load);

        }
        //点击结束游戏
        if (this.winNum > 100 && ( rx > .389 && rx < .585 && ry > .798 && ry < .887)) {
            this.coverNum = 0;
            // this.coverNum++;
            // this.load = 0;
            return
        }
        //点击重置游戏
        if (this.timeNum == 0 && (rx > .306 && ry > .84 && rx < .646 && ry < .99)) {//
            this.map.clear();
            this.newArr = [];
            this.pos = [1, 3];
            this.timeNum = 3000;
            this.peopleIndex = 0;
            this.imgStatus = false;
            this.beginImg();
            this.winNum = 0;
        }
        //游戏胜利
        if (this.winNum > 100) {
            this.coverNum++;
            this.load = 0;
            return
        }
        if (this.coverNum >= 1) {
            this.h_x = Math.abs(rx - this.people_x);
            this.h_y = Math.abs(ry - this.people_y) * 0.5625;
            if (!this.imgStatus) {
                if (rx > .856 && ry > .652 && rx < .892 && ry < .746) { //右  (rx - this.people_x > 0 && this.h_x >= this.h_y)
                    this.move(0);
                    this.peopleIndex = 0;
                }
                if (rx > .764 && ry > .665 && rx < .795 && ry < .758) { //左   rx - this.people_x <= 0 && this.h_x >= this.h_y
                    this.move(2);
                    this.peopleIndex = 2;
                }
                if (rx > .8099 && ry > .587 && rx < .853 && ry < .64) { //上   (ry - this.people_y < 0 && this.h_y >= this.h_x) ||
                    this.peopleIndex = 3;
                    this.move(3);
                }
                if (rx > .794 && ry > .774 && rx < .852 && ry < .829) { //下   (ry - this.people_y >= 0 && this.h_y >= this.h_x) ||
                    this.move(1);
                    this.peopleIndex = 1;
                }
            } else {
                //	点击错号
                if (rx > 0.05 && rx < 0.35 && ry > 0.55 && ry < 0.85) {
                    this.timeNum = 3000;
                    this.map.clear();
                    this.error.play();
                    this.newArr = [];
                    this.pos = [1, 3];
                    this.peopleIndex = 0;
                    this.imgStatus = false;
                    this.beginImg();
                    if (this.winNum <= 0) {
                        return;
                    }
                    this.winNum -= 10;
                }
                //点击对号
                if (rx > 0.65 && rx < 0.95 && ry > 0.55 && ry < 0.85) {
                    this.winNum += 15;
                    this.success.play();
                    this.imgStatus = false;
                    this.newArr.push(this.bigIndex);
                }
            }
        }
    };
    this.keyevent = function (x) {
        console.log(x);
        if (!this.imgStatus) {
            if (this.winNum > 100 || this.timeNum == 0) {
                return
            }
            //向左移动
            if (x == 37 || x == 65) {
                this.move(2);
                this.peopleIndex = 2;
            }
            //向右移动
            if (x == 39 || x == 68) {
                this.move(0);
                this.peopleIndex = 0;
            }
            //向上移动
            if (x == 38 || x == 87) {
                this.move(3);
                this.peopleIndex = 3;
            }
            //向下移动
            if (x == 40 || x == 83) {
                this.move(1);
                this.peopleIndex = 1;
            }
        } else {
            //向左移动
            if (this.panduan == 0) {
                if (x == 37 || x == 65) {
                    this.timeNum = 3000;
                    this.map.clear();
                    // this.error.play();
                    this.newArr = [];
                    this.pos = [1, 3];
                    this.peopleIndex = 0;
                    this.imgStatus = false;
                    this.beginImg();
                    if (this.winNum <= 0) {
                        return;
                    }
                    this.winNum -= 10;
                }
                //向右移动
                if (x == 39 || x == 68) {
                    this.winNum += 15;
                    // this.success.play();
                    this.imgStatus = false;
                    this.newArr.push(this.bigIndex);
                }
            }
        }
    }
}
function map(x, y) {
    this.row = x;
    this.col = y;
    this.arr = [];
    for (var i = 0; i < x; i++) {
        this.arr[i] = [];
        for (var j = 0; j < y; j++) {
            this.arr[i][j] = arr[i * y + j];
        }
    }
    //初始化迷宫
    this.clear = function () {
        this.arr = [];
        for (var i = 0; i < x; i++) {
            this.arr[i] = [];
            for (var j = 0; j < y; j++) {
                this.arr[i][j] = arr[i * y + j];
            }
        }
    }
}