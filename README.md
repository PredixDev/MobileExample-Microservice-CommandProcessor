# MobileExample-Microservice-CommandProcessor
A sample command processor that adds a timestamp in response.  

## Definitions  

### Command    
A Command represents an asynchronous unit of work.  

### Command Document  
A command document is a JSON document with a _~status_ field and a _type_ field with a _command_. The command document format is similar to an HTTP request, with a request and response section contained in the same document.  

### Command Processor  
Any HTTP enabled microservice.

### Command router  
Microservice tasked with routing `pending` command documents to configured `Command Processors`.  


## How things work
The Command Router manages the state of a given command from the time the document arrives on the server until the router writes the result from an invoked Command Processor to the response section of the document. The Command Router translates a command document into an equivalent HTTP request to a Command Processor. The HTTP response from the Command Processor is serialized and placed in the response section of the originating command document.  

**Registering Command Processor**  
PM CLI tool needs the following two parameters to register a Command Processor:  
*_command route_* and a *_Command-Processor-endpoint-url_*.  
For example: `pm add-route '/cmdp_test/' 'my-command-processor.run.aws-usw02-pr.ice.predix.io'` _Note: You can use --debug option to see what it is doing behind the scene._  

_command-document example_:  
``` 
{
  "type": "command", //should be of type command  
  "~userid": usera_ge_com, // replace . & @ with _ from username (if email address is used)
  "channels": ["entity_" + usera_ge_com],
  "~status": "pending",
  // command router reads this and hit command processor based on parameters
  "request": {
    "uri": "/cmdp_test/",
    "method": "PUT",
    "headers": {},
    "body": { //whatever goes inside body will be passed to command processor
      "abc" : 1,
      "some key" : "some value"
    }
  }
}
```
## Before You Begin:
It is assumed that you already have a running instances of [_Predix Mobile cloud services_](https://www.predix.io/docs#rae4EfJ6) and have installed the _Predix Mobile command line tool_.  

## Configuration
When running on a development system environment, use the configuration found in `config/default.json`. When pushing to CF, use is be  `manifest.yml`.  
You can change the logging level in `js/bunyanLogger.js` file. The default is `trace` and _src_ is `true`.

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
- Push this command-processor to cf.  
- Get command-processor url (_urls_ field of `cf apps`).
- Run `pm add-route <command-route> <processor-url>`
- Push [Sample WebApp] to Mobile backend `pm publish`

## [Sample WebApp]
[Sample WebApp]:https://github.com/PredixDev/MobileExample-WebApp-SendCommand
