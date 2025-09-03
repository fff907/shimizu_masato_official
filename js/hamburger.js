'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('.nav__list a');

  // メニューを閉じる関数
  function closeMenu() {
    overlay.classList.remove('show');
    open.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // ハンバーガーメニューの開閉
  open.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('show');
    open.classList.toggle('is-active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // メニュー内リンクをクリックした時、メニューを閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ウィンドウサイズが1000pxを超えたらメニューを閉じる（レスポンシブ対応）
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
      closeMenu();
    }
  });
}
