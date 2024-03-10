import logo from '../assets/logo.png'

const Navbar = () => {

  return (
    <div className=' w-full flex flex-row justify-between items-center bg-blue h-16 px-16'>
      <img src={logo} alt="" className=' h-8' />
    </div>
  )
}

export default Navbar