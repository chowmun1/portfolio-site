const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const sectionLinks = new Map(
  Array.from(navLinks.querySelectorAll('a'))
    .map((link) => [document.querySelector(link.getAttribute('href')), link])
    .filter(([section]) => section)
);

if (sectionLinks.size && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = sectionLinks.get(entry.target);
        if (!link) return;
        link.classList.toggle('active', entry.isIntersecting);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sectionLinks.forEach((_, section) => observer.observe(section));
}
