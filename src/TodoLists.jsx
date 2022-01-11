import React from 'react';
import './App.css';

const TodoLists = (props)=>{
    return(
        <>
        <div className='todo_style'>
        <i className="fa fa-edit" aria-hidden="true"
            onClick={()=>{
                props.onEdit(props.id);
            }}
        ></i>
        <i className="fa fa-trash" aria-hidden="true"
            onClick={()=>{
                props.onSelect(props.id);
            }}
        ></i>
        <li>{props.text}</li>
        
        </div>
        </>
        
    );
};
export default TodoLists;