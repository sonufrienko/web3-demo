# Web3 Demo

## Local setup

Setup MongoDB

```shell
docker run -d --name web3-mongo -p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=admin \
	mongo
```

Start API

```shell
cd api
npm i
npm start
```

Endpoint examples

```
http://localhost:3000/api/nfts/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/1
```

```
http://localhost:3000/api/transactions/0x742d35Cc6634C0532925a3b844Bc454e4438f44e/sync
```

```
http://localhost:3000/api/transactions?address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```
