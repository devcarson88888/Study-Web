// StudyHub — home page interactions

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. Task checklist + live progress =====
  const taskChecks = document.querySelectorAll('.task-check');
  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');

  function updateProgress() {
    const total = taskChecks.length;
    const done = [...taskChecks].filter(c => c.checked).length;
    const pct = total ? (done / total) * 100 : 0;

    if (progressFill) progressFill.style.width = pct + '%';
    if (progressLabel) progressLabel.textContent = `${done} of ${total} completed`;
  }

  taskChecks.forEach(cb => cb.addEventListener('change', updateProgress));
  updateProgress(); // initial sync (1 of 4 = 25%)

  // ===== 2. Animated stat counters =====
  const statValues = document.querySelectorAll('.stat-value');

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 900;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = isDecimal
        ? current.toFixed(1)
        : Math.round(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target;
        // add unit suffix for percentage card
        if (el.closest('.stat-card').textContent.includes('Completion')) {
          el.textContent = target + '%';
        }
      }
    }

    requestAnimationFrame(step);
  }

  // Use IntersectionObserver so it runs when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statValues.forEach(el => observer.observe(el));

  // Fix: percentage suffix after animation (for the completion card)
  // We handle it inside animateCounter by checking label text.

  // ===== 3. Header buttons (demo) =====
  const startBtn = document.getElementById('startBtn');
  const newSessionBtn = document.getElementById('newSessionBtn');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting…';
      setTimeout(() => {
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start studying';
      }, 1200);
    });
  }

  if (newSessionBtn) {
    newSessionBtn.addEventListener('click', () => {
      newSessionBtn.innerHTML = '<i class="fas fa-check"></i> Session added';
      setTimeout(() => {
        newSessionBtn.innerHTML = '<i class="fas fa-plus"></i> New session';
      }, 1400);
    });
  }

  // ===== 4. Sidebar active highlight (visual only) =====
  const sideLinks = document.querySelectorAll('.sidebar-section ul li a');
  sideLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      sideLinks.forEach(l => l.style.background = '');
      link.style.background = '#3a3d4a';
      link.style.borderLeftColor = '#04aa6d';
    });
  });

});
