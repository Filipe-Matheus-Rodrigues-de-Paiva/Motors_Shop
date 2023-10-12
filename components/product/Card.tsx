import { IComment, IUser } from "@/app/(products)/sale/[id]/page";
import AlertDeleteComment from "./AlertDeleteComment";
import EditComment from "./EditComment";

interface CommentProps {
  comment: IComment;
  user: IUser;
  decoded: {
    email: string;
    name: string;
    account_type: string;
    iat: number;
    exp: number;
    sub: string;
  } | void;
}

export default function CommentCard({ comment, user, decoded }: CommentProps) {
  function getNameInitials(name: string) {
    if (!name) return;
    for (let i = 0; i < name.length; i++) {
      if (name[i] === " ") {
        return name.split(" ")[0][0] + name.split(" ")[1][0];
      }
    }

    return name[0];
  }

  return (
    <div className="flex flex-col gap-2 rounded-md">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-white">
          {getNameInitials(comment.user?.name)}
        </span>
        <h1 className="heading-6-600 text-gray-200">{comment.user?.name}</h1>
        <div className="flex gap-2">
          {decoded?.email === comment.user?.email ? (
            <EditComment comment={comment} />
          ) : null}
          {decoded?.email === comment.user?.email ||
          (user.email === decoded?.email &&
            decoded.account_type === "anunciante") ? (
            <AlertDeleteComment commentId={comment.id} />
          ) : null}
        </div>
      </div>
      <p className="body-1-400 text-gray-300">{comment.text}</p>
      <p className="body-2-400 text-gray-300">{comment.timeElapsed}</p>
    </div>
  );
}
