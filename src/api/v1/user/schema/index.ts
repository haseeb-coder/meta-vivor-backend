import mongoose from 'mongoose';

import {SurveyModel}   from '../../survey/schema';
import {GENDER_TYPE_MALE, GENDER_TYPE_FEMALE, GENDER_TYPE_OTHER, RACE_TYPE_WHITE, RACE_TYPE_BLACK} from '../../../../utils/constant';
const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  patientname: {type: String, required: true},
  race:  {type: String, 
    enum:[RACE_TYPE_WHITE, RACE_TYPE_BLACK],
    required: true},
  gender: {
    type: String,
    enum: [GENDER_TYPE_MALE, GENDER_TYPE_FEMALE, GENDER_TYPE_OTHER],
    required: true,
  },
  age: {type: Number, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true},
  surveyId: {type: mongoose.Types.ObjectId, required: false, ref: SurveyModel, trim: true},

});

export default mongoose.model('User', UserSchema);

