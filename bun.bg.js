/*:
let a = await Array.fromAsync(await dir('./new'), async o=>{
    let json = JSON.parse(await file(`./new/${o}/${o}.json`))
    return[o, json]
    })
   return `const data = ${uneval(Object.fromEntries(a))}`
*/
import *as v from 'https://addsoupbase.github.io/v4.js'
import load from 'https://addsoupbase.github.io/webcomponents/slide-show.js'
if (typeof CSSPropertyRule !== 'function')
    CSS.registerProperty({
        name: '--asteroid-rotate',
        syntax: "<angle>",
        inherits: false,
        initialValue: '0deg'
    })
const {background} = v.id
const $ = v.esc
const setOffsetPath = function (sheet) {
    document.adoptedStyleSheets = [].concat.call(document.adoptedStyleSheets, sheet)
    return sheet.replaceSync.bind(sheet)
}(new CSSStyleSheet)
background.observe('resize', {
    callback(n) {
        let { width, height } = n.contentRect
        let halfW = innerWidth / 2
        let halfH = innerHeight / 2
        setOffsetPath(`:root{--ltr: path("M -${halfW / 2.1} 0 L ${width + (halfW / 2.1)} 0");--eternatus-ltr: path("M -${width + halfW + 600} 0 L ${width + halfW + 600} 0"); --ttb: path("M 0 0 L 0 ${height + halfH}")}`)
    }
})
load({ src: './pokeball_throw-8.png', framesX: 8, framesY: 1 }, { src: './pokeball_catch-57.png', framesX: 57, framesY: 1 }, ...Array.from({ length: 3 }, (_, i) => ({ src: `./boom${i + 1}-4.png`, framesX: 4, framesY: 1 })))
!async function () {
    let wait = window.scheduler?.yield && scheduler.yield.bind(scheduler)
    for (let name in data) {
        let t = data[name]
        // let name = t[0]
        // let frames = t[1]
        Promise.all(load(...Object.entries(t).map(({0:anim, 1:a}) => {
            let src = `./new/${name}/${name}-${anim}.png`
            let duras = a.values.split(';').map(Number)
            return { duras, src, framesY: a.framesY, framesX: duras.length, frameWidth: a.frameWidth, frameHeight: a.frameHeight }
        }))).then(() => mons.push(name))
        wait && await wait()
    }
}()
let mons = []
function shiny(odds = 4000) {
    return Math.random() * odds > odds - 1 ? ' shiny' : ''
}
function spawnJirachi() {
    // setTimeout(spawnJirachi, 40000 + Math.random() * 10000)
    if (isHidden() || document.querySelector('.jirachi, .jirachi_intro')) return
    let jirachi = $`<slide-show repeat="1" src="./new/jirachi/jirachi-Special2.png" data-name="jirachi" aria-hidden="true" style="top:${randomY()};left:${randomX()};" class="jirachi_intro" index="${shiny() ? 1 : 0}"></slide-show>`
        .setParent(background)
    jirachi.on({
        _endEvent() {
            jirachi.pause()
            jirachi.src = './new/jirachi/jirachi-Walk.png'
            jirachi.repeatCount = 'indefinite'
            jirachi.time = 0
            jirachi.resume()
            // jirachi.dur = .01
            jirachi.classList.remove('jirachi_intro')
            jirachi.style.setProperty('--offset-path', 'var(--ttb)')
            jirachi.style.animationDuration = '42600ms'
            jirachi.classList.add('jirachi', 'catchable')
            // jirachi.shadowRoot.querySelector('animate').setAttribute('repeatCount', 'indefinite')
            // jirachi.resume()
            // jirachi.time = 0
        }
    })
    jirachi.play()
}
// setTimeout(spawnHoopaUnbound, 1000)
function spawnExoticPokemon() {
    setTimeout(spawnExoticPokemon, 40000 + Math.random() * 10000)
    if (isHidden()) return
    Math.random() > .5 ? spawnJirachi() : spawnHoopaUnbound()
}
setTimeout(spawnExoticPokemon, 10000 + Math.random() * 20000)
function spawnHoopaUnbound() {
    // setTimeout(spawnJirachi, 40000 + Math.random() * 10000)
    if (isHidden() || document.querySelector('.hoopa_unbound, .hoopa_unbound_intro')) return
    let hoopa = $`<slide-show repeat="1" src="./new/hoopa_unbound/hoopa_unbound-Special0.png" data-name="hoopa_unbound" aria-hidden="true" style="top:${randomY()};left:${randomX()};" class="hoopa_unbound_intro" index="${shiny() ? 1 : 0}"></slide-show>`
        .setParent(background)
    hoopa.dur = .02
    hoopa.on({
        _endEvent() {
            hoopa.pause()
            hoopa.src = './new/hoopa_unbound/hoopa_unbound-Walk.png'
            hoopa.repeatCount = 'indefinite'
            hoopa.time = 0
            hoopa.resume()
            // jirachi.dur = .01
            hoopa.classList.remove('hoopa_unbound_intro')
            hoopa.classList.add('hoopa_unbound', 'catchable')
            // jirachi.shadowRoot.querySelector('animate').setAttribute('repeatCount', 'indefinite')
            // jirachi.resume()
            // jirachi.time = 0
            hoopa.style.setProperty('--offset-path', 'var(--ttb)')
            hoopa.style.animationDuration = '70000ms'
            hoopa.classList.add('hoopa_unbound', 'catchable')
        }
    })
    hoopa.play()
}
// spawnHoopaUnbound()
// setTimeout(spawnHoopaUnbound, 1000 + Math.random() * 20000)
// data.forEach(doImages)
function isHidden() { return document.hidden }
background.delegate({
    animationend(e) {
        e.animationName === 'offset' && this.destroy()
    },
})
function preload(url) {
    $`<link rel="preload" as="image" href="${url}">`.setParent(document.head)
}
let showedMessage = false
background.delegate({
    async pointerdown(e) {
        let pkm = this.dataset.name
        e.stopImmediatePropagation()
        let shiny = this.index == 1
        this.style.pointerEvents = 'none'
        this.getAnimations({ subtree: true }).forEach(commitStyles)
        this.classList.remove('catchable')
        let { name } = this.dataset
        this.classList.replace(name, name + '_idle')
        this.src = this.src.replace('-Walk', '-Idle')
        let rect = this.shadowRoot.firstChild.getBoundingClientRect()
        let pokemonCenterX = (rect.x + (rect.width / 2))
        let pokemonCenterY = rect.y + rect.height / 2
        let n = $`<slide-show aria-hidden="true" class="pokeball_throw pokeball" src="./pokeball_throw-8.png"></slide-show>`
            .setParent(background)
        n.play()
        await n.animate([
            {
                transform: `translate(${pokemonCenterX}px, 100vh) scale(4, 4)`,
            },
            {
                transform: `translate(${pokemonCenterX}px, ${pokemonCenterY}px) scale(0.5, 0.5)`,
            }
        ], {
            duration: Math.max(1400 - pokemonCenterY, 500),
            iterations: 1,
            fill: 'forwards',
            easing: 'linear'
        }).finished
        let unown = pkm === 'unown' ? 'hue-rotate(20deg) saturate(5) ' : ''
        n.src = './pokeball_catch-57.png'
        n.repeatCount = 1
        n.time = 0
        n.dur = .07
        this.animate([{
            transform: 'scale(1,1)', filter: `${unown}brightness(0%) invert(1) opacity(90%)`
        }, { filter: 'opacity(60%) brightness(0%) invert(1)' }, {
            transform: 'scale(0.25,0.25)', filter: `${unown}opacity(0%) brightness(0%) invert(1)`
        }], {
            duration: 400,
            iterations: 1,
            delay: 500,
            composite: 'add',
            easing: 'ease-in'
        }).finished.then(() => this.destroy(true))
        await new Promise(s => setTimeout(s, 4000))
        n.time = 0
        n.pause()
        n.fadeOut().finished.then(() => {
            n.destroy(true)
            if (name === 'lunala') {
                showMessageBox(shiny)
            }
        })
    }
}, o => o.matches('.catchable'), false, new AbortController)
background.delegate({
    pointerdown(e) {
        e.stopImmediatePropagation()
        let t = +this.dataset.type
        switch (t) {
            case 1: case 3: t = 2
                break
            case 2: t = 3
                break
            case 4: t = 1
                break
        }
        let rect = this.getBoundingClientRect()
            , translate = `${rect.x + rect.width / 2}px 0`
        this.className = `boom${t} boom obj`
        this.style.translate = translate
        this.style.animation = ''
        let boom = $`<slide-show src="./boom${t}-4.png" dur=".08" repeat="1"></slide-show>`
        this.pushNode(boom)
        boom.play()
        let that = this
        boom.on({
            _endEvent() {
                that.destroy()
            }
        })
        delete this.dataset.type
    }
}, o => !isNaN(o.dataset.type))
//@devwindow.mons = mons
function spawnSpaceShip() {
    setTimeout(spawnSpaceShip, 60 * 1000 * (Math.random() * 2))
    if (isHidden()) return
    let scale = Math.random()
    let dir = Math.random() > .5
    let o = $`<slide-show class="spaceship spacething obj" style="${dir ? 'scale: -.8 .8;' : ''}top: ${randomY()}; animation: offset ${40 + (Math.random() * 20)}s linear${dir ? '' : ' reverse'}"></slide-show>`
        .setParent(background)
    // .onanimationend = remove
}
function remove() {
    v.Proxify(this).destroy()
}
let { message, lunalapreview } = v.id
function showMessageBox(shiny) {
    if (shiny)
        lunalapreview.index = 1
    if (!showedMessage) {
        showedMessage = true
        message.style.display = 'block'
        setTimeout(() => {
            message.style.scale = '1 1'
            setTimeout(() => {
                message.style.scale = '1 0'
                message.on({
                    _transitionend() {
                        message.style.display = 'none'
                    }
                })
            }, 4100)
        })
    }
}
// spawnSpaceShip()
function spawnAsteroid() {
    setTimeout(spawnAsteroid, 4000 + (Math.random() * 1000))
    if (isHidden()) return
    let i = Math.floor(Math.random() * 4) + 1
    let asteroid = $`<div aria-hidden="true" data-type="${i}" class="asteroid${i} obj debris" style="animation-duration: ${30000 + Math.random() * 10000}ms, ${(60 - (i * 6)) - Math.random() * 20}s;top:${randomY()};animation-direction: ${Math.random() > .5 ? 'normal' : 'reverse'},${Math.random() > .5 ? 'normal' : 'reverse'}"></div>`
        .setParent(background)
        .onanimationend = remove
    // if (i === 2 && Math.random() < .2) asteroid.pushNode($`<div class="cleffa obj"></div>`)
}
spawnAsteroid()
function spawnPlanet() {
    setTimeout(spawnPlanet, 30000 + (Math.random() * 1000))
    if (isHidden()) return
    let i = Math.floor(Math.random() * 12) + 1
    let asteroid = $`<div class="planet planet${i} obj debris" style="top:${randomY()};animation:float ${700 - Math.random() * 30}s linear infinite${Math.random() > .5 ? '' : ' reverse'}, offset ${600 - (i * 4)}s linear${Math.random() > .5 ? '' : ' reverse'}"></div>`
        .setParent(background)
}
// setTimeout(spawnPlanet, 10000 + Math.random() * 10000)
function randomY() {
    return `${Math.random() * innerHeight}px`
}
function randomX() {
    return `${Math.random() * innerWidth}px`
}
/*function spawnSleepingPokemon() {
    setTimeout(spawnSleepingPokemon, 3500 + (Math.random() * 1000))
    let sleeping = mons.filter(o => o.endsWith('sleep'))
    let pkm = sleeping[Math.floor(Math.random() * sleeping.length)]
    if (!pkm || isHidden()) return
    $`<div class="${pkm} obj${shiny()}" style="top: ${randomY()};animation: float 20s linear infinite${Math.random() > .5 ? '' : ' reverse'}, offset ${40 + Math.random() * 10}s linear${Math.random() > .5 ? '' : ' reverse'}, ${slideshow};"></div>`
        .setParent(background)
}*/
let special = new Set(`hoopa_unbound hoopa_unbound_intro jirachi_intro jirachi`.split(' '))
let legendary = new Set(`mewtwo reshiram zekrom hoopa eternatus giritina2 arceus uxie azelf mesprit mew lunala rayquaza necrozma necrozma_ultra deoxys deoxys_speed deoxys_attack deoxys_defense`.split(' '))
// spawnSleepingPokemon()
function spawnPokemon() {
    setTimeout(spawnPokemon, 1600 + (Math.random() * 100))
    let regular = mons.filter(o => !special.has(o) && !o.endsWith('_idle'))
    let pkm = regular[Math.floor(Math.random() * regular.length)]
    let a = 10
    if (!pkm || isHidden()) return
    while (a-- && legendary.has(pkm) && document.querySelector(`.${pkm}`)) {
        pkm = regular[Math.floor(Math.random() * regular.length)]
    }
    let i = Math.random() > .5 ? 1 : -1
    let scale = .7
    let index = 0
    let speed = 1.2
    let dur = 1 / 60
    switch (pkm) {
        case 'duosion':
            scale *= 2.3
            break
        case 'claydol':
            scale *= 2.8
            break
        case 'reuniclus':
            scale *= 2.5
            break
        case 'kartana':
        case 'orbeetle':
            scale *= 3
            break
        case 'solosis':
        case 'duskull':
            scale *= 2.2
            break
        case 'beheeyem':
        case 'elgyem':
            scale *= 2.7
            speed *= 1.5
            break
        case 'cosmoem':
            scale *= 2.3
            speed *= 1.5
            break
        case 'azelf':
            scale *= 1.1
        case 'mew':
        case 'uxie':
        case 'mesprit':
        case 'hoopa':
        case 'magnezone':
            scale *= 2.2
            speed *= 1.5
            break
        case 'minior':
            index = Math.floor(Math.random() * 7)
        case 'poipole':
        case 'beldum':
            scale *= 2.5
            break
        case 'cosmog':
            scale *= 1.5
            break
        case 'celesteela':
        case 'nihilego':
        case 'dusknoir':
            scale *= 3
            break
        case 'mewtwo':
            index = Math.floor(Math.random() * 2)
            speed /= 3
        case 'deoxys_speed':
            speed *= 3
        case 'deoxys_attack':
        case 'deoxys_defense':
        case 'deoxys':
            speed *= 3
            scale *= 2.7
            break
        case 'eternatus':
            scale *= 11
            // speed *= .2
            dur *= 2
            break
        case 'necrozma_ultra':
            scale *= 7.4
            dur *= 1.55
            break
        case 'lunala':
        case 'reshiram':
        case 'zekrom':
            scale *= 3
            break
        case 'buzzwole':
            scale *= 3.3
            break
        case 'lunatone':
        case 'solrock':
        case 'bronzong':
        case 'metang':
        case 'porygonz':
            scale *= 2.8
            break
        case 'naganadel':
            scale *= 3.5
            speed *= 2.5
            break
        case 'necrozma_ultra':
            scale *= 5
            break
        case 'giritina2':
            scale *= 3.6
            break
        case 'rayquaza':
            scale *= 2.77
            speed *= 2
            break
        case 'necrozma':
            scale *= 5.7
            break
        case 'arceus':
            scale *= 3.4
            break
        case 'unown':
            scale *= 2.3
            index = Math.floor(Math.random() * 29)
            break
        case 'bronzor':
        case 'baltoy':
            scale *= 1.8
            break
    }
    scale *= i
    let isShiny = shiny()
    if (isShiny)
        if (pkm === 'minior') index = 7
        else if (pkm === 'mewtwo') index = 2
        else index += 1
    let s = $`<slide-show index="${index}" dur="${dur}ms" data-name="${pkm}" src="./new/${pkm}/${pkm}-Walk.png" aria-hidden="true" class="${pkm} ${isShiny ? 'isShiny ' : ' '}catchable" style="--offset-path: var(--${pkm === 'eternatus' ? `${pkm}-` : ''}ltr);animation-direction: ${i > 0 ? 'normal' : 'reverse'};animation-duration: ${((40 + Math.random() * 40) / speed) * 1000}ms;transform: scale(${scale}, ${Math.abs(scale)});top: ${randomY()};"></slide-show>`
    s.setParent(background)
    s.play()
}
setTimeout(spawnPokemon, 300)
// showMessageBox()
async function spawnShootingStar() {
    setTimeout(spawnShootingStar, 21000 + (Math.random() * 3000))
    if (isHidden()) return
    let a =
        $`<slide-show style="left:${randomX()};top:${randomY()};scale:${Math.random() * 1};rotate:${Math.random() * 360}deg" src="./shootingstar-11.png" class="shootingstar" repeat="1" dur=".07"></slide-show>`
    a.setParent(background)
    a.play()
    await a.until('endEvent')
    a.destroy()
}
// spawnShootingStar()
load({ src: './shootingstar-11.png', framesX: 9, framesY: 1 })[0]
    .then(() => {
        setTimeout(spawnShootingStar, 1000)
    })
function commitStyles(o) { o.commitStyles() }