(function ($) {
  $(document).ready(function () {
    console.log("Loaded 1");

    /* =========== SPLIT TYPE ========== */

  function split_type() {

    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span",
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
        },
      });
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%",
        onEnter: () => timeline.play(),
      });
    }

    $("[words-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".word"), {
        opacity: 0,
        yPercent: 100,
        duration: 1.2,
        ease: "expo.out",
        stagger: { amount: 0.6 },
      });
      createScrollTrigger($(this), tl);
    });

    $("[letters-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: { amount: 0.6 },
      });
      createScrollTrigger($(this), tl);
    });

    $("[letters-fade-in]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
        stagger: { amount: 0.8 },
      });
      createScrollTrigger($(this), tl);
    });

    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });

  }

  

  function intro_animation() {

    function attachAnim(container, path) {
      return lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: path
      });
    }

    let logo = attachAnim(
      $('.intro__logo-animation').get(0), 
      'https://uploads-ssl.webflow.com/664ad071171089b183595842/668ef0ca68b9f69066047b65_IDG%20Logo%20Animation%20with%20Text%20Fable%2001.lottie.json'
    );

    logo.play();

    hero = attachAnim($('.hero__animation').get(0),
      'https://uploads-ssl.webflow.com/664ad071171089b183595842/666f2c997d2ddcf0bbc1b437_IDG%20-%20is%20Forever.lottie.json');
   

    logo.addEventListener('complete', function() {
      console.log('animation complete');
      $('.intro__section').addClass('animation-complete');
      split_type();
      hero.play();
    });

  }

  intro_animation();



  });
})(jQuery);

/* =========== LENIS SMOOTH SCROL ========== */

let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
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
