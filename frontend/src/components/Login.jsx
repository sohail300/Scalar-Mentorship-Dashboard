import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMentorLoggedInState } from "../store/atoms/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setIsMentorLoggedIn = useSetRecoilState(isMentorLoggedInState);
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    const result = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password
    })
    localStorage.setItem('token', result.data.token);
    setIsMentorLoggedIn(true);
    console.log(isMentorLoggedIn)
    navigate('/my-student');
  }

  return (
    <>
      <div className=" border bg-blue rounded-xl ml-8 w-3/4 py-16">
        <div className="flex flex-col justify-center items-center ">
          <h1 className=" font-bold text-white mb-8" style={{ fontSize: '64px' }}>LOGIN</h1>
          <div className='flex flex-col justify-center items-center '>
            <input type="text" className=" bg-transparent border-white border-2 rounded-md p-2 mb-8 placeholder:text-white" placeholder="USERNAME" onChange={handleEmail} value={email} />
            <input
              type="password"
              className=" bg-transparent border-white border-2 rounded-md p-2 mb-8 placeholder:text-white" onChange={handlePassword}
              placeholder="PASSWORD" value={password}
            />
            <input
              className=' cursor-pointer rounded-md bg-red w-full p-2 '
              type="submit"
              value="LOGIN"
              onClick={handleLogin}
            />
          </div>
          <div className=" flex flex-row justify-between w-3/4 mt-8">
            <div>
              <div>Mentor 1 Email: mentor1@scalar.com</div>
              <div>Mentor 1 Password: mentor1</div>
            </div>
            <div>
              <div>Mentor 1 Email: mentor2@scalar.com</div>
              <div>Mentor 1 Password: mentor2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
