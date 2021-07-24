$(document).ready(() => {
  // Check the first radio button when page loads
  document.getElementsByClassName("form-check-input species")[0].checked = true;
  document.getElementsByClassName("form-check-input breed")[0].checked = true;

  // hide breed checkboxes for all unchecked species radio buttons
  const radioButtons = document.getElementsByClassName("form-check-input species");
  let species;
  for (let i = 0; i < radioButtons.length; i += 1) {
    species = radioButtons[i].value;
    if (radioButtons[i].checked === true) {
      const speciesSpan = document.getElementById(`${species}radioSpan`);
      speciesSpan.hidden = false;
    } else {
      const speciesSpan = document.getElementById(`${species}radioSpan`);
      speciesSpan.hidden = true;
    }
  }
});

$('#addAnimal').submit((e) => {
  // prevent default form behavior (avoid the page reload)
  e.preventDefault();

  // get the data from the user
  // const formData = $("#animalForm").serializeObject();
  const formData = new FormData(e.target);

  console.log(formData);

  // send ajax http request (instead of the XMLHttpRequest)
  $.ajax({
    type: "POST",
    url: "/animals",
    contentType: false,
    processData: false,
    data: formData,
    success: (result) => { console.log(result); },
    error: (xhr) => { console.log(xhr.responseText); }
  });

  // reset the form (erase user data)
  $('#addAnimal').each(() => {
    e.target.reset();
  });
});
