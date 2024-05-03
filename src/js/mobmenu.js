const openMobMenuBtn = document.querySelector('.mob-menu-btn');
const mobMenu = document.querySelector('.mobile-menu');
const closeMobMenuBtn = document.querySelector('.mobile-menu-close-btn');

openMobMenuBtn.addEventListener('click', openMobMenu);
closeMobMenuBtn.addEventListener('click', openMobMenu);

function openMobMenu() {
  if (event.target.matches('.mob-menu-btn')) {
    mobMenu.classList.toggle('is-open');
  } else if 
}
