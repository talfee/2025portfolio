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

const PROJECTS = [
  {
    title: 'Undergraduate TA – UBC (2023–Present)',
    desc: 'Taught logic and state machines to 120+ students; designed slides for 500+; adapted to diverse learning styles and collaborated under pressure.',
    skills: ['communication', 'teamwork']
  },
  {
    title: 'Web Developer – UBC Science Undergraduate Society (2025–Present)',
    desc: 'Designed a degree navigator for 16,000+ students using Python and D3.js.',
    skills: ['teamwork', 'technical', 'web', 'backend', 'data']
  },
  {
    title: 'TrailNotes (Fullstack Journal App)',
    desc: 'Built journaling features with photo uploads, geolocation, and authentication; deployed with GitHub Pages.',
    link: 'https://devpost.com/software/trailnotes',
    skills: ['teamwork', 'frontend', 'backend', 'api']
  },
  {
    title: 'InternDB (Project Manager)',
    desc: 'Managed InternDB for 4000+ users; gathered 70+ survey responses; led sprints and prioritized features.',
    link: 'https://www.interndb.io/',
    skills: ['teamwork', 'pm', 'communication', 'usertesting']
  },
  {
    title: 'UBC Biomod (Computational Team)',
    desc: 'Built DNA nanostructures; coded diffusion models; presented internationally in Japan, earning gold and 1st place.',
    link: 'https://ubcbiomod2024.netlify.app/',
    skills: ['teamwork', 'pm', 'communication', 'presentation', 'bio', 'cs']
  },
  {
    title: 'Colony Counter (Python, OpenCV, Django)',
    desc: 'Automated bacterial colony counting with computer vision; built a usable frontend.',
    link: 'https://devpost.com/software/colony-counter',
    skills: ['bio', 'cs', 'frontend', 'backend', 'api']
  },
  {
    title: 'UBC Course Query (TypeScript)',
    desc: 'Built a course search engine using TDD and async REST APIs; parsed data from HTML/JSON.',
    skills: ['backend', 'data', 'web']
  },
  {
    title: 'Hot Pot Database (JavaScript, HTML, CSS)',
    desc: 'Built 20+ Express + OracleDB endpoints with CRUD, joins, division, and robust error handling.',
    link: '#',
    skills: ['backend', 'database', 'web']
  },
  {
    title: 'Marketing Coordinator – UBC World Vision',
    desc: 'Created branding and ran social media for a nonprofit with 1.2k+ followers.',
    link: '#',
    skills: ['communication', 'teamwork', 'design', 'marketing']
  },
  {
    title: 'Academic Officer – UBC CSSS',
    desc: 'Assisted alumni with curriculum proposals for 2700+ CS students.',
    link: '#',
    skills: ['communication', 'teamwork', 'design']
  },
  {
    title: 'Hackathon Organizer – Project Tech Careers (2021–2024)',
    desc: 'Organized 3 hackathons for 150+ high school students across North America.',
    skills: ['teamwork', 'communication', 'planning', 'management']
  },
  {
    title: 'Student Researcher – UBC BioProducts Institute (2023–2024)',
    desc: 'Led K. medelinensis food preservation project and presented results to 450+ attendees at MURC.',
    skills: ['projectmanagement', 'teamwork', 'communication', 'presentation']
  }
];

function createProjectCard(p) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.dataset.skill = p.skills.join(',');
  const h2 = document.createElement('h2');
  h2.textContent = p.title;
  article.appendChild(h2);
  const desc = document.createElement('p');
  desc.textContent = p.desc;
  article.appendChild(desc);
  if (p.link) {
    const a = document.createElement('a');
    a.href = p.link;
    a.target = '_blank';
    a.className = 'project-link';
    a.textContent = 'View Project';
    article.appendChild(a);
  }
  return article;
}

function renderProjects() {
  const container = document.getElementById('project-list');
  if (!container) return;
  PROJECTS.forEach(p => container.appendChild(createProjectCard(p)));
}

function renderFilters() {
  const wrapper = document.getElementById('filters');
  if (!wrapper) return;
  const allBtn = document.createElement('button');
  allBtn.dataset.skill = 'all';
  allBtn.textContent = 'show all';
  allBtn.classList.add('active');
  wrapper.appendChild(allBtn);
  const skills = new Set();
  PROJECTS.forEach(p => p.skills.forEach(s => skills.add(s)));
  Array.from(skills).sort().forEach(skill => {
    const btn = document.createElement('button');
    btn.dataset.skill = skill;
    btn.textContent = skill;
    wrapper.appendChild(btn);
  });
}

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

function observeProjectCards() {
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
}

function setupFilters() {
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
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderFilters();
  observeProjectCards();
  setupFilters();
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
