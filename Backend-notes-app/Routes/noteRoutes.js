
const express = require('express')
const router = express.Router()
const  Note = require('../models/noteModel')

router.get ("/note", async(req, res)=>{
    try{
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes)}
    catch(e){
        res.status(404).json({message: "note not found"})
    }

})


router.post('/note', async (req,res)=>{
    try{
        console.log('Request Body:', req.body); 
        const {noteId, text, date , color}= req.body
        const notes = new Note({
         noteId,
         text,
         date,
         color
        })
        const savedNotes = await notes.save()
        res.status(200).json(savedNotes)
    }
    catch(e){
        res.status(500).json({message: "note not created", error: e.message})
    }
})

router.delete('/note/:id', async(req,res)=>{
    try{
        const id= req.params.id
        console.log('Received ID:', id); 
        const notes = await Note.findById(id)
        if(notes){
        const note = await Note.deleteOne({_id:id})
        res.status(200).json({message: "note deleted successfully"})
    }
    else res.status(404).json({message: 'note not found'})
    }catch(e){
        res.status(500).json({error: e.message})
    }
})

router.patch('/note/:id', async(req,res)=>{
    try{
        const id= req.params.id
        const {noteId, text, date , color}= req.body
        const notes = await Note.findById(id)
        if(notes){
        const note = await Note.updateOne({
            noteId,
            text,
            date,
            color
        })
        res.status(200).json({message: "note updated successfully"})
    }
    else res.status(404).json({message: 'note not found'})
    }catch(e){
        res.status(500).json({error: e.message})
    }
})



module.exports = router