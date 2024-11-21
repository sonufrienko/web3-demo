# Web3 Demo

## Local setup

Setup MongoDB

```shell
docker run -d --name web3-mongo -p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=admin \
	mongo
```

