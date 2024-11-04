// eslint-disable-next-line no-undef
const { ESLint } = require('eslint');

// eslint-disable-next-line no-undef
exports.analyzeCode = async (req, res) => {
  const code = req.body.code;
  const eslint = new ESLint();

  try {
    const results = await eslint.lintText(code);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    res.json({ analysis: resultText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
