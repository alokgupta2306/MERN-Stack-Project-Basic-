const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

exports.getWorkouts = async(req, res)=> {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})

    if(!workouts || workouts.length === 0)
        return res.status(200).json({error: "No entries found" })
    res.status(200).json(workouts)
}

exports.getWorkout = async(req, res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No entries found"})
    }
    const workout = await Workout.findById(id)
    if(!workout)
        return res.status(404).json({error: "No entries found" })

    res.status(200).json(workout)
}

exports.createWorkout = async(req, res)=>{

    const {title, load, reps} = req.body;

    let emptyFields =[];

    if(!title){
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill out all the fields!' , emptyFields })
    }

    try{
        const user_id = req.user._id

        const workout = await Workout.create({title, load, reps, user_id})
        res.status(201).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

exports.deleteWorkout = async(req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workouts"})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(400).json({error: "No such workout to delete"})
    }
    res.status(200).json(workout)
}

exports.updateWorkout = async(req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workouts"})
    }

    const workout = await Workout.findOneAndUpdate(
        {
            _id: id
        },
        {
            ...req.body
        },
        {
            new: true
        }
    )
    if(!workout){
        return res.status(400).json({error: "No such workouts"})
    }
    res.status(200).json(workout)
}