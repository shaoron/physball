export function badCollision (chain, ball) {
  if ((ball.pos[1] + ball.rad + ball.vel[1] > chain[2].pos[1])) {
    let massSum = ball.mass + 2 * chain[1].mass
    let massDiff = ball.mass - 2 * chain[1].mass
    ball.vel[1] = (massDiff * ball.vel[1] + (2 * 2 * chain[1].mass * chain[1].vel[1])) / massSum
    chain[1].vel[1] = -(massDiff * chain[1].vel[1] + (2 * ball.mass * ball.vel[1])) / massSum
    chain[2].vel[1] = chain[1].vel[1]
  }
}
