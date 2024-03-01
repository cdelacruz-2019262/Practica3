'use strict'

import Publication from './publication.model.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const save = async (req, res) => {
    try {
        let data = req.body
        let publication = new Publication(data)
        await publication.save()
        return res.send({ message: `The post ${publication.title} has been added successfully. ` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering publication', err: err })
    }
}

export const update = async(req, res)=>{
    try{   
        let data = req.body
        let { id } = req.params 
        let updatedPublication = await Publication.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate({
            path: 'user',
            select: 'username',
        })
        //Validar la actualización
        if(!updatedPublication) return res.status(401).send({message: 'Publication not found and not updated'})
        //Respondo al usuario
        return res.send({message: 'Updated user', updatedPublication})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating publication'})
    }
}

export const erase = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedPublication = await Publication.deleteOne({_id: id})
        
        //Validar que se eliminó
        if(deletedPublication.deletedCount === 0) return res.status(404).send({message: 'publication not found and not deleted'})
        //Responder
        return res.send({message: 'Deleted publication successfully'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error deleting publication'})
    }
}