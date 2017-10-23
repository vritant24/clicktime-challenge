var getBaseLayers = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/baseLayers')
    .then((res) => res.json())
    .then(res => resolve({id: 'baseLayers', arr: res}))
    .catch(err => console.log(err))
})

var getMixins = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/mixins')
    .then((res) => res.json())
    .then(res => resolve({id: 'mixins', arr: res}))
    .catch(err => console.log(err))
})

var getSeasonings = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/seasonings')
    .then((res) => res.json())
    .then(res => resolve({id: 'seasonings', arr: res}))
    .catch(err => console.log(err))
})

var getCondiments = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/condiments')
    .then((res) => res.json())
    .then(res => resolve({id: 'condiments', arr: res}))
    .catch(err => console.log(err))
})

var getShells = new Promise((resolve, reject) => {
    fetch('https://tacos-sayjfycwsy.now.sh/shells')
    .then((res) => res.json())
    .then(res => resolve({id: 'shells', arr: res}))
    .catch(err => console.log(err))
})

export default [getBaseLayers, getMixins, getSeasonings, getCondiments, getShells]