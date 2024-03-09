import { useRecoilValue } from 'recoil'
import { isMentorLoggedInState } from '../store/atoms/auth'
import Login from './Login';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader } from './Loader'
import { BACKEND_URL } from '../utils/config';

const MyStudents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);
  const [mentorId, setMentorId] = useState('')
  const [myStudents, setMyStudents] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [selectedOption, setSelectedOption] = useState('all');

  async function getUnassignedStudents() {
    const response = await axios.get(`${BACKEND_URL}/api/mentor/get-students/${mentorId}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    setMyStudents(response.data.students)
    setFilteredList(response.data.students)
    setIsLoading(false);
  }

  async function getMentorId() {
    const response = await axios.get(`${BACKEND_URL}/api/auth/mentor-profile`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    })
    setMentorId(response.data.id)
  }

  async function studentProfile(studentId) {
    navigate(`/profile/${studentId}`)
  }

  function handleRadioChange(event) {
    setSelectedOption(event.target.id);

    setFilteredList(prevList => {
      if (event.target.id === 'all') {
        return myStudents;
      } else if (event.target.id === 'marked') {
        return myStudents.filter(item => item.isMarked);
      } else if (event.target.id === 'non-marked') {
        return myStudents.filter(item => !item.isMarked);
      }
      return prevList; // Default to the previous list if no conditions are met
    });
    console.log(`Selected option: ${event.target.id}`);
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
      <Loader />
    )
  }

  return (
    <div className=' ml-8 w-3/4'>
      <h1 className=" font-bold mb-4" style={{ fontSize: '40px' }}>MY STUDENTS</h1>
      <div className=' flex flex-row mb-4 items-center'>
        <div className=' font-medium text-lg mr-8'>Filter: </div>
        <div>
          <input type="radio" name="marking" id="all" checked={selectedOption === 'all'}
            onChange={handleRadioChange} />
          <label htmlFor="all" className=' mr-4'>All</label>
          <input type="radio" name="marking" id="marked" checked={selectedOption === 'marked'}
            onChange={handleRadioChange} />
          <label htmlFor="marked" className=' mr-4'>Marked</label>
          <input type="radio" name="marking" id="non-marked" checked={selectedOption === 'non-marked'}
            onChange={handleRadioChange} />
          <label htmlFor="non-marked" className=' mr-4'>Non-Marked</label>
        </div>
      </div>
      <div className='grid grid-cols-3'>
        {
          filteredList == null ? 'No Students Found' :
            (
              filteredList.map((item) => {
                return (
                  <div key={item._id} className=' flex flex-col items-center justify-center px-8 py-8 mx-12 mb-16 rounded-2xl shadow-[0_25px_40px_-15px_rgba(0,0,0,0.5)] border border-black'>
                    <div className='mb-4'>
                      <img src={item.photo} alt="" className=' rounded-full h-24 w-24 object-cover' />
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

export default MyStudents