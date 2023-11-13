import mongoose from 'mongoose';

import {UserBody} from '../../user/interface';

export interface Option {
  optionCont: string;
  finishedSurvey: boolean;
  nextQuestionId?: mongoose.Types.ObjectId;
}

export interface Question {
  // questionType: string;
  content: string;
  options: Option[];
}

export interface Survey {
  title: string;
  description: string;
  questions: mongoose.Types.ObjectId[];
  userResponses?: UserBody[];
}
