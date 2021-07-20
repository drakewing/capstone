
// this function displays only the breeds of the chosen species when the page first loads
$(document).ready(() => {
  // Check the first radio button when page loads
  document.getElementsByClassName("form-control species type")[0].checked = true;
  document.getElementsByClassName("form-select breed")[0].checked = true;

  // hide breed checkboxes for all unchecked species radio buttons
  const radioButtons = document.getElementsByClassName("form-control species type");
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

// Any time the user selects a species, this function displays its breed and hides breeds for the unselected species
// event listener to change breed checkboxes upon radio button click
$(document).on('click', '.form-control species type', () => {
  const radioButtons = document.getElementsByClassName("form-control species type");
  let species;

  for (let i = 0; i < radioButtons.length; i += 1) {
    species = radioButtons[i].value;
    if (radioButtons[i].checked === true) {
      const speciesSpan = document.getElementById(`${species}radioSpan`);
      speciesSpan.hidden = false;
      speciesSpan.getElementsByClassName("form-select breed")[0].checked = true;
    } else {
      const breedRadio = document.getElementsByClassName(`${species}Radio`);
      for (let j = 0; j < breedRadio.length; j += 1) {
        breedRadio[j].checked = false;
      }
      const speciesSpan = document.getElementById(`${species}radioSpan`);
      speciesSpan.hidden = true;
    }
  }
});



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