function animateOnScroll(entries, observer) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('manage')) {
                setTimeout(() => {
                    entry.target.classList.add('animate__fadeInUp');
                }, index * 1000);
            } else {
                setTimeout(() => {
                    entry.target.classList.add('none');
                }, index * 1000);
            }
            observer.unobserve(entry.target);
        }
    });
}

// Create the observer
const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.5 // Trigger when 50% of the element is in view
});

// Observe all list items
document.querySelectorAll('.animate__animated').forEach((item, index) => {
    observer.observe(item);
});
