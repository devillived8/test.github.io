(function(){

let canvas = document.createElement("canvas");
document.querySelector(".wrapper").appendChild(canvas);
ctx = canvas.getContext("2d");
let properties = {
    color:          'rgba(102, 0, 153, 1)',
    lineColor:{
        r:          102,
        g:          0,
        b:          153},
    radius:         5,
    value:          120,
    particles:      [],
    maxSpeed:       .5,
    bgColor:        'rgba(17, 17, 19, 1)',
    lineLength:     200,
    particleLife:   80,
};

// Масштабирование canvas 
let canvasWidth = canvas.width = innerWidth;
let canvasHeight = canvas.height = innerHeight;


window.onresize = function resize(){
    canvasWidth = canvas.width = innerWidth;
    canvasHeight = canvas.height = innerHeight;
};
// Масштабирование canvas 



class Particles{
    constructor(){
        this.randomX = canvasWidth * Math.random();
        this.randomY = canvasHeight * Math.random();
        this.trajectoryX = Math.random() * (properties.maxSpeed * 2) - properties.maxSpeed;
        this.trajectoryY = Math.random() * (properties.maxSpeed * 2) - properties.maxSpeed;
        this.life = Math.random() * properties.particleLife * 60;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.randomX, this.randomY, properties.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = properties.color;
        ctx.fill();
    }
    
    position(){
        this.randomX + this.trajectoryX > canvasWidth && this.trajectoryX > 0 || this.randomX + this.trajectoryX < 0 && this.trajectoryX < 0 ? this.trajectoryX *= -1 : this.trajectoryX;
        this.randomY + this.trajectoryY > canvasHeight && this.trajectoryY > 0 || this.randomY + this.trajectoryY < 0 && this.trajectoryY < 0 ? this.trajectoryY *= -1 : this.trajectoryY;
        this.randomX += this.trajectoryX;
        this.randomY += this.trajectoryY;
    }

    reCalculateLife(){
        if(this.life < 1){
            this.randomX = canvasWidth * Math.random();
            this.randomY = canvasHeight * Math.random();
            this.trajectoryX = Math.random() * (properties.maxSpeed * 2) - properties.maxSpeed;
            this.trajectoryY = Math.random() * (properties.maxSpeed * 2) - properties.maxSpeed;
            this.life = Math.random() * properties.particleLife * 60;
        }
        this.life--;
    }


}



function reDrawBackground(){
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}


function reDrawLines(){
    let x1, x2, y1, y2, length, opacity;
    for(let i in properties.particles){
        let j = i + 1;
        for(j in properties.particles){
            x1 = properties.particles[i].randomX;
            y1 = properties.particles[i].randomY;
            x2 = properties.particles[j].randomX;
            y2 = properties.particles[j].randomY;
            //Формула расчёта длины линий
            length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            if(length < properties.lineLength){
                opacity = 1 - length / properties.lineLength;
                ctx.lineWidth = '0.5';
                ctx.strokeStyle = 'rgba('+properties.lineColor.r+', '+properties.lineColor.g+', '+properties.lineColor.b+', '+opacity+')';
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}


 


function loop(){
    reDrawBackground()
    reDrawParticles();
    reDrawLines();
    requestAnimationFrame(loop);
}



function generationParticles(){
    for(let i = 0; i < properties.value; i++){
        properties.particles.push(new Particles);
    }
    loop();
}


function reDrawParticles(){
    for(let i in properties.particles){
        properties.particles[i].reCalculateLife();
        properties.particles[i].position();
        properties.particles[i].draw();
    }
}



generationParticles();


}());






