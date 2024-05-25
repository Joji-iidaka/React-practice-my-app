import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Preview from './components/Preview'
import Editorbar from './components/Editorbar'

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className='App'>
      <Sidebar user={user} setUser={setUser}/>
      <Preview />
      <Editorbar />
    </div>
  )
}

export default App
