import { Questions } from './questions';
export interface Option {
    optid: number;
    description: string;
    qb: Questions;
    correct: boolean;
}