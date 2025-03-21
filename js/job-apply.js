document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.job-apply-form');
    let currentFormIndex = 0;

    function showForm(index) {
        forms.forEach((form, i) => {
            form.classList.toggle('active', i === index);
        });
    }

    function handleNext() {
        if (currentFormIndex < forms.length - 1) {
            currentFormIndex++;
            showForm(currentFormIndex);
        }
    }

    function handleBack() {
        if (currentFormIndex > 0) {
            currentFormIndex--;
            showForm(currentFormIndex);
        }
    }

    document.getElementById('next-1').addEventListener('click', handleNext);
    document.getElementById('next-2').addEventListener('click', handleNext);
    document.getElementById('back-2').addEventListener('click', handleBack);
    document.getElementById('back-3').addEventListener('click', handleBack);

    // Show the first form on load
    showForm(currentFormIndex);
});
