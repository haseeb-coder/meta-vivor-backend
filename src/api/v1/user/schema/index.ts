import mongoose from 'mongoose';

import {SurveyModel}   from '../../survey/schema';
import {GENDER_TYPE_MALE, GENDER_TYPE_FEMALE, GENDER_TYPE_OTHER} from '../../../../utils/constant';
const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  gender: {
    type: String,
    enum: [GENDER_TYPE_MALE, GENDER_TYPE_FEMALE, GENDER_TYPE_OTHER],
    required: true,
  },
  dateOfBirth: {type: Date, required: true},
  country: {type: String, required: true},
  startTime:{type: Date, required: false},
  endTime: {type: Date, required: false},
  surveyId: {type: mongoose.Types.ObjectId, required: false, ref: SurveyModel, trim: true},

});

export default mongoose.model('User', UserSchema);
