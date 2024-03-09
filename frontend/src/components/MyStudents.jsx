import { useRecoilValue } from 'recoil'
import { isMentorLoggedInState } from '../store/atoms/auth'
import Login from './Login';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyStudents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);
  const [mentorId, setMentorId] = useState('')
  const [myStudents, setMyStudents] = useState('')

  async function getUnassignedStudents() {
    const response = await axios.get(`http://localhost:3000/api/mentor/get-students/${mentorId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    setMyStudents(response.data.students)
    setIsLoading(false);
  }

  async function getMentorId() {
    const response = await axios.get('http://localhost:3000/api/auth/mentor-profile', {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    setMentorId(response.data.id)
  }

  async function studentProfile(studentId) {
    navigate(`/profile/${studentId}`)
  }

  useEffect(() => {
    getMentorId();
  }, [])

  useEffect(() => {
    getUnassignedStudents();
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
      <h1 className=" font-bold mb-8" style={{ fontSize: '40px' }}>MY STUDENTS</h1>
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

export default MyStudents