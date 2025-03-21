 // Select all bookmark buttons
 const bookmarkButtons = document.querySelectorAll('.bookmark-btn');

 // Select the notification element
 const notification = document.getElementById('notification');

 let notificationTimeout;

 // Function to show notification
 function showNotification(message) {
     notification.textContent = message;
     notification.classList.add('show');

     // Clear existing timeout if any
     if (notificationTimeout) {
         clearTimeout(notificationTimeout);
     }

     // Hide the notification after 3 seconds
     notificationTimeout = setTimeout(() => {
         notification.classList.remove('show');
         notificationTimeout = null;
     }, 3000);
 }

 // Attach click event listener to each bookmark button
 bookmarkButtons.forEach(button => {
     button.addEventListener('click', () => {
         const jobName = button.textContent.trim(); // Optional: Extract button text
         showNotification('Job saved successfully!');
         // Or use dynamic message:
         // showNotification(`${jobName} saved successfully!`);
     });
 });