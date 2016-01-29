# Example Command Processor (v0.1)
A sample command-processor which adds a timestamp in response.  

## Definitions  

### Command    
A Command represents an asynchronous unit of work. The command document format is similar to an HTTP request, with a request and response section contained in the same document.  

### Command Document  
A command document is a json document with _type_ field value as `command` & _~status_ filed.  


The request URI, headers and body are generally created by Predix-Mobile clients (or even a micro-service). The card developer chooses the URL path to use in a given command, and configures this path as a route in the configuration of a Command-Router instance.

### Command Processor  
Any HTTP enabled micro-service.

### Command router  
Micro-Service tasked with routing `pending` command documents to configured `Command-Processors`.  


## How things works
**Command-Router** keeps on looking for commands (json document with _type_ field value as `command`) sent by clients (say iPhone/iPad or a micro-service). As and when **command-router** detects a new command in *_pending_* state it looks for a **command-processor** (`uri` value of a command-document) which can process this command. The Command Router manages the state of a given command from the time the document arrives on the server, until the router writes the result from an invoked Command Processor to the response section of the document.  
The command-router will translate a command document into an equivalent HTTP request to a Command Processor. The HTTP response from the Command Processor will be serialized and placed in the response section of the originating command document.  

To register a **command-processor** with **command-router** you can use _PM CLI_ tool. PM CLI tool needs following two parameters to register a command-processor:  
**command route** and a **command-processor-endpoint-url**.  
ex. `pm add-route <command-route> <processor-url>` _(you can use --debug option to see whats its doing behind the scene)_  

command-document example:  
`{
      "type": "command", //should be of type command
      "~userid": usera_ge_com, // replace '.' & '@' with '_' from username (if email address is used)
      "channels": ["entity_" + usera_ge_com],
      "~status": "pending", // should be pending when sent from client. command-router will change it to success or error based on response from command processor

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
