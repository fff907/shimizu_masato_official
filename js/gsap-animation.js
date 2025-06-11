document.addEventListener("DOMContentLoaded", function () {
  const loading = document.querySelector(".loading");
  const loadingBar = document.querySelector(".loading-bar");
  const loadingText = document.querySelector(".loading-text");
  const cover = document.querySelector(".cover");
  const coverVideo = document.querySelector(".cover-video");

  const textWidth = loadingText.offsetWidth + "px";
  const isDesktop = window.innerWidth >= 1100;
  let animationStarted = false;

  function runAnimation() {
    if (animationStarted) return; // 二重実行防止
    animationStarted = true;

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
        onStart: function () {
          // 明示的に再生を試みる（mutedなので通常は許可される）
          coverVideo.play().catch((e) => {
            console.warn("動画の自動再生に失敗しました:", e);
          });
        },
        onComplete: function () {
          if (isDesktop) {
            cover.style.backgroundImage = "none";
          }
        }
      }, "-=0.5");
  }

  if (!isDesktop) {
    cover.style.backgroundImage = "url('../images/cover_bg.png')";
    runAnimation(); // スマホは即実行
  } else {
    cover.style.backgroundImage = "none";

    // 動画の読み込み指示
    coverVideo.load();

    // すでに読み込まれていれば即実行
    if (coverVideo.readyState >= 3) {
      runAnimation();
    } else {
      coverVideo.addEventListener("canplaythrough", function handler() {
        coverVideo.removeEventListener("canplaythrough", handler);
        runAnimation();
      });

      // 5秒経っても読み込まれなければ強制実行
      setTimeout(() => {
        if (!animationStarted) {
          console.warn("動画の読み込みが遅いため、アニメーションを強制実行します");
          runAnimation();
        }
      }, 5000);
    }
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
