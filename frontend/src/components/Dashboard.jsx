import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../utils/config';

const Dashboard = () => {
  const navigate = useNavigate();

  async function finalSubmit() {
    const response = await axios.get(`${BACKEND_URL}/api/mentor/final-submit/`)
    alert(response.data.msg)
  }

  return (
    <div className=' bg-blue h-[100%] w-1/4 rounded-2xl'>
      <div className='text-white flex flex-col items-center justify-center p-8'>
        <div className=' mb-4'>
          <img src='https://media.istockphoto.com/id/1369199360/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?s=2048x2048&w=is&k=20&c=R_Neuu8r9szb2yH56Ck9q9Tfd3kLFWClJGp_riHSKEE=' alt="" className='rounded-full h-24 w-24 object-cover' />
        </div>
        <div>Mentor 1</div>
        <div>mentor1@scalar.com</div>
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