import { Box, CircularProgress, Fab } from '@mui/material'
import React, { useState } from 'react'
import Check from '@mui/icons-material/Check'
import Save from '@mui/icons-material/Save'
import green from '@mui/material/colors/green';
import { useParams } from 'react-router-dom';


const UserActions = ({row, rowId, setRowId}) => {

    const {loading, setLoading} = useState(false)
    const {success, setSuccess} = useState(false)

    console.log(rowId, row.id);

    const handleSubmit = () =>{

    }
  return (
    <Box
        sx={{m:1, position : 'relative'}}
    >
        {success ? (
            <Fab
         
                sx={{
                    width : 40,
                    height : 40,
                    bgcolor : green[500],
                    '&:hover' : {bgcolor : green[700]}
                }}
            >

                <Check />
            </Fab>
         ) : (
         <Fab
         sx={{width : 40,
        height :40}}
        disabled = {row.id !== rowId || loading}
        onClick={handleSubmit}
         >
                     <Save />   
         </Fab>)}

         {loading && (
            <CircularProgress
            size = {52}
                sx={{
                    color : green[500],
                    position : 'absolute',
                    top : -6,
                    left : -6,
                    zIndex : 1
                }}
            />
         )}

    </Box>
  )
}

export default UserActions