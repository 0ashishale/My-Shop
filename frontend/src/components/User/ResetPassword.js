import React, { useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/action/userAction";
import { useLocation, useNavigate } from "react-router-dom";
import { CLEAR_ERRORS, RESET_PASSWORD_RESET } from "../../redux/constants/userConstants";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isVerified, error , loading} = useSelector((state) => state.otp);

  const [otp, setOtp] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email") || "";

  const handleChange = (val) => {
    setOtp(val);
  };
  const handleForm = (e) => {
    e.preventDefault();
    if (confirmPassword.length < 7) {
      setVisible(true);
    }
    if (newPassword !== confirmPassword) {
      alert.error(`New Password and Confirm Password does not matched`);
    } else {
      dispatch(resetPassword(email, confirmPassword, otp))
    }
  };

  useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch({type : CLEAR_ERRORS})
    }
    if(isVerified){
        alert.success(`Password Reset Successfully`)
        dispatch({type : RESET_PASSWORD_RESET})
        navigate('/auth/login')
    }
  }, [dispatch, isVerified, error])
  return (
    <div className="h-[100vh] w-72 mx-auto gap-5 md:gap-10 flex flex-col justify-center items-center ">
      <Typography variant="h6">Enter OTP</Typography>
      <MuiOtpInput value={otp} onChange={handleChange} />
      <div className="flex flex-col gap-5 border-2 items-center py-3 w-full">
        <Typography variant="h6">Reset Password</Typography>
        <form
          action=""
          onSubmit={handleForm}
          className="flex flex-col gap-5 mt-5"
        >
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            type="password"
            placeholder="New Password"
            className="outline-none border-2 w-64 px-2 py-1"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type="password"
            placeholder="Confirm Password"
            className="outline-none border-2 w-64 px-2 py-1"
          />
          {visible && (
            <span className="text-[12px] text-red-500">
              Password must contain at least 8 characters
            </span>
          )}
          <Button disabled={loading ? true : false} className="!bg-orange-300 !text-black !px-4" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
