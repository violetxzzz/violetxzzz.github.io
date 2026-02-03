const data = ["arceus_idle.shiny-72","beldum-64","minior_core_idle-96","hoopa_unbound_intro-268","uxie_idle-72","dusknoir-48","lunala_idle.shiny-52","minior_meteor_idle-96","nihilego_idle-62","beheeyem-48","cosmoem-56","poipole_idle-36","deoxys_defense-48","beheeyem_idle-80","elgyem-56","mew-48","baltoy_idle-48","jirachi_idle-40","reshiram-36","necrozma_idle.shiny-142","lunatone-48","giritina2-96","deoxys_attack_idle-57","necrozma_idle-142","arceus_idle-72","mewtwo-48","duosion-60","jirachi_intro-180","metang-64","elgyem_idle-72","deoxys_attack-80","necrozma.shiny","naganadel_idle-60","jirachi.shiny-54","minior_core-96","mesprit-56","elgyem.shiny-56","pokeball_catch-57","duosion_idle-48","arceus-72","uxie-56","deoxys_defense_idle-56","solrock-60","minior_meteor-96","hoopa_idle-88","hoopa-62","hoopa_unbound-71","deoxys_idle-96","azelf_idle-72","elgyem_idle.shiny-72","solosis-56","zekrom_idle-102","boom3-4","rayquaza_idle-48","unown_idle-56","rayquaza-74","jirachi_intro.shiny-180","hoopa_unbound_intro.shiny","celesteela-96","pokeball_throw-8","reuniclus-64","reshiram_idle-118","deoxys-64","metang_idle-96","orbeetle_idle-62","eternatus_idle-40","jirachi-54","buzzwole-36","giritina2_idle-96","poipole-40","necrozma-71","claydol-64","cosmoem_idle-56","dusknoir_idle-116","celesteela_idle-162","buzzwole_idle-336","naganadel-32","baltoy-80","mewtwo_idle-72","boom1-4","azelf-56","reuniclus_idle-96","lunatone_idle-64","solosis_idle-46","beldum_idle-80","mew_idle-40","duskull_idle-80","hoopa_unbound_idle-71","orbeetle-40","boom2-4","hoopa_unbound_idle.shiny-71","deoxys_speed-28","solrock_idle-48","unown-56","hoopa_unbound.shiny-71","zekrom-80","claydol_idle-16","jirachi_idle.shiny-40","nihilego-62","rayquaza.shiny-74","lunala-40","lunala_idle-52","mesprit_idle-72","arceus.shiny-72","duskull-48","deoxys_speed_idle-28","rayquaza_idle.shiny-48","lunala.shiny","eternatus-48"]
import *as v from 'https://addsoupbase.github.io/v4.js'
import loadsprite from 'https://addsoupbase.github.io/webcomponents/cel-runner.js'
const { background } = v.id
const $ = v.esc
const { css } = v
const slideshow = `slideshow calc(var(--frames) * var(--global-frame-dura)) steps(var(--frames), end) infinite`
let mons = []
let sprites = {}
function shiny(odds = 4000) {
    return Math.random() * odds > odds - 1 ? ' shiny' : ''
}
async function spawnJirachi() {
    // setTimeout(spawnJirachi, 40000 + Math.random() * 10000)
    if (isHidden() || document.querySelector('.jirachi, .jirachi_intro')) return
    let jirachi = $`<cel-runner dura="40ms" src="${sprites.jirachi_intro}" data-name="jirachi" aria-hidden="true" style="top:${randomY()};left:${randomX()};--local-dura: 2;" class="jirachi_intro ${shiny()}"></cel-runner>`
        .setParent(background)
    await jirachi.until('spriteended')
    jirachi.classList.remove('jirachi_intro')
    jirachi.classList.add('jirachi', 'catchable')
    jirachi.src = sprites.jirachi
    jirachi.dura = '15ms'
    jirachi.animate([{ translate: `0 100vh` }], {
        duration: 20000,
        delay: 200,
        // composite:'accumulate',
        iterations: 1,
        easing: 'linear'
    }).onfinish = () => jirachi.purge()
}
function spawnExoticPokemon() {
    setTimeout(spawnExoticPokemon, 40000 + Math.random() * 10000)
    if (isHidden()) return
    Math.random() > .5 ? spawnHoopaUnbound() : spawnJirachi()
}
setTimeout(spawnExoticPokemon, 10000 + Math.random() * 20000)
async function spawnHoopaUnbound() {
    // setTimeout(spawnHoopaUnbound, 40000 + Math.random() * 10000)
    if (isHidden() || document.querySelector('.hoopa_unbound, .hoopa_unbound_intro')) return
    let hoopaUnbound = $`<cel-runner dura="15ms" data-name="hoopa_unbound" aria-hidden="true" src="${sprites.hoopa_unbound_intro}" style="top:${randomY()};left:${randomX()};" class="hoopa_unbound_intro ${shiny()}"></cel-runner>`
        .setParent(background)
    await hoopaUnbound.until('spriteended')
    hoopaUnbound.classList.remove('hoopa_unbound_intro', 'slideshowOnce')
    hoopaUnbound.classList.add('hoopa_unbound', 'catchable')
    hoopaUnbound.src = sprites.hoopa_unbound
    // hoopaUnbound.style.animation = `${slideshow}`
    hoopaUnbound.animate([{ translate: `0 140vh` }], {
        duration: 16000,
        delay: 600,
        // composite:'accumulate',
        iterations: 1,
        easing: 'linear'
    }).onfinish = () => hoopaUnbound.purge()
}
// spawnHoopaUnbound()
// setTimeout(spawnHoopaUnbound, 1000 + Math.random() * 20000)
function doImages(key) {
    let i = new Image
    let src = i.src = `./sprites/${key}.png`
    i.onload = async () => {
        let { 0: k, 1: frames } = key.split('-')
        let blob = await (await fetch(src)).blob()
        let url = URL.createObjectURL(blob)
        // preload(url)
        // $`<div class="${k} obj"></div>`.setParent(document.body)
        if (k.endsWith('.shiny')) {
            css.registerCSSRaw(`.${k} {background-image: url(${url}) !important}`)
            preload(url)
        }
        else {
            if (!k.startsWith('boom') && !k.startsWith('pokeball') && k !== 'shootingstar') {
                let t = { src: url, name: k }
                mons.push(t)
                let y = 1
                if (k.startsWith('minior_core')) y = 7
                else if (k.startsWith('unown')) {
                    y = 28
                    for (let i = 3; i--;) mons.push(t)
                }
                if (!legendary.has(k)) {
                    for (let i = 10; i--;) mons.push(t)
                }
                loadsprite({ src: url, x: frames, y })
                sprites[k] = url
                preload(url)
            }
            else css.write(`.${k}{--width: ${i.naturalWidth}px; --height: ${i.naturalHeight}px; background-image: url(${url}); --frames: ${frames};}`)
        }
    }
}
data.forEach(doImages)
function isHidden() { return document.hidden }
background.delegate({
    animationend() {
        this.purge()
    },
})
function preload(url) {
    $`<link rel="preload" as="image" href="${url}">`.setParent(document.head)
}
let showedMessage = false
background.delegate({
    async pointerdown(e) {
        e.stopImmediatePropagation()
        this.classList.remove('catchable')
        let shiny = this.classList.contains('shiny')
        this.style.pointerEvents = 'none'
        this.pauseOtherAnims()
        let { name } = this.dataset
        this.classList.replace(name, name + '_idle')
        this.src = sprites[name + '_idle']
        let rect = this.getBoundingClientRect()
        let pokemonCenterX = (rect.left - 10.75) + (rect.width / 2) - 10.5
        let pokemonCenterY = (rect.top - 10.5) + (rect.height / 2) - 10.5
        let n = $`<div aria-hidden="true" class="obj pokeball_throw slideshow pokeball"></div>`
            .setParent(background)
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
        n.classList.remove('slideshow')
        n.classList.replace('pokeball_throw', 'pokeball_catch')
        n.clientHeight
        n.style.animation = 'slideshow 4s steps(var(--frames), end)'
        this.animate([{
            transform: 'scale(1,1)', filter: 'brightness(0%) invert(1) opacity(90%)'
        }, { filter: 'opacity(60%) brightness(0%) invert(1)' }, {
            transform: 'scale(0.25,0.25)', filter: 'opacity(0%) brightness(0%) invert(1)'
        }], {
            duration: 400,
            iterations: 1,
            delay: 500,
            composite: 'add',
            easing: 'ease-in'
        }).finished.then(() => this.purge(true))
        await n.until('!animationend')
        n.fadeOut().finished.then(() => {
            n.purge(true)
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
            , translate = `${rect.left}px 0`
        this.className = `boom${t} boom obj`
        this.style.translate = translate
        this.style.animation = ''
        delete this.dataset.type
    }
}, o => !isNaN(o.dataset.type))
//@devwindow.mons = mons
function spawnSpaceShip() {
    setTimeout(spawnSpaceShip, 60 * 1000 * (Math.random() * 2))
    if (isHidden()) return
    let scale = Math.random()
    let dir = Math.random() > .5
    let o = $`<div class="spaceship spacething obj" style="${dir ? 'scale: -.8 .8;' : ''}top: ${randomY()}; animation: toRight ${40 + (Math.random() * 20)}s linear${dir ? '' : ' reverse'}"></div>`
        .setParent(background)
    // .onanimationend = remove
}
function remove() {
    v.Proxify(this).purge()
}
let { message, lunalapreview } = v.id
function showMessageBox(shiny) {
    if (shiny)
        lunalapreview.src = './lunalasleepshiny.gif'
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
    let asteroid = $`<div aria-hidden="true" data-type="${i}" class="asteroid${i} obj debris" style="top:${randomY()};animation:float ${40 - Math.random() * 30}s linear infinite${Math.random() > .5 ? '' : ' reverse'}, toRight ${20 + (i * 5) + (Math.random() * 20)}s linear${Math.random() > .5 ? '' : ' reverse'}"></div>`
        .setParent(background)
        .onanimationend = remove
    // if (i === 2 && Math.random() < .2) asteroid.pushNode($`<div class="cleffa obj"></div>`)
}
spawnAsteroid()
function spawnPlanet() {
    setTimeout(spawnPlanet, 30000 + (Math.random() * 1000))
    if (isHidden()) return
    let i = Math.floor(Math.random() * 12) + 1
    let asteroid = $`<div class="planet planet${i} obj debris" style="top:${randomY()};animation:float ${700 - Math.random() * 30}s linear infinite${Math.random() > .5 ? '' : ' reverse'}, toRight ${600 - (i * 4)}s linear${Math.random() > .5 ? '' : ' reverse'}"></div>`
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
    $`<div class="${pkm} obj${shiny()}" style="top: ${randomY()};animation: float 20s linear infinite${Math.random() > .5 ? '' : ' reverse'}, toRight ${40 + Math.random() * 10}s linear${Math.random() > .5 ? '' : ' reverse'}, ${slideshow};"></div>`
        .setParent(background)
}*/
let special = new Set(`hoopa_unbound hoopa_unbound_intro jirachi_intro jirachi`.split(' '))
let legendary = new Set(`mewtwo reshiram zekrom hoopa eternatus giritina2 arceus uxie azelf mesprit mew lunala rayquaza necrozma necrozma_ultra deoxys deoxys_speed deoxys_attack deoxys_defense`.split(' '))
// spawnSleepingPokemon()
function spawnPokemon() {
    setTimeout(spawnPokemon, 1600 + (Math.random() * 100))
    let regular = mons.filter(o => !special.has(o.name) && !o.name.endsWith('_idle'))
    let pkm = regular[Math.floor(Math.random() * regular.length)]
    let a = 10
    if (!pkm || isHidden()) return
    let { name } = pkm
    while (a-- && legendary.has(name) && document.querySelector(`.${name}`)) {
        pkm = regular[Math.floor(Math.random() * regular.length)]
        name = pkm.name
    }
    let i = Math.random() > .5 ? 1 : -1
    let scale = .7
    let index = 0
    let speed = 1.2
    let dur = 15
    switch (name) {
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
        case 'minior_core':
            index = Math.floor(Math.random() * 8)
        case 'minior_meteor':
        case 'poipole':
        case 'beldum':
            scale *= 2.5
            break
        case 'celesteela':
        case 'nihilego':
        case 'dusknoir':
            scale *= 3
            break
        case 'deoxys_speed':
            speed *= 3
        case 'deoxys_attack':
        case 'deoxys_defense':
        case 'deoxys':
        case 'mewtwo':
            speed *= 3
            scale *= 2.7
            break
        case 'eternatus':
            scale *= 11
            speed *= .2
            dur = 30
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
    let s = $`<cel-runner index="${index}" dura="${dur}ms" data-name="${name}" src="${pkm.src}" aria-hidden="true" class="${pkm.name} catchable${shiny()}" style="scale: ${scale} ${Math.abs(scale)};top: ${randomY()};"></cel-runner>`
    s.setParent(background)
        .animFrom('toRight', {
            duration: ((40 + Math.random() * 40) / speed) * 1000 * i,
            easing: 'linear',
            iterations: 1,
            direction: i === 1 ? 'normal' : 'reverse'
        })
        .onfinish = () => s.purge()
}
setTimeout(spawnPokemon, 300)
// showMessageBox()
async function spawnShootingStar() {
    setTimeout(spawnShootingStar, 21000 + (Math.random() * 3000))
    if (isHidden()) return
    let a =
        $`<cel-runner class="shootingstar obj" src="./shootingstar-11.png" frames-x="9" frames-y="1" dura="100ms"></cel-runner>`
    a.style.left = randomX()
    a.style.top = randomY()
    a.style.rotate = `${Math.random() * 360}deg`
    a.style.zoom = Math.random() * 1
    a.setParent(background)
    await a.until('spriteended')
    a.purge()
}
setTimeout(spawnShootingStar, 10000)