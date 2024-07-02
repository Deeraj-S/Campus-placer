import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilDrop,
    cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

// let a = true

let role = JSON.parse(localStorage.getItem('role'))


const _nav = [
    {
        component: CNavItem,
        name: 'Placement Dashboard',
        to: '/',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

    },
    {
        component: CNavTitle,
        name: 'Theme',
    },

    //ch

    {
        component: CNavItem,
        name: 'Student',
        to: '/student',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },

    {
        component: CNavItem,
        name: 'Category',
        to: '/Category',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },

    {
        component: CNavItem,
        name: 'Companies',
        to: '/companies',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },

]

export default _nav