function setDate(){
    var dateOne = document.getElementById("date1").value;
    var dateTwo = document.getElementById("date2").value;
    var tail = "";
    if(dateTwo != "" && dateOne != ""){
        tail += "s/"+dateOne+"/"+dateTwo;
    } else if(dateOne != "") {
        tail += "/"+dateOne;
    } else if(dateTwo != "") {
        tail += "/"+dateTwo;
    }
    if(tail != ""){
        getJsonHttp(tail);
    }
    
}

function getJsonHttp(tail){
    var xmlhttpshift = new XMLHttpRequest();
    var xmlhttproster = new XMLHttpRequest();
    var shiftUrl = "http://localhost:4567/shift"+tail;
    var rosterUrl = "http://localhost:4567/roster"+tail;
    xmlhttpshift.onreadystatechange=function() {
        xmlhttproster.onreadystatechange=function() {
            if (xmlhttpshift.readyState == 4 && xmlhttpshift.status == 200) {
                if (xmlhttproster.readyState == 4 && xmlhttproster.status == 200) {
                    jsonShiftsParser(xmlhttpshift.responseText, xmlhttproster.responseText);
                }
            }
        }
    }
    xmlhttpshift.open("GET", shiftUrl, true);
    xmlhttproster.open("GET", rosterUrl, true);
    xmlhttpshift.send();
    
    xmlhttproster.send();
}

function jsonShiftsParser(shiftRes,rosterRes) {
    var arr = JSON.parse(shiftRes);
    var arr2 = JSON.parse(rosterRes);
    var i;
    var out = "";

    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        parseDate(arr[i].date).toDateString()+
        "</td><td>" +
        parseDate(arr2[i].start).toLocaleTimeString() + 
        "</td><td>" +
        parseDate(arr[i].start).toLocaleTimeString() +        
        "</td><td>" +
        parseDate(arr2[i].finish).toLocaleTimeString() +
        "</td><td>" +
        parseDate(arr[i].finish).toLocaleTimeString() +
        "</td></tr>";
    }
    document.getElementById("id01").innerHTML =  out;
}

function parseDate(string){
    return new Date(string);
}
