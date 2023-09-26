import { Box, Button, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import DashboardLayout from "./DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateUser } from "../../redux/action/adminAction";
import { CLEAR_ERRORS, UPDATE_USER_RESET } from "../../redux/constants/adminContants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRole = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const [role, setRole] = useState('user')
    const {id} = useParams()

    const {error, isUpdated, loading} = useSelector((state)=>state.profile)

    const handleSubmit = (e) => {
        e.preventDefault();
           dispatch(updateUser(id, role))
        
    }

 const handleChange = (e)=>{
  setRole(e.target.value)
 }

  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch({type : CLEAR_ERRORS})
    }

    if(isUpdated){
        alert.success(`User role updated successfully as ${role}`);
        dispatch({type : UPDATE_USER_RESET})
        navigate('/admin/users');

    }
  }, [dispatch, error, isUpdated, alert])
  return (
    <DashboardLayout>
      <form action="" onSubmit={handleSubmit} >
        <Box sx={{textAlign :'center'}}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h5"
            component={"h5"}
          >
            Update User Role
          </Typography>
          <div className="p-5 flex flex-col text-xl">
            <div className="h-32">

            <label htmlFor="role" className="p-2">Role</label>
            <select name="role" id="" value={role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            </div>
            <Button type="submit" value="Update Role" > <button disabled={loading ? true : false} className="bg-green-500 hover:bg-green-600 p-2 rounded text-white">Update Role</button></Button>
          </div>
          </Box>
      </form>
    </DashboardLayout>
  );
};

export default UpdateRole;
