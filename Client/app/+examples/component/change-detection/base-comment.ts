import { Comment } from './comment';

export class BaseComment {
    public comments = [];
    public text: string;
    public author: string;
    public message: string;

    public addComment() {
        const comment = new Comment();
        comment.text = this.text;
        comment.author = this.author;
        this.comments.push(comment);
    }

    public lastUpdated() {
        return Date().toString();
    }
}
