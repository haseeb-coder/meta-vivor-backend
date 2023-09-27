import mongoose from 'mongoose';

import {UserBody} from '../../user/interface';

export interface Question {
  questionType: string;
  content: string;
  options: string[];
  nextQuestionId?: mongoose.Types.ObjectId; 
}

export interface Survey {
  title: string;
  description: string;
  questions: Question[];
  userResponses?: UserBody[];
}


