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
- Atualize as dependências regularmente com `npm install` e `pip install`.

## Funcionalidades Futuras Planejadas

### Melhorias na Interface

1. **Adicionar Cabeçalho e Rodapé**
   - Cabeçalho com o nome do projeto e slogan
   - Rodapé com links úteis (documentação, contribuições, contato)

2. **Temas e Paletas de Cores**
   - Escolher uma paleta de cores consistente
   - Oferecer tema claro e escuro

3. **Layout Responsivo**
   - Garantir que a aplicação funcione bem em diferentes tamanhos de tela (desktop, tablet, smartphone)

### Funcionalidades Adicionais

1. **Configurações de Lint**
   - Permitir ao usuário ajustar regras e configurações do lint

2. **Exportar Resultados**
   - Oferecer opção de exportar resultados para PDF ou texto

3. **Histórico de Análises**
   - Exibir histórico de análises realizadas para referência futura

4. **Notificações e Feedback Visual**
   - Adicionar notificações visuais para mostrar o progresso da análise ou alertar sobre problemas
   - Mostrar animações suaves ao realizar ações, como clicar em botões ou carregar resultados

5. **Funcionalidade de Login**
   - Adicionar funcionalidade de login para usuários, permitindo personalização e salvamento de configurações

### Priorização das Funcionalidades

1. **Subir Implementação Atual**
2. **Adicionar Menu ao Cabeçalho**
3. **Implementar Configurações de Lint**
4. **Implementar Exportação de Resultados**
5. **Adicionar Histórico de Análises**
6. **Adicionar Notificações e Feedback Visual**
7. **Adicionar Funcionalidade de Login**

### Funcionalidades Concluídas

- [x] **Adicionar Cabeçalho e Rodapé**
- [x] **Adicionar Menu ao Cabeçalho e Centralizar**
- [x] **Temas e Paletas de Cores**
  - Escolher uma paleta de cores consistente
  - Oferecer tema claro e escuro
- [x] **Layout Responsivo**
  - Garantir que a aplicação funcione bem em diferentes tamanhos de tela (desktop, tablet, smartphone)
- [ ] **Configurações de Lint**
  - Permitir ao usuário ajustar regras e configurações do lint
- [ ] **Exportar Resultados**
  - Oferecer opção de exportar resultados para PDF ou texto
- [ ] **Histórico de Análises**
  - Exibir histórico de análises realizadas para referência futura
- [ ] **Notificações e Feedback Visual**
  - Adicionar notificações visuais para mostrar o progresso da análise ou alertar sobre problemas
  - Mostrar animações suaves ao realizar ações, como clicar em botões ou carregar resultados
- [ ] **Funcionalidade de Login**
  - Adicionar funcionalidade de login para usuários, permitindo personalização e salvamento de configurações


---

## Contribuição

1. Fork o projeto.
2. Crie uma nova branch (git checkout -b feature/nova-feature).
3. Faça o commit das suas alterações (git commit -m 'Adiciona nova feature').
4. Dê push na sua branch (git push origin feature/nova-feature).
5. Abra um Pull Request.
