// Function to trigger the hidden file input
function triggerUpload() {
    document.getElementById('file-input').click();
}

// Function to upload and display the selected image
function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Remove the user icon
            const userIcon = document.getElementById('user-icon');
            if (userIcon) {
                userIcon.style.display = 'none'; // Hide the icon
            }

            // Create an image element or use the existing one
            let uploadedImage = document.getElementById('uploaded-image');
            if (!uploadedImage) {
                uploadedImage = document.createElement('img');
                uploadedImage.id = 'uploaded-image';
                uploadedImage.classList.add('uploaded-image');
                document.getElementById('profile-box').appendChild(uploadedImage);
            }

            // Set the uploaded image source and display it
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block'; // Show the uploaded image
        };
        reader.readAsDataURL(file); // Convert the image to base64 format
    }
}


// Function to update character count
function updateCharCount(textarea) {
    const charCountSpan = textarea.nextElementSibling;
    const maxLength = 250;
    const currentLength = textarea.value.length;
    charCountSpan.textContent = `${maxLength - currentLength} characters remaining`;
}

// Function to dynamically add new fields
function addMoreFields() {
    const achievementContainer = document.getElementById('achievement-container');

    const newEntry = document.createElement('div');
    newEntry.classList.add('achievement-entry');

    newEntry.innerHTML = `
        <label for="description">Description:</label>
        <div class="textarea-container">
            <textarea name="description[]" maxlength="250" oninput="updateCharCount(this)" class="textarea-desc"></textarea>
            <span class="char-count">250 characters remaining</span>
        </div>
        <label>Year of Achievement:</label>
        <select name="year[]" class="year-select fn">
            <option value="" disabled selected>Select Year</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
        </select>
    `;

    // Append the new fields to the container
    achievementContainer.appendChild(newEntry);
}


// checkboxes select - 1
let expanded = false;

// Toggle dropdown
function toggleDropdown() {
    const checkboxes = document.getElementById('checkboxes-emp');
    if (!expanded) {
        checkboxes.style.display = 'block';
        expanded = true;
    } else {
        checkboxes.style.display = 'none';
        expanded = false;
    }
}

// Update the selected options in the select box
function updateSelectedOptions() {
    const checkboxes = document.querySelectorAll('#checkboxes-emp input[type="checkbox"]');
    const selectBox = document.querySelector('.select-box select');
    let selectedOptions = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.value);
        }
    });

    // Update the placeholder text in the select element
    selectBox.options[0].text = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select Options';
}

// checkboxes-select - 2
let expanded_2 = false;

// Toggle the visibility of the checkboxes
function toggleDropdown2() {
    const checkboxes = document.getElementById('checkboxes-emp-2');
    if (!expanded_2) {
        checkboxes.style.display = 'block';
        expanded_2 = true;
    } else {
        checkboxes.style.display = 'none';
        expanded_2 = false;
    }
}

// Update the selected options displayed in the select box
function updateSelectedOptions2() {
    const checkboxes = document.querySelectorAll('#checkboxes-emp-2 input[type="checkbox"]');
    const selectedOptionsDiv = document.getElementById('selected-options-2');
    let selectedOptions = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.value);
        }
    });

    // Limit selection to 4 options
    if (selectedOptions.length > 4) {
        alert("You can only select up to 4 options.");
        const lastChecked = checkboxes[checkboxes.length - 1];
        lastChecked.checked = false;
        selectedOptions.pop();
    }

    // Update the displayed text
    selectedOptionsDiv.textContent = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select Options';
}


