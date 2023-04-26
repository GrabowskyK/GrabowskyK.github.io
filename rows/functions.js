let column0 = [];
let column1 = [];
let column2 = [];
let column3 = [];
let column4 = [];
let column5 = [];
let column6 = [];
let k=0;
let help = [column0,column1,column2,column3,column4,column5,column6];

let checkWin = 0;
let text = "";
let text2 = "";
function reset(){
    console.log(column0);
    console.log(column1);
    console.log(column2);
    console.log(column3);
    console.log(column4);
    console.log(column5);
    console.log(column6);
    column0 = [];
    column1 = [];
    column2 = [];
    column3 = [];
    column4 = [];
    column5 = [];
    column6 = [];
    help = [column0,column1,column2,column3,column4,column5,column6];
    checkWin = 0;
    text = "";
    text2 = "";
    k=0;
    $(".placeInside").css('background-color','gray');
}
function xd(x){
        $("#end").empty();
        $("#end").css('display','none');
        reset();

}
function CommunicateEnd(x,y){
    $("#end").css('display','block');
    $("#end").append(`<br><p>Brawo! Gracz <b style="color:${x};">${x}</b> wygrał, dzięki ${y}<p><input type="button" value="Zagraj ponownie" onClick="xd()"></p></p>`);
}

function changeColor(i){
    let color = "";
    if(i%2 == 0)
        color = "rgb(52, 50, 161)";
    else
        color = "rgb(105, 22, 26)";
    return color;
}

function ifWinRow(rowName){
    checkWin = 0;
    for(let i=0;i<4;i++){
        for(let j=1+i;j<4+i;j++){
            if(help[i][rowName] != undefined && help[i][rowName] == help[j][rowName]){
                checkWin++;
            } else {
                checkWin = 0;
                break;
            }
            if(checkWin>=3){
                if(help[i][rowName] == 'r')
                    text2 = "czerwony";
                else
                    text2 = "niebieski";
                break;
            }
        }
        if(checkWin>=3){
        CommunicateEnd(text2,"ułożeniu przez rząd.");
            break;
        }
    }
    checkWin = 0;
}

function ifWinColumn(nameColumn){
    checkWin = 0;
    //by column
    for(let i=0;i<3;i++){
        for(let j=1+i;j<4+i;j++){
            if(nameColumn[i] == nameColumn[j] && nameColumn[i] != undefined){
                checkWin++;
            } else if(checkWin>=3) {
                if(help[i][rowName] == 'r')
                    text2 = "czerwony";
                else
                    text2 = "niebieski";
                break;
            } else {
                checkWin = 0;
                break;
            }
        }
        if(checkWin>=3){
        CommunicateEnd(text2,"ułożeniu przez kolumne.");
            break;
        }
    }
}
function ifWinDiagonalUpstairs(columnIndex,rowIndex){
        checkWin = 0;
        //console.log("Row: " + rowIndex + " | Column: " + columnIndex + " | " + help[columnIndex][rowIndex]);
        //max row: 5, max column: 6
        for(let i=0;i<=6;i++)
            if(columnIndex-3+i>=0 && columnIndex-3+i<=6 && help[columnIndex][rowIndex] != undefined && help[columnIndex][rowIndex] == help[columnIndex-3+i][rowIndex-3+i] ){
                checkWin++;
                if(checkWin==4)
                    break;
            } else  {
                checkWin = 0
            }
        
        if(checkWin>=4){
            if(help[columnIndex][rowIndex] == 'r')
            text2 = "czerwony";
        else
            text2 = "niebieski";
        CommunicateEnd(text2,"ułożeniu po przekątnej.");
        }
}

function ifWinDiagonalDownstairs(columnIndex,rowIndex){
    checkWin = 0;
    console.log("Row: " + rowIndex + " | Column: " + columnIndex + " | " + help[columnIndex][rowIndex]);
    //max row: 5, max column: 6
    for(let i=0;i<=6;i++)//
        if(columnIndex-3+i>=0 && columnIndex-3+i<=6 && help[columnIndex][rowIndex] != undefined && help[columnIndex][rowIndex] == help[columnIndex-3+i][rowIndex+3-i]){//rowIndex+3-i>=0 && rowIndex+3-i<=5 && columnIndex+3-i>=0 && columnIndex+3-i<=6 &&
            checkWin++;
            console.log(checkWin + " " + "Row: " + (rowIndex+3-i) + " | Column: " + (columnIndex-3+i) );
            if(checkWin==4)
                break;
        } else  { //rowIndex-3+i>=0 && rowIndex-3+i<=5 && columnIndex-3+i>=0 && columnIndex-3+i<=6
            checkWin = 0
            console.log("reset");
        }
    
    if(checkWin>=4){
        if(help[columnIndex][rowIndex] == 'r')
            text2 = "czerwony";
        else
            text2 = "niebieski";
        CommunicateEnd(text2,"ułożeniu po przekątnej.");
    }
}

var oho = "rgb(52, 50, 161)";
function addCoin(columnIndex, nameColumn){
    let arrSize = 6;
    let kolor = changeColor(k);
    oho = kolor;
    let kolorText = "";
    
    if(kolor == "rgb(52, 50, 161)")
        nameColumn.push('b');
    else
        nameColumn.push('r');
    
        rowIndex = arrSize - nameColumn.length;

    $("#row" + rowIndex + columnIndex).css('background-color',kolor);
    if(rowIndex<0){
        k--;
        nameColumn.pop();
        kolor = changeColor(k);
        oho = kolor;
    }
    
    rowIndex = nameColumn.length-1;
    k++;
    if(k != 42){
        setTimeout(ifWinRow,20,rowIndex);
        setTimeout(ifWinColumn,20,nameColumn);
        setTimeout(ifWinDiagonalUpstairs,20,columnIndex,rowIndex);
        setTimeout(ifWinDiagonalDownstairs,20,columnIndex,rowIndex);
    } else
        alert("remis");
}



