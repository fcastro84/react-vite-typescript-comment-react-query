
export interface Comment {
    id: CommentId,
    title: string,
    description: string,
    preview?: boolean
}

export type CommentId = `${string}-${string}-${string}-${string}-${string}`