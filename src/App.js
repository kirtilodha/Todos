import { useEffect, useState } from 'react';
import './App.css';
import TodoLists from './TodoLists';

const getLocalItems= ()=>{
  let list = localStorage.getItem('lists');
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }
  else{
    return [];
  }
}

function App() {

  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState(getLocalItems()); 
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const itemEvent = (event)=>{
    setInputList(event.target.value);
  }; 
  const listOfItems = ()=>{
    if(!inputList){

    } else if(inputList && !toggleSubmit){
      setItems(
        items.map((elem)=>{
          if(elem.id === editItem){
            return{...elem, name:inputList}
          }
          return elem;
        })
      )
      setInputList("");
      setToggleSubmit(true);
      setEditItem(null);
    }
    else{
      const allInputData= { id: new Date().getTime().toString(), name:inputList} 
      setItems((oldItems) =>{
        return [...oldItems, allInputData];
      });
      setInputList("");
    }
    
  }
  const deleteItems = (id)=>{
    setItems((oldItems)=>{
      return oldItems.filter((arrElement)=>{
        return arrElement.id !==id; //return the rest whose index are not same
      });
    });
  }
  const editItems = (id)=>{
    let newEditItem = items.find((elem)=>{
      return elem.id === id
    });
    setToggleSubmit(false);
    setInputList(newEditItem.name);
    setEditItem(id);
  }
  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

  return (
    <div className="App">
      <br />
      <h1>ToDo List</h1>
      <br />
      <input type="text" placeholder="Add a Item" 
      value={inputList} onChange={itemEvent} />
      {
        toggleSubmit? <button onClick={listOfItems}> + </button>:
        <i className="fa fa-edit" aria-hidden="true" onClick={listOfItems}
        ></i>
      }
      
      <ol>
        {items.map( (itemval)=>{
          return <TodoLists 
          text = {itemval.name}
          key={itemval.id} 
          id={itemval.id}
          onSelect= {deleteItems}
          onEdit= {editItems}
          />
        })}
      </ol>
    </div>
  );
}

export default App;
{/* <a target="_blank" href="https://icons8.com/icon/4wdW5kwPV8dT/to-do-list">To Do List</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}