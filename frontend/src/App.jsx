import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import UnassignedStudents from './components/UnassignedStudents'
import MyStudents from './components/MyStudents'
import MarksDistribution from './components/MarksDistribution'
import StudentProfile from './components/StudentProfile'
import Unlock from './components/Unlock'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <>
      <RecoilRoot>
        <Navbar />
        <div className='flex flex-row p-4'>
          <Dashboard />
          <Routes>
            <Route path='/' element={<MyStudents />} />
            <Route path='/profile/:studentId' element={<StudentProfile />} />
            <Route path='/unassigned-student' element={<UnassignedStudents />} />
            <Route path='/my-student' element={<MyStudents />} />
            <Route path='/marks-distribution' element={<MarksDistribution />} />
            <Route path='/unlock' element={<Unlock />} />
          </Routes>
        </div>
      </RecoilRoot>
    </>
  )
}

export default App
