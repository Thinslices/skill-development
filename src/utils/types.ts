export type Question = {
    id?: string,
    studyId?: string,
    question: string,
    answer: string,
}

export type Study = {
    id: string,
    authorId: string,
    title: string,
    questions: Question[]
}