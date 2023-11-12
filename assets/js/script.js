$(function () {

    // bring in the advancedFormat plugin 
    dayjs.extend(window.dayjs_plugin_advancedFormat)

    var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //initilaise needed references and vars

    var containerEl = $('#container');
    var dateEl = $('#currentDay');
    var now = dayjs();
    var test = dayjs().hour(13);
    var dayInfoString = localStorage.getItem("dayInfo");
    var dayInfo = {};

    function handleClick(e){
        clickedEl = $(e.target);
        if (clickedEl.is('.saveBtn')){
            var hourBlock = clickedEl.parent().attr('data-hour');
            //retriev from local storage
            var dayInfo = JSON.parse(localStorage.getItem("dayInfo"));
            //set the desired kvp
            dayInfo.info[hourBlock] = clickedEl.parent().children('input').val(); 
            //return to local storage           ;
            localStorage.setItem("dayInfo", JSON.stringify(dayInfo));

            //create an animated effect to visually show the element info has been saved

            clickedEl.parent().children('input').addClass('swell');
            clickedEl.parent().children('input').removeClass('norm');

            setTimeout(() => {
                clickedEl.parent().children('input').addClass('bold');
                clickedEl.parent().children('input').removeClass('swell');
                clickedEl.parent().children('input').addClass('norm');

            }, 500)
        }
    }

    function initDayInfo() {
        newDayInfo = { date: now.format("YY MM DD"), info: {9: "", 10: "", 11: "", 12:"", 13:"", 14:"", 15:"", 16:"", 17:""} };
        return newDayInfo;
    }

    // no object currently saved to local storage so initialise it
    if (!dayInfoString) {
        dayInfo = initDayInfo();
        dayInfoString = JSON.stringify(dayInfo);
        localStorage.setItem("dayInfo", dayInfoString);
    } else {

        dayInfo = JSON.parse(dayInfoString);

        // old info, discard for security purposes {don't want to create a log of the planner in local storage}
        if (dayInfo.date !== dayjs().format("YY MM DD")) {
            dayInfo = initDayInfo();
            dayInfoString = JSON.stringify(dayInfo);
            localStorage.setItem("dayInfo", dayInfoString);
        };
    };


    dateEl.text("Today is " + dayArray[now.day()] + now.format(" [the] Do [of] MMMM, YYYY"));

    for (let i = 9; i < 18; i++) {

        var hourEl = $('<div>');
        hourEl.attr('data-hour', i);
        //used row-reverse to aid the on-click handler so it can use the + combinator
        hourEl.addClass('d-flex flex-row justify-content-between row hour ');

        var timeString = "";

        if (i < 12) {
            timeString = i + " a.m.";
        } else if (i > 12) {
            timeString = (i - 12) + " p.m."
        } else {
            timeString = "12 p.m."
        }

        var titleEl = $('<h2>' + timeString + '</h2>');
        titleEl.addClass('col-2 col-md-1 d-flex justify-content-center align-items-center my-1');


        var inputEl = $('<input type="text"></input>');
        inputEl.addClass('col-8 col-md-10 description my-1');
        //retrieve the stored values from the object
        if(dayInfo.info[i] !== ""){
            inputEl.val(dayInfo.info[i]);
            inputEl.addClass('bold');
        }
        


        var saveBtn = $('<button class="saveBtn">Save</button>');
        saveBtn.addClass('col-2 col-md-1 my-1');

        hourEl.append(titleEl);
        hourEl.append(inputEl);
        hourEl.append(saveBtn);
      
        

        if (test.hour() - i > 0) {
            titleEl.addClass('past');
            saveBtn.css('background-color', '#d3d3d3');
            saveBtn.prop('disabled', true);
            inputEl.addClass('past');
            inputEl.prop('disabled', true);

        } else if (test.hour() - i < 0) {
            3
            titleEl.addClass('future');
            saveBtn.css('background-color', '#77dd77');
            inputEl.addClass('future');

        } else {
            titleEl.addClass('present');
            saveBtn.css('background-color', '#f3f788');
            //added for visibility
            saveBtn.css('color', 'black');
            inputEl.addClass('present');
        }

        containerEl.append(hourEl);
    }

    containerEl.on("click", handleClick);
})