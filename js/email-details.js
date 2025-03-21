document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);

    // Get the email details from the query parameters
    const sender = queryParams.get('sender');
    const subject = queryParams.get('subject');
    const time = queryParams.get('time');
    const date = queryParams.get('date');
    const message = queryParams.get('message');
    const profilePicture = queryParams.get('profilePicture');

    // Populate the email details page
    document.getElementById('sender-name').textContent = sender;
    document.getElementById('email-subject').textContent = subject;
    document.getElementById('email-time').textContent = time;
    document.getElementById('email-date').textContent = date;
    document.getElementById('email-message').textContent = message;
    document.getElementById('profile-pic').src = profilePicture;
});
