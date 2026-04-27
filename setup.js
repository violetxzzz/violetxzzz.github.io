import * as v from 'https://addsoupbase.github.io/v4.js'
import preload from 'https://addsoupbase.github.io/webcomponents/slide-show.js'
function shiny(odds = 4000) {
    return Math.random() * odds > odds - 1 ? ' shiny' : ''
}
[].forEach.call(document.getElementsByTagName('slide-show'), o => {
    if (shiny()) o.index = 1
})