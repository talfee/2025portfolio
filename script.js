(function() {
  const root = document.documentElement;
  function onPointerMove(e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    root.style.setProperty('--cursorX', `${x}%`);
    root.style.setProperty('--cursorY', `${y}%`);
    root.style.setProperty('--x-ratio', e.clientX / window.innerWidth);
    root.style.setProperty('--y-ratio', e.clientY / window.innerHeight);
  }
  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', onPointerMove);
  }
})();

(function() {
  const preview = document.querySelector('.project-preview');
  if (!preview) return;
  const svg = preview.querySelector('.connectors');
  const items = Array.from(preview.querySelectorAll('.project-item'));
  const ns = 'http://www.w3.org/2000/svg';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target !== items[0]) {
        const idx = items.indexOf(entry.target);
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
        `M ${x1},${y1}
         C ${x1},${(y1 + y2)/2}
           ${x2},${(y1 + y2)/2}
           ${x2},${y2}`
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
})();

(function() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  const photos = [
    'assets/IMG_0120.JPG',
    'assets/IMG_0664.jpeg',
    'assets/IMG_1043.jpeg',
    'assets/IMG_2274.JPG',
    'assets/IMG_4396.jpeg',
    'assets/IMG_4419.jpeg',
    'assets/IMG_4443.jpeg',
    'assets/IMG_4444.jpeg',
    'assets/IMG_7038.JPG',
    'assets/IMG_7201.jpeg',
    'assets/IMG_8864.jpeg',
    'assets/IMG_9727.jpeg'
  ];
  let index = 0, positive = true;
  document.body.addEventListener('click', e => {
    if (e.target.closest('nav')) return;
    const src = photos[index];
    index = (index + 1) % photos.length;
    const base = 5 + Math.random() * 15;
    const angle = (positive ? 1 : -1) * base;
    positive = !positive;
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'About me photo';
    img.className = 'loaded-photo';
    img.style.setProperty('--angle', `${angle}deg`);
    img.style.left = `${e.clientX}px`;
    img.style.top = `${e.clientY}px`;
    document.body.appendChild(img);
  });
})();

(function() {
  const items = document.querySelectorAll('.project-item');
  if (!items.length) return;
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        slideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(item => slideObserver.observe(item));
})();

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

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#filters button');
  const cards = document.querySelectorAll('#project-list .project-card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const skill = btn.dataset.skill;
      cards.forEach(card => {
        const tags = card.dataset.skill.split(',').map(s => s.trim());
        card.style.display =
          (skill === 'all' || tags.includes(skill)) ? '' : 'none';
      });
    });
  });
});

(function() {
  const body = document.body;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  });
})();
