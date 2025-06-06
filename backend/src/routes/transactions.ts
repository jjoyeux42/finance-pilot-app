import { Router, Request, Response } from 'express';
import { TransactionController } from '@/controllers/transactionController.js';
import { validateRequest, schemas } from '@/middleware/validation.js';

const router = Router();

// Routes CRUD pour les transactions avec validation
router.get('/', 
  validateRequest(schemas.pagination, 'query'),
  TransactionController.getTransactions
);

router.post('/', 
  validateRequest(schemas.createTransaction, 'body'),
  TransactionController.createTransaction
);

router.put('/:id', 
  validateRequest(schemas.idParam, 'params'),
  validateRequest(schemas.updateTransaction, 'body'),
  TransactionController.updateTransaction
);

router.delete('/:id', 
  validateRequest(schemas.idParam, 'params'),
  TransactionController.deleteTransaction
);

export { router as transactionRoutes };