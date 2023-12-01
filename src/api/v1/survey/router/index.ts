import express from 'express';

import SurveyController from '../controller';

const SurveyRouter = express.Router();

SurveyRouter.post('/create', SurveyController.handleCreateSurvey);

// Update a specific survey
SurveyRouter.get('/all', SurveyController.handlegetAllSurveys);
SurveyRouter.get('/:id', SurveyController.handlegetSurveyById);
SurveyRouter.put('/:id', SurveyController.handleUpdateSurvey);
SurveyRouter.delete('/:id', SurveyController.handledeleteSurvey);

// create question against a survey
SurveyRouter.post('/:surveyId/question', SurveyController.handleCreateQuestion);

SurveyRouter.get('/filled-survey', SurveyController.handleGetAllFilledSurveys);

// Update a specific question within a survey
SurveyRouter.put('/:surveyId/questions/:questionId', SurveyController.handleUpdateQuestion);

// Delete a specific question within a survey
SurveyRouter.delete('/:surveyId/questions/:questionId', SurveyController.handledeleteQuestion);

export default SurveyRouter;
