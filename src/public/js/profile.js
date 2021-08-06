$(document).ready(() => {
// get user email, name, address
// get user applications (need separate route /user/:id/application? or through get /user?)
  const button = document.getElementById('editProfile');
  const id = button.getAttribute("data-id");
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
