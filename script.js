var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var rot_alpha = document.querySelector('#rot-alpha');
var rot_beta = document.querySelector('#rot-beta');
var rot_gamma = document.querySelector('#rot-gamma');
var mot_x = document.querySelector('#mot-x');
var mot_y = document.querySelector('#mot-y');
var mot_z = document.querySelector('#mot-z');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

window.addEventListener("deviceorientation", handleOrientation);

window.addEventListener("devicemotion", handleMotion);

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;

    // Do stuff with the new orientation data
    var z = event.alpha;
    var y = event.beta;  // In degree in the range [-180,180]
    var x = event.gamma; // In degree in the range [-90,90]

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

