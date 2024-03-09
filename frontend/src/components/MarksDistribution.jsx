import { useRecoilValue } from "recoil";
import Login from "./Login";
import { isMentorLoggedInState } from "../store/atoms/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MarksDistribution = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);
  console.log(isMentorLoggedIn)
  const [mentorId, setMentorId] = useState('')
  const [myStudents, setMyStudents] = useState([])

  async function getMarkedStudents() {
    console.log(mentorId)
    console.log('running')
    const response = await axios.get(`http://localhost:3000/api/mentor/get-marked-students/`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    setMyStudents(response.data.students)
    setIsLoading(false);
  }

  async function getMentorId() {
    const response = await axios.get('http://localhost:3000/api/auth/mentor-profile', {
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
      <div>Loading</div>
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
                  <div key={item._id} className=' bg-green flex flex-col items-center justify-center px-8 py-4 mx-12 mb-16 rounded-2xl'>
                    <div className='rounded-full bg-black h-24 w-24 mb-4'></div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                    <div>{item.number}</div>
                    <div className="bg-white rounded-md py-2 mt-8 w-full">
                      <div className="text-center cursor-pointer" onClick={() => studentProfile(item._id)}>Visit Profile</div>
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