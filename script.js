document.addEventListener('DOMContentLoaded', function () {
  console.log('🎨 Study-Web loaded.');

  const sketchCards = document.querySelectorAll('.sketch-card');
  
  sketchCards.forEach(card => {
    // Add a wobble effect on hover
    card.addEventListener('mouseenter', function() {
      const randomRotate = (Math.random() * 4 - 2).toFixed(1); 
      this.style.transform = `rotate(${randomRotate}deg) scale(1.05)`;
    });

    // Reset on leave
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });

    // For the disabled cards (Html, CSS, JS), show an alert
    card.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        alert('🚧 This course is still being sketched out! Check back later.');
      }
    });
  });
});
