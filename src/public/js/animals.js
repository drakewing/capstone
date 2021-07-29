/* Generates query string based on filter criteria selected by user
 *
 * Example:
 *   ?breed=yorkie&breed=beagle&disposition=goodwithkids&dateCreated=Newest_to_Oldest
 */
function buildQueryString() {
  // gets the user's species radio button selection
  const speciesList = document.getElementsByClassName("species");
  let species;
  for (let i = 0; i < speciesList.length; i += 1) {
    if (speciesList[i].checked === true) {
      species = speciesList[i].value;
    }
  }
  // get the breed chosen by the user
  const breedRadio = document.getElementsByClassName(`${species}Radio`);
  const breedCriteria = [];
  for (let i = 0; i < breedRadio.length; i += 1) {
    if (breedRadio[i].checked === true) {
      breedCriteria.push(encodeURIComponent(breedRadio[i].value));
    }
  }

  // build the query string
  let queryString = `species=${species}`;

  if (breedCriteria.length > 0) {
    queryString += "&breed=";
  }

  queryString += breedCriteria.join("&breed=");

  const dispositionCheckBoxes = document.getElementsByClassName("dispositionCheck");
  const dispositionCriteria = [];
  for (let i = 0; i < dispositionCheckBoxes.length; i += 1) {
    if (dispositionCheckBoxes[i].checked === true) {
      dispositionCriteria.push(encodeURIComponent(dispositionCheckBoxes[i].name));
    }
  }

  if (dispositionCriteria.length > 0) {
    if (queryString !== "") {
      queryString += "&";
    }
    queryString += "disposition=";
  }
  queryString += dispositionCriteria.join("&disposition=");

  const dateCreatedRadio = document.getElementsByClassName("dateCreated");
  let filterDateCreated;
  for (let i = 0; i < dateCreatedRadio.length; i += 1) {
    if (dateCreatedRadio[i].checked === true) {
      filterDateCreated = dateCreatedRadio[i].value;
    }
  }
  queryString = `${queryString}&${filterDateCreated}`;

  return queryString;
}

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

// filter search results buttons
$(document).on('click', '#filter', () => {
  const searchCriteria = buildQueryString();
  console.log(searchCriteria);

  $.ajax({
    type: "GET",
    url: `/animals/partial?${searchCriteria}`,
    crossDomain: true,
    success: (data) => {
      $('#searchgrid').html(data);
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});

// event listener to change breed checkboxes upon radio button click
$(document).on('click', '.form-check-input.species', () => {
  const radioButtons = document.getElementsByClassName("form-check-input species");
  let species;

  for (let i = 0; i < radioButtons.length; i += 1) {
    species = radioButtons[i].value;
    if (radioButtons[i].checked === true) {
      const speciesSpan = document.getElementById(`${species}radioSpan`);
      speciesSpan.hidden = false;
      speciesSpan.getElementsByClassName("form-check-input breed")[0].checked = true;
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

// continuously watches the css selectors for the click event
// $( this ) will refer to the entire document not the button
$(document).on('click', '#prev,#next', (event) => {
  console.log(event.target.id);
  const direction = event.target.id;

  const cursor = encodeURIComponent(event.target.dataset.cursor);
  console.log(cursor);

  const searchCriteria = buildQueryString();
  console.log(searchCriteria);

  $.ajax({
    type: "GET",
    url: `/animals/partial?cursor=${cursor}&direction=${direction}&${searchCriteria}`,
    crossDomain: true,
    success: (data) => {
      $('#searchgrid').html(data);
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});

// generate modal content when user clicks on see details
$(document).on('show.bs.modal', (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;

  // Extract info from data-* attributes
  const gender = button.getAttribute('data-gender');
  const breed = button.getAttribute('data-breed');
  const age = button.getAttribute('data-age');
  const species = button.getAttribute('data-species');
  const availability = button.getAttribute('data-availability');
  const disposition = button.getAttribute('data-disposition');
  const dateCreated = button.getAttribute('data-dateCreated');
  const name = button.getAttribute('data-name');
  const id = button.getAttribute('data-id');
  const photo = `${button.getAttribute('data-bucket')}/${button.getAttribute('data-photo')}`;

  // Update the modal's content
  $('.modal-title').text(name);
  const modalBody = $('.modal-body');
  const modalFooter = $('.modal-footer');
  modalBody.find('#photo').attr('src', photo);
  modalBody.find('#gender').text(gender);
  modalBody.find('#age').text(age);
  modalBody.find('#species').text(species);
  modalBody.find('#breed').text(breed);
  modalBody.find('#availability').text(availability);
  modalBody.find('#dateCreated').text(dateCreated);
  modalFooter.find('#viewApps').attr('data-id', id);
  modalFooter.find('#deleteAnimal').attr('data-id', id);
  modalFooter.find('#adoptAnimal').attr('data-id', id);
  modalFooter.find('#deleteAnimal').attr('data-photo', photo);

  const dispositionArray = disposition.split(",");
  $("#disposition").text("");
  for (let i = 0; i < dispositionArray.length; i += 1) {
    $("#disposition").append($("<li>").text(dispositionArray[i]));
  }
});

function displayGrid() {
  $('#animalModal').modal('toggle');
  // use the previous cursor but set direction to "next"
  const direction = 'next';
  const cursor = encodeURIComponent($('#prev').attr('data-cursor'));
  console.log(cursor);

  const searchCriteria = buildQueryString();
  console.log(searchCriteria);

  $.ajax({
    type: "GET",
    url: `/animals/partial?cursor=${cursor}&direction=${direction}&${searchCriteria}`,
    crossDomain: true,
    success: (data) => {
      $('#searchgrid').html(data);
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
}

// display alert message to confirm that user intends to delete animal
$(document).on('click', '#deleteAnimal', () => {
  const deleteAlert = document.getElementById('deleteAlert');
  deleteAlert.style.display = 'block';
  const modalButtons = document.getElementById('modalButtons');
  modalButtons.style.display = 'none';
});

// if you cancel the delete, hide the alert message
$(document).on('click', '#cancelDelete', () => {
  const deleteAlert = document.getElementById('deleteAlert');

  // todo CSS properties go in the html style attribute
  deleteAlert.style.display = 'none';

  const modalButtons = document.getElementById('modalButtons');
  modalButtons.style.display = 'block';
});

// delete an animal (admin use only)
$(document).on('click', '#confirmDelete', () => {
  const photo = $("#deleteAnimal").attr('data-photo');
  const id = $("#deleteAnimal").attr('data-id');

  $.ajax({
    type: "DELETE",
    url: `/animals/${id}?photo=${photo}}`,
    crossDomain: true,
    success: displayGrid,
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});

// user account - create adoption application
$(document).on('click', '#adoptAnimal', () => {
  const id = $("#adoptAnimal").attr('data-id');
  const userId = $("#adoptAnimal").attr('data-userId');

  $.ajax({
    type: "POST",
    url: `/applications`,
    crossDomain: true,
    data: { animalId: id, userID: userId },
    success: () => {
      console.log("application request successful");
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});

// shelter account - click view applications button
$(document).on('click', '#viewApps', () => {
  const animalId = $("#viewApps").attr('data-id');
  console.log(animalId);

  $.ajax({
    type: "GET",
    url: `/applications/animals/${animalId}`,
    crossDomain: true,
    success: (data) => {
      console.log(data);
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});
