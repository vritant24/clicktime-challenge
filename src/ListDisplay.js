import React from 'react';

export default function ListDisplay(props) {
    var list = (props.list) 
    ? props.list.map(item => (
        <button key={item.slug} onClick={props.onClick.bind(this, item.slug)}>{item.name}</button>
    ))
    : null
    
    return (
        <div>
            {list}
        </div>
    )
} 