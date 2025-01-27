import React from 'react'

const Navabar = () => {
    const currentDate = new Date().toLocaleDateString(); 
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <nav className='flex justify-between bg-amber-400 text-amber-50 items-center h-14'>
            <div className="logo text-2xl font-bold mx-10">myTasks</div>
            <div className="date_time font-semibold flex pr-10 gap-10">
                <p>{currentDate}</p>
                <p>{currentTime}</p></div>
        </nav>
    )
}

export default Navabar
