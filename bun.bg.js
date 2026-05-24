/*${
return await inline('./dex.js')
}*/
import *as v from 'https://addsoupbase.github.io/v4.js'
const h = window[Symbol.for('[[HModule]]')]
import { loadSprite, loadPokemon, catchAnimation, setField, stopAnims, MASTER_BALL, ULTRA_BALL, POKE_BALL, GREAT_BALL, loadDexes } from 'https://addsoupbase.github.io/catch.js'
const { background, backdrop } = v.id
let frozen = false
setField(background)
loadDexes(dex, 'https://addsoupbase.github.io/')
function freeze() {
    if (frozen) return
    backdrop.style.transition = 'none'
    document.body.classList.add('frozen')
    frozen = true
        ;[].forEach.call(background.querySelectorAll('slide-show'),
            o => {
                o.matches('.dialga,.pokeball') || o.pause()
            })
}
function unfreeze() {
    if (!frozen) return
    document.body.classList.remove('frozen')
    frozen = false
        ;[].forEach.call(background.querySelectorAll('slide-show'),
            o => {
                o.classList.contains('dialga') || o.resume()
            })
    setTimeout(() => {
        backdrop.style.transition = ''
    }, 1000)
}
function choose(...c) { return c[Math.floor(Math.random() * c.length)] }
if (CSS.supports('anchor-name', '--a')) {
    let { controls } = v.id
    let icons = [].slice.call(document.getElementsByClassName('icon'))
    controls.delegate({
        mouseover() {
            let icon = icons[this.parent.eltIndexOf(this)]
            icon.play()
            icon.resume()
        },
        mouseout() {
            let icon = icons[this.parent.eltIndexOf(this)]
            icon.pause()
            icon.time = 0
        }
    })
}
if (typeof CSSPropertyRule !== 'function')
    CSS.registerProperty({
        name: '--asteroid-rotate',
        syntax: "<angle>",
        inherits: false,
        initialValue: '0deg'
    })
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
loadSprite(
    ...Array.from({ length: 3 }, (_, i) => ({ src: `./boom${i + 1}-4.png`, framesX: 4, framesY: 1 })))
