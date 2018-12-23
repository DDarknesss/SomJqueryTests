class model{}



class view{
     AddView (params) {
        
    }

    RemoveView(params){

    }

}

$(document).ready(function() {
    const $input = $('#main-input');
    const $list = $('#list-container');
    const $div = $('div');

    function addToList(list) {
        list.forEach(task => {
            $list.append( '<div><li id=""><label id="input-label"><input type="checkbox" ' 
            + (task.checkValue ? 'checked' : '') 
            + '><span>' + task.userText + '</span><label></li></div>');             
        });
    }


    const taskList = [
        {userText: 'ba', checkValue: true},
        {userText: 'ba', checkValue: true},
        {userText: 'ba', checkValue: true},
        {userText: 'ba', checkValue: true},
        {userText: 'ba', checkValue: true},
    ]
    addToList(taskList);

    
    $input.on('keyup', function keyingUp(e) {
        let userText = $(this).val();
        if (userText && e.which == 13) {
            addToList(userText);
            $(this).val('');
        }
    });

    $div.on( 'dblclick', '#input-label', function() {
        if($(this).text()){ 
            let userText = $(this).text();
            $(this).replaceWith('<label><input type="text" value="' + userText + '"></label> ')
        }
    } );

    // $mainelement.on('click', function(event) {
    //     if (event.target !== target.is( "input" )  ){
    //         alert(event.currentTarget);
    //     }
    // });
});