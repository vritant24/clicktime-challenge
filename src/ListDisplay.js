import React from 'react';

export default function ListDisplay(props) {
    var counter = 0;
    var list = (props.list) 
    ? props.list.map(item => (
        <button 
            key={item.slug + counter++} 
            onClick={props.onClick.bind(this, item.name)}>
                {item.name}
        </button>
    ))
    : null

    return (
        <div>
            {list}
        </div>
    )
} 