// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Load projects from JSON
async function loadProjects() {
  try {
    const response = await fetch("projects.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    const gamesGrid = document.getElementById("games-grid");

    if (!gamesGrid) {
      console.error("Games grid element not found!");
      return;
    }

    gamesGrid.innerHTML = ""; // Clear any existing content

    projects.forEach((project) => {
      const card = document.createElement("div");
      card.className = "game-card";

      // Add click handler if URL exists
      if (project.url && project.url.trim() !== "") {
        card.style.cursor = "pointer";
        card.onclick = () => window.open(project.url, "_blank");
      }

      const gameImage = document.createElement("div");
      gameImage.className = "game-image";
      gameImage.style.backgroundImage = `url('${project.photo}')`;
      gameImage.style.backgroundSize = "contain";
      gameImage.style.backgroundPosition = "center";
      gameImage.style.backgroundRepeat = "no-repeat";

      const gameContent = document.createElement("div");
      gameContent.className = "game-content";
      gameContent.innerHTML = `<h3>${project.name}</h3>`;

      card.appendChild(gameImage);
      card.appendChild(gameContent);
      gamesGrid.appendChild(card);
    });

    console.log(`✅ ${projects.length} projects loaded successfully`);
  } catch (error) {
    console.error("❌ Error loading projects:", error);
    const gamesGrid = document.getElementById("games-grid");
    if (gamesGrid) {
      gamesGrid.innerHTML =
        '<p style="color: white; text-align: center;">Failed to load projects. Please check console for errors.</p>';
    }
  }
}

// Load projects on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadProjects);
} else {
  loadProjects();
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Form submission handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Log form data
    console.log("=== FORM SUBMISSION LOG ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("Formspree URL:", this.action);
    console.log("========================");

    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      console.log("❌ Validation failed: Missing required fields");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      console.log("❌ Validation failed: Invalid email format");
      return;
    }

    console.log("✅ Validation passed, submitting to Formspree...");

    // Submit to Formspree using fetch
    fetch(this.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("📡 Formspree Response Status:", response.status);
        console.log("📡 Formspree Response Headers:", response.headers);
        return response.json();
      })
      .then((data) => {
        console.log("📧 Formspree Response Data:", data);
        if (data.ok) {
          showNotification(
            "Message sent successfully! We'll get back to you soon.",
            "success"
          );
          console.log("✅ Email sent successfully via Formspree");
          this.reset();
        } else {
          showNotification(
            "There was an error sending your message. Please try again.",
            "error"
          );
          console.log("❌ Formspree error:", data.error || "Unknown error");
        }
      })
      .catch((error) => {
        console.log("❌ Network error:", error);
        showNotification(
          "Network error. Please check your connection and try again.",
          "error"
        );
      });
  });
}

// Newsletter form handling
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;

    if (!email || !isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    showNotification("Thank you for subscribing to our newsletter!", "success");
    this.reset();
  });
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;

  // Add notification styles to head if not already present
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            .notification-close:hover {
                opacity: 0.8;
            }
        `;
    document.head.appendChild(style);
  }

  // Add to page
  document.body.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Animate stat numbers
      if (entry.target.classList.contains("stat-item")) {
        const numberElement = entry.target.querySelector("h4");
        const finalValue = numberElement.textContent;
        animateCounter(numberElement, finalValue);
        observer.unobserve(entry.target); // Only animate once
      }
    }
  });
}, observerOptions);

// Counter animation function
function animateCounter(element, finalValue) {
  // Extract number and suffix (e.g., "10K+" -> number: 10, suffix: "K+")
  const match = finalValue.match(/^(\d+)(.*)$/);
  if (!match) return;

  const targetNumber = parseInt(match[1]);
  const suffix = match[2];
  const duration = 1000; // 1 second (daha hızlı)
  const frameRate = 60;
  const totalFrames = (duration / 1000) * frameRate;
  const increment = targetNumber / totalFrames;

  let currentNumber = 0;
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    currentNumber += increment;

    if (frame >= totalFrames) {
      currentNumber = targetNumber;
      clearInterval(counter);
    }

    element.textContent = Math.floor(currentNumber) + suffix;
  }, 1000 / frameRate);
}

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".game-card, .stat-item, .contact-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Button click effects
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

    // Add ripple animation styles if not present
    if (!document.querySelector("#ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    this.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
