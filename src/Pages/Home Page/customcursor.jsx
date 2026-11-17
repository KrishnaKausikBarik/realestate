import { useEffect, useRef } from "react";
import "./customcursor.css";

const ENABLE_QUERY = "(min-width: 1025px) and (hover: hover) and (pointer: fine)";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const desktop = window.matchMedia(ENABLE_QUERY);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const activate = () => {
      if (!desktop.matches || reducedMotion.matches) return undefined;

      const root = document.documentElement;
      const magnets = new Set();
      let activeMagnet = null;
      let activeImage = null;
      let pointerX = -100;
      let pointerY = -100;
      let ringX = pointerX;
      let ringY = pointerY;
      let frame = 0;
      let pressTimer;

      root.classList.add("has-custom-cursor");

      const setCursorState = (target) => {
      const image = target.closest(".fp-media, .da-media");
      cursor.dataset.state = image ? "view" : "default";
      if (activeImage && activeImage !== image) activeImage.classList.remove("is-cursor-following");
      activeImage = image;
      if (image) {
        image.classList.add("is-cursor-following");
        const bounds = image.getBoundingClientRect();
        image.style.setProperty("--cursor-x", `${pointerX - bounds.left}px`);
        image.style.setProperty("--cursor-y", `${pointerY - bounds.top}px`);
      }
      };

      const updateMagnet = (target) => {
      const button = target.closest("[data-magnetic]");
      if (activeMagnet && activeMagnet.element !== button) {
        activeMagnet.targetX = 0;
        activeMagnet.targetY = 0;
        activeMagnet = null;
      }
      if (!button) return;

      if (!activeMagnet) {
        activeMagnet = { element: button, targetX: 0, targetY: 0, x: 0, y: 0 };
        magnets.add(activeMagnet);
      }

      const bounds = button.getBoundingClientRect();
      activeMagnet.targetX = ((pointerX - bounds.left - bounds.width / 2) / bounds.width) * 6;
      activeMagnet.targetY = ((pointerY - bounds.top - bounds.height / 2) / bounds.height) * 5;
      };

      const tick = () => {
      frame = 0;
      if (cursor.classList.contains("is-visible")) {
        ringX += (pointerX - ringX) * 0.18;
        ringY += (pointerY - ringY) * 0.18;
        if (Math.abs(pointerX - ringX) < 0.15) ringX = pointerX;
        if (Math.abs(pointerY - ringY) < 0.15) ringY = pointerY;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      for (const magnet of magnets) {
        magnet.x += (magnet.targetX - magnet.x) * 0.2;
        magnet.y += (magnet.targetY - magnet.y) * 0.2;
        if (Math.abs(magnet.targetX - magnet.x) < 0.08) magnet.x = magnet.targetX;
        if (Math.abs(magnet.targetY - magnet.y) < 0.08) magnet.y = magnet.targetY;
        magnet.element.style.translate = `${magnet.x}px ${magnet.y}px`;
        if (magnet.targetX === 0 && magnet.targetY === 0 && magnet.x === 0 && magnet.y === 0) {
          magnet.element.style.removeProperty("translate");
          magnets.delete(magnet);
        }
      }

      if (cursor.classList.contains("is-visible") || magnets.size) frame = requestAnimationFrame(tick);
      };

      const scheduleTick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
      };

      const handleMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      if (!cursor.classList.contains("is-visible")) {
        ringX = pointerX;
        ringY = pointerY;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      cursor.classList.add("is-visible");

      const target = event.target instanceof Element ? event.target : null;
      if (target) {
        setCursorState(target);
        updateMagnet(target);
      }
      scheduleTick();
      };

      const handleLeave = () => {
      cursor.classList.remove("is-visible");
      cursor.dataset.state = "default";
      if (activeImage) activeImage.classList.remove("is-cursor-following");
      activeImage = null;
      if (activeMagnet) {
        activeMagnet.targetX = 0;
        activeMagnet.targetY = 0;
        activeMagnet = null;
        scheduleTick();
      }
      };

      const handlePress = () => {
      cursor.classList.add("is-pressed");
      window.clearTimeout(pressTimer);
      pressTimer = window.setTimeout(() => cursor.classList.remove("is-pressed"), 180);
      };

      document.addEventListener("pointermove", handleMove, { passive: true });
      document.addEventListener("pointerdown", handlePress, { passive: true });
      document.addEventListener("mouseleave", handleLeave);
      window.addEventListener("blur", handleLeave);

      return () => {
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerdown", handlePress);
        document.removeEventListener("mouseleave", handleLeave);
        window.removeEventListener("blur", handleLeave);
        window.clearTimeout(pressTimer);
        if (frame) cancelAnimationFrame(frame);
        if (activeImage) activeImage.classList.remove("is-cursor-following");
        magnets.forEach(({ element }) => element.style.removeProperty("translate"));
        root.classList.remove("has-custom-cursor");
      };
    };

    let cleanup = activate();
    const syncActivation = () => {
      cleanup?.();
      cleanup = activate();
    };
    desktop.addEventListener("change", syncActivation);
    reducedMotion.addEventListener("change", syncActivation);

    return () => {
      desktop.removeEventListener("change", syncActivation);
      reducedMotion.removeEventListener("change", syncActivation);
      cleanup?.();
    };
  }, []);

  return (
    <div className="cc-cursor" ref={cursorRef} aria-hidden="true">
      <div className="cc-cursor-dot-track" ref={dotRef}>
        <span className="cc-cursor-dot" />
      </div>
      <div className="cc-cursor-ring-track" ref={ringRef}>
        <span className="cc-cursor-ring">
          <span className="cc-cursor-label" />
        </span>
      </div>
    </div>
  );
}
