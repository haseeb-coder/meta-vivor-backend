import {ObjectId} from 'mongoose';


export interface UserBody {
    surveyId?:ObjectId,
    email?: string;
    firstname?: string;
    lastname?: string;
    gender?: string;
    dateOfBirth?: Date;
    country?: string;
    startTime?: Date;
    endTime?: Date;
  }
  