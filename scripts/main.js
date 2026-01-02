/* ============================================
   SCROLL  ANIMATION 
   ============================================ */

/**
 * Observes elements and animates them when they become visible
 * @param {string} selector - CSS selector (#id or .class)
 * @param {Object} options
 * @param {string} options.animationClass - Class added when visible
 * @param {number} options.threshold - Visibility threshold
 * @param {boolean} options.useInlineStyles - Apply inline styles (legacy support)
 */
function EoAnimateOnScroll(
  selector,
  {
    animationClass = "is-visible",
    threshold = 0.1,
    useInlineStyles = false,
  } = {}
) {
  const elements = document.querySelectorAll(selector);

  if (!elements.length) {
    console.warn(`EoAnimateOnScroll: No elements found for "${selector}"`);
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add(animationClass));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (useInlineStyles) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          } else {
            entry.target.classList.add(animationClass);
          }

          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => {
    if (useInlineStyles) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    }

    observer.observe(el);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Id elements
  EoAnimateOnScroll("#Eo-main-title");
  EoAnimateOnScroll("#Eo-main-p");
  EoAnimateOnScroll("#Eo-facility-title");
  EoAnimateOnScroll("#Eo-facility-p");
  EoAnimateOnScroll("#Eo-facility-image");
  EoAnimateOnScroll("#Tables");
  EoAnimateOnScroll("#EoAboutHero1");
  EoAnimateOnScroll("#EoFeaturesShowcase2");
  EoAnimateOnScroll("#EoServicesIntro");
  EoAnimateOnScroll("#EoServicesSection2");
  EoAnimateOnScroll("#EoBlogPanel1");
  EoAnimateOnScroll("#EoBlogArticles");
  // Class elements
  EoAnimateOnScroll(".EoServiceCard", { useInlineStyles: true });
  EoAnimateOnScroll(".EoProgramCard", { useInlineStyles: true });
  EoAnimateOnScroll(".EoFeatureItem", { useInlineStyles: true });
  EoAnimateOnScroll(".EoBlogArticle", { useInlineStyles: true });
  EoAnimateOnScroll(".EoBlogCategoryItem", { useInlineStyles: true });
  EoAnimateOnScroll(".EoGalleryImage", { useInlineStyles: true });
  EoAnimateOnScroll(".EoGalleryHighlightCard", { useInlineStyles: true });
  EoAnimateOnScroll(".EoTeamMemberImage", { useInlineStyles: true });
});

/* ============================================
     DYNAMIC COPYRIGHT YEAR
     Updates the copyright year automatically in Footer Section
     ============================================ */
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  function EoUpdateCopyrightYear() {
    const copyrightYearElement = document.getElementById("EoCopyrightYear");
    if (copyrightYearElement) {
      const currentYear = new Date().getFullYear();
      copyrightYearElement.textContent = currentYear;
    }
  }

  // Call function to update copyright year
  EoUpdateCopyrightYear();

  /* ============================================
       PROGRAM FILTER FUNCTIONALITY
       Filter program cards by fitness level
       ============================================ */
  function EoInitProgramFilter() {
    // Select all filter buttons
    const filterButtons = document.querySelectorAll(".EoProgramFilterBtn");
    // Select all program cards inside the .row.g-4.mt-4 container
    const programCards = document.querySelectorAll(
      ".row.g-4.mt-4 > div[data-level]"
    );

    // Exit if no filter buttons are found (means not on Programs page)
    if (filterButtons.length === 0) {
      return;
    }

    // For each filter button, add a click event listener
    filterButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent form/button default behavior
        const selectedLevel = this.getAttribute("data-level"); // Get level of the clicked button

        // Remove active state from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active state to just the clicked button
        this.classList.add("active");

        // For each program card, show or hide based on selected level
        programCards.forEach((card) => {
          const cardLevel = card.getAttribute("data-level");

          // Show if matching filter (or "all")
          if (selectedLevel === "all" || cardLevel === selectedLevel) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Initialize program filter
  EoInitProgramFilter();
});

// /* ============================================
//      FORM VALIDATION
//      Custom form validation with HTML5 validation in Contact Form Section
//      ============================================ */
// const EoContactForm = document.getElementById("EoContactForm");

// if (EoContactForm) {
//   // Get form inputs
//   const EoFormName = document.getElementById("EoFormName");
//   const EoFormEmail = document.getElementById("EoFormEmail");
//   const EoFormMessage = document.getElementById("EoFormMessage");

//   // Real-time validation on input
//   EoFormName.addEventListener("input", function () {
//     EoValidateField(this, this.value.length >= 2);
//   });

//   EoFormEmail.addEventListener("input", function () {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     EoValidateField(this, emailPattern.test(this.value));
//   });

//   EoFormMessage.addEventListener("input", function () {
//     EoValidateField(this, this.value.length >= 10);
//   });

//   // Form submission handler
//   EoContactForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     event.stopPropagation();

//     // Validate all fields
//     let isNameValid = EoFormName.value.length >= 2;
//     let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EoFormEmail.value);
//     let isMessageValid = EoFormMessage.value.length >= 10;

//     // Update validation states
//     EoValidateField(EoFormName, isNameValid);
//     EoValidateField(EoFormEmail, isEmailValid);
//     EoValidateField(EoFormMessage, isMessageValid);

//     // Check if form is valid
//     if (isNameValid && isEmailValid && isMessageValid) {
//       // Form is valid - show success alert
//       EoShowFormSuccessAlert();

//       // Reset form after successful submission
//       setTimeout(function () {
//         EoContactForm.reset();
//         EoContactForm.classList.remove("was-validated");
//         // Remove validation classes from inputs
//         EoFormName.classList.remove("is-invalid", "is-valid");
//         EoFormEmail.classList.remove("is-invalid", "is-valid");
//         EoFormMessage.classList.remove("is-invalid", "is-valid");
//       }, 2000);
//     } else {
//       // Form is invalid - add Bootstrap validation class
//       EoContactForm.classList.add("was-validated");
//     }
//   });
// }

// Helper function to validate individual fields
// function EoValidateField(field, isValid) {
//   if (isValid) {
//     field.classList.remove("is-invalid");
//     field.classList.add("is-valid");
//   } else {
//     field.classList.remove("is-valid");
//     field.classList.add("is-invalid");
//   }
// }

// // Function to show success alert after form submission
// function EoShowFormSuccessAlert() {
//   // Create alert element
//   const alertDiv = document.createElement("div");
//   alertDiv.className =
//     "alert alert-success alert-dismissible fade show EoFormSuccessAlert";
//   alertDiv.setAttribute("role", "alert");
//   alertDiv.innerHTML = `
//           <i class="fas fa-check-circle me-2"></i>
//           <strong>Success!</strong> Thank you for contacting us. We will get back to you soon!
//           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       `;

//   // Insert alert before the form
//   const formSection = document.querySelector(".EoFormSection");
//   if (formSection) {
//     formSection.insertBefore(alertDiv, EoContactForm);

//     // Auto-dismiss after 5 seconds
//     setTimeout(function () {
//       const bsAlert = new bootstrap.Alert(alertDiv);
//       bsAlert.close();
//     }, 5000);
//   }
// }

// Console log for debugging
console.log("Eo Fitness website loaded successfully!");
console.log("All interactive features are active.");
