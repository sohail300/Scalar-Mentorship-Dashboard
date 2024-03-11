import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from './Loader'
import { BACKEND_URL } from '../utils/config';

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [photo, setPhoto] = useState('');
  const [idea, setIdea] = useState(0);
  const [execution, setExecution] = useState(0);
  const [viva, setViva] = useState(0)
  const [total, setTotal] = useState(0)

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
    const result = await axios.post(`${BACKEND_URL}/api/mentor/assign-marks`, {
      idea, execution, viva, studentId
    })
    alert(result.data.msg)
  }

  async function getData() {
    const response = await axios.get(`${BACKEND_URL}/api/student/profile/${studentId}`)
    setName(response.data.name)
    setEmail(response.data.email)
    setNumber(response.data.number)
    setPhoto(response.data.photo)
  }

  async function getMarks() {
    const response = await axios.get(`${BACKEND_URL}/api/student/marks/${studentId}`)
    setIdea(response.data.idea)
    setExecution(response.data.execution)
    setViva(response.data.viva)
    setTotal(Number(response.data.idea) + Number(response.data.execution) + Number(response.data.viva));
    setIsLoading(false);
  }

  async function unassignStudent() {
    const response = await axios.post(`${BACKEND_URL}/api/mentor/unassign-student`, {
      studentId
    })
    alert(response.data.msg)
    console.log(response.data.msg)
    if (response.data.msg == 'Unassigned!') {
      navigate('/my-student')
    }
  }

  useEffect(() => {
    getData();
    getMarks();
  }, [])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className=" ml-8 w-3/4">
      <h1 className=" font-bold mb-8" style={{ fontSize: '40px' }}>STUDENT PROFILE</h1>
      <div className=' flex flex-row mb-16 justify-between'>
        <div className="  mr-4 flex flex-row items-center px-8 py-4 mx-12 rounded-xl shadow-[0_25px_40px_-15px_rgba(0,0,0,0.5)] border border-black">
          <div className=' mr-8'>
            <img src={photo} alt="" className=" rounded-full h-24 w-24 object-cover" />
          </div>
          <div className=" flex flex-col justify-center">
            <div>{name}</div>
            <div>{email}</div>
            <div>{number}</div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col ">

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

          <div className=" flex flex-col">
            <label htmlFor="">Total</label>
            <input type="number" className=" border rounded-md p-2  " onChange={handleTotal} value={total} disabled />
          </div>
        </div>

        <div className=" flex flex-row justify-evenly mb-8">
          <div className=" cursor-pointer rounded-md bg-green text-white py-2 px-4 ml-4 text-center" onClick={() => updateProfile()}>UPDATE</div>
          <div className='  w-1/4'>
            <div
              onClick={() => unassignStudent()} className="cursor-pointer rounded-md bg-red text-center text-white p-2" >UNASSIGN STUDENT</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile