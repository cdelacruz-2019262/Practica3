'use strict'

import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const save = async (req, res) => {
    try {
        let data = req.body
        let comment = new Comment(data)
        await comment.save()
        const publication = await Publication.findById(data.publication);
        return res.send({ message: `The comment at the post ${publication.title} has been added successfully. ` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering comment', err: err })
    }
}

export const update = async(req, res)=>{
    try{   
        let data = req.body
        let { id } = req.params 
        let updatedComment = await Comment.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate({
            path: 'publication user',
            select: 'post username' 
        })
        //Validar la actualización
        if(!updatedComment) return res.status(401).send({message: 'Comment not found and not updated'})
        //Respondo al usuario
        return res.send({message: 'Updated comment', updatedComment})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating comment'})
    }
}

export const erase = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedComment = await Comment.deleteOne({_id: id})
        
        //Validar que se eliminó
        if(deletedComment.deletedCount === 0) return res.status(404).send({message: 'comment not found and not deleted'})
        //Responder
        return res.send({message: 'Deleted comment successfully'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error deleting comment'})
    }
}