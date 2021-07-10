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
  const breedCheckBoxes = document.getElementsByClassName(`${species}Checkbox`);
  const breedCriteria = [];
  for (let i = 0; i < breedCheckBoxes.length; i += 1) {
    if (breedCheckBoxes[i].checked === true) {
      breedCriteria.push(breedCheckBoxes[i].name);
    }
  }

  let queryString = "";
  if (breedCriteria.length > 0) {
    queryString = "breed=";
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
  queryString = `${queryString}&dateCreated=${filterDateCreated}`;

  return queryString;
}

$(document).ready(() => {
  // Check the first radio button when page loads
  document.getElementsByClassName("form-check-input species")[0].checked = true;

  // hide breed checkboxes for all unchecked species radio buttons
  const radioButtons = document.getElementsByClassName("form-check-input species");
  let species;
  for (let i = 0; i < radioButtons.length; i += 1) {
    species = radioButtons[i].value;
    if (radioButtons[i].checked === true) {
      const speciesSpan = document.getElementById(`${species}checkSpan`);
      speciesSpan.hidden = false;
    } else {
      const speciesSpan = document.getElementById(`${species}checkSpan`);
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
    species = radioButtons.value;
    if (radioButtons[i].checked === true) {
      const speciesSpan = document.getElementById(`${species}checkSpan`);
      speciesSpan.hidden = false;
    } else {
      const breedCheckBoxes = document.getElementsByClassName(`${species}Checkbox`);
      for (let j = 0; i < breedCheckBoxes.length; j += 1) {
        breedCheckBoxes[j].checked = false;
      }
      const speciesSpan = document.getElementById(`${species}checkSpan`);
      speciesSpan.hidden = true;
    }
  }
});

// next button
$(document).on('click', '#next', () => {
  const nextCursor = encodeURIComponent($("#next").attr("data-cursor"));
  console.log(nextCursor);

  $.ajax({
    type: "GET",
    url: `/animals/partial?cursor=${nextCursor}`,
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
