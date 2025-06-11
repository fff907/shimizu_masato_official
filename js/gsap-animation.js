document.addEventListener("DOMContentLoaded", function () {
  const loading = document.querySelector(".loading");
  const loadingBar = document.querySelector(".loading-bar");
  const loadingText = document.querySelector(".loading-text");
  const cover = document.querySelector(".cover");
  const coverVideo = document.querySelector(".cover-video");

  const textWidth = loadingText.offsetWidth + "px";

  // SPサイズではvideo非表示のため処理を分岐
  const isDesktop = window.innerWidth >= 1100;

  if (!isDesktop) {
    cover.style.backgroundImage = "url('../images/cover_bg.png')";
    runAnimation(); // スマホではすぐにアニメーション実行
  } else {
    cover.style.backgroundImage = "none";

    // PC時は動画の読み込みを待ってからアニメーション
    if (coverVideo.readyState >= 3) {
      // すでに読み込まれている場合
      runAnimation();
    } else {
      coverVideo.addEventListener("canplaythrough", function handler() {
        coverVideo.removeEventListener("canplaythrough", handler);
        runAnimation();
      });
    }
  }

  function runAnimation() {
    const tl = gsap.timeline();

    tl.to(loadingBar, {
      width: textWidth,
      duration: 1,
      ease: "power2.inOut"
    })

      .to(loading, {
        opacity: 1,
        duration: 0.5
      })

      .to(loading, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.5,
        onComplete: function () {
          loading.style.display = "none";
        }
      })

      .to(coverVideo, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onComplete: function () {
          if (isDesktop) {
            cover.style.backgroundImage = "none";
          }
        }
      }, "-=0.5");
  }

  // ウィンドウリサイズで背景画像の切替
  window.addEventListener("resize", function () {
    if (window.innerWidth < 1100) {
      cover.style.backgroundImage = "url('../images/cover_bg.png')";
    } else {
      cover.style.backgroundImage = "none";
    }
  });
});
