var page = require('webpage').create(), index = 0, loadInProgress = false;
var system = require('system');

var userInfo = {};
console.log("Enter your ID ");
userInfo["userId"] = system.stdin.readLine();
console.log("Enter your PASSWORD ");
userInfo["userPw"] = system.stdin.readLine();

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
};

page.onLoadFinished = function() {
  loadInProgress = false;
};

var steps = [
  function() {
    //Load Login Page
    page.open("http://connect.navercorp.com/nhn");
  },
  function() {
    //Enter Credentials
    page.evaluate(function(userInfo) {
      var eUserId = document.getElementById("user_id");
      var eUserPw = document.getElementById("user_pw");
     
      eUserId.value = userInfo.userId;
      eUserPw.value = userInfo.userPw;
   
    }, userInfo);
  }, 
  function() {
    //Login
    page.evaluate(function() {
      var login = document.getElementsByClassName("btn_login")[0];
      login.click();
    });
  }, 
  function() {
    // Output content of page to stdout after form has been submitted
   page.evaluate(function() {
    	var aa = document.getElementsByClassName('tb_type')[0].getElementsByClassName('tit');
	    for(var i = 0; i < aa.length ; i++){
	    	console.log(aa[i].getElementsByTagName('a')[0].innerHTML);
	    }
    });
  }
];

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[index] == "function") {
    steps[index]();
    index++;
  }
  if (typeof steps[index] != "function") {
    phantom.exit();
  }
}, 50);

