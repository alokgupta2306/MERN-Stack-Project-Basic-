import React, { useEffect} from 'react'

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { API_URL } from '../config'

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    
    console.log('Workouts value:', workouts)
    
    useEffect(()=>{
        const fetchWorkouts = async ()=> {
            const response = await fetch(`${API_URL}/api/workouts/`, {
                headers: {
                    'authorization': `Bearer ${user.token}`
                }
            })
   
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: Array.isArray(json) ? json : []})
            }
        }
        if(user){
            fetchWorkouts()
        }
    }, [dispatch, user])

    if (!workouts) {
        return <div className='home'>Loading...</div>
    }

  return (
    <div className='home'>
        <div className='workouts'>
            {
                workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))
            }
            <div>
                <WorkoutForm />
            </div>

        </div>
    </div>
  )
}

export default Home