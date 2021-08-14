'use strict';
let gCanvas;
let gCtx;

function onInit() {
    init()
    renderGallery()
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')

    document.querySelector('.gallery-container').hidden = false;
    document.querySelector('.editor-container').hidden = true;
    document.querySelector('.memes-container').hidden = true;

}
function renderGallery() {
    let memes = getMemes();
    var imgHtmls = memes.map((meme) => {
        return `<div class="grid-item item-${meme.id}"> <img id="${meme.id}" onclick="onShowEditor(this)" src="${meme.url}" alt=""></div>`
    })

    document.querySelector('.grid-container').innerHTML = imgHtmls.join('')

}

function onShowEditor({ id }) {
    gCurrLineIdx = 0;
    resetGMeme()
    gMeme.selectedImgId = id;
    gCurrImg = getImgById(id);
    drawImg(gCurrImg.url)
    drawText(gMeme, 150, 50, gCurrLineIdx)
    document.body.classList.remove('menu-open')
    document.querySelector('.editor-container').hidden = false;
    document.querySelector('.gallery-container').hidden = true;
    document.querySelector('.memes-container').hidden = true;
}

function onShowGallery() {
    document.body.classList.remove('menu-open')
    document.querySelector('.gallery-container').hidden = false;
    document.querySelector('.editor-container').hidden = true;
    document.querySelector('.memes-container').hidden = true;
}
function onShowMemes() {
    document.body.classList.remove('menu-open')
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
    let direction = (t.classList.contains('up-btn')) ? 'up' : 'down';
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
    alignText(alignClass)
}

function onGetColor() {
    var color = document.querySelector('[name="color-selector"]').value;
    setFillColor(color)
    onRenderTxt()
    closeModal()
}

function onGetBorderColor() {
    var color = document.querySelector('[name="color-selector"]').value;
    setborderColor(color)
    onRenderTxt()
}
function onOpenColorBox() {
    document.querySelector('.color-popup ibox').classList.toggle('.open-box')
}

// function onSaveMeme(){

// }
function onFontChange(font) {
    console.log(font);
    setNewFont(font);
    onRenderTxt()
}

function onOpenColorBox() {
    let modal = document.querySelector('.color-popup')
    modal.style.display = 'block'
    let btn =document.querySelector('.color-btn')
    btn.style.display='none'
}

function closeModal() {
    let modal = document.querySelector('.color-popup')
    modal.style.display = 'none'
    let btn =document.querySelector('.color-btn')
    btn.style.display='block'
    
}


function onSelectColor(t) {
    setFillColor(t.dataset.color)
    onRenderTxt()
    closeModal()
}
function onSelectStrokeColor(t){
    setborderColor(t.dataset.color)
    onRenderTxt()
    closeModal()
}