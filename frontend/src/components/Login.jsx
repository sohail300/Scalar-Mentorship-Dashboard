import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    const result = await axios.post('/auth/login', {
      "username": username,
      "password": password
    })
    // setUser(result.data.user);
    // localStorage.setItem('token', result.data.token);
    // navigate('/dashboard')
  }

  return (
    <>
      <div className=" border bg-blue rounded-xl ml-8 w-3/4 py-16">
        <div className="flex flex-col justify-center items-center">
          <h1 className=" font-bold text-white mb-8" style={{ fontSize: '64px' }}>LOGIN</h1>
          <div className='flex flex-col justify-center items-center'>
            <input type="text" className=" bg-transparent border-white border-2 rounded-md p-2 mb-8 placeholder:text-white" placeholder="USERNAME" onChange={handleUsername} value={username} />
            <input
              type="password"
              className=" bg-transparent border-white border-2 rounded-md p-2 mb-8 placeholder:text-white" onChange={handlePassword}
              placeholder="PASSWORD" value={password}
            />
            <input
              className=' cursor-pointer rounded-md bg-red w-full p-2 '
              type="submit"
              id="login"
              value="LOGIN"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
