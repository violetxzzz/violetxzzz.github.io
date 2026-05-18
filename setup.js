'use strict'
customElements.whenDefined('slide-show')
.then(function() {
    function shiny(odds = 4000) {
        return Math.random() * odds > odds - 1 ? ' shiny' : ''
    }
    [].forEach.call(document.getElementsByTagName('slide-show'), o => {
        if (shiny()) o.index = 1
    })
})