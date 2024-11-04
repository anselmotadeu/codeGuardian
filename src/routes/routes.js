const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const controller = require('../controllers/controller');

router.get('/', controller.home);
=======
const codeAnalysisController = require('../controllers/codeAnalysisController');

router.post('/analyze', codeAnalysisController.analyzeCode);
>>>>>>> 5104cc8 (🚀 feat: adicionar configuração básica do ESLint)

module.exports = router;
