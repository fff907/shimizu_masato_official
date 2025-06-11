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
    if (animationStarted) return;
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
          coverVideo.play().catch((e) => {
            console.warn("動画の自動再生に失敗しました:", e);
          });
        },
        // opacityが1になった後、0.2秒遅らせて背景を消す
        onComplete: function () {
          if (isDesktop) {
            setTimeout(() => {
              cover.style.backgroundImage = "none";
            }, 200); // 遅延で描画ズレをカバー
          }
        }
      }, "-=0.5");
  }

  if (!isDesktop) {
    cover.style.backgroundImage = "url('../images/cover.jpg')";
    runAnimation();
  } else {
    cover.style.backgroundImage = "url('../images/cover.jpg')";
    coverVideo.load();

    if (coverVideo.readyState >= 3) {
      runAnimation();
    } else {
      coverVideo.addEventListener("canplaythrough", function handler() {
        coverVideo.removeEventListener("canplaythrough", handler);
        runAnimation();
      });

      setTimeout(() => {
        if (!animationStarted) {
          console.warn("動画の読み込みが遅いため、アニメーションを強制実行します");
          runAnimation();
        }
      }, 5000);
    }
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth < 1100) {
      cover.style.backgroundImage = "url('../images/cover.jpg')";
    } else {
      cover.style.backgroundImage = "url('../images/cover.jpg')";
    }
  });
});
