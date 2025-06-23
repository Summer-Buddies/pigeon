import { useNavigate } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi'
import './SidePanel.css'

const SidePanel = () => {
    const navigate = useNavigate();

    return (
        <div className='side-panel'>
            <div className='menu'>
                <h1>Pigeon</h1>
                <div className="side-options">
                    <div className='search'>
                        <img src='search.png' alt='search' className='search-icon'></img>
                        <input
                            type='text'
                            placeholder='Search'  
                            className='search'  
                        ></input>
                    </div>
                    <div className='friends'>
                        <h2>Friends</h2>
                        <img src='users.png' alt='friends' className='friends-icon'/>
                    </div>
                    <div className='messages'>
                        <h2>Messages</h2>
                        <HiPlus className='messages-plus'/>
                    </div>
                </div>
            </div>
            <div className='user'>
                <div className='profile-pic'>

                </div>
                <div className='name'>
                    <h3>Hammie</h3>
                </div>
                <div className='settings'>
                    <img src='settings.png' alt='settings' onClick={() => navigate('/settings')}/>
                </div>
            </div>
        </div>
    )
}

export default SidePanel;