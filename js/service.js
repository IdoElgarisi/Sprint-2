'use strict';


const KEY = 'memesDB';
let gCurrImg;
let gCurrLineIdx = 0;
let gCurrKeyIdx;
let gLineCount = 1;
let gCurrBgcColor = 'white'
let gCurrBorderColor = 'black'
let gCurrFont = 'impact'
let gFilterBy;
let gSavedMemes = [];

let gKeywords = [
    {
        key: 'happy',
        value: 16
    },

    {
        key: 'funny',
        value: 10
    },

    {
        key: 'pets',
        value: 16
    },

    {
        key: 'baby',
        value: 12
    },

    {
        key: 'angry',
        value: 14
    },

    {
        key: 'laugh',
        value: 12
    },

]
let gMeme = {
    // canvasWidth:getCanvasWidth(),
    selectedImgId: 5,
    selectedLineIdx: 0,
    id: makeId(6),
    lines: [
        {
            txt: 'hello',
            size: 40,
            align: 'center',
            color: gCurrBgcColor,
            borderColor: gCurrBorderColor,
            font: gCurrFont,
            idx: gCurrLineIdx,
            pos: {
                x:250,
                y: 50
            }
        }
    ]
}
let gImgs = [
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
    gSavedMemes = (gSavedMemes.length === 0) ? [] : loadFromStorage(KEY)
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

function getMeme() {
    return gMeme
}

function resetGMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        id: makeId(6),
        lines: [
            {
                txt: 'hello',
                size: 40,
                align: 'center',
                color: gCurrBgcColor,
                borderColor: gCurrBorderColor,
                font: gCurrFont,
                idx: 0,
                pos: {
                    x: gCanvas.width / 2,
                    y: 50
                }
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
    gMeme.lines[gCurrLineIdx].txt = txt;
    document.querySelector('.text-line').value = gMeme.lines[gCurrLineIdx].txt
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    drawImg(gCurrImg.url);
    if (!gMeme.lines.length) return
    gMeme.lines.map((meme) => {
        drawText(gMeme, meme.pos.x, meme.pos.y, meme.idx)
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
        txt: '  ',
        size: 40,
        align: 'center',
        color: gCurrBgcColor,
        borderColor: gCurrBorderColor,
        font: gCurrFont,
        idx: gCurrLineIdx,
        pos: {
            x: gCanvas.width / 2,
            y: gCanvas.height / 2
        }
    }
    if (gLineCount === 2) {
        newLine.pos.y = (gCanvas.height - 30);
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
            gMeme.lines[gCurrLineIdx].pos.y += -20
            break;
        case 'down':
            gMeme.lines[gCurrLineIdx].pos.y += 20
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
    console.log(gCurrLineIdx);
}

function alignText(alignClass) {
    console.log(alignClass);
    switch (alignClass.value) {
        case 'align-left':
            gMeme.lines[gCurrLineIdx].align = 'start'
            gMeme.lines[gCurrLineIdx].pos.x = 100;
            break;
        case 'align-center':
            gMeme.lines[gCurrLineIdx].align = 'center'
            gMeme.lines[gCurrLineIdx].pos.x = gCanvas.width / 2;
            break;
        case 'align-right':
            gMeme.lines[gCurrLineIdx].align = 'end'
            gMeme.lines[gCurrLineIdx].pos.x = gCanvas.width - 100
            break
            
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
    onRenderTxt()
}

function toggleMenu() {
    if (document.querySelector('.nav-list').style.display === 'absolute') {
        return
    } else {
        document.body.classList.toggle('menu-open');
    }
}

function saveToMemes() {
    console.log(gSavedMemes);
    gSavedMemes.push(gMeme)
    saveToStorage(KEY, gSavedMemes);
    showSavedModal()

}

function showSavedModal() {
    let modal = document.querySelector('.saved-modal')
    modal.style.display = 'block'
    setTimeout(() => {
        modal.style.display = 'none'
    }, 1500);

}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
