const content = {
  name: 'Your Name',
  role: 'Engineer | Builder',
  summary: 'I design and ship web systems with a focus on clarity, performance, and developer experience.',
  photo: 'assets/profile.jpg',
  email: 'you@example.com',
  location: 'City, Country',
  resume: 'https://your-link-to-resume.pdf',
  github: 'https://github.com/yourhandle',
  linkedin: 'https://www.linkedin.com/in/yourhandle',
  about: 'Brief paragraph about who you are, what you enjoy building, and what you are aiming for.',
  experience: [
    {
      title: 'Title',
      company: 'Company',
      dates: '2023 — Present',
      bullets: [
        'Shipped X to Y users, improving Z by 25%.',
        'Cut build times by 30% via <tech>.'
      ],
      tech: ['React', 'TypeScript', 'Node']
    }
  ],
  projects: [
    {
      title: 'Project One',
      blurb: 'Short problem → solution → impact line.',
      tech: ['Next.js', 'Tailwind', 'Vercel'],
      links: { live: '#', repo: '#' }
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node', 'FastAPI', 'PostgreSQL', 'Docker', 'GitHub Actions'],
  education: [
    { school: 'University', degree: 'B.S. in X', dates: '2019 — 2023', note: 'GPA / honors (optional)' }
  ],
  awards: [
    'Award name — org — year — why it matters'
  ]
};

function setLink(id, url) {
  const el = document.getElementById(id);
  if (el && url) el.href = url;
}

function renderExperience(listEl) {
  content.experience.forEach(role => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__header">
        <div>
          <p class="card__title">${role.title}</p>
          <p class="card__subtitle">${role.company} • ${role.dates}</p>
        </div>
      </div>
      <ul class="list">
        ${role.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
      <div class="card__tags">
        ${role.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
    listEl.appendChild(card);
  });
}

function renderProjects(listEl) {
  content.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card';
    const live = project.links?.live ? `<a href="${project.links.live}" target="_blank" rel="noreferrer">Live</a>` : '';
    const repo = project.links?.repo ? `<a href="${project.links.repo}" target="_blank" rel="noreferrer">Repo</a>` : '';
    card.innerHTML = `
      <div class="card__header">
        <div>
          <p class="card__title">${project.title}</p>
          <p class="card__subtitle">${project.blurb}</p>
        </div>
        <div class="card__links">${live} ${repo}</div>
      </div>
      <div class="card__tags">
        ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
    listEl.appendChild(card);
  });
}

function renderSkills(el) {
  el.innerHTML = content.skills.map(s => `<span class="chip">${s}</span>`).join('');
}

function renderEducation(listEl) {
  content.education.forEach(ed => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p class="card__title">${ed.degree}</p>
      <p class="card__subtitle">${ed.school} • ${ed.dates}</p>
      ${ed.note ? `<p class="card__subtitle">${ed.note}</p>` : ''}
    `;
    listEl.appendChild(card);
  });
}

function renderAwards(listEl) {
  listEl.innerHTML = content.awards.map(a => `<li>${a}</li>`).join('');
}

function renderStatic() {
  document.getElementById('brandName').textContent = content.name;
  document.getElementById('heroName').textContent = content.name;
  document.getElementById('heroRole').textContent = content.role;
  document.getElementById('heroSummary').textContent = content.summary;
  document.getElementById('aboutText').textContent = content.about;
  document.getElementById('locationText').textContent = content.location;
  const emailEl = document.getElementById('emailLink');
  emailEl.href = `mailto:${content.email}`;
  emailEl.textContent = content.email;
  document.getElementById('footerName').textContent = content.name;
  const photo = document.getElementById('heroPhoto');
  if (photo) photo.src = content.photo;

  setLink('resumeLink', content.resume);
  setLink('githubLink', content.github);
  setLink('linkedinLink', content.linkedin);
}

function initScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function setCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function render() {
  renderStatic();
  renderExperience(document.getElementById('experienceList'));
  renderProjects(document.getElementById('projectList'));
  renderSkills(document.getElementById('skillsList'));
  renderEducation(document.getElementById('educationList'));
  renderAwards(document.getElementById('awardsList'));
  setCurrentYear();
  initScrollAnimations();
  initSmoothScroll();
}

document.addEventListener('DOMContentLoaded', render);
