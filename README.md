# Sample Hardhat Project

Esse projeto demonstra a utilização de smart contracts em blockchain Ethereum de testes (Sepolia). O projeto consiste na criação de dados de rastreamento de gado utilizando o protocolo MQTTT, realizando o salvamento dos dados na blockchain utilizando o node provider Alchemy.

Ao clonar o repositorio, realize as seguintes etapas na pasta da aplicação no visual studio code:

```shell
npm i  ---> instala os pacotes do package.json 
npx hardhat compile ---> compila o smart contract, gerando as pastas artifacts e cache

```


Em seguida, é necessário criar um arquivo .env na raiz do projeto, pois ele conterá os dados necessários para a conexão com o smart contract. O arquivo .env deve ter os seguintes atributos:
``` shell
API_URL = sua_api_url
API_KEY = sua_api_key
PRIVATE_KEY = chave_privada_conta_metamask
CONTRACT_ADDRESS = endereço_contrato_após_deploy
```


A API_URL e API_KEY você irá encontrar após a criação do projeto no alchemy. Crie um projeto na plataforma e lá serão obtidos os 2 atributos.

O CONTRACT_ADRESS será obtido após a realização do seguinte comando: 

```shell
npx hardhat run scripts/deploy.js --network sepolia 
```




Após a execução desses 2 comandos, é necessário utilizar um MQTT broker para a execução do serviço MQTT e executar os scripts de publish e subscribe

Baixe o mosquitto broker neste link --> https://mosquitto.org/files/binary/win64/mosquitto-2.0.18-install-windows-x64.exe
Após baixá-lo, instale o programa no seguinte diretório: C:\mos
Para garantir a instalação correta, siga este tutorial (APENAS OS PASSOS 5 ATÉ O 17), que mostra a instalação do mosquitto broker -->  https://theautomationblog.com/how-to-setup-an-mqtt-system/

Após a instalação do Broker Mosquitto, abra a pasta criada (mos) no powershell ou CMD e utilize o comando abaixo:

```shell
mosquitto -v
```

Com o broker em execução, volte para o projeto no vs code e abra 2 terminais. Ambos devem estar na pasta AnimalTracking\mqtt


No primeiro terminal, digite o comando abaixo e verifique se a mensagem do subscrição acontece normalmente 

```shell
node subscriber.js
```

Em seguida, realiza o mesmo o comando para o publisher.js

```shell
node publisher.js
```

Com isto, o código publisher.js irá enviar os dados para o subscriber, que consequentemente enviará os dados para a rede blockchain no Alchemy. Para mais informações, utilize os links de referência abaixo:

https://www.youtube.com/watch?v=g73EGNKatDw

https://www.youtube.com/watch?v=sQJ-XQBzEuc&t=