# CodeGuardian

## Visão Geral

CodeGuardian é uma ferramenta que identifica códigos ruins, sugere boas práticas e analisa várias linguagens de programação.

## Tecnologias Usadas

- **Front-end**: React (em breve)
- **Back-end**: Node.js, Express
- **Ferramentas de Análise de Código**:
  - **JavaScript**: ESLint
  - **Python**: PyLint
  - **HTML**: HTMLHint
  - **CSS**: Stylelint

## Como Iniciar

1. Clone o repositório:
```bash
git clone https://github.com/anselmotadeu/codeGuardian.git
```

2. Navegue até o diretório do projeto:
```bash
cd codeGuardian
```

3. Instale as dependências do Node.js:
```bash
npm install
```

4. Crie e ative um ambiente virtual Python:
```bash
python3 -m venv venv
source venv/bin/activate
```

5. Instale as dependências do Python:
```bash
pip install pylint
```

6. Inicie o servidor Node.js:
```bash
npm start
```

## Uso
### Análise de Código

1. Envie uma requisição POST para /analyze com o seguinte corpo:
```json
{
  "code": "seu código aqui",
  "language": "js" // ou 'python', 'html', 'css'
}
```

2. Receba a análise do código com sugestões de boas práticas e possíveis erros.
## Exemplos
### JavaScript:
```json
{
  "code": "var x = 10;",
  "language": "js"
}
```

### Python:
```json
{
  "code": "def foo():\n    print('Hello World')",
  "language": "python"
}
```

### HTML:
```json
{
  "code": "<div class='foo'>Hello World</div>",
  "language": "html"
}
```

### CSS:
```json
{
  "code": ".foo { color: red; }",
  "language": "css"
}
```

## Lembretes

- Certifique-se de estar no ambiente virtual Python antes de iniciar o servidor.
- Atualize as dependências regularmente com npm install e pip install.

## Contribuição

1. Fork o projeto.
2. Crie uma nova branch (git checkout -b feature/nova-feature).
3. Faça o commit das suas alterações (git commit -m 'Adiciona nova feature').
4. Dê push na sua branch (git push origin feature/nova-feature).
5. Abra um Pull Request.