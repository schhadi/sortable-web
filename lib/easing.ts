// Ported from the design project's animations-v3.jsx easing set, so the web
// build's choreography matches the timings the animation was authored against.

export const Easing = {
  linear: (t: number) => t,
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

export type Ease = (t: number) => number;

export const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/**
 * Piecewise interpolation over [time, value] points — the `MOTION.seg` helper
 * from the source scene, kept verbatim in behaviour.
 */
export function seg(
  T: number,
  pts: Array<[number, number]>,
  ease: Ease = Easing.easeInOutSine,
): number {
  if (T <= pts[0][0]) return pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, v0] = pts[i];
    const [t1, v1] = pts[i + 1];
    if (T <= t1) return v0 + (v1 - v0) * ease(clamp((T - t0) / (t1 - t0), 0, 1));
  }
  return pts[pts.length - 1][1];
}

/** Characters revealed by authored time T, at `cps` characters per second. */
export const typed = (T: number, start: number, text: string, cps = 14) =>
  text.slice(0, Math.max(0, Math.floor((T - start) * cps)));
