document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const showError = (element, message, errorElement) => {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        element.classList.add('border-red-500');
        element.classList.remove('border-slate-300', 'dark:border-slate-700', 'border-indigo-500');
    };

    const hideError = (element, errorElement) => {
        errorElement.classList.add('hidden');
        element.classList.remove('border-red-500');
        element.classList.add('border-slate-300', 'dark:border-slate-700');
    };

    const validateField = (input, errorElement, validator = null) => {
        if (input.value.trim() === '') {
            showError(input, `${input.previousElementSibling.textContent.replace(' *', '')} is required.`, errorElement);
            return false;
        }
        if (validator && !validator(input.value)) {
            showError(input, `Please enter a valid ${input.id}.`, errorElement);
            return false;
        }
        hideError(input, errorElement);
        return true;
    };

    nameInput.addEventListener('input', () => validateField(nameInput, nameError));
    emailInput.addEventListener('input', () => validateField(emailInput, emailError, validateEmail));
    subjectInput.addEventListener('input', () => validateField(subjectInput, subjectError));
    messageInput.addEventListener('input', () => validateField(messageInput, messageError));

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const isNameValid = validateField(nameInput, nameError);
        const isEmailValid = validateField(emailInput, emailError, validateEmail);
        const isSubjectValid = validateField(subjectInput, subjectError);
        const isMessageValid = validateField(messageInput, messageError);

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulate form submission
            formMessage.classList.remove('hidden', 'text-red-500');
            formMessage.classList.add('text-emerald-600');
            formMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
            contactForm.reset();

            // Optionally hide message after a few seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        } else {
            formMessage.classList.remove('hidden', 'text-emerald-600');
            formMessage.classList.add('text-red-500');
            formMessage.textContent = 'Please correct the errors in the form.';
        }
    });

    // Dark mode detection and application
    const applyTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };

    applyTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
});