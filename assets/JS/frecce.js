const wrapper = document.getElementById('reviews-wrapper');
  const scrollLeft = document.querySelector('.scroll-arrow.left');
  const scrollRight = document.querySelector('.scroll-arrow.right');

  scrollLeft.addEventListener('click', () => {
    wrapper.scrollBy({ left: -340, behavior: 'smooth' });
  });

  scrollRight.addEventListener('click', () => {
    wrapper.scrollBy({ left: 340, behavior: 'smooth' });
  });