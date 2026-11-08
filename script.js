// Study-Web shared scripts
document.addEventListener('DOMContentLoaded', function () {
  // Highlight the nav link for the current section
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.includes(href.replace('./', '').split('/')[0]) && href !== '#') {
      link.style.color = '#ffb800';
      link.style.borderBottomColor = '#ffb800';
    }
  });

  console.log('Study-Web loaded. 📚');
});
