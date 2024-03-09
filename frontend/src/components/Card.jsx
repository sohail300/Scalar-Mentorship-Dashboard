
const Card = () => {
  return (
    <div>
        <div className=' bg-green flex flex-col items-center justify-center px-8 py-4 mx-12 mb-16 rounded-2xl'>
        <div className='rounded-full bg-black h-24 w-24 mb-4'></div>
        <div>Mentor1</div>
        <div>mentor1@scalar.com</div>
        <div>+91 1234567890</div>
        <div className="bg-white rounded-md py-2 mt-8 w-full">
            <div className="text-center cursor-pointer">Assign</div>
        </div>
    </div>
    </div>
  )
}

export default Card