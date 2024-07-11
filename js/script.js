(function ($) {

  $(document).ready(function () {

    console.log("Loaded 1");

  /* =========== LENIS SMOOTH SCROL ========== */

  let lenis;
  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  /* =========== SPLIT TYPE ========== */

  
    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span"
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%",
        onEnter: () => timeline.play()
      });
    }

    $("[words-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 1.2, ease: "expo.out", stagger: { amount: 0.6 } });
      createScrollTrigger($(this), tl);
    });

    $("[letters-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), {opacity: 0, yPercent: 100, duration: 1.8, ease: "expo.out", stagger: { amount: 0.6 } });
      createScrollTrigger($(this), tl);
    });

    $("[letters-fade-in]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
      createScrollTrigger($(this), tl);
    });

    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });
  

});

})(jQuery);