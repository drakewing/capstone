$(document).ready(() => {
// get user email, name, address
// get user applications (need separate route /user/:id/application? or through get /user?)
  const button = document.getElementById('submitPatch');
  const id = button.getAttribute("data-id");
  button.style.display = "none";

  const photoUpload = document.getElementById('photoUpload');
  photoUpload.style.display = "none";

  const submitPhoto = document.getElementById('submitPhoto');
  submitPhoto.style.display = "none";

  $.ajax({
    type: "GET",
    url: `/users/${id}/applications`,
    crossDomain: true,
    success: (data) => {
      $("#userApps").html(data);
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});

// generate modal content when user clicks on see details
$(document).on("show.bs.modal", (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;

  // Extract info from data-* attributes
  const gender = button.getAttribute("data-gender");
  const breed = button.getAttribute("data-breed");
  const age = button.getAttribute("data-age");
  const species = button.getAttribute("data-species");
  const availability = button.getAttribute("data-availability");
  const disposition = button.getAttribute("data-disposition");
  const dateCreated = button.getAttribute("data-dateCreated");
  const name = button.getAttribute("data-name");
  const id = button.getAttribute("data-id");
  const photo = `${button.getAttribute("data-bucket")}/${button.getAttribute(
    "data-photo"
  )}`;

  // Update the modal's content
  $(".modal-title").text(name);
  const modalBody = $(".modal-body");
  const modalFooter = $(".modal-footer");
  modalBody.find("#photo").attr("src", photo);
  modalBody.find("#gender").text(gender);
  modalBody.find("#age").text(age);
  modalBody.find("#species").text(species);
  modalBody.find("#breed").text(breed);
  modalBody.find("#availability").text(availability);
  modalBody.find("#dateCreated").text(dateCreated);
  modalFooter.find("#viewApps").attr("data-id", id);
  modalFooter.find("#deleteAnimal").attr("data-id", id);
  modalFooter.find("#adoptAnimal").attr("data-id", id);
  modalFooter.find("#deleteAnimal").attr("data-photo", photo);

  const adoptButton = document.getElementById("adoptAnimal");
  adoptButton.style.display = "none";

  const dispositionArray = disposition.split(",");
  $("#disposition").text("");
  for (let i = 0; i < dispositionArray.length; i += 1) {
    $("#disposition").append($("<li>").text(dispositionArray[i]));
  }
});

// display text fields
$(document).on("click", "#editProfile", () => {
  const pencilButton = document.getElementById('editProfile');
  pencilButton.style.display = "none";

  const submitButton = document.getElementById('submitPatch');
  submitButton.style.display = "inline";

  const nameInput = document.getElementById("userNameInput");
  nameInput.readOnly = false;
  nameInput.className = "form-control";

  const emailInput = document.getElementById("userEmailInput");
  emailInput.readOnly = false;
  emailInput.className = "form-control";

  const phoneInput = document.getElementById("userPhoneInput");
  phoneInput.readOnly = false;
  phoneInput.className = "form-control";

  const addressInput = document.getElementById("userAddressInput");
  addressInput.readOnly = false;
  addressInput.className = "form-control";
});

// submit edit form
$(document).on("submit", "#editProfileForm", (e) => {
  // prevent default form behavior (avoid the page reload)
  e.preventDefault();

  // Button that triggered the modal
  const button = document.getElementById("submitPatch");

  // Extract info from data-* attributes
  const id = button.getAttribute("data-id");
  const formData = new FormData(e.target);
  const userPhoto = document.getElementById("userPhoto");
  if (userPhoto) {
    formData.file = userPhoto.value;
  }

  console.log(formData);

  $.ajax({
    type: "PATCH",
    url: `/users/${id}`,
    crossDomain: true,
    contentType: false,
    processData: false,
    data: formData,
    success: () => {
      console.log("application request successful");

      const pencilButton = document.getElementById('editProfile');
      pencilButton.style.display = "inline-block";

      const submitButton = document.getElementById('submitPatch');
      submitButton.style.display = "none";

      const nameInput = document.getElementById("userNameInput");
      nameInput.readOnly = true;
      nameInput.className = "form-control-plaintext";

      const emailInput = document.getElementById("userEmailInput");
      emailInput.readOnly = true;
      emailInput.className = "form-control-plaintext";

      const phoneInput = document.getElementById("userPhoneInput");
      phoneInput.readOnly = true;
      phoneInput.className = "form-control-plaintext";

      const addressInput = document.getElementById("userAddressInput");
      addressInput.readOnly = true;
      addressInput.className = "form-control-plaintext";
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});

// display photo upload
$(document).on("click", "#changePicButton", () => {
  const changePicButton = document.getElementById('changePicButton');
  changePicButton.style.display = "none";

  const photoUpload = document.getElementById('photoUpload');
  photoUpload.style.display = "inline";

  const submitPhoto = document.getElementById('submitPhoto');
  submitPhoto.style.display = "inline";
});

// submit photo form
$(document).on("submit", "#photoForm", (e) => {
  // prevent default form behavior (avoid the page reload)
  e.preventDefault();

  // Button that triggered the modal
  const button = document.getElementById("submitPhoto");

  // Extract info from data-* attributes
  const id = button.getAttribute("data-id");
  const formData = new FormData(e.target);

  // get user's text data from the edit form
  const nameInput = document.getElementById("userNameInput");
  formData.name = nameInput.value;
  const emailInput = document.getElementById("userEmailInput");
  formData.email = emailInput.value;
  const phoneInput = document.getElementById("userPhoneInput");
  formData.phone = phoneInput.value;
  const addressInput = document.getElementById("userAddressInput");
  formData.address = addressInput.value;

  console.log(formData);

  $.ajax({
    type: "PATCH",
    url: `/users/${id}`,
    crossDomain: true,
    contentType: false,
    processData: false,
    data: formData,
    success: (data) => {
      console.log("application request successful");

      const changePicButton = document.getElementById('changePicButton');
      changePicButton.style.display = "inline";

      const photoUpload = document.getElementById('photoUpload');
      photoUpload.style.display = "none";

      const submitPhoto = document.getElementById('submitPhoto');
      submitPhoto.style.display = "none";

      const userPhoto = document.getElementById('userPhoto');
      userPhoto.src = data.photo;
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});
