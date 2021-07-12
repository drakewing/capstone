// gets the user's species radio button selection
function getSpecies() {
  const species = document.getElementsByClassName("species");
  let selectedSpecies;
  for (let i = 0; i < species.length; i += 1) {
    if (species[i].checked === true) {
      selectedSpecies = species[i].value;
    }
  }
  return selectedSpecies;
}

/* Generates query string based on filter criteria selected by user
 *
 * Example:
 *   ?breed=yorkie&breed=beagle&disposition=goodwithkids&dateCreated=Newest_to_Oldest
 */
function buildQueryString(species) {
  const breedRadio = document.getElementsByClassName(`${species}Radio`);
  const breedCriteria = [];
  for (let i = 0; i < breedRadio.length; i += 1) {
    if (breedRadio[i].checked === true) {
      breedCriteria.push(breedRadio[i].value);
    }
  }

  let queryString = `species=${species}`;

  if (breedCriteria.length > 0) {
    queryString += "&breed=";
  }

  queryString += breedCriteria.join("&breed=");

  const dispositionCheckBoxes = document.getElementsByClassName("dispositionCheck");
  const dispositionCriteria = [];
  for (let i = 0; i < dispositionCheckBoxes.length; i += 1) {
    if (dispositionCheckBoxes[i].checked === true) {
      dispositionCriteria.push(dispositionCheckBoxes[i].name);
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
  const species = getSpecies();
  const searchCriteria = buildQueryString(species);

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

// next button
$(document).on('click', '#next', () => {
  const nextCursor = encodeURIComponent($("#next").attr("data-cursor"));
  console.log(nextCursor);

  const species = getSpecies();
  const searchCriteria = buildQueryString(species);
  console.log(searchCriteria);

  $.ajax({
    type: "GET",
    url: `/animals/partial?cursor=${nextCursor}&${searchCriteria}`,
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

  // Update the modal's content
  $('.modal-title').text(name);
  const modalBody = $('.modal-body');
  modalBody.find('#gender').text(gender);
  modalBody.find('#age').text(age);
  modalBody.find('#species').text(species);
  modalBody.find('#breed').text(breed);
  modalBody.find('#availability').text(availability);
  modalBody.find('#dateCreated').text(dateCreated);
  const dispositionArray = disposition.split(",");
  $("#disposition").text("");
  for (let i = 0; i < dispositionArray.length; i += 1) {
    $("#disposition").append($("<li>").text(dispositionArray[i]));
  }
});
