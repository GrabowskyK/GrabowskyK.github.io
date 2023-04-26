function randColor(i){
    let red = Math.floor(Math.random() * 255);
    let yellow = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    if(red < 10)
        red = "00" + red;
    else if(red < 100)
        red = "0" + red;
    if(yellow < 10)
        yellow = "00" + yellow;
    else if(yellow < 100)
        yellow = "0" + yellow;
    if(blue < 10)
        blue = "00" + blue;
    else if(blue < 100)
        blue = "0" + blue;

    HEX = "rgb(" +red +","+ yellow +","+ blue + ")";
    console.log(red +"  "+ yellow +""+ blue);
    document.getElementById(i).style.backgroundColor = HEX;
}

function losKolor(){
    let licznik = document.querySelectorAll('.color').length;
    let random = Math.floor(Math.random() * licznik);
    let guessColor = document.getElementById(random).style.backgroundColor;
    console.log(guessColor);
    document.getElementById("wynik").innerHTML = "<b>" + guessColor + "</b>" + (random+1); //+ (random+1);
    return random;
}

var wylosowanyKolor = "";

function start(){
    let licznik = document.querySelectorAll('.color').length;
    for(let i=0;i<licznik;i++){
        randColor(i);
    }
    wylosowanyKolor = losKolor();
}

var lock = true;
function back(nr){
    $("#" + nr).css('box-shadow','');
    if(nr == wylosowanyKolor){
    $(".color").css('opacity','100%');
    }
    lock = true;
    return lock;
}

function score(nr){
    if(wylosowanyKolor == nr && lock == true){
        lock = false;
        console.log("Brawo!");
        points++;
        document.getElementById("points").innerHTML = "" + points;
        $("#" + nr).css('box-shadow','0 0 0 2px lime');
        $(".color").not("#" + nr).css('opacity','30%');
            setTimeout(back,1000,nr);
        if((points%1)==0){
            setTimeout(addDivColor,1000);
        } else {
            setTimeout(start,1000);
            console.log(lock);
        }
        
    } else if(lock == true){
       
        if(life==1){
            //alert("Przegrales! Zdobyłeś " + points + " punktów!");
            endGame(points);
            $(".slot").remove();
            lock = false;
            $("#play").val("Start");  
            $("#img" + --life).remove();
   
        } else { 
            $("#" + nr).css('box-shadow','0 0 0 2px red');
            setTimeout(back,500,nr);
            life--;
            $("#img" + life).remove();
        }
    }
    $("#" + nr).removeProp('box-shadow');
}

function addDivColor(){
    let rowCount = $(".slot").length;
    let licznik = $(".color").length;
    let textAdd = "";

    //Dodawanie do row
    for(let j=0;j<rowCount;j++){
        textAdd = `<div class="color" id="${licznik+j}" onclick="score(${licznik+j})"></div>`; //${licznik+j+1}
        $("#row" + j).append(textAdd);
    }
    textAdd = "";
    $("#pojemnik").append(`<div class="slot" id="row${rowCount}"></div>`);
    for(let i=0;i<=rowCount;i++){
        textAdd = textAdd + `<div class="color" id=${licznik+rowCount+i} onclick="score(${licznik+rowCount+i})"></div>`;
    }
    $("#row" + rowCount).append(textAdd);
    start();
}

function playGame(){
    lock = true;
    points = 0;
    life = 3;
    let lifeText = "";
    for(let i = 0;i<life;i++){
        lifeText = lifeText + `<img src="aaa.png" id="img${i}">`;
    }
    $("#lifeCount").append(lifeText);
    $("#end").css('display','none');
    let check = document.getElementById("play").getAttribute("value");
    if(check == "Start" || check == "Zagraj ponownie"){
        $("#play").val("Reset");
            $("#pojemnik").append(`<div class="slot" id="row0">
            <div class="color" id="0" onclick="score(0)"></div>
            <div class="color" id="1" onclick="score(1)"></div>
        </div>
        <div class="slot" id="row1">
            <div class="color" id="2" onclick="score(2)"></div>
            <div class="color" id="3" onclick="score(3)"></div>
            </div>`);
    start();
    } else if (check == "Reset"){
        $("img").remove();
        $(".slot").remove();
        $("#play").val("Start");
        playGame();
    }
}

function endGame(points){
   // $("#playAgain").val("Zagraj ponownie");
    $("#end").css('display','block');
            let pointText = "";
            if(points == 1)
                pointText = "punkt";
            else if(points > 5)
                pointText = "punktów";
            else
                pointText = "punkty"; 
            finalScore = `Zdobyłeś: <b>${points}</b> ${pointText}`;
            document.getElementById("endPoints").innerHTML = finalScore;
            

}