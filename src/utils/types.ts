export type Question = {
  id?: string;
  studyId?: string;
  question: string;
  answer: string | EditorAnswer;
  index: number;
};

export type Study = {
  id: string;
  authorId: string;
  title: string;
  questions: Question[];
  published?: boolean;
};

export interface EditorAnswer {
  root: {
    children: {
      children: {
        detail: number;
        format: number;
        mode: string;
        style: string;
        text: string;
        type: string;
        version: number;
      }[];
      direction: string;
      format: string;
      indent: number;
      type: string;
      version: number;
    }[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}
