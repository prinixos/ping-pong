/* BASIC CANVAS FUNCTIONS */ 
let brick = (color,x,y,w,h)=>{
    board.fillStyle=color
    board.fillRect(x,y,w,h)
}

let background = (color)=>{
    board.fillStyle=color
    board.fillRect(0,0,canvas.width,canvas.height)
}

let ball = (color,x,y,radius,startAngle,endAngle,wise)=>{
    board.fillStyle=color
    board.beginPath()
    board.arc(x,y,radius,startAngle,endAngle,wise);
    board.closePath();
    board.fill()
}

let text = (color,letter,x,y,font)=>{
    board.fillStyle=color;
    board.font=font;
    board.fillText(letter,x,y)
}

let dotLine = (color,x,y,w,h)=>{
    for (let i = 0; i < Math.floor(h/30); i++) {
        board.fillStyle=color
        board.fillRect(x,(20*i)+(10*i),w,20)
    }
}


// GETTING CANVAS
let canvas = document.getElementById('board');

// SETTING DEFAULT Height AND Width
canvas.height=window.innerHeight;
canvas.width=window.innerWidth

// MAKING CONTEXT
let board = canvas.getContext('2d');



// resizing the canvas when the window size is changing
window.addEventListener('resize',e=>{
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth
})





// similar things to many thing
let common ={
    brickColor:'#fff',
    brickWidth:20,
    brickHeight:150,
    time:1,
    increase:0.25
}


// user player
let user = {
    x:window.innerWidth-common.brickWidth,
    y:window.innerHeight/2-75,
    score:0
}

// computer player
let comp = {
    x:0,
    score:0,
}

// ball
let ballval = {
    x:window.innerWidth/2,
    y:window.innerHeight/2,
    radius:10,
    color:'#ff0',
    way:[0,0]
}


let randomBall = ()=>{
    common.time=0
    setTimeout(e=>{
        common.time=1
        ballval.way[0]=Math.floor(Math.random()*2)
        ballval.way[1]=Math.floor(Math.random()*2);
    },1000)
}



// user player brick control
/*
    player control is based on the movement of the mouse and its Y position
    if statement stops the user brick to fall of the cavas
    else statement to just run it otherwise
  */ 
window.addEventListener('mousemove',e=>{
    if(e.clientY<canvas.height-common.brickHeight){
        user.y=e.clientY
    }else{
        brick('#fff',user.x,common.y,common.brickWidth,common.brickHeight)
    }  
})




/*
    Here is where all the animation works if haven't given and rate 
    so the rate eill decide as the processing power of the computer

    COMPONENTS : Bakground( A huge rectangle exactly the canvas size ),
                 Rect( Bricks both computer and human )
                 dotline : ( centerline b/w the screen multple rect come together )
*/ 
setInterval(e=>{

    // COMPONENTS
    background('#000')
    text('#fff',comp.score,(canvas.width/4),60,'50px Montserrat')
    text('#fff',user.score,(canvas.width/4)*3,60,'50px Montserrat')
    dotLine('#fff',(window.innerWidth/2)-2,0,4,window.innerHeight+30)
    brick('#fff',user.x,user.y,common.brickWidth,common.brickHeight)
    

    /* COMPUTER */
    // BRICK VALUE ( Exact value of the ball )
    comp.y=ballval.y-75

    // this statements helps the brick to not fall of the canvas
    if(comp.y<0){
        brick('#fff',comp.x,0,common.brickWidth,common.brickHeight)
    }else if(comp.y>canvas.height-common.brickHeight){
        brick('#fff',comp.x,canvas.height-common.brickHeight,common.brickWidth,common.brickHeight)
    }else{
        brick('#fff',comp.x,comp.y,common.brickWidth,common.brickHeight)
    }
    
    /*
        Here all my ball logic lies
    */
    if(ballval.y<0){
        ballval.way[1]=0
    }else if(ballval.y+ballval.radius>=canvas.height){
        ballval.way[1]=1
    }else if(ballval.x<=0){
        ballval.x = window.innerWidth/2
        ballval.y = window.innerHeight/2
        randomBall()
        user.score++
    }else if(ballval.x>=canvas.width){
        ballval.x = window.innerWidth/2
        ballval.y = window.innerHeight/2
        randomBall()
        comp.score++
    }

    if(ballval.y>user.y && ballval.y<user.y+common.brickHeight && ballval.x>=canvas.width-common.brickWidth){
        ballval.way[0]=0;
        common.time+=common.increase
    }else if(ballval.y>comp.y && ballval.y<comp.y+common.brickHeight && ballval.x<=0+common.brickWidth){
        ballval.way[0]=1;
        common.time+=common.increase
    }


    if(ballval.way[0]==true && ballval.way[1]==false){
        ball(ballval.color,ballval.x+=common.time,ballval.y+=common.time,ballval.radius,0,360,false)
    }else if(ballval.way[0]==true && ballval.way[1]==true){
        ball(ballval.color,ballval.x+=common.time,ballval.y-=common.time,ballval.radius,0,360,false)
    }else if(ballval.way[0]==false && ballval.way[1]==true){
        ball(ballval.color,ballval.x-=common.time,ballval.y-=common.time,ballval.radius,0,360,false)
    }else if(ballval.way[0]==false && ballval.way[1]==false){
        ball(ballval.color,ballval.x-=common.time,ballval.y+=common.time,ballval.radius,0,360,false)
    }
},0)