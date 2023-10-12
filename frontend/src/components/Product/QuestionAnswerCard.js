import React, {useEffect, useState} from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createAnswer, createQuestion, deleteQuestionAns } from '../../redux/action/productAction';
import { useParams } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAlert } from 'react-alert';
import { CLEAR_ERRORS, DELETE_ANSWER_RESET } from '../../redux/constants/productConstants';

const QuestionAnswerCard = ({questionAnswer}) => {
    const [open, setOpen] = useState(false)
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    const {id} = useParams()
    const alert = useAlert()
    const {user} = useSelector((state)=>state.user)
    const replayHandler = (e)=>{
        e.preventDefault()
        setOpen(true)
    }

     const submitAnswer = (e)=>{
        e.preventDefault()
        dispatch(createAnswer(questionAnswer._id, answer))
     }

     const deleteQuestionHandler = (e)=>{
        e.preventDefault()
        dispatch(deleteQuestionAns(questionAnswer._id))
     }

  return (
    <div>
        <div className='border-2 p-2'>
           <span><PersonIcon fontSize='small'/>by {questionAnswer?.name ? questionAnswer.name : 'user'} </span>
           <div className='ml-4'>
            <p className='flex justify-between items-center'>Q.  {questionAnswer?.question}   <span className={`${user?.role === 'admin' ? '': 'hidden'} `}><Button  onClick={replayHandler} fontSize='small' className='text-sm'><ReplyIcon/></Button> <Button onClick={deleteQuestionHandler}><DeleteIcon  className='text-red-700'/></Button></span></p>
           {questionAnswer?.answer &&  <p className='flex justify-between items-center'>&rarr; {questionAnswer?.answer}   </p> } 
           </div>

           <Dialog open={open}>
            <DialogContent>
                <DialogTitle>{questionAnswer?.question} </DialogTitle>
                <DialogContentText>
                    <input type="text" placeholder='answer' onChange={(e)=>setAnswer(e.target.value)} required className='outline-none' />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen(false)}>Cancle</Button>
                <Button onClick={submitAnswer}>Send</Button>
            </DialogActions>
           </Dialog>
        </div>
    </div>
  )
}

export default QuestionAnswerCard