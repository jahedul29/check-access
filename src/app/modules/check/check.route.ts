import express from 'express';
import { CheckController } from './check.controller';

const router = express.Router();

router.post('/', CheckController.create);
router.get('/', CheckController.findAll);
router.get('/:id', CheckController.findOne);
router.delete('/:id', CheckController.deleteOne);

export const CheckRouter = router;
