import React, { Component }   from 'react'
import ListDisplay            from './ListDisplay'
import api                    from './api-com'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.assembly = null
    this.state = {
      fetchedAssembly: false
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
      this.setState({
        fetchedAssembly: true
      })
    })
  }

  onSelectIngredient(ingredient, item) {
    console.log("=====")
    console.log(ingredient)
    console.log(item)
    console.log("=====")
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
    return (
      <div>
        {list}
      </div>
    )
  }
}