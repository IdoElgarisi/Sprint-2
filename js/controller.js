'use strict';
let gCanvas;
let gCtx;

function onInit() {

    renderGallery()
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    gLineCount = 1;
    gCurrLineIdx = 0

}
function renderGallery() {
    let memes = getMemes();
    var imgHtmls = memes.map((meme) => {
        return `<div class="grid-item item-${meme.id}"> <img id="${meme.id}" onclick="onShowEditor(this)" src="${meme.url}" alt=""></div>`
    })

    document.querySelector('.grid-container').innerHTML = imgHtmls

}

function onShowEditor({ id }) {
    gCurrLineIdx = 0;
    resetGMeme()
    gMeme.selectedImgId = id;
    gCurrImg = getImgById(id);
    drawImg(gCurrImg.url)
    drawText(gMeme, 150, 50, gCurrLineIdx)
    document.querySelector('.editor-container').hidden = false;
    document.querySelector('.gallery-container').hidden = true;
    document.querySelector('.memes-container').hidden = true;
}

function onShowGallery() {
    document.querySelector('.gallery-container').hidden = false;
    document.querySelector('.editor-container').hidden = true;
    document.querySelector('.memes-container').hidden = true;
}
function onShowMemes() {
    document.querySelector('.memes-container').hidden = false;
    document.querySelector('.gallery-container').hidden = true;
    document.querySelector('.editor-container').hidden = true;
}


function onRenderTxt() {
    let txt = document.querySelector('.text-line').value
    renderTxt(txt)

}
function onAddLine() {
    addLine()
    document.querySelector('.text-line').value = ' '
    onRenderTxt()
    document.querySelector('.text-line').focus()
}
function onDeleteLine() {
    deleteLine()
    document.querySelector('.text-line').value = ' '

}
function onMoveLine(t) {
    let direction = (t.classList.contains('up')) ? 'up' : 'down';
    console.log(direction);
    lineMove(direction)
}
function onMoveIdx() {
    moveIdx()


}
function onFontSizeChange(fontClass) {
    if (fontClass.contains('font-size-up')) {
        gMeme.lines[gCurrLineIdx].size += 10;
    } else if (fontClass.contains('font-size-down')) {
        gMeme.lines[gCurrLineIdx].size -= 10;
    }
    onRenderTxt()
}

function onAlignText(alignClass) {
    console.log('hiii');
    alignText(alignClass)
}

function onGetColor() {
    var color = document.querySelector('[name="color-selector"]').value;
    setFillColor(color)
    onRenderTxt()
}

function onGetBorderColor() {
    var color = document.querySelector('[name="color-selector"]').value;
    setborderColor(color)
    onRenderTxt()
}
function onOpenColorBox(){
    document.querySelector('.color-popup ibox').classList.toggle('.open-box')
}