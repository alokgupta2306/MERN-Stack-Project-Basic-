import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { API_URL } from '../config'

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/api/user/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            setError(null)
            setIsLoading(false)
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return { signup, isLoading, error }
}