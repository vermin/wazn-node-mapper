WAZN Node Mapper
======================

[![License](https://img.shields.io/badge/license-AGPL--3.0-blueviolet)](https://opensource.org/licenses/AGPL-3.0)

Simple script that grabs all known nodes and its peers from the network, and stores them in a local db, tracking changes.

## Requirements

- Node.Js 8+
- SQLite 3
- Cron

## .env variables

Create ``.env`` file in the root directory:
```
APP_PORT=9000
CRON_MAP=1 * * * *
CRON_LOCATE=0 0 * * *
```

##Status
![Node.js CI](https://github.com/vermin/wazn-node-mapper/workflows/Node.js%20CI/badge.svg?branch=dev)

## License

```
Licensed under the AGPL-3.0
Copyright (c) 2020 WAZN Project
Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
```
