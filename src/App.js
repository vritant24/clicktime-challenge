import React, { Component }   from 'react'
import ListDisplay            from './ListDisplay'
import api                    from './api-com'
import getTaco                from './prettify'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.assembly = null
    this.tacos = []
    this.state = {
      update          : 0,
      baseLayers      : null,
      mixins          : null,  
      seasonings      : null,
      condiments      : null,
      shells          : null
    }
  }

  extractResponseToAssembly(values) {
    var obj = values.reduce((acc, curr) => {
      acc[curr.id] = curr.arr
      return acc
    }, {})
    this.assembly = {
      baseLayers  : obj.baseLayers,
      mixins      : obj.mixins,
      seasonings  : obj.seasonings,
      condiments  : obj.condiments,
      shells      : obj.shells
    }
  }

  componentWillMount() {
    Promise.all(api).then(values => {
      this.extractResponseToAssembly(values)
      this.rerender()
    })
  }

  rerender() {
    this.setState((prev) => ({
      update : ++prev.update
    }))
  }

  onSelectIngredient(ingredient, item) {
    this.setState({
      [ingredient] : item
    })
  }

  deleteTaco(index) {
    this.tacos.splice(index, 1)
    this.rerender()
  }

  onSubmit() {
    console.log(this.state)
    this.tacos.push(getTaco(this.state))
    this.rerender()
  }

  randomTaco() {
    var taco = {};
    for(var item in this.assembly) {
      if(item === 'update') continue
      taco[item] = this.assembly[item][Math.floor(Math.random() * this.assembly[item].length)].name
    }
    this.tacos.push(getTaco(taco))
    this.rerender()
  }

  render() {
    console.log(this.assembly)
    var list = [];
    if(this.assembly) {
      for(var ingredient in this.assembly) {
        list.push(
          <div key={ingredient}>
            <ListDisplay 
              list={this.assembly[ingredient]} 
              onClick={this.onSelectIngredient.bind(this, ingredient)}/>
            <br/>
          </div>
        )
      }
    }

    var counter = 0;
    var tacos = (this.tacos) 
                ? this.tacos.map((taco, idx) => (
                  <div key={counter++}>
                    <h3>{taco}</h3>
                    <button onClick={this.deleteTaco.bind(this, idx)}>X</button>
                  </div>
                )) 
                : null

    return (
      <div>
        {list}
        <button onClick={this.onSubmit.bind(this)}>submit</button>
        {tacos}
      </div>
    )
  }
}