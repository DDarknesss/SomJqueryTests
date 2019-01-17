$(document).ready(function() {
    let $input;
    let $list;

    let TheView;
    let TheModel;
    let LS;

    const init = () => {
		$input = $('#main-input');
		$list = $('#list-container');

    	TheView = new View('#list-container');
        TheModel = new Model();
        LS = new LocalStorage()
    }

    init();

    TheModel.replaceTasksFromLS(LS.getFromLS());
    TheView.UpdateView(TheModel.getArray());

    $input.on(`keyup`, function keyingUp(e) {
        let userText = $input.val();
        if (userText && e.which == 13){
            TheModel.addToArray(userText);
            $(this).val('');
            LS.setToLS(TheModel.getArray());
            TheView.UpdateView(TheModel.getArray());
        }
    });

// Delete
    $list.on(`click`, `.delete-button`, function(){
        let id = $(this).parent(`li`).attr(`id`);
        TheModel.spliceArray(id);
        LS.setToLS(TheModel.getArray());
        TheView.UpdateView(TheModel.getArray());
    });

// EDITING TASK 
    $list.on( `dblclick`, `.input-line`, function() {
        let id = $(this).attr(`id`);
        TheView.hideTaskText(id);
        LS.setToLS(TheModel.getArray());
    } );

    $list.on(`keyup`, `.hidden`, function keyingUp(e) {
        let id = $(this).parent(`li`).attr(`id`);
        let userText =  $(`#${id}`).children(`.hidden`).val();
        if (userText && e.which == 13) {
            TheModel.replaceItem(id, userText);
            TheView.UpdateView(TheModel.getArray());
            LS.setToLS(TheModel.getArray());
        }
    });

// Check

    $list.on(`click`, `.check-class`, function(){
        let id = $(this).parent(`li`).attr(`id`);
        TheModel.changeCheckValue(id);
        LS.setToLS(TheModel.getArray());
        TheView.UpdateView(TheModel.getArray());
    })

    $(`#main-button`).on(`click`, function(){
        TheModel.emptyTasks();
        LS.setToLS(TheModel.getArray());
        TheView.UpdateView(TheModel.getArray());
    });

});

class View {
	constructor(id) {
		this.$list = $(id);	
	}

   hideTaskText(id){
        $(`#${id}`).children(`.added-span`).hide();
        $(`#${id}`).children(`#task-edit`).show();
   }


   removeItems(){
        this.$list.empty();   
    }

    addItems(elements){
        elements.forEach(task => {
            this.$list.append(`
            <div id="added-div">
                <li id="${task.id}" class="input-line">
                    <input class="check-class checkbox-round" type="checkbox" ${(task.checkValue ? 'checked' : '')}>
                    <span class= "added-span ${(task.checkValue ? "overline" : " ")}">${task.userText}</span>
                    <input type="text" id="task-edit" class="hidden" value="${task.userText}">
                    <button class="delete-button">X</button>
                </li>
            </div>`) 
        });
    }

    UpdateView(Todo){
        this.removeItems();
        this.addItems(Todo);
    }
}

class Model {
    constructor (){
        this.array = [];
        this.id = 0;
    }

    addToArray(values) {
        this.array.push(
            {
                "userText": values,
                "checkValue": false,
                "id" : ++this.id
            });
    }

    replaceItem(id, changedText) {
        let ArrayID = this.elementIdToIndex (id);
        this.array[ArrayID].userText = changedText;
    }

    spliceArray(id) {
        let ArrayID = this.elementIdToIndex (id);
        this.array.splice(ArrayID, 1);
    }

    changeCheckValue(id) {
        let ArrayID = this.elementIdToIndex (id);
        this.array[ArrayID].checkValue = !this.array[ArrayID].checkValue;
    }
    
    elementIdToIndex (id) {
        let idToInt = parseInt(id);
        return this.array.findIndex((obj) =>  obj.id === idToInt);
    }
    
    getArray() {
        return this.array;
    }

    emptyTasks() {
        this.array = [];
    }

    replaceTasksFromLS(passedArray){
        passedArray ? this.array = passedArray : [];
        this.id = this.getTheMaxId();
    }


    getTheMaxId(){
        if ( this.array.length === 0){
            return 0;
        }

        let maxID = Math.max.apply(Math, this.array.map(o => o.id));
        return maxID;
    }
}

class LocalStorage {

    constructor (){
        this.array = [];
    }
    
    setToLS(tasks){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getFromLS(){
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        this.array = storedTasks || [];
        return this.array;
    }
}