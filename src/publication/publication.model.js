import {Schema, model} from "mongoose"

const publicationSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ['SUGGESTION', 'OPINION', 'QUESTION', 'HUMOR' ],
        required: true
    },
    post: {
        type: String,
        required: true
    }
})

export default model('publication', publicationSchema)