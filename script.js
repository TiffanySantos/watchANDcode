
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
      var addTodoTextInput = document.getElementById('addTodoTextInput');
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    },
    changeTodo: function() {
      var changeTodoPositionInput = document.getElementById('changeTodoPositionInput'); // create variables which will be used in the changeTodo function (this function requires tow parameters the vaiables breated are those two parameters)
      var changeTodoTextInput = document.getElementById('changeTodoTextInput'); //those variables are given the value of the id created in the HTML accessed via the getElementById method
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value); // call changeTodoText function which is on the todoList object
      changeTodoPositionInput.value = ''; //clear the input box in HTML after each use by setting to empty string after use
      changeTodoTextInput.value = '';
      view.displayTodos(); // call displayTodos function from the view object
    },
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.displayTodos();
    },
    toggleCompleted: function() {
      var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
      todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
      toggleCompletedPositionInput.value = '';
      view.displayTodos();
    },
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    }  
  };
  // rendering todoList items object
  var view = {
    displayTodos: function() {
      var todosUl = document.querySelector('ul'); 
      todosUl.innerHTML = '';
// callback function isn't just passed the todo item in the array it is also passed in its position
//forEach REQUIRES both a variable and the object property which is being iterated over (in this case the array position beacause the todoList array is the object)
      todoList.todos.forEach(function(todo, position){
       var todoLi = document.createElement('li');
       var todoTextWithCompletion = '';
        
       if (todo.completed === true) {
              todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
              todoTextWithCompletion = '( ) ' + todo.todoText;
            }
        
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
    }, this); //this here is being used in the foreach callback function so that it is poiting to the view object, because it is not a method on the view object
    },
    createDeleteButton: function() { 
      var deleteButton = document.createElement('button'); // variable that inserts the button onto the DOM
      deleteButton.textContent = ('Delete'); //text that appears on the button
      deleteButton.className = "deleteButton";
      return deleteButton;
    },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
      todosUl.addEventListener('click', function(event){

      var elementClicked = event.target;
        if (elementClicked.className ==='deleteButton') {
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
      });
    }
  };

  view.setUpEventListeners(); // call the setUpEventListeners function on the view object outside of the object
 
  