import { Schema, model} from 'mongoose';
interface User {
  title: string;
  body: string;
}
const schema = new Schema<User>({
    title: { type: String, required: true },
    body: { type: String, required: true }
});
const PostModel = model<User>('Post', schema);
export default PostModel;