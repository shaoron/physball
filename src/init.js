export function createChain (start, end, n, mass) {
  let points = []
  for (let i = 0; i < n; i++) {
    points.push({
      pos: [start[0] + (end[0] - start[0]) * i / (n - 1), start[1] + (end[1] - start[1]) * i / (n - 1)],
      vel: [0, 0],
      acc: [0, 0],
      mass: mass / n,
      moveable: true
    })
  }
  points[0].moveable = false
  points[n - 1].moveable = false
  points.unstretched = Math.hypot(start[0] - end[0], start[1] - end[1]) / n
  return points
}

export function createBall (pos, rad, mass) {
  return {
    pos,
    vel: [0, 0],
    acc: [0, 0],
    rad,
    mass,
    moveable: true
  }
}
