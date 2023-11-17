var colision = (x,xSize,y,ySize,x2,x2Size,y2,y2Size,Type1ForColisionCheck) => {
    //X0
    //00
    if(x <= x2 && y <= y2) if(((x2 >= x && x2 <= (x + xSize)) && (y2 >= y && y2 <= (y + ySize)))) {
        return 1;
    }
    //0X
    //00
    if(x >= x2 && y <= y2) if((((x2 + x2Size) >= x && (x2 + x2Size) <= (x + xSize)) && (y2 >= y && y2 <= (y + ySize)))) {
        return 1
    }
    //00
    //X0
    if(x <= x2 && y >= y2) if(((x2 >= x && x2 <= (x + xSize)) && ((y2 + y2Size) >= y && (y2 + y2Size) <= (y + ySize)))) {
        return 1;
    }
    //00
    //0X
    if(x >= x2 && y >= y2) if((((x2 + x2Size) >= x && (x2 + x2Size) <= (x + xSize)) && ((y2 + y2Size) >= y && (y2 + y2Size) <= (y + ySize)))) {
        return 1;
    }
    if(Type1ForColisionCheck == 1) if(colision(x2,x2Size,y2,y2Size,x,xSize,y,ySize,0)) {
        return 1;
    }
    return null;
    }
    function RB(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var check = 0;
    var ballplus = 100;
    var ballplusMAX = 100;
    var test = (x,y,x2,y2,XorY) => {
        let aX = x - x2;
        let aY = y - y2;
        let sumX = 0 - aX / ballplus;
        let sumY = 0 - aY / ballplus;
        if(XorY == "X") {
            return sumX;
        } else if(XorY == "Y") {
            return sumY;
        }
    }
    var reset = (BallOrAll) => {
        if(BallOrAll == "all") {
            ballplus = ballplusMAX;
        plus = plusMAX / 2;
        x = screen.width / 2;
        y = screen.height / 2;
        ball[0].moveTo(screen.width,screen.height);
        ball[1].moveTo(0,screen.height);
        ball[2].moveTo(screen.width,0);
        } else if(BallOrAll == "ball") {
            ball[0].moveTo(screen.width,screen.height);
        ball[1].moveTo(0,screen.height);
        ball[2].moveTo(screen.width,0);
        }
    } 
    var points = 0;
    var max = 5;
    var count = 0;
    var lose = () => {
        points--;
        alert("LOSER! YOU HAVE "+points+" POINTS NOW!");
       reset("all");
       x1 = 2;
       y1 = 2;
       count = 0;
       scream.play();
    }
    var win = () => {
        points++;
        alert("YOU WON! YOU HAVE "+points+" POINTS NOW!");
        reset("all");
        count = 0;
        x1 = 2;
        y1 = 2;
    }
    var gun = [];
    var scream = new Audio("longbark.mp3");
    var bark = new Audio("shortbark.mp3");
    for(let i = 0; i < 100; i++) {
        gun[i] = new Audio("gun.wav");
    }
    var index = 0;
    var max = 3;
    var x1 = 2;
    var y1 = 2;
    var x = screen.width / 2;
    var y = screen.height / 2;
    var p = 1;
    var plusMIN = 0;
    var plusMAX = 25;
    var plus = plusMAX / 2;
    var ball = [];
    for(let i = 0; i < max; i++) {
        ball[i] = window.open('','','HEIGHT=1,WIDTH=1');
        ball[i].document.write("LANSCHOOL");
    }
    reset("ball");
    var ballXspeed = [];
    var ballYspeed = [];
    for(let i = 0; i < max; i++) {
        ballXspeed[i] = 0;
        ballYspeed[i] = 0;
    }
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
        return;
        }
        switch (event.key) {
        case "ArrowDown":
            y1 = 1;
            x1 = 2;
          break;
        case "ArrowUp":
            y1 = 0;
            x1 = 2;
          break;
        case "ArrowLeft":
            x1 = 0;
            y1 = 2;
          break;
        case "ArrowRight":
            x1 = 1;
            y1 = 2;
          break;
        case "s":
            x1 = 2;
            y1 = 2;
            break;
        case "d":
            plus++;
            if(plus >= plusMAX) plus = plusMAX;
            break;
        case "a":
            plus--;
            if(plus <= 0) plus = plusMIN;
            break;
        case "p":
            if(p == 0) {
                p = 1;
            } else {
                p = 0;
            }
            break;
        default:
          return;
        }
        event.preventDefault();
    }, true);
    
    //move
    setInterval(() => {
        if(p == 1) {
            if(confirm("GAME IS PAUSED DO YOU WANT TO UNPAUSE?")) p = 0;
            return 0;
        }
        if(check == 0) return 0;
        if(x1 == 0) {
            x -= plus;
        } else if(x1 == 1) {
            x += plus;
        }
        if(x >= (screen.width - window.outerWidth)) {
            x1 = 0;
        } else if(x < 0) {
            x1 = 1;
        }
        if(y1 == 0) {
            y -= plus;
        } else if(y1 == 1) {
            y += plus;
        }
        if(y >= (screen.height - window.outerHeight)) {
            y1 = 0;
        } else if(y < 0) {
            y1 = 1;
        }
        window.moveTo(x,y);
        for(let i = 0; i < max; i++) {
            if(colision(x,window.outerWidth,y,window.outerHeight,ball[i].screenX,ball[i].outerWidth,ball[i].screenY,ball[i].outerHeight,1)) {
                lose();
            }
        }
        for(let i = 0; i < max; i++) {
            ball[i].moveBy(ballXspeed[i],ballYspeed[i]);
        if(ball[i].screenX > (screen.width - ball[i].outerWidth * 1.1)) {
            ballXspeed[i] = test(ball[i].screenX,ball[i].screenY,x,y,"X");
            ballYspeed[i] = test(ball[i].screenX,ball[i].screenY,x,y,"Y");
        } else if(ball[i].screenX <= 0) changedirection();
        if(ball[i].screenY > (screen.height - ball[i].outerHeight * 1.1))  {
            ballXspeed[i] = test(ball[i].screenX,ball[i].screenY,x,y,"X");
            ballYspeed[i] = test(ball[i].screenX,ball[i].screenY,x,y,"Y");
        } else if(ball[i].screenY <= 0) changedirection();
        }
        for(let i = 0; i < max; i++) {
            for(let j = 0; j < max; i++) {
                if(i == j) j++;
                if(colision(ball[i].screenX,ball[i].outerWidth,ball[i].screenY,ball[i].outerHeigth,ball[j].screenX,ball[j].outerWidth,ball[j].screenY,ball[j].outerHeight,1)) {
                    index++;
                    if(index >= 100) index = 0;
                    gun[index].play();
                }
                if(ball[j].closed) {
                    alert("I CAN SEE THAT YOU ARE TRYING TO CHEAT!");
                    window.resizeTo(screen.width,screen.height);
                    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                }
            }
        }
    }, 10);

