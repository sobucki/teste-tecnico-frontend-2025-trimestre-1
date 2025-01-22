# Agenda de Endereços - Teste Técnico

O propósito desse projeto é realizar um teste técnico, onde deve ser desenvolvido uma aplicação React que busca dados de endereços via API de um serviço externo, no caso cep-promise, e armazena-los no lado do cliente (local storage) o que permite acessar os dados após o recarregamento da página.

## Funcionalidades

- **Cadastro** de contatos, com nome de usuário, nome de exibição do endereço e CEP;
- **Listagem** dos contatos;
- **Edição** do nome de exibição na lista;
- **Filtragem** por usuário, cidade, estado e busca por nome de exibição;
- **Exclusão** de um contato.

---

## Demonstração

A aplicação está hospedada no Vercel e pode ser acessada através do link:

🔗 **[Agenda de Endereços](https://teste-tecnico-frontend-2025-trimestre-1-vuk2.vercel.app/)**
---

### Tecnologias Utilizadas

- [React (18.3.1)](https://github.com/facebook/react)
- [Vite](https://github.com/vitejs/vite) (bundler)
- [Typescript (5.6.2)](https://github.com/microsoft/TypeScript)
- [Material UI](https://github.com/mui/material-ui)
- [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- [ZOD](https://github.com/colinhacks/zod) (Validação de schemas)
- [CEP Promise](https://github.com/BrasilAPI/cep-promise) (serviço de busca de CEPs)
- [UUID](https://github.com/uuidjs/uuid) (geração de IDs para os contatos)
- [ESLint](https://github.com/eslint/eslint) (padronização do código)
- [Vitest](https://github.com/vitest-dev/vitest) (teste unitários)

---

#### Instalação e configuração

1. Clonar o repositório:

    ```bash
    git clone git@github.com:sobucki/teste-tecnico-frontend-2025-trimestre-1.git
    ```

2. Acessar a pasta do projeto:

  ```bash
  cd teste-tecnico-frontend-2025-trimestre-1
  ```
  
3. Instalar dependências:

  ```bash
 npm install
  ```

4. Inicializar o servidor de desenvolvimento:

  ```bash
 npm run dev
  ```

O projeto inclui testes unitários, para executa-los use o comando:

```bash
npm run test
```
