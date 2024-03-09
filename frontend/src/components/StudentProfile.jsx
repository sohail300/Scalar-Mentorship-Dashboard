import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
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
    <div className=" ml-8 w-3/4">
      <h1 className=" font-bold mb-8" style={{ fontSize: '40px' }}>STUDENT PROFILE</h1>
      <div className=' flex flex-row items-center px-8 py-4 mx-12 mb-16 border'>
        <div className='rounded-full bg-black h-24 w-24 mb-4 mr-4'></div>
        <div className=" flex flex-col justify-center">
          <div>Mentor1</div>
          <div>mentor1@scalar.com</div>
          <div>+91 1234567890</div>
        </div>
      </div>

      <div className=" flex flex-col border">

        <div className=" flex flex-row justify-evenly mb-8">
          <div className=" flex flex-col">
            <label htmlFor="">Idea (out of 10)</label>
            <input type="text" className=" border rounded-md p-2  " onChange={handleUsername} value={username} />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="">Execution (out of 10)</label>
            <input type="text" className=" border rounded-md p-2  " onChange={handleUsername} value={username} />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="">Viva (out of 10)</label>
            <input type="text" className=" border rounded-md p-2  " onChange={handleUsername} value={username} />
          </div>
        </div>

        <div className=" flex flex-row justify-evenly mb-8">
          <div className=" flex flex-col">
            <label htmlFor="">Total</label>
            <input type="text" className=" border rounded-md p-2  " onChange={handleUsername} value={username} />
          </div>
          <div className=" cursor-pointer rounded-md bg-red py-2 px-4 ml-4 text-center">UPDATE</div>
        </div>
        <span
          className=' cursor-pointer rounded-md bg-red p-2 text-center text-white'
          onClick={handleLogin}
        >Unassign Student</span>
      </div>
    </div>
  )
}

export default StudentProfile