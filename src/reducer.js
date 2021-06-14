export const reducer = (state, action)=>{

    if(action.type==='ADD_ITEM'){
        const oneMeeting = [...state.meeting,action.payload]
        return{
            ...state,
            meeting:oneMeeting,
            isModalOpen:true,
            modalContent:'Meeting Added !'
        };

        

    }

    if(action.type==='NO_VALUE'){
        return{
            ...state,
            isModalOpen:true,
            modalContent:'Please Add a Meeting !!'
        };
    }

    if (action.type === 'CLOSE_MODAL') {
        return { 
            ...state, 
            isModalOpen: false 
        };
      }

    if(action.type==="REMOVE_ITEM"){
        const oldMeeting = state.meeting.filter((singleMeeting)=>singleMeeting.id !== action.payload);
        return{
            ...state,
            meeting:oldMeeting,
            isModalOpen:true,
            modalContent:'Meeting Removed'
        }
    }

    if(action.type==="UPDATE_ITEM"){
        const oldMeeting = state.meeting.filter((singleMeeting)=>singleMeeting.id !== action.payload);
        
        return{
            ...state,
            meeting:oldMeeting
        }
       
    }





 


}