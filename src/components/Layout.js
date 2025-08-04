import Navbar from './Navbar';
import SearchUsers from './SearchUsers';
import CreatePost from './CreatePost';
import '../Layout.css';
import { useState } from 'react';
import SuggestedUsers from './SuggestedUsers';

export default function Layout({ children, setPostTrigger, setToken }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <Navbar setToken={setToken} />
      <div className="app-layout">
        <aside className="sidebar sidebar-left">
          <nav className="nav-links">
            <a href="/feed">🏠 <span>Feed</span></a>
            <button onClick={() => {
              setShowSearch(prev => !prev);
              setShowCreate(false);
            }}>
              🔍 <span>Search</span>
            </button>
            <button onClick={() => {
              setShowCreate(prev => !prev);
              setShowSearch(false);
            }}>
              ➕ <span>Create</span>
            </button>
            <a href={`/profile/${localStorage.getItem('userId')}`}>
              👤 <span>My Profile</span>
            </a>
          </nav>
        </aside>

        <main className="main-content">
          {showSearch && (
            <div className="top-panel">
              <SearchUsers />
            </div>
          )}
          {showCreate && (
            <div className="top-panel">
              <CreatePost onPostCreated={() => {
                setShowCreate(false);
                setPostTrigger(prev => prev + 1);
              }} />
            </div>
          )}
          {children}
        </main>

        <aside className="sidebar sidebar-right">
          <SuggestedUsers />
        </aside>
      </div>
    </>
  );
}
