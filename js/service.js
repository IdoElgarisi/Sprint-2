'use strict';

var gKeywords = [
    {
        key: 'happy',
        value: 20
    },

    {
        key: 'funny',
        value: 10
    },

    {
        key: 'pets',
        value: 22
    },

    {
        key: 'baby',
        value: 25
    },

    {
        key: 'angry',
        value: 15
    },

    {
        key: 'laugh',
        value: 12
    },

]
const KEY = 'memesDB';
let gCurrImg;
let gCurrLineIdx = 0;
let gCurrKeyIdx;
let gLineCount = 1;
let gCurrBgcColor = 'white'
let gCurrBorderColor = 'black'
let gCurrFont = 'impact'
let gSavedMemes = [];
let gFilterBy;
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
            font: gCurrFont,
            idx: gCurrLineIdx,
            x: 250,
            y: 50
        }
    ]
}
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['all', 'usa', 'trump', 'angry'] },
    { id: 2, url: 'img/2.jpg', keywords: ['all', 'happy', 'dogs', 'pets', 'pretty'] },
    { id: 3, url: 'img/3.jpg', keywords: ['all', 'sleepy', 'baby', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['all', 'sleepy', 'cat', 'pets'] },
    { id: 5, url: 'img/5.jpg', keywords: ['all', 'funny', 'baby', 'sucess'] },
    { id: 6, url: 'img/6.jpg', keywords: ['all', 'funny', 'history', 'hair'] },
    { id: 7, url: 'img/7.jpg', keywords: ['all', 'happy', 'baby', 'cute', 'laugh'] },
    { id: 8, url: 'img/8.jpg', keywords: ['all', 'happy', 'wonka', 'laugh'] },
    { id: 9, url: 'img/9.jpg', keywords: ['all', 'happy', 'baby', 'laugh'] },
    { id: 10, url: 'img/10.jpg', keywords: ['all', 'happy', 'usa', 'laugh', 'obama'] },
    { id: 11, url: 'img/11.jpg', keywords: ['all', 'angry', 'kiss', 'paul pierce', 'matta'] },
    { id: 12, url: 'img/12.jpg', keywords: ['all', 'happy', 'haim', 'wonder'] },
    { id: 13, url: 'img/13.jpg', keywords: ['all', 'happy', 'gatsby', 'drink', 'cheers'] },
    { id: 14, url: 'img/14.jpg', keywords: ['all', 'glasses', 'matrix'] },
    { id: 15, url: 'img/15.jpg', keywords: ['all', 'happy', 'game of thrones'] },
    { id: 16, url: 'img/16.jpg', keywords: ['all', 'happy', 'star trek', 'laugh'] },
    { id: 17, url: 'img/17.jpg', keywords: ['all', 'putin', 'russia', 'angry'] },
    { id: 18, url: 'img/18.jpg', keywords: ['all', 'happy', 'toys', 'toy story', 'laugh'] }
];


function init() {
    gLineCount = 1;
    gCurrLineIdx = 0
    gCurrFont = 'impact'
    gCurrBgcColor = 'white'
    gCurrBorderColor = 'black'
    gSavedMemes = loadFromStorage(KEY)
    renderKeywords()
}

function renderKeywords() {
    var strHTMLs = gKeywords.map((keyword) => {
        return `
        <p class="keyword" onclick="onSetFilterBy('${keyword.key}')" style="font-size:${keyword.value}px">${keyword.key}</p>
        `
    }).join('')
    var elKeyWords = document.querySelector('.tags-box')
    elKeyWords.innerHTML = strHTMLs
}


function changeWordSize(val) {
    var currKeywordIdx = gKeywords.findIndex((keyword) => {
        return keyword.key === val
    })
    gKeywords[currKeywordIdx].value += 2
}

function getMemes() {
    if (!gFilterBy) return gImgs
    if (gFilterBy === 'all') return gImgs
    return gImgs.filter((img) => {
        return img.keywords.includes(gFilterBy)
    })
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
                font: gCurrFont,
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
    gCtx.font = `${meme.lines[idx].size}px ${meme.lines[idx].font}`;
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
    gCtx.strokeStyle = meme.lines[idx].borderColor;
    gCtx.fillStyle = meme.lines[idx].color
    gCtx.font = `${meme.lines[idx].size}px ${meme.lines[idx].font}`
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
function filterBy(keyword) {
    gFilterBy = keyword;
}
function addLine() {
    gCurrLineIdx = (gLineCount - 1)
    gCurrLineIdx++
    gLineCount++
    let newLine = {
        txt: ' ',
        size: 40,
        align: 'center',
        color: gCurrBgcColor,
        borderColor: gCurrBorderColor,
        font: gCurrFont,
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

function moveIdx() {
    gCurrLineIdx--
    if (gCurrLineIdx < 0) { gCurrLineIdx = gLineCount - 1 }
    document.querySelector('.text-line').value = gMeme.lines[gCurrLineIdx].txt
    document.querySelector('.text-line').focus()
    gMeme.selectedLineIdx = gCurrLineIdx;
}

function alignText(alignClass) {
    gMeme.lines[gCurrLineIdx].align = alignClass;
    console.log(alignClass);
    switch (alignClass.value) {
        case 'align-left':
            gMeme.lines[gCurrLineIdx].align = 'start';
            gMeme.lines[gCurrLineIdx].x = 120;

            break;
        case 'align-center':
            gMeme.lines[gCurrLineIdx].align = 'center';
            gMeme.lines[gCurrLineIdx].x = gCanvas.width / 2;
            break;
        case 'align-right':
            gMeme.lines[gCurrLineIdx].align = 'end';
            gMeme.lines[gCurrLineIdx].x = gCanvas.width - 100
    }
    onRenderTxt()
}

function setFillColor(color) {
    gCurrBgcColor = color;
    gMeme.lines[gCurrLineIdx].color = color;
}

function setborderColor(color) {
    gCurrBorderColor = color;
    gMeme.lines[gCurrLineIdx].borderColor = color;
}

function setNewFont(font) {
    gCurrFont = font
    gMeme.lines[gCurrLineIdx].font = font;
}

function toggleMenu() {
    if (document.querySelector('.nav-list').style.display === 'absolute') {
        return
    } else {
        document.body.classList.toggle('menu-open');
    }
}

function saveToMemes() {
    gSavedMemes.push(gMeme)
    console.log(gSavedMemes);
    saveToStorage(KEY, gSavedMemes);
}
