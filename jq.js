$(document).ready(function() {
    const $input = $('#main-input');
    const $list = $('#list-container');

    class View {
       checkedText(id){
           $(`#${id}`).children(`.added-span`).css({
                "color": "grey",
                "text-decoration": "line-through"
            });
       }
       
       unchekedText(id){
            $(`#${id}`).children(`.added-span`).css({
                "color": "black",
                "text-decoration" : "none"
            });
       }

       hideTaskText(id){
            $(`#${id}`).children(`.added-span`).hide();
            $(`#${id}`).children(`#task-edit`).show();
       }

       showTaskText(id){
            $(`#${id}`).children(`.hidden`).hide();
            $(`#${id}`).children(`.added-span`).show();
       }

       removeItems(){
            $list.empty();   
        }

        addItems(elements){
            elements.forEach(task => {
                $list.append(`
                <div id="added-div">
                    <li id="${task.id}" class="input-line">
                        <input class="check-class checkbox-round" type="checkbox" ${(task.checkValue ? 'checked' : '')}>
                        <span class="added-span">${task.userText}</span>
                        <input type="text" id="task-edit" class="hidden" value="${task.userText}">
                        <button class="delete-button">X</button>
                    </li>
                </div>`) 
            });
        }

        UpdateView(Todo){
            TheView.removeItems();
            TheView.addItems(Todo);
        }
    }


    class Model {
        constructor (){
            this.array = [];
            this.id = 0;
        }

        addToArray(values){
            this.array.push({
                "userText": values,
                "checkValue": false,
                "id" : this.id++
            });
        }

        replaceItem(id, changedText){
            this.array[id].userText =  changedText;
        }

        spliceArray(id){
            this.array.splice(id, 1);
        }

        changeCheckValue(id){
            if(this.array[id].checkValue){
                this.array[id].checkValue = false;
            }else {
            this.array[id].checkValue = true;
            }
        }
        
        getArray(){
            return this.array;
        }
    }

    const TheView = new View();
    const TheModel = new Model();

    $input.on(`keyup`, function keyingUp(e) {
        let userText = $input.val();
        if (userText && e.which == 13){
            TheModel.addToArray(userText);
            $(this).val('');
            TheView.UpdateView(TheModel.getArray());
        }
    });

    $list.on(`click`, `.delete-button`, function(){
        let id = $(this).parent(`li`).attr(`id`);
        TheModel.spliceArray(id);
        TheView.UpdateView(TheModel.getArray());
    });

// EDITING TASK 
    $list.on( `dblclick`, `.input-line`, function() {
        let id = $(this).attr(`id`);
        TheView.hideTaskText(id);
    } );


    $list.on(`keyup`, `.hidden`, function keyingUp(e) {
        let id = $(this).parent(`li`).attr(`id`);
        let userText =  $(`#${id}`).children(`.hidden`).val();
        if (userText && e.which == 13) {
            TheView.showTaskText(id);
            TheModel.replaceItem(id, userText);
            TheView.UpdateView(TheModel.getArray());
        }
    });

// Check

    $list.on(`click`, `.check-class`, function(){
        let id = $(this).parent(`li`).attr(`id`);
        if($(this).is(':checked')){
            TheView.checkedText(id);
        } else {
            TheView.unchekedText(id);
        }    
    })
});