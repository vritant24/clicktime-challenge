import React    from 'react'
import styled   from 'styled-components'

export default function ListDisplay(props) {
    var counter = 0;
    var list = (props.list) 
    ? props.list.map(item => (
        <SelectButton
            active = {props.active === item.name} 
            key={item.slug + counter++} 
            onClick={props.onClick.bind(this, item.name)}>
                {item.name}
        </SelectButton>
    ))
    : null

    return (
        <div>
            {list}
        </div>
    )
} 

var SelectButton = styled.button`
overflow: hidden;

color: ${props => props.active ? '#eee' : '#222'};
background: ${props => props.active ? '#444' : '#eee'};;

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
    background: #777;
    color: #eee;
  }
  
&:active {
    transition: all 60ms ease;
    opacity: .75;
    background: #222;
    color: #eee;
}

&:focus {
    outline: 1px dotted white;
    outline-offset: -4px;
    background: #222;
    color: #eee;
}
`;