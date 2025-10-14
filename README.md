# Para rodar o projeto

1- Abra o ganache via a terminal:

    ganache -h 0.0.0.0 -p 7545
2 - Entre no stampfy:

    cd stampfy/onchain
    npm install
3- Faça o deploy do contrato no ganache:

    npx hardhat run scripts/deploy.js --network ganache
4- Pegue o retorno do contrato que vai aparecer no terminal do ganache
5- Configure o Stampfy UI:

    cd ../stampfy-ui
    npm install
6-Abra o arquivo .env e adicione as variaveis:

    VITE_RPC_URL=http://<IP_DO_PC>:7545
    VITE_CONTRACT_ADDRESS=<ENDERECO_DO_CONTRATO>
    VITE_PRIVATE_KEY=<SUA_CHAVE_PRIVADA>
7- Rode o stampfy:

    npm run dev

8- Configure o .env do keyless:

    EXPO_PUBLIC_RPC_URL=http://<IP_DO_PC>:7545
    EXPO_PUBLIC_CONTRACT_ADDRESS=<ENDERECO_DO_CONTRATO>

9- Configure e rode o keyless

    cd keyless-app
    npm install
    npm start
