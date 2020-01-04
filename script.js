
// a todo list array with related methods on the object, it's the list and how you change it
var todoList = {
    todos: [], //empty array which is out todoList
    addTodo: function(todoText) {
      this.todos.push({ //push new list item into list array
        todoText: todoText, //list item text property
        completed: false //completed property default set to false
      });
    },
    changeTodo: function(position, todoText) { //to change take the indext postion in the array and change the text property
      this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) { //to delete splice the array by chosing start postion of splice and how many to cut out (in this case only one)
      this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) { //to toggle completed modify the completed boolean propety value
      var todo = this.todos[position]; // index position of the list item to be toggled
      todo.completed = !todo.completed; //switch statement if completed then set to not and vise versa
    },
    toggleAll: function() {
      var totalTodos = this.todos.length; // to get all todos get the array length
      var completedTodos = 0; //start loop by setting start value to check against 
      // Get number of completed todos.
      for (var i = 0; i < totalTodos; i++) {
        if (this.todos[i].completed === true) {
          completedTodos++;
        }
      }
      // Case 1: If everything’s true, make everything false.
      if (completedTodos === totalTodos) {
        for (var i = 0; i < totalTodos; i++) {
          this.todos[i].completed = false;
        }
      // Case 2: Otherwise, make everything true.
      } else {
        for (var i = 0; i < totalTodos; i++) {
          this.todos[i].completed = true;
        }      
      }
    }
  };
  // DOM handling events object
  var handlers = {
    addTodo: function() {
      var addTodoTextInput = document.getElementById('addTodoTextInput');
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    },
    changeTodo: function() {
      var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
      var changeTodoTextInput = document.getElementById('changeTodoTextInput');
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoPositionInput.value = '';
      changeTodoTextInput.value = '';
      view.displayTodos();
    },
    deleteTodo: function() {
      var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
      todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
      deleteTodoPositionInput.value = '';
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
      for (var i = 0; i < todoList.todos.length; i++) {
        var todoLi = document.createElement('li');
        var todo = todoList.todos[i];
        var todoTextWithCompletion = '';
  
        if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
        }
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
      }  
    },
    createDeleteButton: function () { 
      var deleteButton = document.createElement('button)'); // variable that inserts the button onto the DOM
      deleteButton.textContent = ('Delete'); //text that appears on the button
      deleteButton.className = "deleteButton";
      return deleteButton
    }
  };
  