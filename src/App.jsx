import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import Editorbar from './components/Editorbar';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmDelete, setConfirmDelete] = useState(false);
  const [showConfirmLogout, setConfirmLogout] = useState(false);

  return (
    <div className="App">
      <Sidebar user={user} setUser={setUser} showConfirmLogout={showConfirmLogout} setConfirmLogout={setConfirmLogout}/>
      <Preview posts={posts} setPosts={setPosts} user={user} showConfirmDelete={showConfirmDelete} setConfirmDelete={setConfirmDelete}/>
      <Editorbar user={user} setPosts={setPosts} showConfirm={showConfirm} setShowConfirm={setShowConfirm} />
      {(showConfirm || showConfirmDelete || showConfirmLogout )&& <div className="overlay"></div>}
    </div>
  );
}

export default App;
