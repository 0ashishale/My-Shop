import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import { login } from "../../redux/action/userAction";
import { useAlert } from "react-alert";

const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert()
const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const { isAuthenticated, error} = useSelector((state)=>state.user)
  const localSubmit = async(e)=>{
    e.preventDefault();
    dispatch(login(email, password))
  }

  useEffect(()=>{
    if(isAuthenticated){
      alert.success(`Login successfully.`)
      navigate('/')
    }
    if(error){
      alert.error(error)
    }
  }, [isAuthenticated, alert, error])

  let timer = null;
  const handleGoogle = (e) => {
    e.preventDefault();
    const redirectUrl = "http://localhost:5000/api/auth/google";

    const newWindow = window.open(
      redirectUrl,
      "_blank",
      "width=500, height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) {
            clearInterval(timer);
            navigate("/");
          }
        }
      });
    }
  };

  const handleFacebook = (e)=>{
    e.preventDefault();
    const redirect = "http://localhost:5000/api/auth/facebook";

    const  newWindow = window.open(
      redirect,
      "_blank",
      "width=500, height=600"
    )
    if(newWindow & redirect){
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) {
            clearInterval(timer);
            navigate("/");
          }
        }
      });
    }
  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src="/logo.png" alt="logo" />
            My Shop
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={localSubmit}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    autoComplete="off"

                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    autoComplete="off"
                    
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        for="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="flex items-center justify-center text-white">
                  Or, Sign In With
                </p>
                <div className="flex items-center justify-around ">
                  <a onClick={handleGoogle}>
                    {" "}
                    <button className="bg-gray-500 px-2 py-1 rounded">
                      Google
                    </button>
                  </a>

                  <Link>
                    <button
                    onClick={handleFacebook}
                     className="bg-gray-500 px-2 py-1 rounded">
                      Facebook
                    </button>
                  </Link>

                  <Link to="/auth/apple">
                    <button className="bg-gray-500 px-2 py-1 rounded">
                      Apple
                    </button>
                  </Link>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/auth/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
