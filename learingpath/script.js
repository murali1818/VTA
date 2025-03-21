const modules = document.querySelectorAll('.learning-module');
    modules.forEach(module => {
        module.querySelector('.module-header').addEventListener('click', () => {
            const description = module.querySelector('.module-description');
            if (description.style.display === 'block') {
                description.style.display = 'none';
            } else {
                description.style.display = 'block';
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Fetch the data from Data.js
        // Assuming Data.js is included before this script
        if (typeof LearningPaths === 'undefined') {
            console.error('LearningPaths data is not available.');
            return;
        }
    
        const container = document.querySelector(".all_courses .row");
    
        // Generate HTML for each learning path
        LearningPaths.forEach(path => {
            // Create the HTML structure for each learning path
            const pathItem = document.createElement("div");
            pathItem.className = "col-lg-4 col-md-6 mb-4 cmname"; // Added cmname class
    
            pathItem.innerHTML = `
                <div class="single_courses list-format">
                    <div class="thumb">
                        <a href="${path.detailsLink}">
                            <img src="${path.image}" alt="${path.title}" class="img-fluid" onerror="this.onerror=null;this.src='images/courses/no-image.png';">
                        </a>
                    </div>
                    <div class="courses_info">
                        <h5><a href="${path.detailsLink}">${path.title}</a></h5>
                    </div>
                </div>
            `;
    
            // Append the path item to the container
            container.appendChild(pathItem);
        });
    });


    
