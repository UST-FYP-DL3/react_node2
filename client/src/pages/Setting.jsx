import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../contexts/AuthContext"

import Axios from 'axios'

const Setting = () => {

    const { currentUser } = useAuth()

    return (
        <div>
            <h2>This page is to set and try</h2>
                       
        </div>
    )
}

export default Setting
