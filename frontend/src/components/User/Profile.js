import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../redux/action/userAction";
import { CLEAR_ERRORS } from "../../redux/constants/adminContants";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [isEditing, setIsEditing] = useState(false);
  // const [name, setName] = useState(user?.name);
  // const [email, setEmail] = useState(user?.email);
  // const [number, setNumber] = useState(user?.number);
  // const [avatar, setAvatar] = useState(user?.avatar);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [image, setImage] = useState();

  const [userData, setUserData] = useState({
    name : user.name,
    email : user?.email,
    number : user?.number,
    avatar : null
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding property in the userData object
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const updateAvatar = (e) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar: reader.result, // Update the avatar property with the file object
        }));
      }
    };
    
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
   
    };

    const updateProfileHandler = (e) => {
     e.preventDefault()
      setIsEditing(false);
      dispatch(updateProfile(user?._id, userData));
    };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
    if (isUpdated) {
      alert.success(`User updated successfully`);
      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch(loadUser())
    }
  }, [dispatch, alert, isUpdated, error, user]);
  return (
    <div>
      <div className="Frame2 md:w-[90%] mx-auto h-96">
        <div className="AshishSProfile text-center mt-10 mb-10  text-black text-4xl font-normal font-['Inter'] underline">
          {user?.name}’s Profile
        </div>
        <div className="Frame8 p-10 flex md:flex-row md:w-[90%] gap-10 md:gap-1 justify-around flex-col mx-auto">

          <div className="Frame7 w-72 h-96 flex-col justify-between items-center inline-flex">
            <img
              className="D4d29dfe018bbdf6906b1814c17e221 w-full h-80 rounded-3xl"
              src={image ? image : user?.avatar?.url}
              alt={user?.name}
            />

            {isEditing ? (
              <div className="m-3 mx-auto">
                {" "}
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateAvatar}
                />{" "}
              </div>
            ) : (
              <></>
            )}
            <div className="Frame5 w-full bg-violet-900 rounded-lg justify-center items-center gap-2.5 inline-flex">
              <div className="EditProfile py-1 text-white text-base font-normal font-['Inter']">
                {isEditing ? (
                  <button
                    disabled={loading ? true : false}
                    onClick={(e) => updateProfileHandler(e)}
                  >
                    Save Profile
                  </button>
                ) : (
                  <button onClick={handleEditing}>Edit Profile</button>
                )}
              </div>
            </div>
          </div>
          <div className="Frame3 md:w-[50%] h-96 flex flex-col justify-between p-4 gap-8  bg-stone-300 rounded-2xl">
            <div className="flex flex-col gap-3">
              <div className="Id123456789 ">
                <span className="text-neutral-600 text-2xl font-medium font-['Inter'] underline">
                  Id
                </span>
                <span className="text-neutral-600 text-2xl font-normal font-['Inter']">
                  :{" "}
                </span>
                <span className="text-neutral-600 text-xl font-normal font-['Inter']">
                  #{user?._id}
                </span>
              </div>
              <div className="">
                <h3 className="FullName  text-black text-xl font-medium font-['Inter'] underline">
                  {" "}
                  Full Name:
                </h3>
                {isEditing ? (
                  <input
                    name="name"
                    type="text"
                    value={userData.name}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <span className="text-neutral-600 text-xl font-normal font-['Inter'] ml-3">
                    {user?.name}
                  </span>
                )}
              </div>
              <div className="">
                <h3 className="FullName  text-black text-xl font-medium font-['Inter'] underline">
                  {" "}
                  Email:
                </h3>
                {isEditing ? (
                 <input
                 name="email"
                 type="email"
                 value={userData.email}
                 placeholder="Please Update your email"
                 onChange={handleChange}
                className="w-full"
               />
                ) : (
                  <span className="text-neutral-600 text-xl font-normal font-['Inter'] ml-3">
                    {user?.email}
                  </span>
                )}
              </div>
              <div className="">
                <h3 className="FullName  text-black text-xl font-medium font-['Inter'] underline">
                  {" "}
                  Number:
                </h3>
                {isEditing ? (
                  <input
                    name="number"
                    type="number"
                    value={userData.number}
                    placeholder="Please Update your number"
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <span className="text-neutral-600 text-xl font-normal font-['Inter']  ml-3">
                    {user?.number ? user?.number : "Please update your number"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="Frame5 bg-violet-900 rounded-lg justify-center items-center gap-2.5 inline-flex">
                <div className="MyOrders py-1 text-white text-base font-normal font-['Inter']">
                  <Link to='/my-orders'>My Orders</Link> 
                </div>
              </div>
              <div className={`Frame6 bg-violet-900 rounded-lg justify-center items-center gap-2.5 inline-flex ${user?.provider ? 'hidden' : ''}`}>
                <div className="ChangePassword py-1 text-white text-base font-normal font-['Inter']">
                 <Link to='/update-password' >Change Password</Link> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
