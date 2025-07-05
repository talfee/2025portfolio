(function() {
  const root = document.documentElement;

  function onPointerMove(e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    root.style.setProperty('--cursorX', `${x}%`);
    root.style.setProperty('--cursorY', `${y}%`);
  }

  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', onPointerMove);
  }

  function initPreviewConnectors() {
    const preview = document.querySelector('.project-preview');
    if (!preview) return;

    const svg   = preview.querySelector('.connectors');
    const items = Array.from(preview.querySelectorAll('.project-item'));
    const ns    = 'http://www.w3.org/2000/svg';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target !== items[0]) {
          const idx  = items.indexOf(entry.target);
          const path = svg.children[idx - 1];
          if (path) path.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    function drawConnectors() {
      const { left: px, top: py, width, height } = preview.getBoundingClientRect();
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.innerHTML = '';

      items.forEach((item, i) => {
        if (i === 0) return;
        const prev = items[i - 1];
        const r1 = prev.getBoundingClientRect();
        const r2 = item.getBoundingClientRect();
        const x1 = (r1.left - px) + r1.width / 2;
        const y1 = (r1.bottom - py);
        const x2 = (r2.left - px) + r2.width / 2;
        const y2 = (r2.top - py);

        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d',
          `M ${x1},${y1} C ${x1},${(y1 + y2)/2} ${x2},${(y1 + y2)/2} ${x2},${y2}`
        );
        path.classList.add('connector-line');

        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;

        svg.appendChild(path);
      });

      items.forEach(item => observer.observe(item));
    }

    window.addEventListener('load', drawConnectors);
    window.addEventListener('resize', drawConnectors);
  }

  initPreviewConnectors();
})();

// existing spotlight + connectors code above...
// ────────────────────────────────────────────────
// Below: About‐page click‐to‐add‐photo logic

(function() {
   const aboutSection = document.getElementById('about');
   if (!aboutSection) return;
  let positive = true;

  document.body.addEventListener('click', e => {
    // you might filter out clicks on nav, etc, if desired:
    // if (e.target.closest('nav')) return;

    // random ± angle between 5° and 20°
    const base  = 5 + Math.random() * 15;
    const angle = (positive ? 1 : -1) * base;
    positive = !positive;

    const img = document.createElement('img');
    img.src = 'assets/placeholder.jpg';
    img.alt = 'About me photo';
    img.className = 'loaded-photo';

    // fixed positioning at the click
    img.style.left      = `${e.clientX}px`;
    img.style.top       = `${e.clientY}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    document.body.appendChild(img);
  });
})();

// ────────── slide-in on scroll ──────────
(function() {
  const items = document.querySelectorAll('.project-item');
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        slideObserver.unobserve(entry.target); // optional: only once
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => slideObserver.observe(item));
})();
// ────────── slide-in on scroll for Projects page ──────────
(function() {
  const cards = document.querySelectorAll('#project-list .project-card');
  if (!cards.length) return;

  const projObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => projObserver.observe(card));
})();

  // projects.js logic combined inline

  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#filters button');
    const cards   = document.querySelectorAll('#project-list .project-card');

    // 1) Filter behavior
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const skill = btn.dataset.skill;
        cards.forEach(card => {
          const tags = card.dataset.skill.split(',').map(s => s.trim());
          if (skill === 'all' || tags.includes(skill)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // 2) Slide‐in on scroll
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  });
