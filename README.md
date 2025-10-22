# BEZ Leads - Sistema de Gestão de Leads

Um sistema moderno de CRM (Customer Relationship Management) desenvolvido em Angular, inspirado no Thumbtack Pro, para gerenciar leads, clientes e serviços.

## 🚀 Funcionalidades

### Dashboard
- Visão geral com estatísticas em tempo real
- Gráficos de leads e clientes por status
- Taxa de conversão
- Atividade recente

### Gestão de Leads
- Cadastro e edição de leads
- Filtros por status e busca
- Acompanhamento do pipeline de vendas
- Status: Novo, Contatado, Qualificado, Proposta, Negociação, Fechado

### Gestão de Clientes
- Cadastro completo de clientes
- Histórico de interações
- Status: Prospect, Ativo, Inativo
- Informações de contato e endereço

### Gestão de Serviços
- Catálogo de serviços oferecidos
- Preços e durações
- Categorias: Consultoria, Desenvolvimento, Design, Marketing, Suporte
- Requisitos e entregáveis

## 🛠️ Tecnologias Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa
- **Material Icons** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd bez-leads
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
ng serve
```

4. Acesse `http://localhost:4200` no seu navegador

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── leads/        # Gestão de leads
│   │   ├── customers/    # Gestão de clientes
│   │   ├── services/     # Gestão de serviços
│   │   └── layout/       # Layout principal
│   ├── services/
│   │   ├── leads.ts      # Serviço de leads
│   │   ├── customers.ts  # Serviço de clientes
│   │   ├── services.ts   # Serviço de serviços
│   │   └── dashboard.ts  # Serviço do dashboard
│   ├── models/
│   │   ├── lead.ts       # Interface Lead
│   │   ├── customer.ts   # Interface Customer
│   │   └── service.ts    # Interface Service
│   └── app.routes.ts     # Configuração de rotas
```

## 🎨 Design System

### Cores
- **Primária**: Gradiente azul-roxo (#667eea → #764ba2)
- **Sucesso**: Verde (#4CAF50)
- **Aviso**: Laranja (#FF9800)
- **Erro**: Vermelho (#F44336)
- **Neutro**: Cinza (#9E9E9E)

### Componentes
- Cards com sombras suaves
- Botões com efeitos hover
- Formulários responsivos
- Sidebar colapsível
- Status badges coloridos

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Funcionalidades Técnicas

### Estado Reativo
- Uso de BehaviorSubject para gerenciamento de estado
- Observables para comunicação entre componentes
- Atualizações em tempo real

### Dados Mock
- Dados de exemplo pré-carregados
- Simulação de operações CRUD
- Persistência em memória durante a sessão

### Roteamento
- Navegação SPA (Single Page Application)
- Rotas protegidas
- Redirecionamento automático

## 🚀 Próximos Passos

- [ ] Integração com API real
- [ ] Autenticação e autorização
- [ ] Relatórios avançados
- [ ] Notificações em tempo real
- [ ] Exportação de dados
- [ ] Integração com calendário
- [ ] Sistema de tarefas
- [ ] Chat interno

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

---

Desenvolvido com ❤️ usando Angular