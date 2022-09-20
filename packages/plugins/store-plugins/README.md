# `@samurais-app/store-plugins`

> Samuras Local repository. It is recommended to use the SamurAs local repository when the service is deployed on a single machine. Of course, at present, it is not recommended to use multiple machines, because there is pressure on the server to synchronize in time

## Usage

```yaml
# When the current plug-in is configured in the configuration file, the plug-in will be automatically downloaded when the service starts
# config/development.config.yaml;
host: 0.0.0.0
protocol: http
port: '3001'
plugins:
  - type: storage
    name: '@samurais-app/store-plugins'
    version: 0.0.5,
```
