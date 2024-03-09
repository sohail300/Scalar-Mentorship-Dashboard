import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react'
import { isMentorLoggedInState } from '../store/atoms/auth';
import { unassignedStudentState } from '../store/atoms/student';
import Login from './Login';
import axios from 'axios'
import { Loader } from './Loader'
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/config';

const UnassignedStudents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);
  const [unassignedStudent, setUnassignedStudent] = useState([]);
  const [mentorId, setMentorId] = useState('')

  const api = axios.create({
    BACKEND_URL
  })

  async function getMentorId() {
    const response = await api.get('/mentor-profile', {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    setMentorId(response.data.id)
  }

  // async function getUnassignedStudents() {
  //   const response = await api.get(`/get-students/${mentorId}`, {
  //     headers: {
  //       Authorization: 'bearer ' + localStorage.getItem('token')
  //     }
  //   })
  //   console.log(response.data.students)
  //   setStuduents(response.data.students);
  //   setIsLoading(false);
  //   console.log(students)
  // }

  async function getUnassignedStudents() {
    const response = await axios.get(`${BACKEND_URL}/api/student/all`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    setUnassignedStudent(response.data.students)
    setIsLoading(false);
  }

  useEffect(() => {
    getMentorId();
  }, [])

  useEffect(() => {
    getUnassignedStudents();
  }, [mentorId])


  async function assignToMentor(studentId) {
    const response = await axios.post(`${BACKEND_URL}/api/mentor/assign-student`, {
      studentId
    }, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    alert(response.data.msg)
    if (response.data.msg == 'Assigned!') {
      navigate('/my-student')
    }
  }

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
      <h1 className=" font-bold mb-8" style={{ fontSize: '40px' }}>UNASSIGNED STUDENTS</h1>
      <div className='grid grid-cols-3'>
        {
          unassignedStudent == null ? 'No Marked Students' :
            (
              unassignedStudent.map((item) => {
                return (
                  <div key={item._id} className=' flex flex-col items-center justify-center px-8 py-8 mx-12 mb-16 rounded-2xl shadow-[0_25px_40px_-15px_rgba(0,0,0,0.5)] border border-black'>
                    <div className='mb-4'>
                      <img src={item.photo} alt="" className=' rounded-full h-24 w-24 object-cover' />
                    </div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                    <div>{item.number}</div>
                    <div className="bg-green rounded-md py-2 mt-12 w-full">
                      <div className="text-center cursor-pointer text-white" onClick={() => assignToMentor(item._id)}>Assign</div>
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

export default UnassignedStudents