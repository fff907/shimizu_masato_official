window.addEventListener("load", function () {
  const loading = document.querySelector(".loading");
  const loadingBar = document.querySelector(".loading-bar");
  const loadingText = document.querySelector(".loading-text");
  const cover = document.querySelector(".cover");
  const coverVideo = document.querySelector(".cover-video");

  if (window.innerWidth >= 1100) {
    cover.style.backgroundImage = "none";
  } else {
    cover.style.backgroundImage = "url('../images/cover_bg.png')";
  }

  const textWidth = loadingText.offsetWidth + "px";

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
      if (window.innerWidth >= 1100) {
        cover.style.backgroundImage = "none";
      }
    }
  }, "-=0.5");

  window.addEventListener("resize", function () {
    if (window.innerWidth < 1100) {
      cover.style.backgroundImage = "url('../images/cover_bg.png')";
    } else {
      cover.style.backgroundImage = "none";
    }
  });
});
