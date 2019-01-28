var oCount = document.getElementById('count'),
        oCountDown = document.getElementById('countDown'),
        oWolfs = document.getElementById('wolfs'),
        oMenu = document.getElementById('menu'),
        gameStart = document.getElementsByClassName('gameStart')[0],
        gameShow = document.getElementsByClassName('gameShow')[0],
        timgBox = document.getElementsByClassName('timg-box')[0],
        cover = document.getElementsByClassName('cover')[0],
        author = document.getElementsByClassName('author')[0],
        gameOver = document.getElementById('gameOver');
var wolfArr = [
        { left: "98px", top: "115px" },
        { left: "17px", top: "160px" },
        { left: "15px", top: "220px" },
        { left: "30px", top: "293px" },
        { left: "122px", top: "273px" },
        { left: "207px", top: "295px" },
        { left: "200px", top: "211px" },
        { left: "187px", top: "141px" },
        { left: "100px", top: "185px" }
];
var countDownWidth = oCountDown.offsetWidth;
//点击游戏说明：
gameShow.onclick = function () {
        cover.style.display = 'block';
}
//关闭游戏说明：
timgBox.onclick = function () {
        cover.style.display = 'none';
}
//游戏结束点击重新开始：
gameOver.onclick = function () {
    _refresh();
}
function _refresh(){
        location.reload();
    }
//点击开始：时间缩减、menu消失
gameStart.onclick = function () {
        oMenu.style.display = 'none';
        author.style.display = 'none';
        // var startGameTime = null;
        startGameTime = setInterval(function () {
                countDownWidth--;
                oCountDown.style.width = countDownWidth + 'px';
                if (countDownWidth <= 0) {
                        clearInterval(startGameTime);
                        clearInterval(creatWolfTime);//这块犯过错误，没写
                        gameOver.style.display = 'block';
                }
        }, 60)
        //创建狼
        var creatWolfTime = null;
        var num = -99999999999999;
        creatWolfTime = setInterval(function () {
                var rand = getRandom(0, wolfArr.length - 1);//0-8之间的随机数
                var randType = getRandom(0, 100);//存放类型的0到100的随机数
                // console.log(rand)
                if (num == rand) {
                        return;
                }
                num = rand;
                var wolf = new Image();//创建一个狼的img(特别注意：I要大写)
                //随机生成狼的位置
                wolf.style.left = wolfArr[rand].left;
                wolf.style.top = wolfArr[rand].top;

                //随机生成狼的类型（大灰狼和小灰灰）
                randType > 80 ? wolf.type = 'x' : wolf.type = 'h';
                wolf.index = 0;
                wolf.src = 'img/' + wolf.type + wolf.index + '.png';//拼接狼的类型和下标
                oWolfs.appendChild(wolf);//犯过错误：appendChild 中的C一定要大写

                //创建一个狼向上移动的动画
                wolf.upTime = setInterval(function () {
                        wolf.index++;
                        if (wolf.index <= 5) {
                                wolf.src = 'img/' + wolf.type + wolf.index + '.png';
                        } else {
                                clearInterval(wolf.upTime);
                                //创建一个狼向下的动画
                                wolf.downTime = setInterval(function () {
                                        wolf.index--;
                                        if (wolf.index <= 0) {
                                                clearInterval(wolf.downTime);
                                                oWolfs.removeChild(wolf);//犯过错误：没写狼生成之后，动画下去之后，应该把狼删除掉
                                        }
                                        wolf.src = 'img/' + wolf.type + wolf.index + '.png';
                                }, 80)
                        }
                }, 100)
                //给狼添加点击事件
                var key = true;
                wolf.onclick = function (e) {
                        //        console.log(key)
                        var event = e || window.event;
                        wolf.index = 5;
                        if (key == true) {
                                clearInterval(wolf.downTime);
                                clearInterval(wolf.upTime);
                                wolf.hitTimer = setInterval(function () {
                                        wolf.index++;
                                        // clearInterval(startGameTime);
                                        // oCountDown.style.width = countDownWidth + 10 + 'px';
                                        if (wolf.index >= 9) {
                                                clearInterval(wolf.hitTimer);
                                                oWolfs.removeChild(wolf);
                                        }
                                        wolf.src = 'img/' + wolf.type + wolf.index + '.png';
                                }, 100)
                        }
                        key = false;
                        if (wolf.type == 'h') {
                                oCount.innerHTML = parseInt(oCount.innerHTML) + 10;
                        } else if (wolf.type == 'x') {
                                oCount.innerHTML = parseInt(oCount.innerHTML) - 10;
                        }
                }
                //当不点击狼的时候，也就需要让countDown运动(算了不写了)
        }, 600)
}
//封装随机数函数
function getRandom(min, max) {
        return parseInt(Math.random() * (max - min + 1) + min)//犯过错误：Math.random()后边一定要加括号
}
//阻止冒泡
document.onclick = function (e) {
        var event = e || window.event;
        event.preventDefault();
}
