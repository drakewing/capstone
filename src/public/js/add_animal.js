function updateBreed() {
// hide breed checkboxes for all unselected species dropdown
  const speciesOption = document.getElementsByClassName("speciesOption");
  let species;
  for (let i = 0; i < speciesOption.length; i += 1) {
    species = speciesOption[i].value;
    if (speciesOption[i].selected === true) {
      const speciesSpan = document.getElementsByClassName(`${species}Option`);
      for (let j = 0; j < speciesSpan.length; j += 1) {
        speciesSpan[j].hidden = false;
      }
    } else {
      const speciesSpan = document.getElementsByClassName(`${species}Option`);
      for (let j = 0; j < speciesSpan.length; j += 1) {
        speciesSpan[j].hidden = true;
      }
    }
  }
}

$(document).ready(updateBreed);

$('#speciesSelect').change(updateBreed);

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
