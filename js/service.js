'use strict';

// var gKeywords = {'happy': 12,'funny puk': 1}
const KEY = 'memesDB';
let gCurrImg;
let gCurrLineIdx = 0;
let gLineCount = 1;
let gCurrBgcColor = 'white'
let gCurrBorderColor = 'black'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'eat falafel',
            size: 40,
            align: 'center',
            color: gCurrBgcColor,
            borderColor: gCurrBorderColor,
            idx: gCurrLineIdx,
            x: 250,
            y: 50
        }
    ]
}
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy'] }
];
function getMemes() {
    return gImgs
}

function setFillColor(color) {
    gCurrBgcColor = color;
    gMeme.lines[gCurrLineIdx].color = color;
}
function setborderColor(color) {
    gCurrBorderColor = color;
    gMeme.lines[gCurrLineIdx].borderColor = color;
}

function resetGMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: ' ',
                size: 40,
                align: 'center',
                color: gCurrBgcColor,
                borderColor: gCurrBorderColor,
                idx: 0,
                x: 250,
                y: 50
            }
        ]
    }
}

function getImgById(imgId) {
    let img = gImgs.find(function (img) {
        return +imgId === img.id
    })
    return img
}

function drawImg(src) {
    var img = new Image()
    img.src = src;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(meme, x, y, idx) {

    document.querySelector('.text-line').value = meme.lines[idx].txt
    gCtx.font = `${meme.lines[idx].size}px impact`;
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
    gCtx.strokeStyle = meme.lines[idx].borderColor;
    gCtx.fillStyle = meme.lines[idx].color
    gCtx.font = `${meme.lines[idx].size}px impact`
    gCtx.fillText(meme.lines[idx].txt, x, y)
    gCtx.strokeText(meme.lines[idx].txt, x, y)
}

function renderTxt(txt) {
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    drawImg(gCurrImg.url);
    if (!gMeme.lines.length) return
    gMeme.lines[gCurrLineIdx].txt = txt;
    gMeme.lines.map((meme) => {
        drawText(gMeme, meme.x, meme.y, meme.idx)
    })
}

function addLine() {
    gCurrLineIdx++
    gLineCount++
    let newLine = {
        txt: ' ',
        size: 40,
        align: 'center',
        color: gCurrBgcColor,
        borderColor: gCurrBorderColor,
        idx: gCurrLineIdx,
        x: gCanvas.width / 2,
        y: gCanvas.height / 2
    }
    if (gLineCount === 2) {
        newLine.y = (gCanvas.height - 30);
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gCurrLineIdx;

}
function deleteLine() {
    gMeme.lines.splice(gCurrLineIdx, 1)
    gLineCount--
    gCurrLineIdx--
    if (gCurrLineIdx < 0) {
        resetGMeme()
        gCurrLineIdx = 0
        gLineCount = 1
        gMeme.selectedLineIdx = gCurrLineIdx;
    }
    gMeme.selectedLineIdx = gCurrLineIdx;
    onRenderTxt()
}
function lineMove(dir) {
    switch (dir) {
        case 'up':
            gMeme.lines[gCurrLineIdx].y += -20
            break;
        case 'down':
            gMeme.lines[gCurrLineIdx].y += 20
            break;

    }
    onRenderTxt();
}
function alignText(alignClass) {
    gMeme.lines[gCurrLineIdx].align = alignClass;
    console.log(alignClass);
    switch (alignClass.value) {
        case 'align-left':
            gMeme.lines[gCurrLineIdx].align = "start";
            gMeme.lines[gCurrLineIdx].x = 100;

            break;
        case 'align-center':
            gMeme.lines[gCurrLineIdx].align = "center";
            gMeme.lines[gCurrLineIdx].x = gCanvas.width / 2;
            break;
        case 'align-right':
            gMeme.lines[gCurrLineIdx].align = "end";
            gMeme.lines[gCurrLineIdx].x = gCanvas.width - 150
    }
    onRenderTxt()
}

function moveIdx() {
    gCurrLineIdx++
    if (gCurrLineIdx === gMeme.lines.length - 1) {
        gCurrLineIdx--
    } else if (gCurrLineIdx < 0) { gCurrLineIdx = 0 }
    document.querySelector('.text-line').value = gMeme.lines[gCurrLineIdx].txt
    document.querySelector('.text-line').focus()
    gMeme.selectedLineIdx = gCurrLineIdx;
}