import { Schema, model} from 'mongoose';
interface User {
  title: string;
  body: string;
  user_id: string;
}
const schema = new Schema<User>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: { type: String, required: true },
});
const PostModel = model<User>('Post', schema);
export default PostModel;