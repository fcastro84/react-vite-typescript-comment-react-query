
export interface Comment {
    id: CommentId,
    title: string,
    description: string
}

export type CommentId = `${string}-${string}-${string}-${string}-${string}`