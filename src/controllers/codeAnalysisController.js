const { ESLint } = require('eslint');
const { exec } = require('child_process');

exports.analyzeCode = async (req, res) => {
  const code = req.body.code;
  const language = req.body.language || 'js';

  try {
    if (language === 'js') {
      const eslint = new ESLint();
      const results = await eslint.lintText(code);
      const formatter = await eslint.loadFormatter("stylish");
      const resultText = formatter.format(results);
      res.json({ analysis: resultText });
    } else if (language === 'python') {
      exec(`echo "${code}" | python3 pylint_analysis.py`, (error, stdout, stderr) => {
        if (error) {
          res.status(500).json({ error: stderr });
        } else {
          res.json({ analysis: stdout });
        }
      });
    } else {
      res.status(400).json({ error: 'Unsupported language' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
