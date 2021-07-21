

    $(document).ready(() => {

    // $("#demoEvoCalendar").evoCalendar('getActiveDate');


        $('#calc').click(() => {
            const d1 = $('#d1').val();
            const d2 = $('#d2').val();
            $('#dif').text(workingDaysBetweenDates(d1, d2));
        });
    });

    let workingDaysBetweenDates = (d0, d1) => {
        /* Two working days and an sunday (not working day) */
        var holidays = ['2016-05-03', '2016-05-05', '2016-05-07'];
        var startDate = parseDate(d0);
        var endDate = parseDate(d1);

        // Validate input
        if (endDate <= startDate) {
            return 0;
        }

        // Calculate days between dates
        var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0, 0, 0, 1); // Start just after midnight
        endDate.setHours(23, 59, 59, 999); // End just before midnight
        var diff = endDate - startDate; // Milliseconds between datetime objects    
        var days = Math.ceil(diff / millisecondsPerDay);

        // Subtract two weekend days for every week in between
        var weeks = Math.floor(days / 7);
        days -= weeks * 2;

        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();

        // Remove weekend not previously removed.   
        if (startDay - endDay > 1) {
            days -= 2;
        }
        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6) {
            days--;
        }
        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0) {
            days--;
        }
        /* Here is the code */
        holidays.forEach(day => {
            if ((day >= d0) && (day <= d1)) {
                /* If it is not saturday (6) or sunday (0), substract it */
                if ((parseDate(day).getDay() % 6) != 0) {
                    days--;
                }
            }
        });
        return days;
    }





    function parseDate(input) {
        // Transform date from text to date
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }


    $(function() {

        var clicks = 0;
        var temp;
        var first_date, second_date;
        $(document).on('click', '.fc-day-top', function() {
        	
            if (clicks >= 2) {
                clicks = 0;
            }
            clicks += 1;
            if (clicks == 1) {
                const selected = $(this).attr('data-date');
                // alert(selected);
                $('#d1').val(selected);
                first_date = $('#d1').val()
                // $(this).addClass('calendar-active')
                console.log(first_date)
            }
            if (clicks == 2) {
                const selected = $(this).attr('data-date');
                // alert(selected);
                $('#d2').val(selected);
                second_date = $('#d2').val()
                // $(this).addClass('.calendar-active')
                console.log(second_date)
            }
            if (new Date(first_date) > new Date(second_date)) {
                temp = second_date;
                second_date = first_date;
                first_date = temp;
            }
            $('#d1').val(first_date);
            $('#d2').val(second_date);
            
             var days = daysdifference(first_date, second_date);
             // console.log(days);
        });


    });

    // $("#demoEvoCalendar").evoCalendar('getActiveDate',true);
  
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
function daysdifference(firstDate, secondDate){
    var startDay = new Date(firstDate);
    var end_Day = new Date(secondDate);
   
   var currentDate = new Date(startDay.getTime());
   var between = [];
   

while (currentDate <= end_Day) {
    between.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);

}
console.log(between);
for (var i=0;i<between.length;i++){
    var date=`${formatDate(between[i])}`;
    console.log(between[i]);
   var tar= document.querySelectorAll(`[data-date="${date}"]`);
   // tar[0].classList.remove('current-active');
//    tar[0].classList.add('current-active');

}
// if(currentDate >= end_Day){
//    tar[0].parentElement.nextElementSibling.classList.remove('current-active');
//    }

}

