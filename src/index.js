import * as PIXI from 'pixi.js'

//inital state
const GRAVITY = 0.05
const BOUNCE = 0.05
const BASE_LENGTH = 220
const MAX_X = 800
const MAX_Y = 600
const BALL_RADIUS = 20
const POINT_RADIUS = 5
const PRECISE = 5

let ball = {
  pos: [500, 300],
  vel: [0,0],
  acc: [0,0],
  mass: 20, 
  rad: BALL_RADIUS
}

let p1 = {
  pos: [200, 600],
  vel: [0,0],
  acc: [0,0],
  mass: 0
}

let p4 = {
  pos: [800,600],
  vel: [0,0],
  acc: [0,0],
  mass: 0
}

let p2 = {
  pos: [400, 600],
  vel: [0,0],
  acc: [0,0],
  mass: 10
}

let p3 = {
  pos: [600, 600],
  vel: [0,0],
  acc: [0,0],
  mass: 10
}

const points = [p1, p2, p3, p4]

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {antialias: true, backgroundColor : 0xFFFFFFf })
document.body.appendChild(app.view)

const gBall = new PIXI.Graphics()
const gLines = new PIXI.Graphics()

app.stage.addChild(gBall)
app.stage.addChild(gLines)

const gPoints = points.map(() =>{
  const p = new PIXI.Graphics()
  app.stage.addChild(p)
  return p
})
drawLines()
drawBall()
drawPoints()

let i = 0;
app.ticker.add(function(delta){
  drawLines()
  drawBall()
  drawPoints()
  acc()
  gravity(delta)
  bounce(delta)
  velocity(delta)
  //roundAll()
  badCollision()
  position(delta)
})
function acc() {
  [p2, p3, ball].forEach(p => { p.acc[0] = 0; p.acc[1] = 0})
}

function gravity(delta) {
  [p2, p3, ball].forEach(p => p.acc[1] += GRAVITY * delta) 
}

function bounce(delta) {
  for(let i = 0; i < 2; i++){
    p2.acc[i] += (distance(p1, p2) - BASE_LENGTH) * ((p1.pos[i] - p2.pos[i]) / distance(p1, p2)) / p2.mass * delta * BOUNCE
    p2.acc[i] += (distance(p2, p3) - BASE_LENGTH) * ((p3.pos[i] - p2.pos[i]) / distance(p2, p3)) / p2.mass * delta * BOUNCE
    p3.acc[i] += (distance(p2, p3) - BASE_LENGTH) * ((p2.pos[i] - p3.pos[i]) / distance(p2, p3)) / p3.mass * delta * BOUNCE
    p3.acc[i] += (distance(p3, p4) - BASE_LENGTH) * ((p4.pos[i] - p3.pos[i]) / distance(p3, p4)) / p3.mass * delta * BOUNCE
  } 
}

function velocity(delta) {
  [p2, p3, ball].forEach(p =>{
    for(let i = 0; i < 2; i++){
      p.vel[i] += p.acc[i] * delta 
    }
  })
}

function position(delta) {
  [p2, p3, ball].forEach(p => {
    for(let i = 0; i < 2; i++){
      p.pos[i] += p.vel[i] * delta 
    }
  })
}

function badCollision(){
  if((ball.pos[1] + ball.rad + ball.vel[1] > p2.pos[1])){
    let mass_sum = ball.mass + 2 * p2.mass
    let mass_dif = ball.mass - 2 * p2.mass  
    ball.vel[1] = (mass_dif * ball.vel[1] + (2 * 2 * p2.mass * p2.vel[1])) / mass_sum
    p2.vel[1] = - (mass_dif * p2.vel[1] + (2 * ball.mass * ball.vel[1])) / mass_sum
    p3.vel[1] = p2.vel[1]
  }
}

function drawBall() {
  gBall.clear()
  gBall.lineStyle(0)
  gBall.beginFill(0x000000, 1)
  gBall.drawCircle(...ball.pos, BALL_RADIUS)
  gBall.endFill()
}

function drawPoints() {
  for(let i = 0; i < points.length; i++){
  gPoints[i].clear()
  gPoints[i].lineStyle(0)
  gPoints[i].beginFill(0x000000, 1)
  gPoints[i].drawCircle(...points[i].pos, POINT_RADIUS)
  gPoints[i].endFill()
  }
}

function drawLines(){
  gLines.clear()
  gLines.lineStyle(1, 0x000000)
  gLines.moveTo(...points[0].pos)
  for(let i = 1; i < points.length; i++){
    gLines.lineTo(...points[i].pos)
  }
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.pos[0] - p2.pos[0], 2) + Math.pow(p1.pos[1] - p2.pos[1], 2))
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function roundAll(){
  [p2, p3, ball].forEach( p =>{
    for(let i = 0; i < 2; i++){
      p.acc[i] = round(p.acc[i], PRECISE)
      p.vel[i] = round(p.vel[i], PRECISE)
      p.pos[i] = round(p.pos[i], PRECISE)
    }
  })
}