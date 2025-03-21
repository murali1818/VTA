// Collect all delete buttons
var deleteBtns = document.querySelectorAll(".delete-btn-1");

// Loop through all delete buttons and add event listeners
deleteBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var id = btn.getAttribute("data-id"); // Get the data-id from the button
    var modal = document.getElementById("deleteModal-" + id); // Dynamically select the correct modal

    if (modal) {
      modal.style.display = "block"; // Display the correct modal
    }

    // Close modal when 'x' is clicked
    document.querySelector(`[data-id="${id}"].close`).onclick = function () {
      modal.style.display = "none";
    };

    // Close modal when Yes button is clicked
    document.querySelector(`[data-id="${id}"].cancel`).onclick = function () {
      modal.style.display = "none";
      // Additional functionality for Yes (e.g., deleting the applicant) can go here
    };

    // Close modal when No button is clicked
    document.querySelector(`[data-id="${id}"].delete`).onclick = function () {
      modal.style.display = "none";
    };

    // Close modal when clicking outside the modal
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
});
