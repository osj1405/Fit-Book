export type User = {
    id: string;
    name: string; 
    nickname: string; // 닉네임, unique 검사하기
    email: string;
    password: string;
    image?: string;
    stateMessage?: string; // 상태 메세지
}

export type Post = {
    id: string;
    author_id: string;
    date: Date;
}

export type Like = {
    post_id: string;
    count?: number;
}

export type Comment = {
    post_id: string;
    author_id: string; // 댓글 작성자
    date: Date;
}
