import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isMentorLoggedInState } from '../store/atoms/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const isMentorLoggedIn = useRecoilValue(isMentorLoggedInState);
  const setIsMentorLoggedIn = useSetRecoilState(isMentorLoggedInState);

  function handleLogout(){
    localStorage.removeItem('token');
    setIsMentorLoggedIn(false);
    navigate('/')
  }

  return (
    <div className=' w-full flex flex-row justify-between items-center bg-blue h-16 px-16'>
      <img src={logo} alt="" className=' h-8' />
      <div className=' flex flex-row'>
        {
          isMentorLoggedIn ? <div className='bg-red p-2 rounded-md w-24 text-center cursor-pointer' onClick={() => handleLogout()}>LOGOUT</div> :
            <div className='bg-red p-2 rounded-md w-24 text-center cursor-pointer mr-2' onClick={() => navigate('/login')}>LOGIN</div>
        }
      </div>
    </div>
  )
}

export default Navbar