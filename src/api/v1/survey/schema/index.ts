import mongoose, {Schema} from 'mongoose';

import User from '../../user/schema';

//schema for Questions
const QuestionSchema = new Schema({
  content: {type: String, required: true},
  options: {
    type: [
      {
        optionCont: {type: String, required: true},
        finishedSurvey: {type: Boolean, required: true},
        nextQuestionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
      },
    ],
    required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: User,
    },
  ],
});

export const QuestionModel = mongoose.model('Question', QuestionSchema);
export const SurveyModel = mongoose.model('Survey', SurveySchema);
