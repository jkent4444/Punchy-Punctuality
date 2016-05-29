$(document).ready(function(){
    
    $('[data-toggle="tooltip"]').tooltip({ selector: "a" });   
});

$(function () {
    $('#datetimepicker6').datetimepicker({ format: 'YYYY-MM-DD' });
    $('#datetimepicker7').datetimepicker({
        format: 'YYYY-MM-DD',
        useCurrent: false //Important! See issue #1075
    });
    $("#datetimepicker6").on("dp.change", function (e) {
        $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        setDate();
    });
    $("#datetimepicker7").on("dp.change", function (e) {
        $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        setDate();
    });
    setDate();
});