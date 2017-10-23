var getBaseLayers = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/baseLayers')
    .then((res) => res.json())
    .then(res => resolve({id: 'baseLayers', arr: res}))
})

var getMixins = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/mixins')
    .then((res) => res.json())
    .then(res => resolve({id: 'mixins', arr: res}))
})

var getSeasonings = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/seasonings')
    .then((res) => res.json())
    .then(res => resolve({id: 'seasonings', arr: res}))
})

var getCondiments = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/condiments')
    .then((res) => res.json())
    .then(res => resolve({id: 'condiments', arr: res}))
})

var getShells = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/shells')
    .then((res) => res.json())
    .then(res => resolve({id: 'shells', arr: res}))
})

export default [getBaseLayers, getMixins, getSeasonings, getCondiments, getShells]