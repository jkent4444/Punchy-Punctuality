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
        var date = parseDate(arr[i].date);
        var rosterStart = parseDate(arr2[i].start);
        var shiftStart =  arr[i].start;
        var rosterFinish = parseDate( arr2[i].finish);
        var shiftFinish = arr[i].finish;
        var shiftFinishString = "";
        var shiftStartString = "";
        if(shiftFinish){
            var shiftFinish = parseDate(shiftFinish);
            
        shiftFinishString = "<a href='#' data-toggle='tooltip' title="                               +          shiftFinish.toLocaleTimeString() + ">" +
        checkFinishTime(shiftFinish, rosterFinish)+
        "</a>";
        } else {
            shiftFinishString =  checkFinishTime(shiftFinish, rosterFinish);
        }
        if(shiftStart){
            var shiftStart = parseDate(shiftStart);
            
        shiftStartString = "<a href='#' data-toggle='tooltip' title="                               +          shiftStart.toLocaleTimeString() + ">" +
        checkFinishTime(shiftStart, rosterStart)+
        "</a>";
        } else {
            shiftStartString =  checkFinishTime(shiftStart, rosterStart);
        }
        out += "<tr><td>" +
        date.toDateString()+
        "</td><td>" +
        rosterStart.toLocaleTimeString() + 
        "</td><td>" +
        shiftStartString+
        "</td><td>" +
        rosterFinish.toLocaleTimeString() +
        "</td><td>" +
        shiftFinishString+
        "</td></tr>";
    }
    document.getElementById("id01").innerHTML =  out;
}

//Parse date rounded to closest minute
function parseDate(string){
    var date = new Date(string);
    if(date.getSeconds() >= 30){
         date.setMinutes(date.getMinutes() + 1);
         date.setSeconds(0);
    } else {
        date.setSeconds(0);
    }
    return date;
}

function checkStartTime(time, time1){
    if(!time){
     return "No start time clocked"; 
    } else if(time.getTime() > time1.getTime()){
        return "late";
    } else {
        return "on time";
    }
}

function checkFinishTime(time, time1){
    if(!time){
     return "No finish time clocked"; 
    } else if(time.getTime() > time1.getTime()){
        return "left late";
    } else if(time.getTime() < time1.getTime()){
        return "left early";
    } else {
        return "on time";
    }
}
