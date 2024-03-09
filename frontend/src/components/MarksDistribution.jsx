import { useRecoilValue } from "recoil";
import Login from "./Login";
import { isMentorLoggedInState } from "../store/atoms/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from './Loader'
import { BACKEND_URL } from '../utils/config';

const MarksDistribution = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);
  console.log(isMentorLoggedIn)
  const [mentorId, setMentorId] = useState('')
  const [myStudents, setMyStudents] = useState([])

  async function getMarkedStudents() {
    const response = await axios.get(`${BACKEND_URL}/api/mentor/get-marked-students/${mentorId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    setMyStudents(response.data.students)
    setIsLoading(false);
  }

  async function getMentorId() {
    const response = await axios.get('${BACKEND_URL}/api/auth/mentor-profile', {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    setMentorId(response.data.id)
  }

  async function studentProfile(studentId) {
    navigate(`/profile/${studentId}`)
  }

  useEffect(() => {
    getMentorId();
  }, [])

  useEffect(() => {
    getMarkedStudents();
  }, [mentorId])

  if (!isMentorLoggedIn) {
    return (
      <Login />
    )
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <div className=' ml-8 w-3/4'>
      <h1 className=" font-bold mb-8" style={{ fontSize: '40px' }}>MARKS DISTRIBUTION</h1>
      <div className='grid grid-cols-3'>
        {
          myStudents == null ? 'No Marked Students' :
            (
              myStudents.map((item) => {
                return (
                  <div key={item._id} className=' flex flex-col items-center justify-center px-8 py-8 mx-12 mb-16 rounded-2xl shadow-[0_25px_40px_-15px_rgba(0,0,0,0.5)] border border-black'>
                    <div className='mb-4 '>
                    <img src={item.photo} alt="" className=' rounded-full h-24 w-24 object-cover'/>
                    </div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                    <div>{item.number}</div>
                    <div className="bg-green  rounded-md py-2 mt-12 w-full">
                      <div className="text-center cursor-pointer text-white" onClick={() => studentProfile(item._id)}>Visit Profile</div>
                    </div>
                  </div>
                )
              })
            )
        }
      </div>
    </div>
  )
}

export default MarksDistribution