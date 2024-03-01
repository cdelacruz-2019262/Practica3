import {Schema, model} from "mongoose"

const commentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: String,
        required: true
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'publication',
        required: true
    }
})

export default model('comment', commentSchema)