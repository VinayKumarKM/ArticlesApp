 $(document).ready(function(){
    $(".login-form #id_password").attr('type', 'password');
    $(".signup-form #id_password").attr('type', 'password');
    $(".error").html('');
});

//LOGIN PAGE FUNCTIONS

//Sign Up Vaidation
$('.signup-form').submit(function(e){
	var name = $(".signup-form #id_name").val();
	var password = $(".signup-form #id_password").val();
	var repeat_password = $(".signup-form #id_repeat_password").val();
	if (name != '' && password == repeat_password)
	{
		return true;
	}
	else
	{
		$("#signup-error").html("Fill Credentials Correctly !!!");
		return false;
	}
});


//Login Valaidation
$('.login-form').submit(function(e){
	var name = $(".login-form #id_name").val();
	var password = $(".login-form #id_password").val();
	if (name != '' && password != '')
	{
		return true;
	}
	else
	{
		$("#login-error").html("Credentials are Incorrect !!!");
		return false;
	}
});


$("#show_password").click(function(e){
	e.preventDefault();
	var attr = $(".signup-form #id_password").attr('type');
	if(attr == 'password')
	{
		$(".signup-form #id_password").attr('type', 'text');
		$(".signup-form #id_repeat_password").attr('type', 'text');
	}
	else
	{
		$(".signup-form #id_password").attr('type', 'password');
		$(".signup-form #id_repeat_password").attr('type', 'password');
	}
});

//TODOS PAGE FUCTIONS

//To Add Comment
$(".add_comment").click(function(e){
	var todo_name = $(this).parent().parent().parent().attr("name");
	var comment = $(".todo[name='"+ todo_name +"'] .comment").val();
	var todo_id = $(this).attr('id');
	if(comment != '')
	{
		$.ajax({
	    	url: 'comment/'+todo_id,
	    	type: 'POST',
			dataType: 'json',
	    	data: { "comment" : comment },
			success: function(data){
				$(".todo[name='"+ data['todo_name'] +"'] .comments").append('<li class="font align">'+ data['comment'] +'</li>')
				$(".comment").val('');
	 	    },	
	 	    error:function(error){
	 	    	console.log(error);
	 	    }
		});
	}
});

//To Open Modal for Edit Todo with Todo Data
$(".edit").click(function(e){
	var todo_id = $(this).parent().attr("id");
	$.ajax({
    	url: 'todo/'+todo_id,
    	type: 'GET',
    	dataType:'json',
		success: function(data){
			console.log(data);
			$("#todo_name").val(data['name']);
			$("#todo_description").val(data['description']);
			$(".update").attr('name', data['id']);
			$('#mymodal').modal('show');
 	    },	
 	    error:function(error){
 	    	console.log(error);
 	    }
	});
	
});

//To Update the Todo
$(".update").click(function(e){
	e.preventDefault();
	var todo_id = $(this).attr("name");
	$.ajax({
    	url: 'edit/'+todo_id,
    	type: 'POST',
    	dataType:'json',
    	data:$(".edit-form").serialize(),
		success: function(data){
			$(".todo[name='"+ data['prev_name'] +"']").attr("name", data['name']);
			$(".todo[name='"+ data['name'] +"'] .details #name").html(data['name']);
			$(".todo[name='"+ data['name'] +"'] .details #description").html(data['description']);
			$('#mymodal').modal('hide');
 	    },	
 	    error:function(error){
 	    	console.log(error);
 	    }
	});
});

//To Complete Todo
$(".complete").click(function(e){
	e.preventDefault();
	var todo_id = $(this).parent().attr("id");
	var con = confirm("Are you Sure TODO is Completed?");
	if(con == true)
	{
		$.ajax({
	    	url: 'complete/'+todo_id,
	    	type: 'GET',
	    	dataType:'json',
			success: function(data){
				$(".todo[name='"+ data['name'] +"'] .commenting").html('');
				$(".todo[name='"+ data['name'] +"'] .editing .complete").attr('disabled', true).html('COMPLETED');
				$(".todo[name='"+ data['name'] +"'] .editing .edit").remove();
	 	    },	
	 	    error:function(error){
	 	    	console.log(error);
	 	    }
		});
		
	}
});

//To Delete Todo
$(".delete").click(function(e){
	e.preventDefault();
	var todo_id = $(this).parent().attr("id");
	var con = confirm("Are you Sure you Want Delete this TODO ?");
	if(con == true)
	{
		$.ajax({
	    	url: 'delete/'+todo_id,
	    	type: 'GET',
	    	dataType:'json',
			success: function(data){
				$(".todo[name='"+ data['name'] +"']").remove();
	 	    },	
	 	    error:function(error){
	 	    	console.log(error);
	 	    }
		});
		
	}
});