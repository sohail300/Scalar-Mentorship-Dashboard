import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react'
import { isMentorLoggedInState } from '../store/atoms/auth';
import { unassignedStudentState } from '../store/atoms/student';
import Login from './Login';
import axios from 'axios'
import { BACKEND_URL } from '../utils/config.js'

const UnassignedStudents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [unassignedStudent, setUnassignedStudent] = useRecoilState(unassignedStudentState);
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);
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
    const response = await axios.get(`http://localhost:3000/api/student/all`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data.students)
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
    const response = await axios.post('http://localhost:3000/api/mentor/assign-student', {
      studentId
    }, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    alert('Assigned!')
  }

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
      <h1 className=" font-bold mb-8" style={{ fontSize: '40px' }}>UNASSIGNED STUDENTS</h1>
      <div className='grid grid-cols-3'>
        {
          unassignedStudent == null ? 'No Marked Students' :
            (
              unassignedStudent.map((item) => {
                return (
                  <div key={item._id} className=' bg-green flex flex-col items-center justify-center px-8 py-4 mx-12 mb-16 rounded-2xl'>
                    <div className='rounded-full bg-black h-24 w-24 mb-4'></div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                    <div>{item.number}</div>
                    <div className="bg-white rounded-md py-2 mt-8 w-full">
                      <div className="text-center cursor-pointer" onClick={() => assignToMentor(item._id)}>Assign</div>
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