//ball direction change
var changedirection = () => {
    for(let i = 0; i < max; i++) {
        ballXspeed[i] = test(ball[i].screenX,ball[i].screenY,x,y,"X");
        ballYspeed[i] = test(ball[i].screenX,ball[i].screenY,x,y,"Y");
    }
}
setTimeout(changedirection(),5000);
setInterval(() =>{
    if(ballplus > 50) ballplus--;
},500);
setInterval(() => {
    if(p == 1) return 0;
    if(count > max) {
        count = 0;
        max = Math.ceil(max * 1.1);
        win();
    }
    scream.currentTime = 0;
    scream.pause();
    for(let i = 0; i < index; i++) {
        gun[i].currentTime = 0;
        gun[i].pause();
    }
    bark.play();
    setTimeout(() => {
        count++;
        ballXspeed[0] = test(ball[0].screenX,ball[0].screenY,screen.width,screen.height,"X");
    ballYspeed[0] = test(ball[0].screenX,ball[0].screenY,screen.width,screen.height,"Y");
    ballXspeed[1] = test(ball[1].screenX,ball[1].screenY,0,screen.height,"X");
    ballYspeed[1] = test(ball[1].screenX,ball[1].screenY,0,screen.height,"Y");
    ballXspeed[2] = test(ball[2].screenX,ball[2].screenY,screen.width,0,"X");
    ballYspeed[2] = test(ball[2].screenX,ball[2].screenY,screen.width,0,"Y");
    },2000);
}, 10000);
onblur = () => {
    check = 0;
}
onfocus = () => {
    check = 1;
}
