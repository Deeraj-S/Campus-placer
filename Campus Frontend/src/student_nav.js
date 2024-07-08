import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilDescription,
    cilDrop,
    cilNotes,
    cilPencil,
    cilPuzzle,
    cilSpeedometer,
    cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// let a = true

let role = JSON.parse(localStorage.getItem('role'))


const _nav = [
    {
        component: CNavItem,
        name: 'Student Dashboard',
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
        name: 'Job Openings',
        to: '/jobs',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },

    {
        component: CNavItem,
        name: 'Applied Jobs',
        to: '/appliedjobs',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    }


]

export default _nav
