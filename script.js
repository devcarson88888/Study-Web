// Study-Web Python tutorial interactions
// This script adds subtle enhancements to the static tutorial page.

document.addEventListener('DOMContentLoaded', function() {
  // 1. Highlight the active sidebar link based on the current hash or default to Python HOME
  const sidebarLinks = document.querySelectorAll('.sidebar li a');
  const currentPath = window.location.hash || '#python-home';

  // Remove active class from all, then set based on hash (simple demo)
  function setActiveSidebarLink() {
    sidebarLinks.forEach(link => link.classList.remove('active'));
    // For demo, we keep the first link active (Python HOME) if no hash matches
    let activeSet = false;
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      // If href is '#', we treat it as a demo link and only activate if it's the first one
      if (href === '#python-home' || (href === '#' && link.textContent.includes('Python HOME'))) {
        // skip, we handle below
      }
    });
    // Simple: always keep Python HOME active as this is a static demo
    // But if you want hash-based, we can check:
    if (window.location.hash) {
      sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === window.location.hash) {
          link.classList.add('active');
          activeSet = true;
        }
      });
    }
    if (!activeSet) {
      // Default: first link (Python HOME)
      sidebarLinks[0].classList.add('active');
    }
  }

  setActiveSidebarLink();

  // 2. Add click handlers for sidebar links (demo: prevent page jump and simulate navigation)
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // For demo, we prevent default only for links with href="#" to avoid scrolling to top
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        // Update active state
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        // Optional: scroll to top of content smoothly
        document.querySelector('.content').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (href.startsWith('#')) {
        // Allow default for anchors, but also update active
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // 3. "Try it Yourself" buttons - demo alert (since no real code editor)
  const tryItButtons = document.querySelectorAll('.tryit-btn');
  tryItButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Find the closest code block to show a message
      const parent = this.closest('.content') || document;
      // Get the code snippet text from previous pre if possible
      let codeSnippet = 'print("Hello, World!")';
      const preElement = this.previousElementSibling;
      if (preElement && preElement.tagName === 'PRE') {
        const codeElement = preElement.querySelector('code');
        if (codeElement) {
          codeSnippet = codeElement.innerText;
        }
      } else {
        // Look for a pre inside the same section (simplified)
        const sectionParent = this.parentElement;
        const pre = sectionParent.querySelector('pre code');
        if (pre) codeSnippet = pre.innerText;
      }
      // Show an alert with the code snippet (like a "try it" preview)
      alert(`📝 Try it Yourself (demo)\n\nThis would open a code editor with:\n\n${codeSnippet.trim()}\n\n(In a real W3Schools-like site, this would launch an interactive editor.)`);
    });
  });

  // 4. Add a subtle hover effect on header nav links (already in CSS, but we can add active state)
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        navLinks.forEach(l => l.style.borderBottomColor = 'transparent');
        this.style.borderBottomColor = '#ffb800';
        this.style.color = '#ffb800';
        // Reset others
        navLinks.forEach(l => {
          if (l !== this) {
            l.style.color = 'white';
            l.style.borderBottomColor = 'transparent';
          }
        });
      }
    });
  });

  // 5. Log a friendly message
  console.log('Study-Web Python tutorial loaded. Ready to learn! 🐍');
});
