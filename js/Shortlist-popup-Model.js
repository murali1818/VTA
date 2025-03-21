// Collect all shortlist buttons
var shortlistBtns = document.querySelectorAll(".shortlist-btn-1");

shortlistBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var id = btn.getAttribute("data-id"); // Get the data-id from the button
    var modal = document.getElementById("shortlistModal-" + id); // Dynamically select the correct modal

    console.log("Opening Shortlist Modal for ID:", id); // Debugging

    if (modal) {
      modal.style.display = "block"; // Display the correct modal
    }

    // Close modal when 'x' is clicked
    document.querySelector(`#shortlistModal-${id} .close`).onclick = function () {
      modal.style.display = "none";
    };

    // Show shortlisting notification when Yes button is clicked
    document.querySelector(`#shortlistModal-${id} .short-listed`).onclick = function () {
      modal.style.display = "none";

      // Show the shortlist notification popup
      const popup = document.getElementById('shortlist-notification-popup');
      popup.classList.add('show-shortlist');

      // Hide the popup after the set duration
      setTimeout(() => {
        popup.classList.remove('show-shortlist');
      }, 3000); // Adjust display duration as needed
    };

    // Close modal when No button is clicked
    document.querySelector(`#shortlistModal-${id} .delete`).onclick = function () {
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
