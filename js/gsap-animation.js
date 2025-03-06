document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline();

  tl.to(".loading", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    onComplete: function () {
      document.querySelector(".loading").style.display = "none"; // ローディング画面を消す
    }
  })
  .to(".cover-overlay", {
    top: 0,
    duration: 1.5,
    ease: "power2.inOut"
  })
  .to(".cover-overlay", {
    opacity: 0,
    duration: 0.5,
    onComplete: function () {
      document.querySelector(".cover-overlay").style.display = "none"; // オーバーレイを消す
    }
  })
  .to(".cover-video", {
    opacity: 1,
    duration: 1.5,
    ease: "power2.inOut"
  });
});
