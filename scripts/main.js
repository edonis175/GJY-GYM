/* ============================================
   SCROLL ANIMATION 
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
  EoAnimateOnScroll("#EoTestimonialsHeroContent");
  // Class elements
  EoAnimateOnScroll(".EoServiceCard", { useInlineStyles: true });
  EoAnimateOnScroll(".EoProgramCard", { useInlineStyles: true });
  EoAnimateOnScroll(".EoFeatureItem", { useInlineStyles: true });
  EoAnimateOnScroll(".EoBlogArticle", { useInlineStyles: true });
  EoAnimateOnScroll(".EoBlogCategoryItem", { useInlineStyles: true });
  EoAnimateOnScroll(".EoGalleryImage", { useInlineStyles: true });
  EoAnimateOnScroll(".EoGalleryHighlightCard", { useInlineStyles: true });
  EoAnimateOnScroll(".EoTeamMemberImage", { useInlineStyles: true });
  EoAnimateOnScroll(".EoTestimonialFeatured", { useInlineStyles: true });
  EoAnimateOnScroll(".EoTestimonialCard", { useInlineStyles: true });
  EoAnimateOnScroll(".EoTestimonialsHeroContent", { useInlineStyles: true });
  EoAnimateOnScroll(".EoSuccessMetrics", { useInlineStyles: true });
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
// Initialize FAQ search and accordion helper
function EoInitFaq() {
  // Get the FAQ search input element
  const search = document.getElementById("EoFaqSearch");
  if (!search) return; // Exit if search input doesn't exist

  // Get all FAQ items marked with data-faq attribute
  const items = document.querySelectorAll("[data-faq]");

  /**
   * Show or hide "no results" message
   * @param {boolean} show - Whether to display the message
   */
  function showNoResults(show) {
    const existing = document.querySelector(".EoFaqNoResults");
    if (show && !existing) {
      // Create and append no results notice if it doesn't exist
      const notice = document.createElement("div");
      notice.className = "EoFaqNoResults text-center";
      notice.textContent = "No results found. Try searching for anything else.";
      search.closest(".col-md-8").appendChild(notice);
    } else if (!show && existing) {
      // Remove no results notice if results are found
      existing.remove();
    }
  }

  // Listen for user input in search field
  search.addEventListener("input", function () {
    const q = this.value.trim().toLowerCase(); // Get and normalize search query
    let visibleCount = 0;

    // Filter FAQ items based on search query
    items.forEach((item) => {
      const text = (item.textContent || "").toLowerCase();
      const collapseEl = item.querySelector(".accordion-collapse");

      // Show item if query is empty or text matches query
      if (!q || text.includes(q)) {
        item.style.display = "";
        visibleCount++;
      } else {
        // Hide item and collapse it if currently open
        item.style.display = "none";
        if (collapseEl && collapseEl.classList.contains("show")) {
          const bs =
            bootstrap.Collapse.getInstance(collapseEl) ||
            new bootstrap.Collapse(collapseEl, { toggle: false });
          bs.hide();
        }
      }
    });

    // Show/hide "no results" message based on visible items
    showNoResults(visibleCount === 0);

    // Auto-expand first matching item for better UX
    if (q && visibleCount > 0) {
      const first = [...items].find((it) => it.style.display !== "none");
      if (first) {
        const collapseFirst = first.querySelector(".accordion-collapse");
        const bs =
          bootstrap.Collapse.getInstance(collapseFirst) ||
          new bootstrap.Collapse(collapseFirst, { toggle: false });
        bs.show();
      }
    }
  });

  // Update accordion button styling when collapse state changes
  const faqAccordion = document.getElementById("EoFaqAccordion");
  if (faqAccordion) {
    // When accordion item opens, remove "collapsed" class from button
    faqAccordion.addEventListener("show.bs.collapse", function (e) {
      const btn =
        e.target.previousElementSibling.querySelector(".accordion-button");
      if (btn) btn.classList.remove("collapsed");
    });

    // When accordion item closes, add "collapsed" class to button
    faqAccordion.addEventListener("hide.bs.collapse", function (e) {
      const btn =
        e.target.previousElementSibling.querySelector(".accordion-button");
      if (btn) btn.classList.add("collapsed");
    });
  }
}

// Initialize FAQ search & accordion UX when DOM is ready
EoInitFaq();

/* ============================================
   CONTACT FORM CUSTOM ALERT
   Custom alert for contact form submission
   ============================================ */
function EoInitContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.querySelector(".EoSubmitBtn");

  if (!contactForm || !submitBtn) return; // Exit if elements don't exist

  // Add click event listener to submit button
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !phone || !message) {
      EoShowCustomAlert("error", "Please fill in all required fields!");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      EoShowCustomAlert("error", "Please enter a valid email address!");
      return;
    }

    // Show success message
    EoShowCustomAlert(
      "success",
      `Thank you ${name}! Your message has been sent successfully. We'll get back to you soon!`
    );

    // Reset form after 2 seconds
    setTimeout(() => {
      contactForm.reset();
    }, 2000);
  });
}

// Custom alert function
function EoShowCustomAlert(type, message) {
  // Remove any existing custom alerts
  const existingAlert = document.querySelector(".EoCustomAlert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alertDiv = document.createElement("div");
  alertDiv.className = `EoCustomAlert EoCustomAlert--${type}`;

  // Set icon based on type
  const icon =
    type === "success" ? "fa-check-circle" : "fa-exclamation-triangle";

  alertDiv.innerHTML = `
    <div class="EoCustomAlert-content">
      <i class="fas ${icon} EoCustomAlert-icon"></i>
      <div class="EoCustomAlert-message">${message}</div>
      <button class="EoCustomAlert-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  // Add to page (after the form wrapper)
  const formWrapper = document.querySelector(".EoFormWrapper");
  if (formWrapper) {
    formWrapper.appendChild(alertDiv);

    // Add animation class
    setTimeout(() => {
      alertDiv.classList.add("EoCustomAlert--show");
    }, 10);

    // Auto-remove after 7 seconds
    setTimeout(() => {
      if (alertDiv.parentElement) {
        alertDiv.classList.remove("EoCustomAlert--show");
        setTimeout(() => {
          if (alertDiv.parentElement) {
            alertDiv.remove();
          }
        }, 300);
      }
    }, 7000);
  }
}

// Initialize contact form when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  EoInitContactForm();
});

// Console log for debugging
console.log("Eo Fitness website loaded successfully!");
console.log("All interactive features are active.");
