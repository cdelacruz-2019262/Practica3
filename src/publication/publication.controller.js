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

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let user = req.publication.user
        if (data.user != user) {
            return res.send({ message: 'you can only update your account' })
        }
        let updatedPublication = await Publication.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('user', ['name', 'username'])
        if (!updatedPublication) return res.status(401).send({ message: 'User not found and not updated' })
        return res.send({ message: 'Updated publication', updatedPublication })
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is alredy taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}