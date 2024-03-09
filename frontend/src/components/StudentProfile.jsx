import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isMentorLoggedInState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import Login from "./Login";

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [mentorId, setMentorId] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [idea, setIdea] = useState(0);
  const [execution, setExecution] = useState(0);
  const [viva, setViva] = useState(0)
  const [total, setTotal] = useState(0)
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);

  function handleIdea(e) {
    setIdea(e.target.value);
  }

  function handleExecution(e) {
    setExecution(e.target.value);
  }

  function handleViva(e) {
    setViva(e.target.value);
  }

  function handleTotal(e) {
    setTotal(idea + execution + viva);
  }

  async function updateProfile() {
    const result = await axios.post('http://localhost:3000/api/mentor/assign-marks', {
      idea, execution, viva, studentId
    }, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(result.data);
  }

  async function getData() {
    const response = await axios.get(`http://localhost:3000/api/student/profile/${studentId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    setName(response.data.name)
    setEmail(response.data.email)
    setNumber(response.data.number)
  }

  async function getMarks() {
    const response = await axios.get(`http://localhost:3000/api/student/marks/${studentId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    setIdea(response.data.idea)
    setExecution(response.data.execution)
    setViva(response.data.viva)
    setTotal(Number(response.data.idea) + Number(response.data.execution) + Number(response.data.viva));
  }

  async function unassignStudent() {
    const response = await axios.post(`http://localhost:3000/api/mentor/unassign-student`, {
      studentId
    }, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    navigate('/my-student')
  }

  async function getMentorId() {
    const response = await axios.get('http://localhost:3000/api/auth/mentor-profile', {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    setIsLoading(false);
    setMentorId(response.data.id)
  }

  useEffect(() => {
    getData();
    getMarks();
    getMentorId();
  }, [])

  if (!isMentorLoggedIn) {
    return (
      <Login />
    )
  }

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className=" ml-8 w-3/4">
      <h1 className=" font-bold mb-8" style={{ fontSize: '40px' }}>STUDENT PROFILE</h1>
      <div className=' flex flex-row items-center px-8 py-4 mx-12 mb-16 border'>
        <div className='rounded-full bg-black h-24 w-24 mb-4 mr-4'></div>
        <div className=" flex flex-col justify-center">
          <div>{name}</div>
          <div>{email}</div>
          <div>{number}</div>
        </div>
      </div>

      <div className=" flex flex-col border">

        <div className=" flex flex-row justify-evenly mb-8">
          <div className=" flex flex-col">
            <label htmlFor="">Idea (out of 10)</label>
            <input type="number" className=" border rounded-md p-2  " onChange={handleIdea} value={idea} />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="">Execution (out of 10)</label>
            <input type="number" className=" border rounded-md p-2  " onChange={handleExecution} value={execution} />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="">Viva (out of 10)</label>
            <input type="number" className=" border rounded-md p-2  " onChange={handleViva} value={viva} />
          </div>
        </div>

        <div className=" flex flex-row justify-evenly mb-8">
          <div className=" flex flex-col">
            <label htmlFor="">Total</label>
            <input type="number" className=" border rounded-md p-2  " onChange={handleTotal} value={total} />
          </div>
          <div className=" cursor-pointer rounded-md bg-red py-2 px-4 ml-4 text-center" onClick={() => updateProfile()}>UPDATE</div>
        </div>
        <span
          className=' cursor-pointer rounded-md bg-red p-2 text-center text-white'
          onClick={() => unassignStudent()}>Unassign Student</span>
      </div>
    </div>
  )
}

export default StudentProfile