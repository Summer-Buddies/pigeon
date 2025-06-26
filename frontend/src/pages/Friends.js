import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidePanel from "../components/SidePanel";
import { friends as initialFriends, friendRequests as initialRequests, requestingFriends } from "../data/staticUsers";
import './Friends.css'

const Friends = () => {
    const [selected, setSelected] = useState('all');
    const [friends, setFriends] = useState(initialFriends);
    const [friendRequests, setFriendRequests] = useState(initialRequests);
    const [requestedIds, setRequestedIds] = useState(new Set());
    const navigate = useNavigate();

    const handleAccept = (user) => {
        setFriends([...friends, user]);
        setFriendRequests(friendRequests.filter(u => u.id !== user.id));
    };

    const handleDecline = (user) => {
        setFriendRequests(friendRequests.filter(u => u.id !== user.id));
    }

    return (
        <div className="friends-page">
            <SidePanel/>
            <div className="main-panel">
                <div className="header">Friends</div>
                <div className="friends-options">
                    <div className={`option ${selected === 'all' ? 'active': ''}`} onClick={() => setSelected('all')}>
                        <h2>All Friends</h2>
                    </div>
                    <div className={`option ${selected === 'requests' ? 'active': ''}`} onClick={() => setSelected('requests')}>
                        <h2>Friend Requests</h2>
                    </div>
                    <div className={`option ${selected === 'add' ? 'active' : ''}`} onClick={() => setSelected('add')}>
                        <h2>Add Friends</h2>
                    </div>
                </div>
                <div className="friends-content">
                    <div className="search-content">
                        <div className='search'>
                            <img src='search.png' alt='search' className='search-icon'></img>
                            <input
                                type='text'
                                placeholder='Search'  
                                className='search'  
                            ></input>
                        </div>
                        <h2 className="total">Total - {selected === 'all' ? friends.length : selected === 'requests' ? friendRequests.length : requestingFriends.length}</h2>
                    </div>
                    {selected === 'all' && (
                        <div className="all-content">
                            {friends.map(user => (
                                <div key={user.id} className="user" onClick={() => navigate(`/chat/${user.id}`)}>
                                     <div className="profile-pic" />
                                    <div className="name">
                                        <h3>{user.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {selected === 'requests' && (
                        <div className="requests-content">
                            {friendRequests.map(user => (
                                <div key={user.id} className="user">
                                    <div className="profile-pic"></div>
                                    <div className="user-info">
                                        <div className="name">
                                            <h3>{user.name}</h3>
                                        </div>
                                        <div className="selection">
                                            <div className="button green-button" onClick={() => handleAccept(user)}>Accept</div>
                                            <div className="button purple-button" onClick={() => handleDecline(user)}>Decline</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {selected === 'add' && (
                        <div className="add-content">
                            {requestingFriends.map(user => (
                                <div key={user.id} className="user">
                                    <div className="profile-pic"></div>
                                    <div className="user-info">
                                        <div className="name">
                                            <h3>{user.name}</h3>
                                        </div>
                                        <div className="selection">
                                            {requestedIds.has(user.id) ? (
                                                <div 
                                                    className="button purple-button"
                                                    onClick={() => {
                                                        const newSet = new Set(requestedIds);
                                                        newSet.delete(user.id);
                                                        setRequestedIds(newSet);
                                                    }}
                                                >
                                                    Pending
                                                </div>
                                            ) : (
                                            <div
                                                className="button green-button"
                                                onClick={() =>
                                                setRequestedIds(new Set([...requestedIds, user.id]))
                                                }
                                            >
                                                Request
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Friends;