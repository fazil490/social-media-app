import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }
    return children;

}

export default ProtectedRoute