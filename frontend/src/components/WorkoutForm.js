import React, {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { API_URL } from '../config'

const WorkoutForm = () => {

    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!user){
            setError('User must be logged in!')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch(`${API_URL}/api/workouts/`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setError(null);
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            console.log('New Workout Added: ', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercise Title </label>
            <input 
                type='text' 
                value={title} 
                onChange={(e)=> setTitle(e.target.value)}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load </label>
            <input 
                type='number' 
                value={load} 
                onChange={(e)=> setLoad(e.target.value)}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps </label>
            <input 
                type='number' 
                value={reps} 
                onChange={(e)=> setReps(e.target.value)}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>  
            {error && <div className='error'>{error}</div>}

        </form>

    )
}

export default WorkoutForm