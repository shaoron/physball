export function distance (p1, p2) {
  return Math.hypot(p1.pos[0] - p2.pos[0], p1.pos[1] - p2.pos[1])
}
