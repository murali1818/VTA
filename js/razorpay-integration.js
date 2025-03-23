/**
 * Razorpay Integration for VTA
 * This file handles the Razorpay payment gateway integration
 */

// Check if Razorpay is loaded
function isRazorpayLoaded() {
    return typeof Razorpay !== 'undefined';
}

// Load Razorpay script if not already loaded
function loadRazorpayScript() {
    return new Promise((resolve, reject) => {
        if (isRazorpayLoaded()) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
    });
}

// Initialize Razorpay payment
async function initializeRazorpay(courseId, courseName, coursePrice, userId, userEmail, onSuccessCallback) {
    try {
        // Load Razorpay script if not already loaded
        await loadRazorpayScript();
        
        // Convert price to paise (Razorpay uses smallest currency unit)
        const amountInPaise = Math.round(coursePrice * 100);
        
        // Create options for Razorpay checkout
        const options = {
            key: 'rzp_test_8HfnRnkRrt36sk', // Razorpay Key ID (public key)
            amount: amountInPaise,
            currency: 'INR',
            name: 'Virtual Training Academy',
            description: `Enrollment for ${courseName}`,
            // Removing order_id as it's causing API errors
            image: 'images/VTA-logo.png',
            prefill: {
                email: userEmail,
                contact: ''
            },
            theme: {
                color: '#3399cc'
            },
            handler: function (response) {
                // This function is called when payment is successful
                console.log('Payment successful:', response);
                
                // Call the success callback with courseId and userId
                if (typeof onSuccessCallback === 'function') {
                    onSuccessCallback(courseId, userId);
                }
                
                showNotification('Payment successful! You are now enrolled in the course.', 'success');
            },
            modal: {
                ondismiss: function() {
                    console.log('Payment modal dismissed');
                    showNotification('Payment cancelled.', 'info');
                }
            }
        };

        console.log('Razorpay options:', options);
        
        // Create a new Razorpay instance and open the payment modal
        const rzp = new Razorpay(options);
        
        rzp.on('payment.failed', function (response) {
            console.error('Payment failed:', response.error);
            showNotification(`Payment failed: ${response.error.description}`, 'error');
        });
        
        // Open the payment modal
        rzp.open();
    } catch (error) {
        console.error('Error initializing Razorpay:', error);
        showNotification(`Error initializing payment: ${error.message}`, 'error');
    }
}

// Function to show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification-popup');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        
        // Remove all existing classes
        notification.classList.remove('success', 'error', 'info');
        
        // Add the appropriate class based on the type
        notification.classList.add(type);
        
        // Show the notification
        notification.classList.add('show');
        
        // Hide the notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    } else {
        // Fallback to alert if notification elements are not found
        alert(message);
    }
}

// Export the functions
window.initializeRazorpay = initializeRazorpay;
window.showNotification = showNotification;
