import React, { Component }   from 'react'
import ListDisplay            from './ListDisplay'
import api                    from './api-com'
import getTaco                from './prettify'
import styled                 from 'styled-components'

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
    if(this.state.baseLayers && this.state.condiments && this.state.mixins && this.state.seasonings && this.state.shells) {
      this.tacos.push(getTaco(this.state))
      this.rerender()
    }
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
            <Ingredient>{ingredient}</Ingredient>
            <ListDisplay 
              active={this.state[ingredient]}
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
                    <TacoText>{taco}</TacoText>
                    <SelectButton color={'#eee'} background={"red"} onClick={this.deleteTaco.bind(this, idx)}>X</SelectButton>
                  </div>
                )) 
                : null

    return (
      <div>
        {list}
        <SelectButton color={'#eee'} background={"#27b06c"} onClick={this.onSubmit.bind(this)}>submit</SelectButton>
        <SelectButton color={'#eee'} background={"#1e7c9f"} onClick={this.randomTaco.bind(this)}>suprise me</SelectButton>
        {tacos}
      </div>
    )
  }
}

var Ingredient = styled.h2`
  color: #333;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;

  margin : 5px;
`;

var TacoText = styled.h3`
  display: inline-block;
  color: #333;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.3;
  padding: 8px;
  background: #eee;
  margin : 5px;
`;

var SelectButton = styled.button`
overflow: hidden;

color: ${props => props.color};
background: ${props => props.background};

margin: 5px;
padding: 12px 12px;

cursor: pointer;
user-select: none;
transition: all 60ms ease-in-out;
text-align: center;
white-space: nowrap;
text-decoration: none !important;
text-transform: none;
text-transform: capitalize;

border: 0 none;
border-radius: 4px;

font-size: 11px;
font-weight: 500;
line-height: 1.3;

-webkit-appearance: none;
-moz-appearance:    none;
appearance:         none;

justify-content: center;
align-items: center;
flex: 0 0 160px;

&:hover {
    transition: all 60ms ease;
    border: 2px solid #000000;
  }
  
&:active {
    transition: all 60ms ease;
    opacity: .75;
    border: 2px solid #000000;

&:focus {
    outline: 1px dotted white;
    outline-offset: -4px;
}
`;