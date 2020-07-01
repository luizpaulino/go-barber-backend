import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotController = new ForgotPasswordController();
const resetController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotController.create);
passwordRouter.post('/reset', resetController.create);

export default passwordRouter;
