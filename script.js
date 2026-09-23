/* SilverSet Studios — site behaviour (vanilla JS, single file) */
(function () {
  "use strict";

  /* ============ Header and menu ============ */

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("main-nav");
  const menuToggle = document.getElementById("menu-toggle");

  function onScroll() {
    header.classList.toggle("is-solid", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }
  menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* ============ Contact form (Formspree) ============ */

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (kind ? " is-" + kind : "");
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fields = ["f-name", "f-email", "f-message"].map((id) => document.getElementById(id));
      fields.forEach((f) => f.removeAttribute("aria-invalid"));

      const empty = fields.filter((f) => !f.value.trim());
      if (empty.length) {
        empty.forEach((f) => f.setAttribute("aria-invalid", "true"));
        setStatus("Fill in your name, email and project details.", "error");
        empty[0].focus();
        return;
      }
      const email = document.getElementById("f-email");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.setAttribute("aria-invalid", "true");
        setStatus("Enter a valid email address, e.g. name@company.com.", "error");
        email.focus();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      setStatus("Sending…");

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        setStatus("Message sent. We'll get back to you within two business days.", "success");
      } catch (err) {
        console.error("Form submit failed:", err);
        setStatus("The message couldn't be sent. Try again or email info@silversetstudios.com.", "error");
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ============ Init ============ */

  document.getElementById("year").textContent = new Date().getFullYear();
})();
