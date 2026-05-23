
var dex /*${let a = (await Array.fromAsync(await inline('./new'), async o=>{
    let src = `./new/${o}/${o}`
    let json = JSON.parse(await inline(`${src}.json`))
    for(let anim in json) json[anim].src = `${src}-${anim}.png`
    return[o, json, `${src}.json`]
    }))
    a = (await Array.fromAsync(a.sort(async (a,b)=> {
        let [file1,file2] = await Promise.all([get(a[2]), get(b[2])])
        return file2.lastModified - file1.lastModified
    }))).map(o=>o.slice(0,2))
   return ` = ${uneval(Object.fromEntries(a))}`}*/