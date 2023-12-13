function mouseFollower() {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px`;
  });
}
mouseFollower();

function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".loco-main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".loco-main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".loco-main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".loco-main").style.transform
      ? "transform"
      : "fixed",
  });
}
scroll();

function anim() {
  let tl = gsap.timeline();

  tl.from("#navbar a,#navbar h4 ", {
    y: -100,
    opacity: 0,
    duration: 0.5,
  });

  tl.from(".main-text-1, .main-text-2", {
    x: -100,
    duration: 1,
    stagger: 0.4,
    opacity: 0,
  });
  tl.from(".small-text", {
    y: 100,
    duration: 0.5,
    opacity: 0,
  });

  tl.from("#text-side", {
    x: 100,
    duration: 0.4,
    opacity: 0,
  });

  tl.from("#hero-footer", {
    y: 100,
    duration: 0.5,
    opacity: 0,
  });
}
anim();

let playBox = document.querySelectorAll(".page-2-text");
let img = document.querySelectorAll(".imgs");

playBox.forEach(function (val) {
  val.addEventListener("mouseenter", function () {
    val.childNodes[1].style.opacity = 100;
  });
  val.addEventListener("mouseleave", function () {
    val.childNodes[1].style.opacity = 0;
  });
  val.addEventListener("mousemove", function (dets) {
    val.childNodes[1].style.left = dets.x + "px";
  });
});
