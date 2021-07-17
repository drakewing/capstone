$('#submitAnimal').click((e) => {
  // prevent default form behavior (avoid the page reload)
  e.preventDefault();

  // get the data from the user
  const formData = $("#animalForm").serializeObject();

  // send ajax http request (instead of the XMLHttpRequest)
  $.ajax({
    type: "POST",
    url: "/animals",
    contentType: "application/json",
    data: formData,
    success: (result) => { console.log(result); },
    error: (xhr) => { console.log(xhr.responseText); }
  });

  // reset the form (erase user data)
  $('#myform').each(() => {
    this.reset();
  });
});
