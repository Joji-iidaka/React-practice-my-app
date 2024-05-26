import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Preview from './components/Preview'
import Editorbar from './components/Editorbar'

function App() {

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  return (
    <div className='App'>
      <Sidebar user={user} setUser={setUser}/>
      <Preview posts={posts} setPosts={setPosts}/>
      <Editorbar user={user} setPosts={setPosts}/>
    </div>
  )
}

export default App
