'use strict';

{
  document.addEventListener("DOMContentLoaded", function () {
    const loading = document.querySelector(".loading");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");
    const cover = document.querySelector(".cover");
    const coverVideo = document.querySelector(".cover-video");

    // ローディングバーの幅をテキストに合わせる
    const textWidth = loadingText.offsetWidth + "px";

    // PC判定（1100px以上）
    const isDesktop = window.innerWidth >= 1100;
    let animationStarted = false;

    // ローディングアニメーションを1回だけ実行する関数
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
            // 動画を再生（自動再生が失敗してもエラーを抑制）
            coverVideo.play().catch((e) => {
              console.warn("動画の自動再生に失敗しました:", e);
            });
          },
          // PCのみ：動画が見えるようになったら0.2秒遅らせて背景を消す
          // ＝遅延で描画ズレをカバー
          onComplete: function () {
            if (isDesktop) {
              setTimeout(() => {
                cover.style.backgroundImage = "none";
              }, 200);
            }
          }
        }, "-=0.5"); // 前のアニメーションと少し重ねて開始
    }

    // モバイルは即実行、PCは動画準備後に実行
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

        // 動画の読み込みが遅すぎる場合のバックアップ実行
        setTimeout(() => {
          if (!animationStarted) {
            console.warn("動画の読み込みが遅いため、アニメーションを強制実行します");
            runAnimation();
          }
        }, 5000);
      }
    }

    // ウィンドウサイズ変更で背景画像を再セット
    window.addEventListener("resize", function () {
      if (window.innerWidth < 1100) {
        cover.style.backgroundImage = "url('../images/cover.jpg')";
      } else {
        cover.style.backgroundImage = "url('../images/cover.jpg')";
      }
    });
  });
}
