import {Request, Response} from 'express';

import SurveyService from '../service';
import {Survey, Question} from '../interface';
import createController from '../../../../utils/createController';

class SurveyController {
  async handleCreateSurvey(req: Request, res: Response) {
    await createController(res, async () => {
      const surveyData: Survey = req.body;
      const newSurvey = await SurveyService.createSurvey(surveyData);
      return newSurvey;
    });
  }

  async handlegetAllSurveys(req: Request, res: Response) {
    await createController(res, async () => {
      const surveys = await SurveyService.getAllSurveys();
      return surveys;
    });
  }

  async handleCreateQuestion(req: Request, res: Response) {
    await createController(res, async () => {
      const {surveyId} = req.params;
      const questionData: Question = req.body;

      const updatedSurvey = await SurveyService.createQuestion(surveyId, questionData);
      return updatedSurvey;
    });
  }

  async handlegetSurveyById(req: Request, res: Response) {
    await createController(res, async () => {
      const {id} = req.params;
      const survey = await SurveyService.getSurveyById(id);
      if (!survey) {
        throw new Error('Survey not found');
      }
      return survey;
    });
  }

  async handleUpdateSurvey(req: Request, res: Response) {
    await createController(res, async () => {
      const {id} = req.params;
      const surveyData: Survey = req.body;

      const updatedSurvey = await SurveyService.updateSurvey(id, surveyData);
      if (!updatedSurvey) {
        throw new Error('Survey not found');
      }
      return updatedSurvey;
    });
  }

  async handledeleteSurvey(req: Request, res: Response) {
    await createController(res, async () => {
      const {id} = req.params;
      await SurveyService.deleteSurvey(id);
      return {message: 'Survey deleted successfully'};
    });
  }

  async handleGetAllFilledSurveys(req: Request, res: Response) {
    await createController(res, async () => {
      const filledSurveys = await SurveyService.getAllFilledSurveys();
      return filledSurveys;
    });
  }

  async handleUpdateQuestion(req: Request, res: Response) {
    await createController(res, async () => {
      const {surveyId, questionId} = req.params;
      const updatedQuestionData: Question = req.body;
      const updatedSurvey = await SurveyService.updateQuestionInSurvey(surveyId, questionId, updatedQuestionData);
      if (!updatedSurvey) {
        throw new Error('Question not found in the survey');
      }
      return updatedSurvey;
    });
  }
}

export default new SurveyController();
