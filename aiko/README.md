Documentação da Aplicação
1. Introdução
Esta documentação fornece uma visão geral da aplicação, detalhes sobre as decisões tomadas, especificação dos componentes desenvolvidos e instruções de uso.

2. Descrição do Projeto
Nome do Projeto: Aplicação de Monitoramento de Equipamentos Florestais

Objetivo: Desenvolver uma aplicação web que exiba e trate dados de equipamentos utilizados em uma operação florestal, incluindo posições, estados, históricos e funcionalidades adicionais como filtros e cálculos de produtividade e ganho.

3. Instalação
Para configurar e executar a aplicação localmente, siga os passos abaixo:

Clone o Repositório:

Copiar código
git clone <URL do repositório>
Navegue até o Diretório do Projeto:

Copiar código
cd <nome do diretório>
Instale as Dependências:

Copiar código
npm install
Inicie o Servidor de Desenvolvimento:

Copiar código
npm start
Acesse a Aplicação:

Abra seu navegador e vá para http://localhost:3000.

4. Arquitetura e Estrutura do Projeto
Estrutura do Projeto:

arduino
Copiar código
src/
  assets/
  components/
    Filtro.tsx
    ListaEquipamentos.tsx
    Map.tsx
    PopupContent.tsx
  contexts/
    EquipmentContext.tsx
  hooks/
    useEquipmentData.ts
  pages/
    Home.tsx
  services/
    api.ts
  styles/
    main.scss
    map.scss
    variables.scss
  types/
    index.ts
  utils/
    mapUtils.ts
public/
  data/
    equipment.json
    equipmentState.json
    equipmentModel.json
    equipmentStateHistory.json
    equipmentPositionHistory.json
Principais Componentes:

Map.tsx: Componente responsável por exibir o mapa e os equipamentos utilizando a biblioteca Leaflet.
PopupContent.tsx: Componente que exibe as informações detalhadas sobre o equipamento em um popup do mapa.
Filtro.tsx: Componente que fornece filtros para a visualização dos equipamentos por estado ou modelo.
ListaEquipamentos.tsx: Componente que lista todos os equipamentos disponíveis.
5. Decisões de Design
Escolha da Biblioteca de Mapas: Utilizamos o Leaflet devido à sua simplicidade e flexibilidade para exibir mapas interativos e customizáveis.
Componentização: A aplicação foi dividida em componentes independentes para promover a reutilização e facilitar a manutenção.
Gerenciamento de Estado: Optamos por Context API para o gerenciamento global dos dados dos equipamentos, simplificando o fluxo de dados entre componentes.
6. Especificação dos Componentes
Map.tsx

Descrição: Exibe o mapa e os equipamentos nas suas posições mais recentes.
Props:
positions (array): Lista de posições dos equipamentos.
equipmentStates (array): Lista de estados dos equipamentos.
equipmentModels (array): Lista de modelos dos equipamentos.
PopupContent.tsx

Descrição: Exibe um popup com detalhes do equipamento quando um marcador é clicado no mapa.
Props:
equipmentName (string): Nome do equipamento.
modelName (string): Nome do modelo do equipamento.
stateName (string): Nome do estado atual do equipamento.
backgroundColor (string): Cor de fundo do estado.
productivity (number): Percentual de produtividade do equipamento.
gain (number): Ganho total do equipamento.
onShowRouteHistory (function): Função para mostrar o histórico de rotas.
onClearRouteHistory (function): Função para limpar o histórico de rotas.
Filtro.tsx

Descrição: Componente de filtro para selecionar estado ou modelo do equipamento.
Props:
states (array): Lista de estados disponíveis.
models (array): Lista de modelos disponíveis.
onFilterChange (function): Função chamada quando o filtro é alterado.
7. Instruções de Uso
1. Visualização do Mapa:

Ao acessar a aplicação, o mapa será exibido com marcadores para os equipamentos em suas posições mais recentes.
Clique em um marcador para visualizar um popup com detalhes do equipamento.
2. Filtros:

Utilize os filtros no componente Filtro para exibir equipamentos por estado ou modelo.
3. Pesquisa:

Utilize a barra de pesquisa para encontrar um equipamento específico pelo nome.
4. Histórico de Estados e Posições:

Clique no botão no popup para visualizar o histórico de estados e posições do equipamento.
5. Produtividade e Ganho:

A produtividade e o ganho são calculados e exibidos no popup de detalhes do equipamento.
8. Testes
Testes Unitários: Implementados para funções utilitárias e componentes React. Localizados em src/utils/ e src/components/.
Testes Automatizados: Implementados com Cypress para testar o fluxo da aplicação. Localizados em cypress/integration/.
Testes de Acessibilidade: Configurados usando eslint-plugin-jsx-a11y.