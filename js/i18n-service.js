var gTrans = {
    title: {
        en: 'Your Online BookShop',
        he: 'חנות הספרים המקוונת שלך'
    },
    'create-book': {
        en: 'Create New Book',
        he: 'צור ספר חדש'
    },
    'book-id': {
        en: 'Id',
        he: 'מספר סידורי'
    },
    'book-title': {
        en: 'Title',
        he: 'שם'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'book-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'read': {
        en: 'Read',
        he: 'קריאה'
    },
    'update': {
        en: 'Update',
        he: 'עדכון'
    },
    'update-price': {
        en: 'Enter New Price',
        he: 'הכנס מחיר חדש'
    },
    'delete': {
        en: 'Delete',
        he: 'מחיקה'
    },
    'modal-close': {
        en: 'Close',
        he: 'סגור'
    },
    'add-book': {
        en: 'Add',
        he: 'הוסף'
    },
    'next-page': {
        en: 'Next',
        he: 'הבא'
    },
    'prev-page': {
        en: 'Previous',
        he: 'קודם'
    },
    'delete-sure': {
        en: 'Are you sure?',
        he: '?האם אתה בטוח'
    },
    'enter-book-modal':{
        en:'Enter Book Name',
        he:'הכנס את שם הספר'
    },
    'price-book-modal':{
        en:'Enter Book price',
        he:'הכנס את  הספר'
    }

}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang]

    if (!txt) txt = keyTrans['en']
    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
//debugger
    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
            console.log(txt);
        } else {
            el.innerText = txt
        }
    })

    // ITP: support placeholder    
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}