import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate=useNavigate();

  return (
    <div className=' bg-blue h-[100%] w-1/4 rounded-2xl'>
    <div className='text-white flex flex-col items-center justify-center p-8'>
        <div className='rounded-full bg-gray-50 h-24 w-24 mb-4'></div>
        <div>Mentor1</div>
        <div>mentor1@scalar.com</div>
    </div>
    <div className=' text-white flex flex-col items-start'>
        <div className=' cursor-pointer px-4 pb-4 mb-4' onClick={()=> navigate('/unassigned-student')}>Unassigned Students</div>
        <div className=' cursor-pointer px-4 pb-4 mb-4' onClick={()=> navigate('/my-student')}>My Students</div>
        <div className=' cursor-pointer px-4 pb-4 mb-4' onClick={()=> navigate('/marks-distribution')}>Marks Distribution</div>
    </div>
    <div className=''>
        <div className=' bg-red text-white m-4 rounded-md text-center p-2 cursor-pointer'>Final Submit</div>
    </div>
    </div>
  )
}

export default Dashboard