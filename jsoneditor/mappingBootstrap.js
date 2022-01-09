var KeyConvert = null;
var KJSON = {};
var keys=[];
var myObj = {
    "name":"John",
    "age":30,
    "cars": {
      "car1":"Ford",
      "car2":["BMW","20"],
      "car3":"Fiat"
    }
   };
const submitbtn=document.getElementById('submit');
const JSONbtn=document.getElementById("jsonbtn");
const FTLbtn=document.getElementById("ftlbtn");
var TenantId = document.getElementById("tenantId");
var Entity = document.getElementById("entity");
var objectConstructor = ({}).constructor;
var clickCount = 0;
window.onload=function(){
    submitbtn.addEventListener('click',redirectV2);
    JSONbtn.addEventListener('click',conversionJSON);
    FTLbtn.addEventListener('click',conversionFTL);
}

function redirectV2(){
    try{
    var json = document.getElementById("myFile").value;
    KJSON = JSON.parse(json);
    assignKeyValue(KJSON);
    } catch(err){
        location.reload();
        alert("Enter a valid JSON. "+err);
        console.log("Enter a valid JSON"+err);
    }
}

var ni = 0;
var i = 0;
var containerDemo = document.getElementById("containerDemo");
function assignKeyValue(KJSON){
    for(k in KJSON)
        {
            keys.push(k);
            if (KJSON[k].constructor == objectConstructor){
                containerDemo.appendChild(document.createElement("br"));
                var q =document.createElement("label");
                q.style.fontSize="17px";
                q.appendChild(document.createTextNode(k+":"));
                q.appendChild(document.createElement("br"));
                containerDemo.appendChild(q);
                ni = ni + 1;
                i=i+ni;
                assignKeyValue(KJSON[k]);
                i=i-ni;
            }else{
                assignKeysV2(k,KJSON);   
            }
        }
}

function assignKeysV2(k,KJSON){
    containerDemo.appendChild(document.createElement("br")); 
    var p = document.createElement("label");
    p.for=k;
    p.style.fontSize="17px";
    p.appendChild(document.createTextNode(k+": "));
    var input = document.createElement("input");;
    input.type = "text";
    input.className = "form-control";
    input.id = "i"+k+i;
    input.value=KJSON[k];
    p.appendChild(input);
    containerDemo.appendChild(p);
}

function assignKeysV3(i){
    var q = document.createElement("p");
    q.id=i;
    q.appendChild(document.createTextNode(i+": "));
    q.style.fontSize="15px";
    q.style.paddingLeft="60px";
    var input = document.createElement("input");
    input.type = "text";
    input.id = "i"+i;
    q.appendChild(input);
    q.appendChild(document.createElement("br"));
    q.appendChild(document.createElement("br"));
    container.appendChild(q);
}

function conversionJSON(){
    var nj = 0;
    var finalObjectV2=conversionV2(KJSON,nj);
    console.log(finalObjectV2);
    data = JSON.stringify(finalObjectV2);
    var filename= TenantId.value+"_"+Entity.value+".json";
    download(filename,data);
    alert("Successfully Converted to JSON");
}

function conversionFTL(){
    var nj = 0;
    var finalObjectV2=conversionV2(KJSON,nj);
    console.log(finalObjectV2);
    data = JSON.stringify(finalObjectV2);
    var filename= TenantId.value+"_"+Entity.value+".ftl";
    download(filename,data);
    alert("Successfully Converted to FTL");
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

var j = 0;
function conversionV2(KJSON,nj){
    var finalObject = {};
    for(k in KJSON){
        if(KJSON[k].constructor == objectConstructor){
            nj = nj+1;
            j=j+nj;
            finalObject[k]=conversionV2(KJSON[k],nj);
            j=j-nj;
        }else{
            finalObject[k] = document.getElementById("i"+k+j).value;
        }
    }
    return finalObject;
}

function clearData(){

}

async  function RegistersendData(finalObjectV2){
    var buf = JSON.stringify(finalObjectV2);
  $.ajax({
      method: "POST",
      crossDomain: true,
      headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
      },
      url: "http://localhost:8080/api/convert/v2",
      dataType: "json",
      data: buf,
      async:false,
      success: function(result){
         console.log('successful');
        success.innerHTML="Convertion to JSON successful";
        setTimeout(loadpage,2000)

         
      },
      error:function(jqXHR, textStatus, errorThrown){
          if(jqXHR.status==400)
          {
            alert("BAD REQUEST");
          }
      }
       });
    }

function convertionDemo(myObj){
    var containerDemo = document.getElementById("containerDemo");
    //JSON.parse(myObj);
    for(k in myObj)
    {
        if (myObj[k].constructor === objectConstructor){
            containerDemo.appendChild(document.createTextNode(k+":"))
            containerDemo.appendChild(document.createElement("br"));
            convertionDemo(myObj[k]);
        }

        else{
            // containerDemo.appendChild(document.createTextNode(k+":"+myObj[k]));
            containerDemo.appendChild(document.createTextNode(k.length));
            containerDemo.appendChild(document.createElement("br"));
            }
    }
}

function assignKeys(keys,KJSON){

    var container = document.getElementById("container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<keys.length;i++){
        container.appendChild(document.createTextNode(keys[i]+":"));
        var input = document.createElement("input");
        input.type = "text";
        input.id = keys[i];
        input.value=KJSON[keys[i]];
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
    }


}

function redirect(){
    // convertionDemo(myObj);
    var json = document.getElementById("myFile").value;
    var KJSON = JSON.parse(json)
    //document.getElementById("demo").innerHTML=JSON.stringify(KJSON);
    var keys = [];
    for(var k in KJSON) {
        //var check = false;
        keys.push(k);
        assignKeysV2(k)
    //     for(var i in KJSON[k]){
    //         if(isNaN(i)){
    //             keys.push(i);
    //             assignKeysV3(i);
    //             check = true;
    //         }
    //     }
    //     if(check)
    //         document.getElementById("i"+k).remove();
    // }
    // KeyConvert = keys;
    // console.log(keys);
}
}

function assignKeys(keys){

    var container = document.getElementById("container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<keys.length;i++){
        container.appendChild(document.createTextNode(keys[i]+":"));
        var input = document.createElement("input");
        input.type = "text";
        input.id = keys[i];
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
    }

}