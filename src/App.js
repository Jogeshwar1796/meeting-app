import React, { useState,useReducer} from 'react';
import {reducer} from './reducer'
import Modal from './Modal'
import {FaTrash } from 'react-icons/fa'
import {BiEdit } from 'react-icons/bi'



function App() {

  const initialState = {
    meeting:[],
    isModalOpen:false,
    modalContent:'',
    
  }
  

  const[form,setForm] = useState({meetingName:'',location:''})
  const [state, dispatch] = useReducer(reducer, initialState)
  const[isEditing,setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null);
  

  const handleChange=(e)=>{
    const name= e.target.name
    const value = e.target.value
    setForm({...form,[name]:value})
    
  }

  const editItem = (id)=>{
    const specificItem = state.meeting.find((item)=>item.id===id)
    setIsEditing(true)
    setEditID(id)
    setForm(specificItem)
    
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    if(!form.meetingName&&!form.location){
      dispatch({ type: 'NO_VALUE' })


    }
    if(form.meetingName&&form.location){
      const newMeeting = {...form,id: new Date().getTime().toString()}
      dispatch({type:'ADD_ITEM',payload:newMeeting})
      editItem(
        dispatch({type:'UPDATE_ITEM'})
      )
      
      setForm({meetingName:'',location:''})
          
    }


    setEditID(null);
    setIsEditing(false)


  }


  const closeModal = ()=>{
    dispatch({ type: 'CLOSE_MODAL' });
  }

  return(
      <>
        {state.isModalOpen && (<Modal closeModal={closeModal} modalContent={state.modalContent}/>)}
        <div className="container">
          <form className='form' onSubmit={onSubmit}>
              <div className='form-control'>
                <label htmlFor='meetingName'>Meeting Name: </label>
                <input
                  type='text'
                  id='meetingName'
                  name='meetingName'
                  value={form.meetingName}
                  onChange={handleChange}
                />
              </div>
              <div className='form-control'>
                <label htmlFor='location'>Location : </label>
                <input
                  type='text'
                  id='location'
                  name='location'
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div className="main-btn">
                <button type='submit' onClick={onSubmit}>{isEditing ?'Update Meeting':'Add Meeting'}</button>
              </div>
            </form>   
        </div>
        {state.meeting.map((singleMeeting)=>{
              const { id, meetingName, location} = singleMeeting;
              return(
                <div className="item" key={id}>
                  <div className="meeting">
                    <h4>{meetingName}</h4>
                    <h4>{location}</h4>
                  </div>
                  <div className="icons">
                    <FaTrash className="delete-icon" onClick={()=>dispatch({type:'REMOVE_ITEM',payload:id})}/>
                    <BiEdit className="edit-icon" onClick={()=>editItem(id)}/>
                  </div>  
                </div>
              )
            })} 
      </>

  )

}

export default App










