import React from 'react'
import { logout } from './../../axios/api/auth/auth.req';
import "./MenuOptions.css"
import ThemeToggle from './chat/ThemeToggle';

function MenuOptions({showMenu}) {
    const handleLogout = async () => {
        const res = await logout();
        console.log(res);
        if (res) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    }
    return (
        <div className={`menu_options_container ${showMenu && 'active'}`}>
            <span className='menu_options'>Create Group</span>
            <span className='menu_options'>Profile</span>
            <span className='menu_options'>Settings</span>
            <span className='menu_options' onClick={handleLogout}>Logout</span>
            <span className='menu_options'>Switch theme</span>
            <ThemeToggle/>
        </div>
    )
}

export default MenuOptions