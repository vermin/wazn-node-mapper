WAZN Node Mapper
======================

[![License](https://img.shields.io/badge/license-AGPL--3.0-blueviolet)](https://opensource.org/licenses/AGPL-3.0)

Simple script that grabs all known nodes and its peers from the network, and stores them in a local db, tracking changes.

## Requirements

- [Node.js](http://nodejs.org/) v10.0+
- SQLite 3
- Cron
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash
sudo apt-get install -y nodejs sqlite3 cron
```

## Downloading & Installing
```
git clone https://github.com/vermin/wazn-node-mapper.git
cd wazn-node-mapper

npm update
```
![Node.js CI](https://github.com/vermin/wazn-node-mapper/workflows/Node.js%20CI/badge.svg?branch=dev)

## Usage

####Configuration  
Insert one of the seed nodes in `/scripts/main.js` line 18.  
Insert port where you wish wazn-node-mapper to be accessible `/bin/www` line 15.

Create ``.env`` file in the root directory:
```
APP_PORT=9119
CRON_MAP=1 * * * *
CRON_LOCATE=0 0 * * *
```
#### Run wazn-node-mapper  
```
node ./bin/www
```

## License

```
Licensed under the AGPL-3.0
Copyright (c) 2020 WAZN Project
Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
```
