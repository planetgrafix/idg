// set scroll top to 0 and disable scroll
// window.onload = function () {
//   window.scrollTo(0, 0);
//   window.onscroll = function () {
//     window.scrollTo(0, 0);
//   };
// };

(function ($) {
  $(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
      ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
      effects: true,
      preventDefault: true
    });

    smoother.paused(true);
    smoother.scrollTo(0);

    console.log("Loaded");

    function intro_animation() {
      function attachAnim(container, path) {
        return lottie.loadAnimation({
          container: container,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: path,
        });
      }

      let logo = attachAnim(
        $(".intro__logo-animation").get(0),
        "https://uploads-ssl.webflow.com/664ad071171089b183595842/668ef0ca68b9f69066047b65_IDG%20Logo%20Animation%20with%20Text%20Fable%2001.lottie.json"
      );

      let hero = attachAnim(
        $(".hero__animation").get(0),
        "https://uploads-ssl.webflow.com/664ad071171089b183595842/666f2c997d2ddcf0bbc1b437_IDG%20-%20is%20Forever.lottie.json"
      );

      hero.setSpeed(1.6);

      let tl = gsap.timeline();
      tl.call(() => {
        logo.play();
      })
        .to({}, { duration: 3 })
        .to(".intro__section", {
          duration: 1,
          autoAlpha: 0,
          ease: "power2.out",
        })

        .from(
          ".hero__image",
          {
            duration: 2,
            opacity: 0,
            y: -30,
            stagger: { each: 0.2 },
            ease: "power2.out",
          },
          "-=0.5"
        )

        .from(
          $(".hero__title").find(".char"),
          {
            opacity: 0,
            yPercent: 100,
            duration: 2.8,
            ease: "expo.out",
            stagger: { amount: 0.6 },
          },
          "<1"
        )

        .from(
          ".nav__logo",
          { duration: 1, opacity: 0, y: -30, ease: "power2.out" },
          "<0.5"
        )

        .from(
          ".nav__menu",
          { duration: 1, opacity: 0, y: -30, ease: "power2.out" },
          "<"
        )

        .call(
          () => {
            hero.play();
          },
          null,
          "<0.3"
        );

        // on complete
        tl.eventCallback("onComplete", function() {
          smoother.paused(false);
        });
    }

    intro_animation();
  });

  function split_type() {

    let typeSplit = new SplitText("[text-split]", { 
      type: "words, chars", 
      wordsClass: "word",
      charsClass: "char"
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 85%",
        markers: false,
        onEnter: () => {
          timeline.play();
        },
      });
    }

    // $("[words-slide-up]").each(function (index) {
    //   let tl = gsap.timeline({ paused: true });
    //   tl.from($(this).find(".word"), {
    //     opacity: 0,
    //     yPercent: 100,
    //     duration: 1.2,
    //     ease: "expo.out",
    //     stagger: { amount: 0.6 },
    //   });
    //   createScrollTrigger($(this), tl);
    // });

    $("[letters-slide-up]").each(function (index, element) {
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

  split_type();
})(jQuery);


