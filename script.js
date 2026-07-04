const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const copyEmailButton = document.querySelector("#copy-email-button");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "Email Copied!";

      setTimeout(() => {
        copyEmailButton.textContent = "Copy Email";
      }, 1800);
    } catch (error) {
      copyEmailButton.textContent = "Copy Failed";

      setTimeout(() => {
        copyEmailButton.textContent = "Copy Email";
      }, 1800);
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeId = entry.target.id;

      navLinks.forEach((link) => {
        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${activeId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});