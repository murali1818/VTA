var modal_Reject_1 = document.getElementById("deleteModal-Reject-1");

// Collect all buttons with id pattern "openModalBtn-Reject"
var rejectBtns = document.querySelectorAll("[id^='openModalBtn-Reject']");
var closeRejectBtn = document.getElementById("closeModalBtn-Reject-1");
var yesRejectBtn = document.getElementById("cancelBtn-Reject-1");
var noRejectBtn = document.getElementById("cancelBtnNo-Reject-1");

// Loop through all buttons and add event listeners
rejectBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modal_Reject_1.style.display = "block"; // Display the modal when any reject button is clicked
  });
});

// Close modal when 'x' is clicked
closeRejectBtn.onclick = function () {
  modal_Reject_1.style.display = "none";
}

// Close modal when Yes button is clicked
yesRejectBtn.onclick = function () {
  modal_Reject_1.style.display = "none";
  // Additional functionality for Yes (e.g., rejecting the applicant) can go here
}

// Close modal when No button is clicked
noRejectBtn.onclick = function () {
  modal_Reject_1.style.display = "none";
}

// Close modal when clicking outside the modal
window.onclick = function (event) {
  if (event.target == modal_Reject_1) {
    modal_Reject_1.style.display = "none";
  }
}
