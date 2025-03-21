const inboxBtn = document.getElementById('inbox-btn');
const importantBtn = document.getElementById('important-btn');
const moreBtn = document.getElementById('more-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const messagesContainer = document.getElementById('messages-container');

const listItems = document.querySelectorAll('.sidebar li');

listItems.forEach(li => {
    li.addEventListener('click', (e) => {
        // Remove the pink background from all list items
        listItems.forEach(item => item.classList.remove('active'));

        // Add the pink background to the clicked list item
        li.classList.add('active');

        // Determine which button was clicked and render messages accordingly
        if (li.querySelector('button').id === 'inbox-btn') {
            renderMessages('all');
        } else if (li.querySelector('button').id === 'important-btn') {
            renderMessages('important');
        } else if (li.querySelector('button').id === 'delete-btn') {
            // Add functionality for deleted messages if needed
        }
    });
});



const messages = [
    { subject: "Meeting at 3 PM", time: "10:00 AM", important: false },
    { subject: "Project Deadline", time: "11:30 AM", important: true },
    { subject: "Assignment due", time: "12:00 PM", important: false },
];

// Function to render messages
function renderMessages(filter = 'all') {
    messagesContainer.innerHTML = '';
    messages.forEach((message, index) => {
        if (filter === 'important' && !message.important) return;
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';

        messageItem.innerHTML = `
            <div>
            <input type="checkbox">
            <span class="star ${message.important ? 'active' : ''}" data-index="${index}">&#9733;</span>
            </div>
            <span class="subject">${message.subject}</span>
            <span class="time">${message.time}</span>
        `;
        messagesContainer.appendChild(messageItem);
    });
}

// Event listeners for buttons
inboxBtn.addEventListener('click', () => renderMessages('all'));
importantBtn.addEventListener('click', () => renderMessages('important'));

moreBtn.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Toggle important star
messagesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('star')) {
        const index = e.target.getAttribute('data-index');
        messages[index].important = !messages[index].important;
        renderMessages();
    }
});

//email detail
messagesContainer.addEventListener('click', (e) => {
    const messageItem = e.target.closest('.message-item');
    if (messageItem) {
        const index = messageItem.getAttribute('data-index');
        const message = messages[index];
        
        // Construct the query string with message details
        const queryParams = new URLSearchParams({
            sender: message.sender,
            subject: message.subject,
            time: message.time,
            date: message.date,
            message: message.message,
            profilePicture: message.profilePicture
        });

        // Navigate to the email details page with query parameters
        window.location.href = `email-details.html?${queryParams.toString()}`;
    }
});


// Initial render
renderMessages();
