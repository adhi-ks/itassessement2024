// Contact form validation and submission

const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Form validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateSubject(subject) {
    return subject.trim().length >= 5;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show/hide error messages
function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const fieldElement = document.getElementById(fieldName);
    
    if (errorElement && fieldElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        fieldElement.parentElement.classList.add('error');
    }
}

function hideError(fieldName) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const fieldElement = document.getElementById(fieldName);
    
    if (errorElement && fieldElement) {
        errorElement.classList.remove('show');
        fieldElement.parentElement.classList.remove('error');
    }
}

// Real-time validation
function setupRealTimeValidation() {
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('input', function() {
                validateField(fieldName, this.value);
            });
            
            field.addEventListener('blur', function() {
                validateField(fieldName, this.value);
            });
        }
    });
}

function validateField(fieldName, value) {
    let isValid = true;
    
    switch(fieldName) {
        case 'name':
            if (!validateName(value)) {
                if (value.trim().length === 0) {
                    showError('name', 'Name is required');
                } else {
                    showError('name', 'Name must be at least 2 characters long');
                }
                isValid = false;
            } else {
                hideError('name');
            }
            break;
            
        case 'email':
            if (!validateEmail(value)) {
                if (value.trim().length === 0) {
                    showError('email', 'Email is required');
                } else {
                    showError('email', 'Please enter a valid email address');
                }
                isValid = false;
            } else {
                hideError('email');
            }
            break;
            
        case 'subject':
            if (!validateSubject(value)) {
                if (value.trim().length === 0) {
                    showError('subject', 'Subject is required');
                } else {
                    showError('subject', 'Subject must be at least 5 characters long');
                }
                isValid = false;
            } else {
                hideError('subject');
            }
            break;
            
        case 'message':
            if (!validateMessage(value)) {
                if (value.trim().length === 0) {
                    showError('message', 'Message is required');
                } else {
                    showError('message', 'Message must be at least 10 characters long');
                }
                isValid = false;
            } else {
                hideError('message');
            }
            break;
    }
    
    return isValid;
}

// Validate entire form
function validateForm() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    let isValid = true;
    
    // Validate each field
    Object.keys(formData).forEach(fieldName => {
        if (!validateField(fieldName, formData[fieldName])) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show loading state
function showLoading() {
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitText.style.display = 'none';
    submitLoading.style.display = 'flex';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
}

// Hide loading state
function hideLoading() {
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitText.style.display = 'inline';
    submitLoading.style.display = 'none';
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
}

// Show success message
function showSuccess() {
    form.style.display = 'none';
    successMessage.style.display = 'block';
}

// Reset form
function resetForm() {
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Clear all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.classList.remove('show'));
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    showLoading();
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        hideLoading();
        showSuccess();
        
        // Log form data (in real implementation, send to server)
        const formData = new FormData(form);
        console.log('Form submitted with data:', Object.fromEntries(formData));
    }, 2000);
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', function() {
    if (form) {
        setupRealTimeValidation();
        form.addEventListener('submit', handleSubmit);
    }
});

// Make functions available globally
window.resetForm = resetForm;