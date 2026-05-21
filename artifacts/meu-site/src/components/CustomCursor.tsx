import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;
    let visible = false;

    const show = () => {
      if (!visible) {
        visible = true;
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
    };
    const hide = () => {
      visible = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role=button], input, textarea, select, label")) {
        ringRef.current?.classList.add("cursor-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role=button], input, textarea, select, label")) {
        ringRef.current?.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    document.body.style.cursor = "none";
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="nexus-cursor-ring" style={{ opacity: 0 }} aria-hidden />
      <div ref={dotRef} className="nexus-cursor-dot" style={{ opacity: 0 }} aria-hidden />
    </>
  );
}
