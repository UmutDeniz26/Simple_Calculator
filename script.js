var keypad=['0','1','2','3','4','5','6','7','8','9','Clear','Equal','Add','Mult','Subt','Div']
var memory=[]
var operations=[]
var inputNumbers=[]
var tempInputs=[]
var tempElement=0
var currentState=0
var previousState=0 
var j=0
var result=0
var resultFlag=false

var mathOperations = {
    '12': (x, y) => { return x + y },
    '14': (x, y) => { return x - y },
    '13': (x, y) => { return x * y },
    '15': (x, y) => { return x / y }
}    

function resetVariables(){
    operations=[]
    memory=[]
    inputNumbers=[]
    tempInputs=[]
    j=0
    tempElement=0
    currentState=0
}

for(let i=0;i<keypad.length;i++){
    var temp=document.getElementById("btn"+keypad[i]);
    temp.onclick=function(){
        console.log(inputNumbers)
        if(i<10){//digit
            
            if(currentState==0 || currentState==1)  {currentState=1}
            else{currentState=3}
        }
        else if(i>11)   {currentState=2}    //Operator
        else if(i==11)  {
            if(currentState==3) {currentState=0}
            else if(currentState==1){currentState=0}
        }  //Equal
        else{currentState=0}    //Clear

        if((currentState==2 && previousState==2)||((currentState==0 && previousState==0) && (i!=10))) {return}
        
        switch (currentState) {    
            case 0:
                if(i==10){ //clear
                    resetVariables()
                    document.getElementById("result").innerHTML=0
                    document.getElementById("memory").innerHTML=""
                }
                else{ //equal
                    if(operations.length<1){
                        console.log(operations.length)
                        break
                    }
                    inputNumbers.push(tempInputs[tempInputs.length-1])
                    for(let k=0;k<operations.length;k++){
                        if(operations[k]==13 ||operations[k]==15){ // çarpma veya bölme işlemiyse bu algoritma çalışır
                            console.log(mathOperations[operations[k].toString()](inputNumbers[k],inputNumbers[k+1]))
                            result=mathOperations[operations[k].toString()](inputNumbers[k],inputNumbers[k+1])
                            inputNumbers[k+1]=result
                            inputNumbers[k]=0
                            if(operations[k-1]==14){ // önceki işlem çıkarma işlemiyse
                                operations[k]=14
                            }
                            else{
                                operations[k]=12
                            }
                        }    
                    }
                    result=inputNumbers[0]
                    for(let k=0;k<operations.length;k++){
                        result=mathOperations[operations[k]](result,inputNumbers[k+1])
                    }
                    if(result%1!=0) {result=parseFloat(result.toFixed(2))}
                    document.getElementById("result").innerHTML=result
                    document.getElementById("memory").innerHTML=document.getElementById("memory").innerHTML+tempInputs[tempInputs.length-1]+document.getElementById("btn"+keypad[i]).innerHTML
                    resultFlag=true
                    resetVariables()
                    tempInputs.push(result)
                }
        
                break;   
            case 2:
                inputNumbers.push(tempInputs[tempInputs.length-1])
                memory=[]
                j=0
                operations.push(i)
                
                if(resultFlag){
                    document.getElementById("memory").innerHTML=""
                    resultFlag=false
                }
                document.getElementById("memory").innerHTML=document.getElementById("memory").innerHTML+tempInputs[tempInputs.length - 1]+document.getElementById("btn"+keypad[i]).innerHTML
                
                break;
            default:
                
                memory[j++]=i
                for(let cnt=0;cnt<memory.length;cnt++){
                    tempElement+=memory[cnt]*(10**(memory.length-1-cnt))
                }
                if(tempElement==0 && operations[operations.length-1]==15){ //   x/0 girilrse
                    document.getElementById("result").innerHTML=0
                    document.getElementById("memory").innerHTML=""
                    window.alert("Exception: Cannot Divided by Zero");
                    resetVariables()
                    return
                }
                tempInputs.push(tempElement)
                document.getElementById("result").innerHTML=tempElement
                tempElement=0
                break;
        }
        
        //console.log(previousState)
        //console.log(currentState)
        previousState=currentState
        console.log(inputNumbers)
    }
}

//Changing themes

//After clicking the rotate arrow, theme will be changed;
const rotateClick = document.querySelector('.fa-arrow-rotate-right');

rotateClick.addEventListener('click', switchThemes);

//Switching algorithm
function switchThemes() {
    //Theme button, default theme is light
    let themeButton = document.querySelector('#theme');

    let currentTheme = document.querySelector('#themeRef');

    if (currentTheme.getAttribute('href') == 'light.css') {
        currentTheme.setAttribute('href', 'dark.css');
        themeButton.className = "fa-sharp fa-solid fa-moon";
    } else {
        currentTheme.setAttribute('href', 'light.css');
        themeButton.className = "fa-sharp fa-solid fa-sun";
    }
}