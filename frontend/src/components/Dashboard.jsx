import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../utils/config';

const Dashboard = () => {
  const navigate = useNavigate();
  const [mentorId, setMentorId] = useState('')
  const [name, setName] = useState('Name')
  const [email, setEmail] = useState('Email')
  const [photo, setPhoto] = useState('https://via.placeholder.com/150')

  async function getMentorId() {
    const response = await axios.get(`${BACKEND_URL}/api/auth/mentor-profile`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    setMentorId(response.data.id)
  }

  async function getMentorDetails() {
    const response = await axios.get(`${BACKEND_URL}/api/mentor/${mentorId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data.details)
    setName(response.data.details.name);
    setEmail(response.data.details.email);
    setPhoto(response.data.details.photo);
  }

  async function finalSubmit() {
    const response = await axios.post(`${BACKEND_URL}/api/mentor/final-submit/${mentorId}`,null, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data.msg)
    alert(response.data.msg)
  }

  useEffect(() => {
    getMentorId();
    getMentorDetails();
  }, [])

  return (
    <div className=' bg-blue h-[100%] w-1/4 rounded-2xl'>
      <div className='text-white flex flex-col items-center justify-center p-8'>
        <div className=' mb-4'>
          <img src={photo} alt="" className='rounded-full h-24 w-24 object-cover' />
        </div>
        <div>{name}</div>
        <div>{email}</div>
      </div>
      <div className=' text-white flex flex-col items-start'>
        <div className=' cursor-pointer px-4 pb-4 mb-4' onClick={() => navigate('/unassigned-student')}>Unassigned Students</div>
        <div className=' cursor-pointer px-4 pb-4 mb-4' onClick={() => navigate('/my-student')}>My Students</div>
        <div className=' cursor-pointer px-4 pb-4 mb-4' onClick={() => navigate('/marks-distribution')}>Marks Distribution</div>
      </div>
      <div className=''>
        <div className=' bg-red text-white m-4 rounded-md text-center p-2 cursor-pointer' onClick={() => finalSubmit()}>Final Submit</div>
      </div>
    </div>
  )
}

export default Dashboard