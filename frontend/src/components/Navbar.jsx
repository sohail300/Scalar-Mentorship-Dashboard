import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isMentorLoggedInState } from '../store/atoms/auth';

const Navbar = () => {

  return (
    <div className=' w-full flex flex-row justify-between items-center bg-blue h-16 px-16'>
      <img src={logo} alt="" className=' h-8' />
    </div>
  )
}

export default Navbar