var modal_Approval_1 = document.getElementById("deleteModal-Approval-1");

// Collect all buttons with id pattern "openModalBtn-Approval"
var approvalBtns = document.querySelectorAll("[id^='openModalBtn-Approval']");
var closeApprovalBtn = document.getElementById("closeModalBtn-Approval-1");
var yesApprovalBtn = document.getElementById("cancelBtn-Approval-1");
var noApprovalBtn = document.getElementById("cancelBtnNo-Approval-1");

// Loop through all buttons and add event listeners
approvalBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modal_Approval_1.style.display = "block"; // Display the modal when any approval button is clicked
  });
});

// Close modal when 'x' is clicked
closeApprovalBtn.onclick = function () {
  modal_Approval_1.style.display = "none";
}

// Close modal when Yes button is clicked
yesApprovalBtn.onclick = function () {
  modal_Approval_1.style.display = "none";
  // Additional functionality for Yes (e.g., approving the applicant) can go here
}

// Close modal when No button is clicked
noApprovalBtn.onclick = function () {
  modal_Approval_1.style.display = "none";
}


window.onclick = function (event) {
  if (event.target == modal_Approval_1) {
    modal_Approval_1.style.display = "none";
  }
}
