import React, { useState } from 'react'

const SubMenu = ({menu}) => {
    
  return (
    <ul className='menu'>
        {menu.subMenu.map((sub,i)=>(
            <li key={i} className='menu_list'>
                <div className='nav_menu'>
                    <a href={sub.path}>{sub.title}</a>
                </div>
            </li>
        ))}
    </ul>
  )
}

export default SubMenu