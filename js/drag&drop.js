'use strict';
let gStartPos;

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
function addListeners() {
    addMouseListeners()
    addTouchListeners()
  
}


function isLineClicked(clickedPos) {
    const pos = gMeme.lines[gCurrLineIdx].pos
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.lines[gCurrLineIdx].size
}
function setLineDrag(isDrag) {
    gMeme.lines[gCurrLineIdx].isDrag = isDrag
}
function moveLine(dx, dy) {
    gMeme.lines[gCurrLineIdx].pos.x += dx
    gMeme.lines[gCurrLineIdx].pos.y += dy

}


function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    // console.log(isLineClicked(pos));
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    let meme = getMeme();
    const line = meme.lines[gCurrLineIdx]
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        onRenderTxt()
    }
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.img-area')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