!async function () {
    let wait = window.scheduler?.yield && scheduler.yield.bind(scheduler)
    for (let name in dex) {
        let t = dex[name]
        // let name = t[0]
        // let frames = t[1]
        Promise.all(...Object.entries(t).map(({ 0: anim, 1: a }) => {
            let src = `./new/${name}/${name}-${anim}.png`
            let duras = a.values.split(';').map(Number)
            return (anim === 'Idle' ? loadPokemon : loadSprite)({ name, duras, src, framesY: a.framesY, framesX: duras.length, frameWidth: a.frameWidth, frameHeight: a.frameHeight })
        })).then(() => name === 'dialga_origin' || name === 'palkia' || name === 'dialga' || (((name === 'reshiram') || (name === 'zekrom')) && typeof scrollMaxX === 'number' /* dude idk why but only zekrom and reshiram have messed up idle sprites on safari*/) || mons.push(name))
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
let p = new Set
function preloadBg(n) {
    if (n && !p.has(n)) {
        p.add(n)
        let x = $`<picture><source srcset="./bg${n}.avif" type="image/avif"><source srcset="./bg${n}.webp" type="image/webp"><img src="./bg${n}.png" decoding="sync" fetchpriority="high"></picture>`
        x.lastChild.decode()
    }
}
spawnDialga()
// setTimeout(spawnHoopaUnbound, 1000)
function spawnExoticPokemon() {
    setTimeout(spawnExoticPokemon, 40000 + Math.random() * 10000)
    if (frozen || isHidden()) return
    if (Math.random() < .25) choose(spawnPalkia, spawnDialga)()
    else choose(spawnJirachi, spawnHoopaUnbound)()
}
function range(min, max) {
    return Math.random() * (max - min) + min
}
async function spawnPalkia() {
    if (frozen || isHidden() || document.querySelector('.palkia, .dialga')) return
    function caught() {
        return !palkia.classList.contains('catchable') && !palkia.classList.contains('finished')
    }
    function r() {
        palkia.style.top = randomX()
        palkia.style.left = randomY()
        palkia.style.rotate = range(-45, 45) + 'deg'
        palkia.style.visibility = 'visible'
    }
    let palkia = $`<slide-show autoplay data-name="palkia" src="./new/palkia/palkia-Walk.png" aria-hidden="true" style="top:${randomY()};left:${randomX()};rotate:${range(-20, 20)}deg" class="catchable palkia" index="${shiny() ? 1 : 0}">`
        .setParent(background)
    palkia.on({
        _catch() {
            this.style.rotate = ''
        }
    })
    await h.wait(300)
    if (caught()) return
    palkia.style.visibility = 'hidden'
    await h.wait(1300)
    if (caught()) return
    r()
    await h.wait(400 * Math.random())
    if (caught()) return
    palkia.style.visibility = 'hidden'
    await h.wait(1000)
    if (caught()) return
    palkia.style.rotate = ''
    palkia.style.top = palkia.style.left = '50%'
    palkia.style.visibility = 'visible'
    palkia.src = './new/palkia/palkia-Walk2.png'
    let t = setTimeout(() => {
        if (caught()) return
        palkia.destroy()
    }, 3600)
    await h.wait(3000)
    if (caught()) {
        clearTimeout(t)
        return
    }
    palkia.style.filter = 'drop-shadow(0 0 400px purple)'
    await h.wait(300)
    palkia.classList.replace('catchable', 'finished')
    backdrop.style.filter = 'brightness(0%) invert(100%)'
    let n = ((+(backdrop.dataset.bg ?? 0)) + 1) % 5
    preloadBg(n)
    backdrop.on({
        _transitionend() {
            backdrop.dataset.bg = n
        }
    })
    await h.wait(800)
    backdrop.style.filter = ''
}
let unfreezetimer
async function spawnDialga() {
    if (frozen || isHidden() || document.querySelector('.palkia, .dialga')) return
    function caught() {
        return !dialga.classList.contains('catchable')
    }
    let dialga = $`<slide-show autoplay src="./new/dialga/dialga-Walk.png" data-name="dialga" aria-hidden="true" style="top:50%;left:50%;" class="catchable dialga" index="${shiny() ? 1 : 0}">`
        .setParent(background)
    dialga.animate([
        { rotate: 'y 90deg' },
        { rotate: 'y 0deg' }
    ], {
        iterations: 1,
        duration: 300,
        easing: 'linear',
        fill: 'forwards'
    })
    await h.wait(2000)
    if (caught()) return
    dialga.dur = .04
    dialga.src = './new/dialga/dialga-Walk2.png'
    await h.wait(6000)
    if (caught()) return
    dialga.src = './new/dialga/dialga-Walk.png'
    await h.wait(1000)
    if (caught()) return
    dialga.style.filter = `drop-shadow(0 0 400px rgb(0, 204, 255))`
    await h.wait(200)
    if (caught()) return
    freeze()
    dialga.classList.remove('catchable')
    dialga.animate([
        { rotate: 'y 0deg' },
        { rotate: 'y 90deg' }
    ], {
        iterations: 1,
        delay: 600,
        duration: 300,
        easing: 'linear',
        fill: 'forwards'
    }).finished.then(() => dialga.destroy())
    unfreezetimer = setTimeout(unfreeze, 60000)
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
function isHidden() { return document.hidden || frozen }
background.delegate({
    animationend(e) {
        e.animationName === 'offset' && this.destroy()
    },
})

let showedMessage = false
background.delegate({
    beforecatch(e) {
        let pkm = this.dataset.name
        if (!this.matches('.catchable') || (pkm !== 'dialga_origin' && frozen)) return e.preventDefault()
        // e.stopImmediatePropagation()
    },
    async catch(e) {
        let pkm = this.dataset.name
        let n = v.Proxify(e.pokeball)
        let shiny = this.index == 1
        this.style.pointerEvents = 'none'
        stopAnims(this)
        this.classList.remove('catchable')
        let { name } = this.dataset
        this.classList.replace(name, name + '_idle')
        this.src = this.src.replace(/-Walk2?/, '-Idle')
        let pokemonCenterX = e.centerX
        let pokemonCenterY = e.centerY
        n.attr`index="${legendary.has(pkm) || special.has(pkm) ? MASTER_BALL : choose(POKE_BALL, GREAT_BALL, ULTRA_BALL)}" aria-hidden="true" autoplay data-catching="${pkm}" class="pokeball_throw pokeball" src="$throw"`
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
        n.src = '$catch'
        n.repeatCount = 1
        n.time = 0
        // n.dur = .07
        catchAnimation(this).finished.then(() => this.destroy(true))
        await h.wait(4700)
        n.time = 0
        n.pause()
        n.fadeOut().finished.then(() => {
            n.destroy(true)
            if (name === 'lunala') {
                showMessageBox(shiny)
            }
            else if (name === 'dialga_origin') {
                unfreeze()
                clearTimeout(unfreezetimer)
            }
        })
    }
}, null, false, new AbortController)
background.delegate({
    pointerdown(e) {
        if (frozen) return
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
let { message } = v.id
function showMessageBox(shiny) {
    if (!showedMessage) {
        showedMessage = true
        message.style.display = 'block'
        message.querySelector('[alt=Lunala]').style.setProperty('--SPRITE_INDEX', +shiny)
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
    setTimeout(spawnAsteroid, 3300 + (Math.random() * 1000))
    if (frozen || isHidden()) return
    let i = choose(4, 4, 4, 4, 4, 4, 3, 3, 3, 1, 1, 1, 2, 2)
    let asteroid = $`<div aria-hidden="true" data-type="${i}" class="asteroid${i} obj debris" style="animation-duration: ${30000 + Math.random() * 10000}ms, ${(60 - (i * 6)) - Math.random() * 20}s;top:${randomY()};animation-direction: ${Math.random() > .5 ? 'normal' : 'reverse'},${Math.random() > .5 ? 'normal' : 'reverse'}"></div>`
        .setParent(background)
        .on({ _animationend: remove })
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
    return `${Math.random() * 100}%`
}
function randomX() {
    return `${Math.random() * 100}%`
}
/*function spawnSleepingPokemon() {
    setTimeout(spawnSleepingPokemon, 3500 + (Math.random() * 1000))
    let sleeping = mons.filter(o => o.endsWith('sleep'))
    let pkm = sleeping[Math.floor(Math.random() * sleeping.length)]
    if (!pkm || isHidden()) return
    $`<div class="${pkm} obj${shiny()}" style="top: ${randomY()};animation: float 20s linear infinite${Math.random() > .5 ? '' : ' reverse'}, offset ${40 + Math.random() * 10}s linear${Math.random() > .5 ? '' : ' reverse'}, ${slideshow};"></div>`
        .setParent(background)
}*/
let special = new Set(`dialga palkia hoopa_unbound hoopa_unbound_intro jirachi_intro jirachi`.split(' '))
let legendary = new Set(`mewtwo reshiram zekrom hoopa eternatus giratina arceus uxie azelf mesprit mew lunala rayquaza necrozma necrozma_ultra deoxys deoxys_speed deoxys_attack deoxys_defense`.split(' '))
// spawnSleepingPokemon()
function spawnLegendary() {
    setTimeout(spawnLegendary, 6070 + range(-4000, 4000))
    let regular = mons.filter(legendary.has, legendary)
    let a = 10
    let pkm = regular[Math.floor(Math.random() * regular.length)]
    if (frozen) {
        if (!document.querySelector('.dialga,.dialga_origin,.dialga_origin_idle,[data-catching="dialga_origin"]')) {
            pkm = 'dialga_origin'
        }
        else return
    }
    let max = 20
    while (a-- && document.querySelector(`.${pkm}`)) pkm = regular[Math.floor(Math.random() * regular.length)]
    if (!(frozen && pkm === 'dialga_origin')) if (!pkm || isHidden()) return
    let [scale, speed, index, dur] = configure(pkm)
    createPkm(scale, speed, index, dur, pkm)
}
function configure(pkm) {
    let scale = .7
    let speed = 1.2
    let index = 0
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
            scale *= 5
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
            scale *= 3.1
            speed *= 2.5
            break
        case 'necrozma_ultra':
            scale *= 5
            break
        case 'giratina':
            scale *= 3.6
            break
        case 'rayquaza':
            scale *= 2.77
            speed *= 2
            break
        case 'necrozma':
            scale *= 4
            break
        case 'arceus':
            scale *= 3.8
            break
        case 'unown':
            scale *= 2.3
            index = Math.floor(Math.random() * 29)
            break
        case 'bronzor':
            scale *= 2.2
            break
        case 'baltoy':
            scale *= 1.8
            break
    }
    return [scale, speed, index, dur]
}
function spawnPokemon() {
    setTimeout(spawnPokemon, 1600 + range(-200, 200))
    let regular = mons.filter(o => !special.has(o) && !o.endsWith('_idle') && !legendary.has(o))
    let a = 10
    let pkm = regular[Math.floor(Math.random() * regular.length)]
    if (!pkm || isHidden() || frozen) return
    let [scale, speed, index, dur] = configure(pkm)
    createPkm(scale, speed, index, dur, pkm)
}
function createPkm(scale, speed, index, dur, pkm) {
    scale *= Math.random() > .5 ? 1 : -1
    let isShiny = shiny()
    if (isShiny)
        if (pkm === 'minior') index = 7
        else if (pkm === 'mewtwo') index = 2
        else index += 1
    let s = $`<slide-show index="${index}" dur="${dur}ms" data-name="${pkm}" src="./new/${pkm}/${pkm}-Walk.png" aria-hidden="true" class="${pkm} ${isShiny ? 'isShiny ' : ' '}catchable" style="--offset-path: var(--${pkm === 'eternatus' ? `${pkm}-` : ''}ltr);animation-direction: ${scale > 0 ? 'normal' : 'reverse'};animation-duration: ${((40 + Math.random() * 40) / speed) * 1000}ms;transform: scale(${scale}, ${Math.abs(scale)});top: ${randomY()};"></slide-show>`
    s.setParent(background)
    s.play()
}
setTimeout(spawnPokemon, 300)
setTimeout(spawnLegendary, 10000 + range(-7000, 5000))
// showMessageBox()
async function spawnShootingStar() {
    setTimeout(spawnShootingStar, 21000 + (Math.random() * 3000))
    if (frozen || isHidden()) return
    let a =
        $`<slide-show style="left:${randomX()};top:${randomY()};scale:${Math.random() * 1};rotate:${Math.random() * 360}deg" src="./shootingstar-11.png" class="shootingstar" repeat="1" dur=".07"></slide-show>`
    a.setParent(background)
    a.play()
    await a.until('endEvent')
    a.destroy()
}
loadSprite({ src: './shootingstar-11.png', framesX: 9, framesY: 1 })[0]
    .then(() => {
        setTimeout(spawnShootingStar, 1000)
    })
function commitStyles(o) { o.commitStyles() }