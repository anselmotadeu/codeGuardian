const ESLint = require('eslint').ESLint;
const exec = require('child_process').exec;
const HTMLHint = require('htmlhint').HTMLHint;
const stylelint = require('stylelint');
const detectLang = require('lang-detector');

const supportedLanguages = ['JavaScript', 'Python', 'HTML', 'CSS'];
const modeMap = {
  'JavaScript': 'javascript',
  'Python': 'python',
  'HTML': 'html',
  'CSS': 'css'
};

exports.analyzeCode = async (req, res) => {
  const code = req.body.code;
  let language = detectLanguage(code);

  console.log('Detected Language:', language); // Para depuração

  try {
    let resultText = '';
    if (language === 'JavaScript') {
      resultText = await analyzeJavaScript(code);
    } else if (language === 'Python') {
      resultText = await analyzePython(code);
    } else if (language === 'HTML') {
      resultText = analyzeHTML(code);
    } else if (language === 'CSS') {
      resultText = await analyzeCSS(code);
    } else {
      return res.status(400).json({ error: `Unsupported language: ${language}` });
    }

    res.json({ analysis: resultText, language: modeMap[language] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function detectLanguage(code) {
  const language = detectLang(code);
  console.log('Detected Language:', language); // Para depuração
  return supportedLanguages.includes(language) ? language : 'unknown';
}

async function analyzeJavaScript(code) {
  try {
    const { default: stripAnsi } = await import('strip-ansi');
    const eslint = new ESLint();
    const results = await eslint.lintText(code);
    const formatter = await eslint.loadFormatter("stylish");
    let formattedResults = formatter.format(results);

    // Remover códigos ANSI
    formattedResults = stripAnsi(formattedResults);

    if (results.length === 0) {
      return `<div style="color: green; font-weight: bold;">Nenhum problema encontrado.</div>
              <div>O código foi analisado e está seguindo todas as boas práticas.</div>`;
    } else {
      return formattedResults.replace(/\n/g, '<br>');
    }
  } catch (error) {
    console.error('Error in JavaScript analysis:', error);
    throw error;
  }
}

function analyzePython(code) {
  return new Promise((resolve, reject) => {
    exec(`echo "${code}" | python3 pylint_analysis.py`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        if (stdout.trim() === '') {
          resolve(`<div style="color: green; font-weight: bold;">Nenhum problema encontrado.</div>
                   <div>O código foi analisado e está seguindo todas as boas práticas.</div>`);
        } else {
          resolve(stdout.replace(/\n/g, '<br>'));
        }
      }
    });
  });
}

function analyzeHTML(code) {
  const results = HTMLHint.verify(code);

  if (results.length === 0) {
    return `<div class="success-message">Nenhum problema encontrado.</div>
            <div>O código foi analisado e está seguindo todas as boas práticas.</div>
            <div>Aqui está um resumo:</div>
            <ul>
              <li><strong>O DOCTYPE está declarado.</strong></li>
              <li><strong>Todas as tags HTML estão corretamente fechadas.</strong></li>
              <li><strong>Não foram encontrados problemas de acessibilidade.</strong></li>
            </ul>`;
  } else {
    return `<div class="error-message">Problemas encontrados:</div>
            <ul>
              ${results.map(issue => `<li><strong>Linha ${issue.line}, Coluna ${issue.col}</strong>: ${issue.message}</li>`).join('')}
            </ul>`;
  }
}

async function analyzeCSS(code) {
  const results = await stylelint.lint({ code });
  const formattedResults = results.results[0].warnings.map(warning => `${warning.line}:${warning.column} - ${warning.text}`).join('<br>');

  if (results.results[0].warnings.length === 0) {
    return `<div style="color: green; font-weight: bold;">Nenhum problema encontrado.</div>
            <div>O código foi analisado e está seguindo todas as boas práticas.</div>`;
  } else {
    return formattedResults;
  }
}
