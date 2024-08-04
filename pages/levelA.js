//variables:

let left = 48;
let life = 3;
let score = 0;
let marioTop = 89;
let starTop = 0;
let star;
let right;
let jump;
let jumpDown;
let moving;
let x = document.getElementById("myAudio");
let uName = localStorage.getItem('userName');
let mario = document.querySelector("#mario");

//add the user name to the divs
document.querySelectorAll("#welcomeName")[0].innerHTML += uName + " !!!";
document.querySelectorAll("#welcomeName")[1].innerHTML += uName + " !!!";
document.querySelectorAll("#welcomeName")[2].innerHTML += uName + " !!!";

mario.style.marginLeft = left + "vw";
mario.style.marginTop = marioTop + "vh";

let heightMario = 10;
mario.style.height = heightMario + "vh";

document.addEventListener("keydown", CheckKeyEvent);
document.addEventListener("keyup", release);

//moving with the arrows
function CheckKeyEvent() {

    if (event.key == "ArrowLeft") {
        if (left == 0)
            return;
        left -= 1;
        mario.src = src = "../images/marioBlackToLeft.gif";
        mario.style.marginLeft = left + "vw";
        right = 100 - left + "vw";
    }
    else if (event.key == "ArrowRight") {
        if (left == 100)
            return;
        left += 1;
        mario.src = src = "../images/runningMar.gif";
        mario.style.marginLeft = left + "vw";
        right = 100 - left + "vw";
    }

}


function playAudio() {
    x.play();
    document.querySelector("#AudioBottom").removeEventListener("click", playAudio);
    document.querySelector("#AudioBottom").addEventListener("click", pauseAudio);
    document.querySelector("#AudioBottom").innerHTML = "&#128266;"
}

function pauseAudio() {
    x.pause();
    document.querySelector("#AudioBottom").removeEventListener("click", pauseAudio);
    document.querySelector("#AudioBottom").addEventListener("click", playAudio);
    document.querySelector("#AudioBottom").innerHTML = "&#128264;"
}

function release() {
    mario.src = "../images/marioBreathes.gif";
}

console.log("width: " + mario.style.width)

function start() {

    document.querySelector("#divC").style.display = "none";
    console.log(document.querySelector("#divC").style.display)
    life = 3;
    score = 0;
    CreateStars();
}

function FallingStar() {

    if (starTop >= marioTop && ifExistsAColision() == true) {
        clearInterval(moving);
        starTop = 0;
        SetScore();
        mario.style.height = (++heightMario) + "vh";
        mario.style.marginTop = (--marioTop) + "vh";
        document.body.removeChild(star);
        CreateStars();
    }
    else if (starTop >= 94) {
        clearInterval(moving);
        starTop = 0;
        Lesslife();
        mario.style.height = (--heightMario) + "vh";
        mario.style.marginTop = (++marioTop) + "vh";
        document.body.removeChild(star);
        CreateStars();
    }
    else{
        document.getElementById("star").style.marginTop = starTop + "vh";
        starTop += 0.05;
    }

}

function CreateStars() {
    let x = Math.floor(Math.random() * 95) + 1;//מרנדם מיקום

    let marginLeftStar = x + "vw";

    star = document.createElement('img');

    star.setAttribute("src", "../images/star_rotates.gif");
    star.setAttribute("id", "star");
    star.style.marginLeft = marginLeftStar;
    document.body.appendChild(star);
    moving = setInterval(FallingStar, 0.005);

}



function ifExistsAColision() {

    let style = window.getComputedStyle(mario);
    // left = parseInt(style.getPropertyValue('left'));
    console.log("width mario1 " + style.getPropertyValue('width'));
    console.log("window.innerWidth: " + window.innerWidth);

    let widthMS = "" + style.getPropertyValue('width');
    let a = widthMS.slice(0, widthMS.length - 2);

    console.log(parseFloat(a));

    let widthM = pxTOvw(parseFloat(a));

    console.log("width mario: " + widthM);
    styleStar = window.getComputedStyle(star);
    leftStar = parseFloat(styleStar.getPropertyValue('left'));
    //console.log(widthM)


    let rightM = parseInt(left + widthM);
    console.log("left " + left);
    console.log(left + widthM);
    console.log(document.getElementById("star").style.marginLeft >= mario.style.marginLeft &&
        parseInt(document.getElementById("star").style.marginLeft.substring(0, document.getElementById("star").style.marginLeft.indexOf('v'))) <= rightM);
    // return (leftStar >= xStart && leftStar <= xEnd)
    return (document.getElementById("star").style.marginLeft >= mario.style.marginLeft &&
        parseInt(document.getElementById("star").style.marginLeft.substring(0, document.getElementById("star").style.marginLeft.indexOf('v'))) <= rightM)

}
function pxTOvw(value) {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

    var result = (100 * value) / x;

    return result;
}




function SetScore() {
    score += 10;
    document.querySelector("#scoreBtm").innerHTML = "Score: "+score;
    checkDiv();
}

function Lesslife() {
    life--;
    document.querySelector("#lifeBtm").innerHTML = "Life: "+life;
    if (life == 0) {
        mario.src = src = "../images/failed.gif";
        end();
    }

}

function end() {
    clearInterval(FallingStar);

    let endPoint = "You have " + score;
    endPoint += document.querySelector("#endPoint").innerHTML;
    document.querySelector("#endPoint").innerHTML = endPoint;
    let endName;
    endName = uName + " ";
    endName += document.querySelector("#endName").innerHTML;
    document.querySelector("#endName").innerHTML = endName;
    document.querySelectorAll("#divC")[3].style.display = "block";


}

function checkDiv() {
    console.log("enter to check div");
    if (score == 20) {
        
        document.querySelectorAll("#divC")[1].style.display = "block";
        displayDiv();
        
    }
    if (score == 30) {
        scoreNow = score;
        localStorage.setItem('scoreNow', scoreNow);
        
        document.querySelectorAll("#divC")[2].style.display = "block";
    }
}

function displayDiv() {
    setTimeout(function () { document.querySelectorAll("#divC")[1].style.display = "none";}, 4000);

}

let starPlaceTop, marioPlace, lifeNow, scoreNow;

//stops the game
function pause() {

    document.querySelector("#pause").innerHTML = "&#9658;";
    marioPlace = mario.style.marginLeft;
    localStorage.setItem('marioPlace', marioPlace);
    lifeNow = life;
    localStorage.setItem('lifeNow', lifeNow);
    scoreNow = score;
    localStorage.setItem('scoreNow', scoreNow);
    starPlaceTop = star.style.marginTop;
    localStorage.setItem('starPlaceTop', starPlaceTop);

    clearInterval(moving);
    document.removeEventListener("keydown", CheckKeyEvent);
    document.getElementById('pause').removeEventListener("click", pause);
    document.getElementById('pause').addEventListener("click", go);
}

// continues the game
function go() {

    document.querySelector("#pause").innerHTML = "&#x25AE;&#x25AE;";
    life = localStorage.getItem('lifeNow');
    score = parseInt(localStorage.getItem('scoreNow'));
    mario.style.marginLeft = localStorage.getItem('marioPlace');
    document.addEventListener("keydown", CheckKeyEvent);

    if (localStorage.getItem('starPlaceTop') <= "83vh") {
        moving = setInterval(FallingStar, 0.005);
    }
    else {
        CreateStars();
    }
    document.getElementById('pause').removeEventListener("click", go);
    document.getElementById('pause').addEventListener("click", pause);
}



