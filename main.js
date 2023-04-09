const back = require('androidjs').back;

back.on("hello from front", function(){
  back.send("hello from back", "Hello from Android JS backend");
  back.send("front-log", "Backend log test");
});
