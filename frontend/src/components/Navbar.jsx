import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className=' w-full flex flex-row justify-between items-center bg-blue h-16 px-16'>
      <img src={logo} alt="" className=' h-8' />
      <div className=' flex flex-row'>
        <div className='bg-red p-2 rounded-md w-24 text-center cursor-pointer mr-2' onClick={() => navigate('/')}>LOGIN</div>
        <div className='bg-red p-2 rounded-md w-24 text-center cursor-pointer' onClick={() => navigate('/')}>LOGOUT</div>
      </div>
    </div>
  )
}

export default Navbar