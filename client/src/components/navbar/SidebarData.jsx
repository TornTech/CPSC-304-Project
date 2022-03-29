import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Compensation',
        path: '/compensation',
        icon: <FaIcons.FaMoneyBillAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Locations',
        path: '/locations',
        icon: <BsIcons.BsBuilding />,
        cName: 'nav-text'
    },
    {
        title: 'Qualifications',
        path: '/qualifications',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
];