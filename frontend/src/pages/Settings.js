import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiArrowLeft, HiMenu, HiX } from 'react-icons/hi';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="settings-page">
            {/* Hamburger */}
            <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
            {/* Side Menu */}
            <div className={`side-menu ${isOpen ? 'open' : ''}`}>
                <h1>Pigeon</h1>
                <div className="side-options">
                    <h2>Settings</h2>
                    <div className='logout' onClick={() => navigate('/')}>
                        <h2>Logout</h2>
                        <img src='log out.png' alt='logout'/>
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            <div className='settings-panel'>
                <div className='back' onClick={() => navigate(-1)}>
                    <HiArrowLeft/>
                    <h2>Back</h2>
                </div>
                <div className='profile'>
                    <div className='profile-pic'>

                    </div>
                    <div className='info'>
                        <label>Name</label>
                        <div>Hammie</div>
                        <div className='edit button orange-button'>Edit</div>
                    </div>
                    <div className='info'>
                        <label>Email</label>
                        <div>hammie@gmail.com</div>
                        <div className='edit button orange-button'>Edit</div>
                    </div>
                    <div className='info'>
                        <label>Password</label>
                        <div className='code'>********</div>
                        <div className='edit button orange-button'>Edit</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;