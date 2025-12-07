// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
       DYNAMIC COPYRIGHT YEAR
       Updates the copyright year automatically in Footer Section
       ============================================ */
  function EoUpdateCopyrightYear() {
    const copyrightYearElement = document.getElementById("EoCopyrightYear");
    if (copyrightYearElement) {
      const currentYear = new Date().getFullYear();
      copyrightYearElement.textContent = currentYear;
    }
  }

  // Call function to update copyright year
  EoUpdateCopyrightYear();

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

  /* ============================================
       CAROUSEL CONTROL
       Custom carousel functionality
       ============================================ */
  const EoMainCarousel = document.getElementById("EoMainCarousel");

  if (EoMainCarousel) {
    // Initialize carousel
    const carousel = new bootstrap.Carousel(EoMainCarousel, {
      interval: 6000, // Auto-advance every 6 seconds
      wrap: true,
      keyboard: true,
      pause: "hover",
    });

    // Add custom event listeners
    EoMainCarousel.addEventListener("slide.bs.carousel", function (event) {});

    EoMainCarousel.addEventListener("slid.bs.carousel", function (event) {});

    // Custom function to go to specific slide
    window.EoGoToCarouselSlide = function (slideIndex) {
      carousel.to(slideIndex);
    };

    // Pause carousel on user interaction
    EoMainCarousel.addEventListener("mouseenter", function () {
      carousel.pause();
    });

    EoMainCarousel.addEventListener("mouseleave", function () {
      carousel.cycle();
    });
  }

  /* ============================================
       MODAL FUNCTIONALITY
       Enhanced modal interactions
       ============================================ */
  const EoSpecialModal = document.getElementById("EoSpecialModal");

  if (EoSpecialModal) {
    // Get modal instance
    const modal = new bootstrap.Modal(EoSpecialModal);

    // Event listener for when modal is shown
    EoSpecialModal.addEventListener("show.bs.modal", function (event) {
      console.log("Eo Special Training modal is opening");
    });

    // Event listener for when modal is fully shown
    EoSpecialModal.addEventListener("shown.bs.modal", function (event) {
      console.log("Eo Special Training modal is now visible");
    });

    // Event listener for when modal is hidden
    EoSpecialModal.addEventListener("hidden.bs.modal", function (event) {
      console.log("Eo Special Training modal is now hidden");
    });

    // Handle "Book Consultation" button click
    const EoModalButton = EoSpecialModal.querySelector(".EoModalButton");
    if (EoModalButton) {
      EoModalButton.addEventListener("click", function () {
        // Show alert
        EoShowBookingAlert();
        // Close modal
        modal.hide();
      });
    }
  }

  // Function to show booking alert
  function EoShowBookingAlert() {
    alert(
      "Thank you for your interest! Please contact us at (555) 123-4567 or info@eofitness.com to book your consultation."
    );
  }

  /* ============================================
       TOGGLE FUNCTION
       Toggle functionality for interactive elements
       ============================================ */

  // Toggle function for navbar on scroll
  let EoLastScroll = 0;
  const EoNavbar = document.querySelector(".EoNavbar");

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (EoNavbar) {
      if (currentScroll > 100) {
        EoNavbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
      } else {
        EoNavbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      }
    }

    EoLastScroll = currentScroll;
  });

  /* ============================================
       SMOOTH SCROLLING
       Smooth scroll behavior for anchor links
       ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  /* ============================================
       ADDITIONAL INTERACTIVE FEATURES
       ============================================ */

  // Add animation on scroll for cards
  const EoObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const EoObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, EoObserverOptions);

  // Observe service cards
  document.querySelectorAll(".EoServiceCard").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    EoObserver.observe(card);
  });

  // Console log for debugging
  console.log("Eo Fitness website loaded successfully!");
  console.log("All interactive features are active.");
});
