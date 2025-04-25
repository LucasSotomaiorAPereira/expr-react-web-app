## Como rodar o projeto

### 1. Clone o repositório ou baixe o arquivo ZIP

```bash
git clone https://github.com/LucasSotomaiorAPereira/expr-react-web-app.git
```

---

### 2. Configure o banco de dados MySQL

- Execute a query contida no arquivo `backend\db\database.sql` em seu servidor MySQL para criar as tabelas necessária.

---

### 4. Acesse os diretórios do frontend\reactproject e backend no terminal

Abra dois terminais *no diretório raiz do projeto* e execute:

```bash
# Terminal 1 - Backend
cd backend

# Terminal 2 - Frontend
cd frontend\reactproject
```

---

### 5. Instale as dependências

Em **cada terminal**, execute:

```bash
npm install
```

---

### 6. Inicie os servidores

Agora, execute os seguintes comandos em seus respectivos terminais:

```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
npm run dev
```
---
