import { Date, ObjectId } from "mongoose"

interface ITodo {
   _id: ObjectId,
   title: String,
   isDone: Boolean,
   createdAt: Date,
   updatedAt: Date,
   _v: Number
}

export default ITodo