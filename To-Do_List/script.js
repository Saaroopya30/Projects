$(document).ready(function() {
    
    $("#add-task").click(function() {
      var newTask = $("#new-task").val();
      if (newTask) {
        $("#todo-list").append(
          `<li><input type="checkbox" class="mark-complete">` +
            newTask +
            ` <button class="delete-task">Delete</button></li>`
        );
        $("#new-task").val(""); 
      }
    });
  
    
    $(document).on("click", ".mark-complete", function() {
      $(this).parent().toggleClass("completed");
    });
  
    
    $(document).on("click", ".delete-task", function() {
      $(this).parent().remove();
    });
  
    
    $("#clear-completed").click(function() {
      $("#todo-list li.completed").remove();
    });
  });