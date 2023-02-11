import React from 'react';
import { NavLink } from 'react-router-dom';

const USERS = [
    {
        title: 'Default state',
        link: '/player/use-test-state',
    },
    {
        title: 'd-hebert',
        link: '/player/d-hebert',
    },
    {
        title: 'Platrick',
        link: '/player/platrick',
    },
    {
        title: 'Andrew Tang',
        link: '/player/penguingim1',
    },
]

export const QuickUsers = ({ toggleDrawer }) => {
    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <ul>
            {USERS.map(({ title, link }) => (
                <li>
                    <NavLink
                        to={link}
                        className={({ isActive }) =>
                            isActive ? 'devtools-link active' : 'devtools-link'
                        }
                        onClick={() => toggleDrawer(false)}
                    >
                        {title}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}