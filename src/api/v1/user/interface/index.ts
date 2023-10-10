import {ObjectId} from 'mongoose';


export interface UserBody {
    surveyId?:ObjectId,
    email?: string;
    patientname?: string;
    race?: string;
    gender?: string;
    age?: number;
    city?: string;
    state?: string;
    country?: string;
  }
  