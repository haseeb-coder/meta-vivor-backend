import mongoose, {Schema,} from 'mongoose';

import User from '../../user/schema';
import {
  QUESTION_TYPE_DESCRIPTION,
  QUESTION_TYPE_FILE_UPLOAD,
  QUESTION_TYPE_INPUT_FIELD,
  QUESTION_TYPE_MULTIPLE_CHOICE,
} from '../../../../utils/constant';


//schema for Questions
const QuestionSchema = new Schema({
  questionType: {
    type: String,
    enum: [
      QUESTION_TYPE_DESCRIPTION,
      QUESTION_TYPE_MULTIPLE_CHOICE,
      QUESTION_TYPE_INPUT_FIELD,
      QUESTION_TYPE_FILE_UPLOAD,
    ],
    required: true,
    default:QUESTION_TYPE_MULTIPLE_CHOICE
  },
  content: {type: String, required: true},
  options: {type: [String], required: true},
  nextQuestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
});


// schema for Survey
const SurveySchema = new Schema({
  title: String,
  description: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Question',
    },
  ],
  userResponses: [
    {
      type:  mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: User,
    },
  ],
});

export const QuestionModel = mongoose.model('Question', QuestionSchema);
export const SurveyModel = mongoose.model('Survey', SurveySchema);
