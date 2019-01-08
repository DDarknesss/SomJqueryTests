$(document).ready(function() {
    const $input = $('#main-input');
    const $list = $('#list-container');
    const $div = $('div');
    const $deleteButton = $(`.added-button`);

    class View {
        addToList(elements){
            elements.forEach(task => {
                $list.append(`
                <div id="added-div">
                    <li class="input-line">
                        <label>
                            <input type="checkbox" ${(task.checkValue ? 'checked' : '')}>
                        </label>
                        <span class="added-span">${task.userText}</span>
                        <button class="added-button">X</button>
                    </li>
                </div>`) 
            });
        }

        removeItems() {
            $list.empty();   
        }
    }

    class Model {
        constructor (){
            this.array = [];
        }
        
        // Need to put out of Model to controller


        addToArray(values){
            return this.array.push(values);
        }

        getArray(){
            return this.array;
        }
    }

    class Controller {

        getInputValue() {
            return $input.val();
        }
    }

    const TheView = new View();
    const TheModel = new Model();
    const TheController = new Controller();

    $input.on(`keyup`, function keyingUp(e) {
        if ($input.val()!= "" && e.which == 13) {
            let userText = TheController.getInputValue();
            TheModel.addToArray({"userText": userText, "checkValue": false});
            let Todo =  TheModel.getArray();
            $(this).val('');
            TheView.removeItems();
            TheView.addToList(Todo);
        }
    });

    $div.on( `dblclick`, `#input-label`, function() {
        if($(this).text()){ 
            let userText = $(this).text();
            $(this).replaceWith(`<label><input type="text" value=${userText}></label>`)
        }
    } );

    $div.on(`click`, `.added-button`, function(){
        $(this).parent(`li`).remove();
    })

    $(`#info-button`).on(`click`, function(){
        console.log(JSON.stringify(TheController.getInputValue()))
    })
});