import { Photo } from '../models/photo.js'
import { Event } from '../models/event.js'

const createPhotoComment = async (req, res) => {
    console.log('req.body', req.body)

    try {
        const event = await Event.findOne({event_id: req.params.id})
        
        const photoCommentData = {
            image: req.body.image,
            title: req.body.title,
            owner: req.body.owner,
            event: event._id
        }
        console.log(photoCommentData, 'PCD')

        const photo = await new Photo(photoCommentData)
        

        await photo.save()


        const test = await Event.findOneAndUpdate(
            { _id: event._id },
            { $push: { user_photos: photo } }
        ).populate('user_photos')

        

        // await event.save()
        // const newPhotoComment = event.user_photos[event.user_photos.length - 1]
        return res.status(201).json(test.user_photos)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deletePhotoComment = async (req, res) => {
    
    try {
        const event = await Event.findOne({event_id: req.params.event_id})
        const idx = event.user_photos.findIndex((photoComment) => 
            photoComment._id.equals(req.params.photoComment._id)
        )
        const removedPhotoComment = event.user_photos.splice(idx, 1)
        await event.save()
        return res.status(200).json(removedPhotoComment)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

export {
    createPhotoComment,
    deletePhotoComment,
}