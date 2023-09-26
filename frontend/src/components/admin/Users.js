import React, { useEffect , useMemo, useState} from 'react'
import DashboardLayout from './DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../../redux/action/adminAction'
import { Avatar, Button, Typography, gridClasses } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'

import UserActions from './UserActions'

import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { useAlert } from 'react-alert'
import { DELETE_USER_RESET } from '../../redux/constants/adminContants'


const Users = () => {
const dispatch = useDispatch()
const alert = useAlert()

const {users, error } = useSelector((state)=>state.users)

const { isDeleted, error : deleteError} = useSelector((state)=>state.profile)


const deleteUserHandler = (id) =>{
      
  const shouldDelete = window.confirm(`Are you sure you want to delete?`)

  if(shouldDelete){

    dispatch(deleteUser(id))
  }
}

useEffect(()=>{
  dispatch(getAllUsers())
  if(isDeleted){
    alert.success(`User deleted successfully.`)
    dispatch({type : DELETE_USER_RESET})
  }

  if(error){
      alert.error(error)
  }
  if(deleteError){
    alert.error(deleteError)
}
}, [dispatch, error, alert, deleteError, isDeleted]);

    const columns =useMemo(()=> [
      { field: 'id', headerName: 'ID', width: 200, flex : 1 },
      {
          field : 'avatar',
          headerName : "Avatar",
          editable : false,
          sortable : false,
          renderCell: ({ value }) => (
              <Avatar src={value?.url} alt="Product" style={{ maxWidth: '100%', maxHeight: '100px' }} />
          ),

      },
     
      {
        field: 'name',
        headerName: 'Name',
        width: 150,
        flex: 0.6
      
      },
      {
        field: 'number',
        headerName: 'Phone Number',
        width: 150,
        editable : true
        
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        width: 160,
        flex:1
        
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['user', 'seller', 'admin'],
        editable : true
      },
      {
        field : 'createdAt',
        headerName : 'Created At',
        type : 'date',
        flex : 0.6
      },
      {
        field : 'action',
        headerName : 'Action',
        type :'actions',
        width : 200,
        sortable : false,
        renderCell : (params) => {
          const {row} = params;
  
              return (
                  <>
                      <Link to={`/admin/user/${row.id}`}>
                          <Edit />
                      </Link>
  
                      <Button onClick={()=>deleteUserHandler(row.id)}>
                          <Delete/>
  
                      </Button>
                  </>
              )
          }
        
      }
    ]);
    
    const rows = [];

    users && users.forEach(i => {
      rows.push({
        id : i._id,
        name : i.name,
        email : i.email,
        number : i.number,
        role : i.role,
        avatar : i.avatar,
        createdAt : new Date(i.createdAt)
      })
    });


  return (
    <DashboardLayout>

      <div>
      <Box sx={{ height: 500, width: '100%' }}>
        <Typography variant='h3' component='h3'
        sx={{textAlign: 'center', mt:3, mg:3 }}
        >Manage Users</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowSpacing={params =>({
          top : params.isFirstVisible ? 0 :5,
          bottom : params.isLastVisible ? 0 :5
        })}

      />
    </Box>
      </div>
    </DashboardLayout>
  )
}

export default Users