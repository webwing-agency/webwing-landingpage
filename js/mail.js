/* script.js */

// 1. Email validation listener
function setupEmailValidation() {
    const emailInput = document.querySelector('input[name="email"]');
    if (!emailInput) return;
  
    emailInput.addEventListener('input', () => {
      const value = emailInput.value;
      const [local] = value.split('@');
      const digits = (local.match(/\d/g) || []).length;
  
      if (digits > 0) {
        emailInput.setCustomValidity('Please provide a professional email address');
      } else {
        emailInput.setCustomValidity('');
      }
    });
  }
  