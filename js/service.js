'use strict';

// var gKeywords = {'happy': 12,'funny puk': 1}
const KEY = 'memesDB';
let gCurrImg;
let gCurrLineIdx = 0;
let gCurrBgcColor = 'white'
let  gCurrBorderColor ='black'

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

function setFillColor(color){
    gCurrBgcColor = color;
    gMeme.lines[gCurrLineIdx].color = color;
}
function setborderColor(color){
    gCurrBorderColor = color;
    gMeme.lines[gCurrLineIdx].borderColor = color;
}
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'eat falafel',
            size: 40,
            align: 'left',
            color: gCurrBgcColor,
            borderColor:gCurrBorderColor,
            idx: gCurrLineIdx,
            x: 150,
            y: 100
        }
    ]
}
function resetGMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: ' ',
                size: 40,
                align: 'left',
                color: gCurrBgcColor,
                borderColor: gCurrBorderColor,
                idx: 0,
                x: 150,
                y: 100
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
        drawText(gMeme, meme.x, (meme.idx + 1) * meme.y, meme.idx)
    })
}

function addLine() {
    let newLine = {
        txt: ' ',
        size: 40,
        align: 'left',
        color: gCurrBgcColor,
        borderColor:gCurrBorderColor,
        idx: gCurrLineIdx + 1,
        x: 150,
        y: 100
    }
    gCurrLineIdx++
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gCurrLineIdx;
    document.querySelector('.text-line').value = ' '
}
function deleteLine() {
    console.log(gCurrLineIdx);
    gMeme.lines.splice(gCurrLineIdx, 1)
    console.log(gMeme.lines);
    gCurrLineIdx--
    if (gCurrLineIdx < 0) {
        resetGMeme()
        gCurrLineIdx = 0
        gMeme.selectedLineIdx = gCurrLineIdx;
    }
    gMeme.selectedLineIdx = gCurrLineIdx;
    onRenderTxt()
}
