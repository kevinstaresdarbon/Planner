$(function(){
    containerEl = $('#container');

    for (let i=9; i < 18; i++){
       
        var hourEl = $('<div>');
        hourEl.attr('data-hour', i);
        hourEl.addClass('d-flex flex-row justify-content-between row');

        var titleEl = $('<h2>' + i + '</h2>');
        titleEl.addClass('col-2 col-md-1 d-flex justify-content-center align-items-center');
        hourEl.append(titleEl);

        var inputEl = $('<input type="text"></input>');
        inputEl.addClass('col-8 col-md-10');
        hourEl.append(inputEl);

        var saveBtn = $('<button>Save</button>');
        saveBtn.addClass('col-2 col-md-1');
        hourEl.append(saveBtn);

        containerEl.append(hourEl);
    }
})