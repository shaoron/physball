import { app, initGraphics, drawBall, drawChain } from './draw'
import { createChain, createBall } from './init'
import { resetAcc, gravity, bounce, velocity, position, damping } from './forces'
import { badCollision } from './collision'

const GRAVITY = 0.05
const BOUNCE = 0.03
const DAMPING_RATIO = 0.0001

const BALL_RADIUS = 20
const POINT_RADIUS = 5

const CHAIN_START = [200, 500]
const CHAIN_END = [800, 500]
const CHAIN_MASS = 25
const CHAIN_POINTS = 4

const BALL_MASS = 10
const BALL_START = [500, 150]

const chain = createChain(CHAIN_START, CHAIN_END, CHAIN_POINTS, CHAIN_MASS)
const ball = createBall(BALL_START, BALL_RADIUS, BALL_MASS)
const points = [...chain, ball]

initGraphics(chain)
app.ticker.add(function (delta) {
  drawBall(ball)
  drawChain(chain, POINT_RADIUS)
  resetAcc(points)
  gravity(points, GRAVITY)
  bounce(chain, BOUNCE)
  damping(chain, DAMPING_RATIO)
  velocity(points, delta)
  badCollision(chain, ball)
  position(points, delta)
})
