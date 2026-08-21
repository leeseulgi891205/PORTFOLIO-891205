document.addEventListener('DOMContentLoaded', () => {
  const lineup = document.querySelector('.lineup');
  const tabs = [...document.querySelectorAll('.tab')];
  const panels = [...document.querySelectorAll('.panel')];

  if (!lineup) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      lineup.classList.add('impact-in');
      observer.disconnect();
    });
  }, { threshold: 0.18 });

  observer.observe(lineup);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const panel = panels[index];
      if (!panel) return;
      panel.classList.remove('panel-replay');
      void panel.offsetWidth;
      panel.classList.add('panel-replay');
    });
  });

  const siteNav = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const navIndex = document.querySelector('.nav-index');
  const navTargets = navLinks.map((link) => document.querySelector(link.getAttribute('href')));

  const setActiveNav = (index) => {
    navLinks.forEach((link, linkIndex) => link.classList.toggle('active', linkIndex === index));
    if (navIndex) navIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(navLinks.length).padStart(2, '0')}`;
  };

  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const index = navTargets.indexOf(visible.target);
    if (index >= 0) setActiveNav(index);
  }, { rootMargin: '-25% 0px -55%', threshold: [0, .15, .4] });

  navTargets.filter(Boolean).forEach((target) => navObserver.observe(target));
  setActiveNav(0);

  window.addEventListener('scroll', () => {
    if (siteNav) siteNav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
});
