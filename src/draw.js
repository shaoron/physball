import * as PIXI from 'pixi.js'

export const app = new PIXI.Application(window.innerWidth, window.innerHeight, { antialias: true, backgroundColor: 0xFFFFFFf })
document.body.appendChild(app.view)

const gBall = new PIXI.Graphics()
const gLines = new PIXI.Graphics()

app.stage.addChild(gBall)
app.stage.addChild(gLines)
let gPoints = []

export function initGraphics (points) {
  gPoints = points.map(() => {
    const p = new PIXI.Graphics()
    app.stage.addChild(p)
    return p
  })
}

export function drawBall (ball) {
  gBall.clear()
  gBall.lineStyle(0)
  gBall.beginFill(0x000000, 1)
  gBall.drawCircle(...ball.pos, ball.rad)
  gBall.endFill()
}

export function drawChain (points, radius) {
  gLines.clear()
  gLines.lineStyle(1, 0x000000)
  gLines.moveTo(...points[0].pos)
  for (let i = 0; i < points.length; i++) {
    gLines.lineTo(...points[i].pos)
    gPoints[i].clear()
    gPoints[i].lineStyle(0)
    gPoints[i].beginFill(0x000000, 1)
    gPoints[i].drawCircle(...points[i].pos, radius)
    gPoints[i].endFill()
  }
}
