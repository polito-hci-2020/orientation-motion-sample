let ball   = document.querySelector('.ball');
let garden = document.querySelector('.garden');
let rot_alpha = document.querySelector('#rot-alpha');
let rot_beta = document.querySelector('#rot-beta');
let rot_gamma = document.querySelector('#rot-gamma');
let mot_x = document.querySelector('#mot-x');
let mot_y = document.querySelector('#mot-y');
let mot_z = document.querySelector('#mot-z');

let maxX = garden.clientWidth  - ball.clientWidth;
let maxY = garden.clientHeight - ball.clientHeight;

window.addEventListener("deviceorientation", handleOrientation);

window.addEventListener("devicemotion", handleMotion);

function handleOrientation(event) {
    let alpha    = event.alpha;
    let beta     = event.beta;
    let gamma    = event.gamma;

    rot_alpha.innerHTML = alpha + "°";
    rot_beta.innerHTML = beta + "°";
    rot_gamma.innerHTML = gamma + "°";

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (gamma >  90) { gamma =  90};
    if (gamma < -90) { gamma = -90};

    // To make computation easier we shift the range of
    // x and y to [0,180]
    gamma += 90;
    beta += 90;

    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    ball.style.top  = (maxY*beta/180) + "px";
    ball.style.left = (maxX*gamma/180) + "px";
}

function handleMotion(event) {
    mot_x.innerHTML = event.acceleration.x + " m/s2";
    mot_y.innerHTML = event.acceleration.y + " m/s2";
    mot_z.innerHTML = event.acceleration.z + " m/s2";
}

