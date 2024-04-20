# Sample Hardhat Project

Este projeto demonstra a utilização de smart contracts na blockchain Ethereum de testes (Sepolia). O projeto consiste na criação de dados de rastreamento de gado utilizando o protocolo MQTT, com o salvamento dos dados na blockchain utilizando o node provider Alchemy.

## Pré-requisitos

- Node.js e npm instalados
- Visual Studio Code
- Conta no Alchemy

## Configuração do Projeto

1. **Clone o repositório**

   ```shell
   git clone [URL_DO_REPOSITORIO]
   cd [NOME_DA_PASTA]
   ```

2. **Instale as dependências**

   ```shell
   npm install
   ```

3. **Compile o smart contract**

   ```shell
   npx hardhat compile
   ```

   Isso gerará as pastas `artifacts` e `cache`.

4. **Crie o arquivo `.env` na raiz do projeto**

   O arquivo `.env` deve conter os seguintes atributos:

   ```shell
   API_URL = [sua_api_url]
   API_KEY = [sua_api_key]
   PRIVATE_KEY = [chave_privada_conta_metamask]
   CONTRACT_ADDRESS = [endereço_contrato_após_deploy]
   ```

   - `API_URL` e `API_KEY`: Obtenha após criar um projeto no Alchemy.
   - `CONTRACT_ADDRESS`: Será obtido após a execução do comando:

     ```shell
     npx hardhat run scripts/deploy.js --network sepolia
     ```

## Configuração do MQTT Broker

1. **Baixe e instale o Mosquitto Broker**

   [Download Mosquitto Broker](https://mosquitto.org/files/binary/win64/mosquitto-2.0.18-install-windows-x64.exe)

   Instale o programa no diretório `C:\mos`.

   Para garantir a instalação correta, siga este [tutorial](https://theautomationblog.com/how-to-setup-an-mqtt-system/) (APENAS OS PASSOS 5 ATÉ O 17).

2. **Inicie o Mosquitto Broker**

   Abra a pasta `C:\mos` no PowerShell ou CMD e execute:

   ```shell
   mosquitto -v
   ```

## Executando o Projeto

1. **Abra dois terminais no VS Code**

   Ambos devem estar na pasta `AnimalTracking\mqtt`.

2. **No primeiro terminal, execute o subscriber**

   ```shell
   node subscriber.js
   ```

   Verifique se a mensagem de subscrição acontece normalmente.

3. **No segundo terminal, execute o publisher**

   ```shell
   node publisher.js
   ```

   Com isso, o `publisher.js` enviará os dados para o `subscriber.js`, que consequentemente enviará os dados para a rede blockchain no Alchemy.

## Referências

- [Tutorial de MQTT](https://www.youtube.com/watch?v=g73EGNKatDw)
- [Introdução ao Alchemy](https://www.youtube.com/watch?v=sQJ-XQBzEuc&t=)
