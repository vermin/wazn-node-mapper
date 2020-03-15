WAZN Node Mapper
======================





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

## License
```
Licensed under the GPL-3.0
Copyright (c) 2019 WAZN Project
Copyright (c) 2019 uPlexa
```
