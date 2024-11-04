const ESLint = require('eslint').ESLint;
const exec = require('child_process').exec;
const HTMLHint = require('htmlhint').HTMLHint;
const stylelint = require('stylelint');
const linguist = require('github-linguist');

const supportedLanguages = ['javascript', 'python', 'html', 'css'];

exports.analyzeCode = async (req, res) => {
  const code = req.body.code;
  let language = req.body.language || guessLanguage(code);

  console.log('Detected Language:', language); // Para depuração

  try {
    let resultText = '';
    if (language === 'javascript') {
      resultText = await analyzeJavaScript(code);
    } else if (language === 'python') {
      resultText = await analyzePython(code);
    } else if (language === 'html') {
      resultText = analyzeHTML(code);
    } else if (language === 'css') {
      resultText = await analyzeCSS(code);
    } else {
      return res.status(400).json({ error: `Unsupported language: ${language}` });
    }

    res.json({ analysis: resultText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function guessLanguage(code) {
  const language = linguist.detect(code);
  console.log('Linguist Detection:', language); // Para depuração
  return language && supportedLanguages.includes(language.language.toLowerCase()) ? language.language.toLowerCase() : 'unknown';
}

async function analyzeJavaScript(code) {
    try {
      const eslint = new ESLint();
      const results = await eslint.lintText(code);
      const formatter = await eslint.loadFormatter("stylish");
      const formattedResults = formatter.format(results);
  
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
                ${results.map(issue => {
                  const suggestion = getSuggestionForHtml(issue);
                  return `<li><strong>Linha ${issue.line}, Coluna ${issue.col}</strong>: ${issue.message}${suggestion ? `<br><em>Sugestão: ${suggestion}</em>` : ''}</li>`;
                }).join('')}
              </ul>
              <div>Sugestões de correção:</div>
              <ul>
                ${results.map(issue => {
                  const suggestion = getSuggestionForHtml(issue);
                  return `<li>Linha ${issue.line}, Coluna ${issue.col}: ${suggestion || 'Considere revisar o código.'}</li>`;
                }).join('')}
              </ul>`;
    }
  }
  
  function getSuggestionForHtml(issue) {
    // Adicione sugestões específicas com base no tipo de erro
    if (issue.message.includes('Special characters must be escaped')) {
      return 'Certifique-se de que todos os caracteres especiais, como < e >, estejam escapados corretamente.';
    }
    if (issue.message.includes('Tag must be paired')) {
      return 'Verifique se todas as tags estão corretamente fechadas e emparelhadas.';
    }
    return null;
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
