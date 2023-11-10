$(function () {
    containerEl = $('#container');

    var now = dayjs();
    var test = dayjs().hour(12);
    for (let i = 9; i < 18; i++) {

        var hourEl = $('<div>');
        hourEl.attr('data-hour', i);
        hourEl.addClass('d-flex flex-row justify-content-between row');

        var timeString = "";

        if (i < 12 ){
            timeString = i + " a.m."; 
        } else if ( i > 12 ) {
            timeString = (i-12) + " p.m." 
        } else {
            timeString = "12 p.m."
        }

        var titleEl = $('<h2>' + timeString + '</h2>');
        titleEl.addClass('col-2 col-md-1 d-flex justify-content-center align-items-center');
        hourEl.append(titleEl);

        var inputEl = $('<input type="text"></input>');
        inputEl.addClass('col-8 col-md-10');
        hourEl.append(inputEl);

        var saveBtn = $('<button>Save</button>');
        saveBtn.addClass('col-2 col-md-1');
        hourEl.append(saveBtn);

        containerEl.append(hourEl);
        if (now.hour() - i > 0) {
            hourEl.css('background-color', 'red');
            saveBtn.css('background-color', 'red');
        } else if (now.hour() - i < 0) {
            3
            hourEl.css('background-color', 'green');
            saveBtn.css('background-color', 'green');

        } else {
            hourEl.css('background-color', 'yellow');
            saveBtn.css('background-color', 'yellow');
        }
    }
})