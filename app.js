/**
 * Apex Global University — Client-side Interactive Controller
 * Pure Vanilla JavaScript (Zero external dependencies)
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Data: Academic Programs
  // ---------------------------------------------------------------------------
  const PROGRAMS = [
    {
      id: 'cs-ai',
      category: 'tech',
      degree: 'B.S.',
      duration: '4 Years',
      title: 'Computer Science & Artificial Intelligence',
      desc: 'Master machine learning architectures, neural networks, distributed systems, and algorithmic theory with hands-on lab projects.',
      specs: ['128 Credits', 'Industry Capstone', '99% Placement'],
    },
    {
      id: 'cyber-sec',
      category: 'tech',
      degree: 'M.S.',
      duration: '2 Years',
      title: 'Cybersecurity & Cloud Resilience',
      desc: 'Advanced threat intelligence, cryptographic protocols, cloud security architectures, and offensive/defensive operations.',
      specs: ['36 Credits', 'NSA Accredited', 'High Salary'],
    },
    {
      id: 'robotics-eng',
      category: 'eng',
      degree: 'B.S.',
      duration: '4 Years',
      title: 'Robotics & Autonomous Systems',
      desc: 'Integrate mechanical engineering, embedded perception sensors, computer vision, and autonomous drone navigation.',
      specs: ['132 Credits', 'Robotics Lab Access', 'ABIT Accredited'],
    },
    {
      id: 'aero-eng',
      category: 'eng',
      degree: 'B.S.',
      duration: '4 Years',
      title: 'Aerospace & Propulsion Engineering',
      desc: 'Propulsion dynamics, orbital mechanics, hypersonic aerodynamics, and spacecraft system modeling.',
      specs: ['130 Credits', 'NASA Co-op', 'Wind Tunnel Lab'],
    },
    {
      id: 'fintech-biz',
      category: 'biz',
      degree: 'B.S.',
      duration: '4 Years',
      title: 'Quantitative Finance & FinTech',
      desc: 'Algorithmic trading models, financial econometrics, blockchain infrastructure, and decentralized venture capital.',
      specs: ['124 Credits', 'Bloomberg Terminals', 'Wall St Pipeline'],
    },
    {
      id: 'mba-lead',
      category: 'biz',
      degree: 'M.B.A.',
      duration: '2 Years',
      title: 'Global Strategic Leadership & Innovation',
      desc: 'Cultivate venture building, organizational scaling, executive decision-making, and cross-border tech enterprise strategy.',
      specs: ['48 Credits', 'Executive Mentors', 'Silicon Valley Immersion'],
    },
    {
      id: 'genomics-bio',
      category: 'bio',
      degree: 'B.S.',
      duration: '4 Years',
      title: 'Molecular Biology & Genomics',
      desc: 'CRISPR genome editing technologies, synthetic biology, molecular pharmacology, and bio-computational pipelines.',
      specs: ['126 Credits', 'Clinical Rotations', 'Pre-Med Track'],
    },
    {
      id: 'biomed-phd',
      category: 'bio',
      degree: 'Ph.D.',
      duration: '4-5 Years',
      title: 'Biomedical Nanotechnology',
      desc: 'Design targeted nanoscale therapeutics, diagnostic bio-MEMS sensors, and neural bio-interface prosthetics.',
      specs: ['Fully Funded', '$42k Stipend', 'NIH Fellowships'],
    },
    {
      id: 'ux-design',
      category: 'arts',
      degree: 'B.A.',
      duration: '4 Years',
      title: 'Interactive Digital Media & UI/UX',
      desc: 'Spatial computing interfaces, human-computer interaction, kinetic design, and digital product strategy.',
      specs: ['120 Credits', 'Portfolio Studio', 'VR/AR Lab'],
    },
    {
      id: 'arch-urban',
      category: 'arts',
      degree: 'B.Arch.',
      duration: '5 Years',
      title: 'Sustainable Architecture & Urbanism',
      desc: 'Net-zero carbon civic architecture, parametric modeling, climate-resilient cities, and structural engineering.',
      specs: ['150 Credits', 'NAAB Accredited', 'Global Studios'],
    },
  ];

  // ---------------------------------------------------------------------------
  // Data: Events
  // ---------------------------------------------------------------------------
  const EVENTS = [
    {
      month: 'OCT',
      day: '18',
      tag: 'Hackathon',
      title: 'Apex Global Hackathon 2026',
      time: 'Oct 18-20 • Innovation Hub • $50K in Prizes',
    },
    {
      month: 'NOV',
      day: '04',
      tag: 'Keynote',
      title: 'Nobel Laureate Distinguished Lecture Series',
      time: '3:00 PM • Alexander Great Hall • Open to Public',
    },
    {
      month: 'NOV',
      day: '15',
      tag: 'Admissions',
      title: 'Fall 2026 Priority Scholarship Deadline',
      time: '11:59 PM PST • Online Submission Portal',
    },
    {
      month: 'DEC',
      day: '08',
      tag: 'Symposium',
      title: 'Annual Undergraduate Research Symposium',
      time: '10:00 AM • Science & Engineering Quad',
    },
  ];

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const state = {
    theme: localStorage.getItem('apex_theme') || 'light',
    activeFilter: 'all',
    courses: [
      { id: 1, name: 'CS 101: Data Structures', credits: 4, grade: 'A' },
      { id: 2, name: 'MATH 205: Linear Algebra', credits: 4, grade: 'A-' },
      { id: 3, name: 'PHYS 150: Physics & Mechanics', credits: 4, grade: 'B+' },
      { id: 4, name: 'ENG 110: Academic Writing', credits: 3, grade: 'A' },
    ],
  };

  const GRADE_POINTS = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D': 1.0,
    'F': 0.0,
  };

  // ---------------------------------------------------------------------------
  // Theme Management
  // ---------------------------------------------------------------------------
  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem('apex_theme', theme);
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (theme === 'dark') {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      if (moonIcon) moonIcon.classList.add('hidden');
      if (sunIcon) sunIcon.classList.remove('hidden');
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
    showToast(`Switched to ${state.theme === 'light' ? 'Light' : 'Dark'} Theme`);
  }

  // ---------------------------------------------------------------------------
  // Toast Hub
  // ---------------------------------------------------------------------------
  function showToast(message) {
    const hub = document.getElementById('toast-hub');
    if (!hub) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    hub.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ---------------------------------------------------------------------------
  // Render Programs
  // ---------------------------------------------------------------------------
  function renderPrograms() {
    const grid = document.getElementById('programs-grid');
    if (!grid) return;

    const filtered = state.activeFilter === 'all'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === state.activeFilter);

    grid.innerHTML = '';
    filtered.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'program-card';

      const specsHtml = p.specs.map((s) => `<span class="spec-chip">${s}</span>`).join('');

      card.innerHTML = `
        <div class="program-header">
          <span class="degree-badge">${p.degree}</span>
          <span class="duration-tag">${p.duration}</span>
        </div>
        <h3 class="program-title">${p.title}</h3>
        <p class="program-desc">${p.desc}</p>
        <div class="program-specs">${specsHtml}</div>
        <div class="program-actions">
          <a href="#admissions" class="program-link">View Degree Requirements →</a>
          <button class="btn btn-sm btn-secondary program-apply-btn" data-title="${p.title}">Apply</button>
        </div>
      `;

      card.querySelector('.program-apply-btn').addEventListener('click', () => {
        openApplyModal(p.title);
      });

      grid.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // GPA Calculator Logic
  // ---------------------------------------------------------------------------
  function renderCourseTable() {
    const tbody = document.getElementById('course-list-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    state.courses.forEach((c, idx) => {
      const tr = document.createElement('tr');
      const point = GRADE_POINTS[c.grade] || 4.0;
      const totalPoints = (point * c.credits).toFixed(1);

      tr.innerHTML = `
        <td><input type="text" class="table-input course-name" value="${c.name}" data-idx="${idx}"></td>
        <td>
          <select class="table-input course-credits" data-idx="${idx}">
            <option value="1" ${c.credits === 1 ? 'selected' : ''}>1 Credit</option>
            <option value="2" ${c.credits === 2 ? 'selected' : ''}>2 Credits</option>
            <option value="3" ${c.credits === 3 ? 'selected' : ''}>3 Credits</option>
            <option value="4" ${c.credits === 4 ? 'selected' : ''}>4 Credits</option>
            <option value="5" ${c.credits === 5 ? 'selected' : ''}>5 Credits</option>
          </select>
        </td>
        <td>
          <select class="table-input course-grade" data-idx="${idx}">
            ${Object.keys(GRADE_POINTS).map((g) => `<option value="${g}" ${c.grade === g ? 'selected' : ''}>${g} (${GRADE_POINTS[g].toFixed(1)})</option>`).join('')}
          </select>
        </td>
        <td><strong>${totalPoints}</strong></td>
        <td>
          <button class="row-delete-btn" data-idx="${idx}" title="Delete course">✕</button>
        </td>
      `;

      tr.querySelector('.course-credits').addEventListener('change', (e) => {
        state.courses[idx].credits = parseInt(e.target.value, 10);
        updateGPASummary();
        renderCourseTable();
      });

      tr.querySelector('.course-grade').addEventListener('change', (e) => {
        state.courses[idx].grade = e.target.value;
        updateGPASummary();
        renderCourseTable();
      });

      tr.querySelector('.row-delete-btn').addEventListener('click', () => {
        if (state.courses.length <= 1) {
          showToast('You must have at least one course in the table.');
          return;
        }
        state.courses.splice(idx, 1);
        updateGPASummary();
        renderCourseTable();
      });

      tbody.appendChild(tr);
    });

    updateGPASummary();
  }

  function updateGPASummary() {
    let totalCredits = 0;
    let totalQualityPoints = 0;

    state.courses.forEach((c) => {
      const pts = GRADE_POINTS[c.grade] || 4.0;
      totalCredits += c.credits;
      totalQualityPoints += pts * c.credits;
    });

    const gpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

    document.getElementById('total-credits-val').textContent = totalCredits;
    document.getElementById('total-points-val').textContent = totalQualityPoints.toFixed(1);
    document.getElementById('calculated-gpa-val').textContent = gpa;

    const standingElem = document.getElementById('honors-standing-val');
    const numericGpa = parseFloat(gpa);

    if (numericGpa >= 3.85) {
      standingElem.textContent = "Summa Cum Laude (President's List)";
    } else if (numericGpa >= 3.65) {
      standingElem.textContent = "Magna Cum Laude (High Honors)";
    } else if (numericGpa >= 3.5) {
      standingElem.textContent = "Cum Laude (Dean's Honor Roll)";
    } else if (numericGpa >= 3.0) {
      standingElem.textContent = 'Good Academic Standing';
    } else {
      standingElem.textContent = 'Academic Warning / Review';
    }
  }

  function addCourseRow() {
    const newId = state.courses.length + 1;
    state.courses.push({
      id: newId,
      name: `Elective Course ${newId}`,
      credits: 3,
      grade: 'A',
    });
    renderCourseTable();
    showToast('Added new course row to calculator');
  }

  // ---------------------------------------------------------------------------
  // Tuition & Scholarship Estimator Logic
  // ---------------------------------------------------------------------------
  function calculateTuition() {
    const residency = document.getElementById('tuition-residency').value;
    const degree = document.getElementById('tuition-degree').value;
    const housing = document.getElementById('tuition-housing').value;
    const gpa = parseFloat(document.getElementById('tuition-gpa').value);

    // Base Tuition
    let tuition = 24000;
    if (residency === 'in-state') tuition = 12000;
    else if (residency === 'international') tuition = 32000;

    // Graduate multiplier
    if (degree === 'grad') tuition = Math.round(tuition * 1.3);

    // Housing
    let roomBoard = 11500;
    if (housing === 'dorm-suite') roomBoard = 14000;
    else if (housing === 'commuter') roomBoard = 0;

    // Merit Scholarship Calculation
    let scholarship = 0;
    if (gpa >= 3.9) scholarship = 12000;
    else if (gpa >= 3.7) scholarship = 8000;
    else if (gpa >= 3.4) scholarship = 5000;
    else if (gpa >= 3.0) scholarship = 2500;

    // Cap scholarship so it doesn't exceed tuition
    scholarship = Math.min(scholarship, tuition);

    const netCost = tuition + roomBoard - scholarship;

    // Update UI
    document.getElementById('summary-tuition').textContent = `$${tuition.toLocaleString()}`;
    document.getElementById('summary-housing').textContent = `$${roomBoard.toLocaleString()}`;
    document.getElementById('summary-scholarship').textContent = `-$${scholarship.toLocaleString()}`;
    document.getElementById('summary-net-cost').textContent = `$${netCost.toLocaleString()}`;
    document.getElementById('gpa-slider-val').textContent = gpa.toFixed(2);
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------
  function renderEvents() {
    const container = document.getElementById('events-grid');
    if (!container) return;

    container.innerHTML = '';
    EVENTS.forEach((e) => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <div class="event-date-badge">
          <span class="event-month">${e.month}</span>
          <span class="event-day">${e.day}</span>
        </div>
        <div class="event-info">
          <span class="event-tag">${e.tag}</span>
          <h4 class="event-title">${e.title}</h4>
          <span class="event-time-loc">${e.time}</span>
          <button class="btn btn-sm btn-secondary event-rsvp-btn">RSVP / Add to Calendar</button>
        </div>
      `;

      card.querySelector('.event-rsvp-btn').addEventListener('click', () => {
        showToast(`You have RSVP'd for: ${e.title} 📅`);
      });

      container.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // Modal Management
  // ---------------------------------------------------------------------------
  function openApplyModal(preselectedMajor) {
    const modal = document.getElementById('apply-modal');
    if (preselectedMajor) {
      const select = document.getElementById('apply-major-select');
      if (select) {
        let match = false;
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.includes(preselectedMajor)) {
            select.selectedIndex = i;
            match = true;
            break;
          }
        }
        if (!match) {
          const opt = new Option(preselectedMajor, preselectedMajor, true, true);
          select.add(opt);
        }
      }
    }
    modal.classList.remove('hidden');
  }

  function closeApplyModal() {
    document.getElementById('apply-modal').classList.add('hidden');
  }

  // ---------------------------------------------------------------------------
  // Campus Guide Chatbot
  // ---------------------------------------------------------------------------
  const BOT_RESPONSES = {
    scholarships:
      'Apex University awards over $35M in annual merit scholarships! Students with a GPA of 3.4+ automatically qualify for between $2,500 and $12,000/year. Check our Tuition Estimator tool on this page to calculate your award!',
    deadlines:
      'Fall 2026 Priority Deadline: November 15, 2025. Regular Decision Deadline: February 1, 2026. Spring 2027 Transfer Deadline: October 1, 2026.',
    housing:
      'First-year students are guaranteed on-campus housing in Horizon Residential Villages, featuring LEED Platinum suites, 24/7 learning lounges, and farm-to-table dining halls.',
    gpa:
      'You can calculate your term and cumulative GPA using our Interactive GPA Calculator right under the Student Tools section on this page!',
  };

  function addChatMessage(text, sender) {
    const body = document.getElementById('chat-body');
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = `<p>${text}</p>`;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function handleBotQuery(query) {
    addChatMessage(query, 'user');
    const lower = query.toLowerCase();

    setTimeout(() => {
      let reply = "Thank you for reaching out! You can submit an inquiry through our Contact section or schedule an advisor meeting, and our admissions team will be glad to assist you.";

      if (lower.includes('scholarship') || lower.includes('aid') || lower.includes('cost') || lower.includes('tuition')) {
        reply = BOT_RESPONSES.scholarships;
      } else if (lower.includes('deadline') || lower.includes('when') || lower.includes('date')) {
        reply = BOT_RESPONSES.deadlines;
      } else if (lower.includes('housing') || lower.includes('dorm') || lower.includes('live') || lower.includes('room')) {
        reply = BOT_RESPONSES.housing;
      } else if (lower.includes('gpa') || lower.includes('grade') || lower.includes('calculator')) {
        reply = BOT_RESPONSES.gpa;
      } else if (lower.includes('program') || lower.includes('major') || lower.includes('computer science') || lower.includes('engineering')) {
        reply = 'Apex offers 120+ accredited programs! Highlights include Computer Science & AI, Robotics, Quantitative Finance, Biomedical Genomics, and Sustainable Architecture.';
      }

      addChatMessage(reply, 'bot');
    }, 450);
  }

  // ---------------------------------------------------------------------------
  // Setup & Event Listeners
  // ---------------------------------------------------------------------------
  function setupEvents() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Mobile nav toggle
    const mobileBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Program filters
    document.querySelectorAll('.filter-tab').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
        e.target.classList.add('active');
        state.activeFilter = e.target.dataset.filter;
        renderPrograms();
      });
    });

    // Student Tools Switcher (GPA vs Tuition)
    const btnTabGpa = document.getElementById('btn-tab-gpa');
    const btnTabTuition = document.getElementById('btn-tab-tuition');
    const panelGpa = document.getElementById('panel-gpa');
    const panelTuition = document.getElementById('panel-tuition');

    btnTabGpa.addEventListener('click', () => {
      btnTabGpa.classList.add('active');
      btnTabTuition.classList.remove('active');
      panelGpa.classList.add('active');
      panelTuition.classList.remove('active');
    });

    btnTabTuition.addEventListener('click', () => {
      btnTabTuition.classList.add('active');
      btnTabGpa.classList.remove('active');
      panelTuition.classList.add('active');
      panelGpa.classList.remove('active');
    });

    // GPA add course
    document.getElementById('add-course-btn').addEventListener('click', addCourseRow);

    // Tuition calculator inputs
    ['tuition-residency', 'tuition-degree', 'tuition-housing', 'tuition-gpa'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calculateTuition);
    });

    document.getElementById('tuition-apply-btn').addEventListener('click', () => {
      openApplyModal();
    });

    // Modals
    document.getElementById('open-apply-modal-btn').addEventListener('click', () => openApplyModal());
    document.getElementById('open-apply-cta-btn').addEventListener('click', () => openApplyModal());
    document.getElementById('close-apply-modal').addEventListener('click', closeApplyModal);

    document.getElementById('apply-modal').addEventListener('click', (e) => {
      if (e.target.id === 'apply-modal') closeApplyModal();
    });

    document.getElementById('apply-form').addEventListener('submit', (e) => {
      e.preventDefault();
      closeApplyModal();
      showToast('Application submitted! Check your email for confirmation 🎉');
    });

    // Inquiry Form
    document.getElementById('inquiry-form').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('inquiry-form').reset();
      showToast('Your inquiry has been delivered to admissions! 📬');
    });

    // Hero Virtual Tour
    document.getElementById('hero-tour-btn').addEventListener('click', () => {
      const el = document.getElementById('campus-life');
      el.scrollIntoView({ behavior: 'smooth' });
      showToast('Exploring the 250-acre Apex University campus 🏛️');
    });

    document.getElementById('book-consult-btn').addEventListener('click', () => {
      const el = document.getElementById('contact');
      el.scrollIntoView({ behavior: 'smooth' });
    });

    // Chatbot launcher & window
    const launcher = document.getElementById('chat-launcher');
    const chatWin = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close-btn');

    launcher.addEventListener('click', () => {
      chatWin.classList.toggle('hidden');
    });

    chatClose.addEventListener('click', () => {
      chatWin.classList.add('hidden');
    });

    // Quick replies in chat
    document.querySelectorAll('.quick-reply-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        handleBotQuery(BOT_RESPONSES[query] ? btn.textContent : query);
      });
    });

    document.getElementById('chat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const val = input.value.trim();
      if (!val) return;
      handleBotQuery(val);
      input.value = '';
    });
  }

  // ---------------------------------------------------------------------------
  // Initialize
  // ---------------------------------------------------------------------------
  function init() {
    applyTheme(state.theme);
    renderPrograms();
    renderCourseTable();
    calculateTuition();
    renderEvents();
    setupEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
