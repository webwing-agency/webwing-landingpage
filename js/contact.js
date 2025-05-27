const form   = document.getElementById("contactForm");
const loader = document.getElementById("loadingIndicator");

async function validateInput(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!input.value.trim()) {
        alert(`Please fill in the ${input.name} field.`);
        input.focus();
        resolve(false);
      } else {
        resolve(true);
      }
    }, 0);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1) Grab all inputs EXCEPT any whose type attribute is "time"
  const inputs = form.querySelectorAll('input:not([type="time"])');

  // 2) DEBUG: log what you’re about to validate
  console.log("Validating these inputs:", 
    Array.from(inputs).map(i => ({ name: i.name, type: i.type }))
  );

  // 3) Validate sequentially
  for (const input of inputs) {
    if (!(await validateInput(input))) {
      return;  // stop on first failure
    }
  }

  // 4) All good → show loader and send
  loader.classList.add("loading");
  emailjs
    .sendForm("service_xyivz2l", "template_mvjbx7g", form)
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      alert("Failed to send message.");
    })
    .finally(() => {
      loader.classList.remove("loading");
    });
});
