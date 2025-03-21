document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    console.log(courseParam);

    const learningPath = LearningPaths.find(path => path.name === courseParam);
    console.log(learningPath);

    if (learningPath) {
        // Update the course title
        document.querySelector('.course-title').textContent = learningPath.title;

        // Update the course image
        document.querySelector('.course-image').src = learningPath.image;

        // Update the course description
        document.querySelector('.image-description').textContent = learningPath.description;

        // Populate learning modules
        const learningModulesContainer = document.querySelector('.learning-modules');
        learningModulesContainer.innerHTML = learningPath.learningModules.map((module, index) => `
            <div class="learning-module">
                <div class="module-header" data-index="${index}">
                    <h3>${module.title}</h3>
                    <span class="arrow-icon" data-index="${index}">&#9660;</span> <!-- Down Arrow -->
                </div>
                <div class="module-description" data-index="${index}">
                    <p>${module.description}</p>
                    <a href="${module.link}" class="module-link">View Module</a>
                </div>
            </div>
        `).join('');

        // Add event listeners for toggle arrows
        document.querySelectorAll('.arrow-icon').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                const description = document.querySelector(`.module-description[data-index="${index}"]`);
                const arrowIcon = event.target;
                
                if (description.style.display === 'none' || !description.style.display) {
                    description.style.display = 'block';
                    arrowIcon.innerHTML = '&#9650;'; // Up Arrow
                } else {
                    description.style.display = 'none';
                    arrowIcon.innerHTML = '&#9660;'; // Down Arrow
                }
            });
        });

    } else {
        // Handle case where learning path is not found
        document.querySelector('.course-title').textContent = 'Course not found';
        document.querySelector('.image-description').textContent = 'No details available for the selected course.';
    }
});
