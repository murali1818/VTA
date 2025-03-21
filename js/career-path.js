let currentPage = 1;
let questionsPerPage = 3;
let totalQuestions = 0;
let currentQuestions = [];
let selectedCategory = "";
let selectedValues = {};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("popup").style.display = "flex";

  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });
});

function selectOption(category) {
  selectedCategory = category;
  currentPage = 1;
  loadQuestions(category);
}

function createDropdown(options) {
  let selectElement = document.createElement("select");
  selectElement.style.width = "100%";

  // Create default "Select" option
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select";
  selectElement.appendChild(defaultOption);

  // Add other options
  options.forEach((option) => {
    let optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

function loadQuestions(category) {
  const questions = {
    job: [
      {
        question: "What type of internship are you looking for?",
        options: [
          'Full-time',
'Part-time',
'Remote',
'On-site',
'Hybrid',
        ],
      },
      {
        question: "What is your preferred industry or field?",
        options: ['Software Development',
          'Marketing',
          'Finance',
          'Healthcare',]
      },
      {
        question: "What is your current level of education?",
        options: [
          'High School',
'Undergraduate Student',
'Graduate Student',
'Recent Graduate',
        ],
      },
      {
        question: "What is your primary goal for this internship?",
        options: [
          'Gaining experience in the field',
'Building a professional network',
'Learning new skills',
'Securing a job after the internship',
        ],
      },
      {
        question: "Which skills do you want to develop during the internship?",
        options: [
          'Technical Skills',
'Communication Skills',
'Leadership Skills',
'Problem-Solving Skills',
        ],
      },
      {
        question: "How long are you available for the internship?",
        options: [
          'Less than 3 months',
'3-6 months',
'6-12 months',
'More than 12 months',
        ],
      },
      {
        question: "What is your preferred location for the internship?",
        options: [
          'Local (within my city)',
          'National (within my country)',
          'International',
          'Remote (No preference for location)',
        ],
      },
      {
        question: "What type of organization do you prefer?",
        options: [
          'Start-up',
'Small to Medium Enterprise',
'Large Corporation',
'Non-Profit Organization',
'Government',
        ],
      },
      {
        question: "Are you looking for a paid or unpaid internship?",
        options: [
          'Paid',
'Unpaid',
'Either is fine',
        ],
      },
      {
        question: "Are you willing to relocate?",
        options: ["Yes", "No", "Maybe"],
      },
    ],
    skill: [
      {
        question: "What skill do you want to develop?",
        options: [
          "Python",
          "Java",
          "Frontend Development",
          "Backend Development",
          "Full-Stack Development",
          "Blockchain",
          "Data Science",
        ],
      },
      {
        question: "What is your current skill level?",
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      {
        question: "What type of skills are you interested in?",
        options: [
          "Technical Skills",
          "Soft Skills",
          "Language Skills",
          "Management Skills",
        ],
      },
      {
        question: "What is your preferred learning method?",
        options: ["Online Courses", "Workshops", "Books", "Mentorship"],
      },
      {
        question: "How many hours per week can you dedicate?",
        options: [
          "Less than 5 hours",
          "5-10 hours",
          "10-20 hours",
          "20+ hours",
        ],
      },
      {
        question: "Are you looking for certification in this skill?",
        options: ["Yes", "No"],
      },
      {
        question: "Do you prefer self-paced learning or structured classes?",
        options: ["Self-Paced", "Structured Classes"],
      },
      {
        question: "What is your goal with this skill?",
        options: [
          "Career Advancement",
          "Personal Development",
          "Job Transition",
          "Other",
        ],
      },
      {
        question: "What resources have you used in the past?",
        options: ["Books", "Online Courses", "Workshops", "None"],
      },
      {
        question:
          "Are you open to learning new skills outside your primary interest?",
        options: ["Yes", "No"],
      },
    ],
    sme: [
      {
        question:
          "What aspect of this field are you most interested in developing further?",
        options: [
          "Technical skills",
          "Project management",
          "Industry knowledge",
          " Communication and collaboration",
        ],
      },
      {
        question:
          "Which of the following resources would you prefer for deepening your expertise?",
        options: [
          "Online courses",
          "Books and journals",
          "Mentorship and coaching",
          "Hands-on projects",
        ],
      },
      {
        question:
          "What is the biggest challenge you're currently facing in this field?",
        options: [
          "Understanding complex concepts",
          "Applying knowledge in practical situations",
          "Keeping up with industry changes",
          "Communicating with non-experts",
        ],
      },
      {
        question:
          "How do you prefer to receive feedback from a subject matter expert?",
        options: [
          "Regular check-ins and reviews",
          "Detailed written reports",
          "Informal, as-needed discussions",
          "Structured mentoring sessions",
        ],
      },
      {
        question: "What do you consider your biggest strength in this field?",
        options: [
          "Analytical thinking",
          "Creativity and innovation",
          "Problem-solving",
          "Attention to detail",
        ],
      },
      {
        question:
          "Which learning method do you find most effective for grasping new concepts?",
        options: [
          "Visual aids (videos, diagrams)",
          "Reading (books, articles)",
          "Practical experience (projects, labs)",
          "Discussion and Q&A sessions",
        ],
      },
      {
        question: "In which area do you feel you need the most improvement?",
        options: [
          "Technical skills and knowledge",
          "Time management and organization",
          "Collaboration with others",
          "Adapting to new technologies",
        ],
      },
      {
        question:
          "How would you like the SME to assist you in your career development?",
        options: [
          "Providing industry insights and trends",
          "Offering networking opportunities",
          "Guiding through specific projects",
          "Recommending further education and certifications",
        ],
      },
      {
        question: "What is your preferred way of solving complex problems?",
        options: [
          "Breaking down into smaller tasks",
          "Collaborating with team members",
          "Researching similar case studies",
          "Consulting with an expert",
        ],
      },
      {
        question: "What do you see as the most valuable outcome of working with a subject matter expert?",
        options: ['Gaining new skills',
          'Achieving project success',
          'Building confidence in the field',
          'Expanding professional network'],
      },
    ],
    placement: [
      {
        question: "What type of job placement are you looking for?",
        options: ["Full-Time", "Part-Time", "Internship", "Freelance"],
      },
      {
        question: "What is your preferred location?",
        options: ["Remote", "On-site", "Hybrid"],
      },
      {
        question: "What is your preferred industry?",
        options: ["Technology", "Finance", "Healthcare", "Education"],
      },
      {
        question: "What is your expected salary range?",
        options: [
          "$30,000 - $50,000",
          "$50,000 - $70,000",
          "$70,000 - $100,000",
          "$100,000 and above",
        ],
      },
      {
        question: "What level of position are you targeting?",
        options: ["Entry Level", "Mid Level", "Senior Level", "Manager"],
      },
      {
        question: "What is your preferred company size?",
        options: ["Small", "Medium", "Large"],
      },
      {
        question: "Are you open to relocation?",
        options: ["Yes", "No", "Maybe"],
      },
      {
        question: "What is your preferred company culture?",
        options: ["Startup", "Corporate", "Non-Profit"],
      },
      {
        question: "What is your availability to start?",
        options: [
          "Immediately",
          "Within 2 weeks",
          "Within 1 month",
          "More than 1 month",
        ],
      },
      {
        question: "Do you have any specific companies in mind?",
        options: ["Yes", "No"],
      },
    ],
  };

  currentQuestions = questions[category];
  totalQuestions = currentQuestions.length;
  showPage(currentPage);
}

function showPage(page) {
  const popup = document.getElementById("popup");
  const questionContainer = document.getElementById("questionContainer");
  const h2Element = document.querySelector("h2");
  questionContainer.innerHTML = "";

  if (page === 1) {
    // Show category options and hide questions on the first page
    h2Element.style.display = "none";
    questionContainer.innerHTML =
      '<button class="back-to-category" onclick="showCategories()"></button>';
  } else {
    h2Element.style.display = "none";
  }

  // Calculate start and end index for questions on the current page
  const start = (page - 1) * questionsPerPage;
  const end = Math.min(start + questionsPerPage, totalQuestions);

  // Display questions for the current page
  for (let i = start; i < end; i++) {
    const item = currentQuestions[i];

    let questionElement = document.createElement("p");
    questionElement.textContent = `${i + 1}. ${item.question}`;
    questionContainer.appendChild(questionElement);

    let selectElement = createDropdown(item.options); // Use createDropdown function

    // Set the previously selected value if available
    if (selectedValues[i]) {
      selectElement.value = selectedValues[i];
    }

    selectElement.addEventListener("change", function () {
      selectedValues[i] = this.value;
    });

    questionContainer.appendChild(selectElement);

    // Add a container for error messages
    let errorElement = document.createElement("p");
    errorElement.className = "error-message";
    errorElement.style.display = "none"; // Hide initially
    questionContainer.appendChild(errorElement);
  }

  // Add navigation buttons
  if (page > 1) {
    const backButton = document.createElement("button");
    backButton.className = "pagination-btn-back";
    backButton.textContent = "Back";
    backButton.addEventListener("click", () => showPage(page - 1));
    questionContainer.appendChild(backButton);
  }

  if (end < totalQuestions) {
    const nextButton = document.createElement("button");
    nextButton.className = "pagination-btn-next";
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
      if (validatePage(page)) {
        showPage(page + 1);
      }
    });
    questionContainer.appendChild(nextButton);
  } else {
    const submitButton = document.createElement("button");
    submitButton.className = "pagination-btn-submit";
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", handleSubmit);
    questionContainer.appendChild(submitButton);
  }
}

function validatePage(page) {
  let valid = true;
  const selects = document.querySelectorAll("#questionContainer select");
  const errors = document.querySelectorAll("#questionContainer .error-message");

  // Clear previous error messages
  errors.forEach((error) => (error.style.display = "none"));
  selects.forEach((select) => select.classList.remove("error"));

  selects.forEach((select, index) => {
    if (select.value === "") {
      valid = false;
      const errorMessage = select.nextElementSibling;
      if (errorMessage) {
        errorMessage.textContent = "Field required";
        errorMessage.className = "errorMessage";
        errorMessage.style.display = "block";
      }
      select.classList.add("error"); // Optional: add a class for styling errors
    }
  });

  return valid;
}

function handleSubmit() {
  const selects = document.querySelectorAll("#questionContainer select");
  let allFilled = true;

  selects.forEach((select) => {
    if (select.value === "") {
      allFilled = false;
      let errorMessage = document.createElement("p");
      errorMessage.className = "error-message";
      errorMessage.textContent = "Field required";
      select.parentElement.appendChild(errorMessage);
    }
  });

  if (allFilled) {
    // Log the collected answers in the console
    console.log("User selections:");
    for (let index in selectedValues) {
      console.log(`Question ${parseInt(index) + 1}: ${selectedValues[index]}`);
    }

    // Hide the existing content
    document.getElementById("questionContainer").innerHTML = "";

    // Create a new thank you message
    let thankYouMessage = document.createElement("p");
    thankYouMessage.innerHTML = "Thank you for your responses";
    thankYouMessage.className = "thank-you-message";

    // Create a close button
    let closeButton = document.createElement("button");
    closeButton.innerHTML = '<i class="fa-regular fa-xmark"></i>';
    closeButton.className = "close-button";
    closeButton.addEventListener("click", function () {
      document.getElementById("popup").style.display = "none";
      document.getElementById('popularCourses').style.display="block"
    });

    // Append message and button to the popup
    let questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = ""; // Clear existing content
    questionContainer.appendChild(thankYouMessage);
    questionContainer.appendChild(closeButton);

    // Clear selected values
    selectedValues = {};
  }

  // Get the current count value
  const countElement = document.querySelector(".count");
  let currentCount = parseInt(countElement.textContent);

  // Increase the count by 1
  currentCount += 1;

  // Update the count element with the new value
  countElement.textContent = currentCount;
}

function showCategories() {
  // Function to display the category selection screen
  const popup = document.getElementById("popup");
  const questionContainer = document.getElementById("questionContainer");
  questionContainer.innerHTML = "";
  document.querySelector("h2").style.display = "block"; // Show the category title

  const categories = [
    "Job Assistance",
    "Skill Development",
    "SME Support",
    "Job Placement",
  ];
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "back-to-category-title";
    button.textContent = category;
    button.addEventListener("click", () =>
      selectOption(category.toLowerCase())
    );
    questionContainer.appendChild(button);
  });
}
