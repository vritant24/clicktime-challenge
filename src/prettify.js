var baseLayer = (base) => (
    (base) ? `${base} as the base, ` : ''
)

var mixin = (mixin) => (
    (mixin) ? `mixed with ${mixin}, ` : ''
)

var seasoning = (season) => (
    (season) ? `flavoured with ${season}, ` : ''
)

var condiment = (cond) => (
    (cond) ? `topped with ${cond}. ` : ''
)

var shell = (shell) => (
    (shell) ? `with the shell made of ${shell}, ` : ''
)

var getTaco = (taco) => {
    var a  = shell(taco.shells)
    var b  = baseLayer(taco.baseLayers)
    var c  = mixin(taco.mixins)
    var d  = seasoning(taco.seasonings)
    var e  = condiment(taco.condiments)

    return 'A delicious taco ' + a + b + c + d + e
}

export default getTaco.bind(this)
