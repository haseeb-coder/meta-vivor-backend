import { Response } from 'express';

async function createController<T>(res: Response, controller: () => Promise<T>) {
  try {
    const result = await controller();
    return res.json(result);
  } catch (error: any) {
    const status = error.statusCode || (error.code === 'InvalidParameterException' ? 400 : 500);
    const message = error.message || 'Internal Server Error';

    return res.status(status).json({ error: { message } });
  }
}

export default createController;
