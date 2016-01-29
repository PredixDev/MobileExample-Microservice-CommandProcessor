# Example Command Processor (v0.1)
A sample command-processor which adds a timestamp in response.  

## Definitions  

### Command    
A Command represents an asynchronous unit of work.  

### Command Document  
A command document is a json document with _type_ field value as _command_ & _~status_ filed. Command document format is similar to an HTTP request, with a request and response section contained in the same document.  

### Command Processor  
Any HTTP enabled micro-service.

### Command router  
Micro-Service tasked with routing `pending` command documents to configured `Command Processors`.  


## How things works
The Command Router manages the state of a given command from the time the document arrives on the server, until the router writes the result from an invoked Command Processor to the response section of the document. The Command Router will translate a command document into an equivalent HTTP request to a Command Processor. The HTTP response from the Command Processor will be serialized and placed in the response section of the originating command document.  

**Registering Command Processor**  
PM CLI tool needs following two parameters to register a Command Processor:  
*_command route_* and a *_Command-Processor-endpoint-url_*.  
ex. `pm add-route <command-route> <processor-url>` _Note: (you can use --debug option to see what it is doing behind the scene)_  

_command-document example_:  
`{
      "type": "command", //should be of type command
      "~userid": usera_ge_com, // replace '.' & '@' with '_' from username (if email address is used)
      "channels": ["entity_" + usera_ge_com],
      "~status": "pending", // should be pending when sent from client. Command Router will change it to success or error based on response from command processor

      // command router reads this and hit command processor based on parameters
      "request": {
        "uri": command_route,
        "method": "PUT",
        "headers": {},
        "body": { //whatever goes inside body will be passed to command processor
          "abc" : 1,
          "some key" : "some value"

        }
      }
  }`


## Configuration
When running on a development system environment the configuration found in `config/default.json` will be used to configure whereas `manifest.yml` will be used when pushed to CF.  
Logging level can be changed in `js/bunyanLogger.js` file. Default is `trace` and _src_ is `true`.

## Installation

### Development system
Checkout this repository, open the folder in a terminal window, and execute:  
```
npm install
```  
### CF  
Checkout this repository, open the folder in a terminal window, and execute:  
```
cf push
```

## Running

A common workflow is outlined below:

```
node index.js
OR
node index.js | ./node_modules/.bin/bunyan # outputs nice looking logs in terminal window
```  

## [Sample WebApp]
[Sample WebApp]:https://github.com/PredixDev/MobileExample-WebApp-SendCommand
