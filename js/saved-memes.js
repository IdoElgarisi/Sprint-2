'use strict';
let savedMemes = getSavedMemes();
console.log(savedMemes);
let savedCanvas;
let savedCtx;
// let gSavedCanvas

function getSavedMemes() {
    return gSavedMemes
}
function createSavedCanvas() {
    let container = document.querySelector('.memes-area')
    let strHtml;
    if (gSavedMemes.length === 0) {
        strHtml = '<div class="memes-msg"> <h2>No Saved Memes</h2></div>'
        container.classList.add('center')
    } else {
        container.classList.remove('center')
        container.classList.remove('space-between')
        strHtml = gSavedMemes.map(meme => {
            return `<canvas class="saved-memes-canvas" id="${meme.id}"  width="200" height="200"></canvas>`

        })
    }
    container.innerHTML = strHtml
    savedCanvas = document.querySelector(`.saved-memes-canvas`)
    savedCtx = savedCanvas.getContext('2d')
    renderSavedMemes()

}

function renderSavedMemes() {
    if (gSavedMemes.length === 0) return
    // let canvas = document.querySelector('.saved-memes-canvas')
    let savedMemes = gSavedMemes.map(meme => {
        let currImg = `img/${meme.selectedImgId}.jpg`
        drawSavedImg(currImg)
        meme.lines.map((meme) => {
            console.log(meme.idx);
            drawSavedText(meme, (meme.pos.x / 2), (meme.pos.y / 2))
        })
    })
}

function drawSavedImg(src) {
    var img = new Image()
    img.src = src;
    savedCtx.drawImage(img, 0, 0, savedCanvas.width, savedCanvas.height)
}


function drawSavedText(meme, x, y) {
    console.log(meme);
    savedCtx.font = `${meme.size / 2}px ${meme.font}`;
    savedCtx.lineWidth = 1
    savedCtx.textAlign = 'center'
    savedCtx.strokeStyle = meme.borderColor;
    savedCtx.fillStyle = meme.color
    savedCtx.font = `${meme.size / 2}px ${meme.font}`
    savedCtx.fillText(meme.txt, x, y)
    savedCtx.strokeText(meme.txt, x, y)
}
