$(function(){
    containerEl = $('#container');

    for (let i=9; i < 18; i++){
       
        var hourEl = $('<div>');
        hourEl.append($('<h2>' + i + '</h2>'));
        hourEl.attr('data-hour', i);

        var inputEl = ('<input type="text"></input>');
        hourEl.append(inputEl);

        var saveBtn = $('<button>Save</button>');
        hourEl.append(saveBtn);

        containerEl.append(hourEl);
    }
})