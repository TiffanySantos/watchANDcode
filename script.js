
// a todo list array with related methods on the object, it's the list and how you change it
var todoList = {
    todos: [], //empty array which is out todoList
    addTodo: function(todoText) {
      this.todos.push({ //push new list item into list array
        todoText: todoText, //list item text property
        completed: false //completed property default set to false
      });
    },
    changeTodo: function(position, todoText) { 
      this.todos[position].todoText = todoText; //take the index postion in the array and change the text property at that index
    },
    deleteTodo: function(position) { 
      this.todos.splice(position, 1);//to delete, splice the array by chosing start postion of splice and how many to cut out (in this case only one)
    },
    toggleCompleted: function(position) { //to toggle completed, modify the completed boolean propety value
      var todo = this.todos[position]; // index position of the list item to be toggled
      todo.completed = !todo.completed; //switch statement if completed then set to not and vise versa
    },
    toggleAll: function() {
      var totalTodos = this.todos.length; // to get all todos get the array length
      var completedTodos = 0; //start loop by setting start value to check against 
      this.todos.forEach(function(todo) { //forEach callback function being used in toggleAll higher order function
          if (todo.completed === true) { //change completed property to true
            completedTodos++; // if true add to the loop as complete until you reach the loop end (the array length)
          }
        }); 
      this.todos.forEach(function(todo){ 
        if (completedTodos === totalTodos) { //loop through each todoList item until the totalTodos (the array length) is reached
          todo.completed = false; // assign the value of false to each todoList item
        } else {
          todo.completed = true; // assign the value of true to each todoList item
        }
      });
    }
  };
  // DOM handling events object (the functions used in your HTML)
  var handlers = {
    addTodo: function() {
      var addTodoTextInput = document.getElementById('addTodoTextInput'); //document is accesssing the DOM using the getElementById method and assiging it to addTodoTextInput varaible
      todoList.addTodo(addTodoTextInput.value); //access todoList object, call the addTodo method on it with the addTodoTextInput variable (be suere to make that variable a value) as a parameter
      addTodoTextInput.value = ''; //after use, clear contents
      view.displayTodos(); //render any changes to screen after each DOM event
    },
    changeTodo: function() {
      var changeTodoPositionInput = document.getElementById('changeTodoPositionInput'); // create variables which will be used in the changeTodo function (this function requires tow parameters the vaiables breated are those two parameters)
      var changeTodoTextInput = document.getElementById('changeTodoTextInput'); //those variables are given the value of the id created in the HTML accessed via the getElementById method
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value); // call changeTodoText function which is on the todoList object
      changeTodoPositionInput.value = ''; //clear the input box in HTML after each use by setting to empty string after use
      changeTodoTextInput.value = '';
      view.displayTodos(); // call displayTodos function from the view object
    },
    deleteTodo: function(position) { //though this doesn't appear as a button on the main app, it is a function that is used on it, we have now created individual buttons per list item
      todoList.deleteTodo(position); // this function is also later called in the view object, deleting this function from here prevents the individual delete buttons from working
      view.displayTodos();
    }, 
    toggleCompleted: function() {
      var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput'); //as above, create a variable and assign it the value of the DOM id
      todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber); // call the toggleCompleted function on the todoList object passing it in the toggleCompletedPositionInput variable but make sure it's a number as the parameter
      toggleCompletedPositionInput.value = '';
      view.displayTodos();
    },
    toggleAll: function() {
      todoList.toggleAll(); // call the toggleAll function on the todoList object, this function doesn't take any parameters
      view.displayTodos();
    }  
  };
  // rendering todoList items object (updting the screen when changes to the todoList have been made)
  var view = {
    displayTodos: function() {
      var todosUl = document.querySelector('ul'); // the DOM querySelctor returns the first match (of null if not found) here we are selecting any UL element
      todosUl.innerHTML = '';
// callback function isn't just passed the todo item in the array it is also passed in its position
//forEach REQUIRES both a variable and the object property which is being iterated over (in this case the array position beacause the todoList array is the object)
      todoList.todos.forEach(function(todo, position){
       var todoLi = document.createElement('li'); // here we are selecting any Li elements from the DOM
       var todoTextWithCompletion = '';       
       if (todo.completed === true) { // for each todoList item concatenate an x for completion or not dpending on the boolean completed property value
              todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
              todoTextWithCompletion = '( ) ' + todo.todoText;
            }
        todoLi.id = position; //access the todo list item id(its array position which is what will be iterated over) and assign it the value of position because forEach requires a position
        todoLi.textContent = todoTextWithCompletion; // create a variable that includes the list item text with it's associated () or (x)
        todoLi.appendChild(this.createDeleteButton()); //to each list item append a button (the button is created by calling a function which appears on this object which is why we use this)
        todosUl.appendChild(todoLi); //append each list item to the unordered list
    }, this); //this here is being used in the foreach callback function so that it is poiting to the view object, because it is not a method on the view object it is a parameter in the callback function
    },
    createDeleteButton: function() { 
      var deleteButton = document.createElement('button'); // variable that inserts the button onto the DOM
      deleteButton.textContent = ('Delete'); //text that appears on the button
      deleteButton.className = 'deleteButton'; //create a variable for the className and assign it the value of 'deleteButton' 
      return deleteButton; //return is used so that function doesn't return null
    },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul'); // create a variable and assign it the value of the ul from the DOM
      todosUl.addEventListener('click', function(event){ //addEventListener is a callback function, it takes the event (a click) and a function. 
      var elementClicked = event.target; //the function takes a mouse event as a parameter (here where the mouse was clicked). This mouse click was assigned to the variable element clicked 
        if (elementClicked.className ==='deleteButton') { //if what was clicked has the className deleteButton as previously assigned in the deletebutton function
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); //then we call the deleteTodo function on the handlers object and call the parseInt function (which takes a string, the ide of the element clicked, and converts it into a number because delete function requires an int)
        }
      });
    }
  };

  view.setUpEventListeners(); // call the setUpEventListeners function on the view object outside of the object
 
  