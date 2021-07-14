$('#submitAnimal').click(function(e) {

 

    // prevent default form behavior (avoid the page reload)
    e.preventDefault(); 

 

    // get the data from the user
    var formData = $("#animalForm").serialize();   

 

    // send ajax http request (instead of the XMLHttpRequest)
     $.ajax({
        type: "POST",
        url: "/animals",
        contentType: "application/x-www-form-urlencoded",
        data: formData,
        success: function(result){ alert(result)},
        error: function(xhr){ alert(xhr.responseText) }
    });

 

    // reset the form (erase user data)
    $('#animalForm' ).each(function(){
        this.reset();
    });
});