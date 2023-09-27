import {SurveyModel, QuestionModel} from '../schema';
import {Survey, Question} from '../interface';

class SurveyService {
  async createSurvey(surveyData: Survey): Promise<Survey> {
    const survey = new SurveyModel(surveyData);
    const savedSurvey = await survey.save();
    return savedSurvey.toJSON();
  }

  async getAllSurveys(): Promise<Survey[]> {
    const surveys = await SurveyModel.find().populate('questions').exec();
    return surveys.map(survey => survey.toJSON());
  }

  async getSurveyById(id: string): Promise<Survey | null> {
    const survey = await SurveyModel.findById(id).populate('questions').exec();
    if (!survey) {
      return null;
    }
    return survey.toJSON();
  }

  async updateSurvey(id: string, surveyData: Survey): Promise<Survey | null> {
    const updatedSurvey = await SurveyModel.findByIdAndUpdate(id, surveyData, {
      new: true,
    }).exec();
    if (!updatedSurvey) {
      return null;
    }
    return updatedSurvey.toJSON();
  }

  async deleteSurvey(id: string): Promise<void> {
    await SurveyModel.findByIdAndRemove(id).exec();
  }

  async createQuestion(surveyId: string, questionData: Question): Promise<string> {
    const survey = await SurveyModel.findById(surveyId).exec();
    if (!survey) {
      throw new Error('Survey not found');
    }

    const newQuestionData: Question = {
      questionType: questionData.questionType,
      content: questionData.content,
      options: questionData.options,
    };

    const newQuestion = new QuestionModel(newQuestionData);
    await newQuestion.save();
    survey.questions.push(newQuestion._id);
    if (questionData.nextQuestionId) {
      const linkedQuestion = await QuestionModel.findById(questionData.nextQuestionId).exec();
      if (linkedQuestion) {
        newQuestion.nextQuestionId = linkedQuestion._id;
        await newQuestion.save();
      }
    }

    await survey.save();
    return 'Question created successfully';
  }

  async getAllFilledSurveys(): Promise<Survey[]> {
    const filledSurveys = await SurveyModel.find({'userResponses.userId': {$exists: true}})
      .populate('userResponses.userId')
      .exec();
    return filledSurveys.map(survey => survey.toJSON());
  }

  async updateQuestionInSurvey(surveyId: string,questionId: string,updatedQuestionData: Question): Promise<Survey | null>
   {
    const survey = await SurveyModel.findById(surveyId).exec();
    if (!survey) {
      throw new Error('Survey not found');
    }

    const question = await QuestionModel.findById(questionId).exec();
    if (!question) {
      throw new Error('Question not found');
    }

    // Ensure that updatedQuestionData.questionType is one of the enum values
    if (
      updatedQuestionData.questionType !== 'DESCRIPTION' &&
      updatedQuestionData.questionType !== 'MULTIPLE_CHOICE' &&
      updatedQuestionData.questionType !== 'INPUT_FIELD' &&
      updatedQuestionData.questionType !== 'FILE_UPLOAD'
    ) {
      throw new Error('Invalid question type');
    }

    // Update the question
    question.questionType = updatedQuestionData.questionType;
    question.content = updatedQuestionData.content;
    question.options = updatedQuestionData.options;

    await question.save();

    return survey.toJSON();
  }
}

export default new SurveyService();
