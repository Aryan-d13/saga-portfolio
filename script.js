const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const observedSections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

document.documentElement.classList.add("js-enabled");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
  );

  observedSections.forEach((section) => navObserver.observe(section));

  window.setTimeout(() => {
    revealItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < window.innerHeight * 1.1) {
        item.classList.add("is-visible");
      }
    });
  }, 700);
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
