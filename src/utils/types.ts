export type Question = {
    id?: string;
    studyId?: string;
    question: string;
    answer: string;
    index: number;
};

export type Study = {
    id: string;
    authorId: string;
    title: string;
    questions: Question[];
    published?: boolean;
};
