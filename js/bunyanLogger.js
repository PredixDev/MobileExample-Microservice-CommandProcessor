"use strict";

// --- imports
var bunyan      = require('bunyan');


module.exports = {
      logger : getLogger
};

function getLogger()
{
  return bunyan.createLogger({name: "PM-CMDP", src:true, level:'TRACE'});
}
