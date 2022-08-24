import React from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../../assets/logout.png';

const Logout = () => {
    const handleLogout =()=>{
        localStorage.removeItem("userData");
        window.location.reload();
    }
    return (
        <div style={{cursor:"pointer"}} onClick={handleLogout}>
            <img src={logout} alt="" width={40} height={40} />
        </div>
    );
};

export default Logout;