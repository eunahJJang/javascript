
log_analyzer2(process.argv.slice(2).toString());

function isRightTime (startHour, startMin, time) {
	return startHour == time.toString().substring(5,7) && time.toString().substring(8,10)>startMin && time.toString().substring(8,10)<=startMin+9 && time.toString().substring(11,13)<=59;
} 

// function log_analyzer(){
// 	var fs = require('fs');
// 	var data = fs.readFileSync('./access.log', 'utf8');
// 	var length= data.length;
// 	var count = 0;
// 	var check = 0;
// 	var sum = 0;

// 	var startMin = 00;
// 	var startHour = 16;

// 	var regExp = /\d\d\d\d:\d\d:\d\d:\d\d/;

// 	while(true){
// 		var idx = data.search(regExp);
// 		var time = data.match(regExp);

// 		if(idx == -1){
		
// 			break;
// 		}

// 		if(isRightTime(startHour, startMin, time)){
// 			count++;
// 			//console.log(check++);
// 			data = data.slice(idx+13, length);
// 		}else{
// 			console.log("FAKE"+startHour+":"+startMin+"  "+count);
// 			if(count != 0){
// 				startMin += 10;
// 				if(startMin  == 60){
// 					startHour++;
// 					startMin = 00;
// 				}
// 				sum+=count;
// 				console.log(startHour+":"+startMin+"  "+count);
// 				count = 0;

// 			}else{
// 				data = data.slice(idx+13, length);
// 			}
// 		}
		
// 	}
// 	console.log(sum);
// }



function log_analyzer2(fileName){
	var fs = require('fs');
	var data = fs.readFileSync(fileName, 'utf8');

	var resultList=["16:00", "16:10", "16:20", "16:30", "16:40", "16:50","17:00", "17:10", "17:20", "17:30", "17:40", "17:50", "18:00"];

	var map = {};

	for(var i = 0 ; i<resultList.length ; i++){
		map[resultList[i]]=0;
	}

	var dataArr = data.split("\n");

	for (var aaa in dataArr) {
		var aaaConvert = convert(dataArr[aaa]);

		if(aaaConvert == null){
			break;
		}

		for(var i = 0 ; i<resultList.length ; i++){
			
			if(aaaConvert.indexOf(resultList[i]) > -1){
				map[resultList[i]] = map[resultList[i]]+1;
			}
		}
	};

	console.log(map);
}

function convert(aaa){
	var regExp = /\d\d\d\d:\d\d:\d\d:\d\d/;
	var time = aaa.match(regExp);
	var idx = aaa.search(regExp);
	if(idx == -1){	
		return;
	}


	var result ="";

	var sec = time.toString().substring(11,13);
	var min = time.toString().substring(8,10).split("");
	var hour = time.toString().substring(5,7);

	if (min[1]<=9){
		min[0]++;
		min[1]=0;
	}

	if(min.toString().replace(",","")=="60"){
		return ((parseInt(hour))+1) +":00";
	}else{
		return hour +":"+min.toString().replace(",","");
	}
}


// var line = process.argv.slice(2);
// var initial ='1 ';

// for (var i = 0; i<line ; i++) {
// 	var result = ''
// 		, dataArr = initial.split(' ')
// 		, index = 0
// 		, count = 1
// 		, temp = dataArr[0];
		
// 	for(var index =1 ; index<dataArr.length ; index++){
// 		if(temp == dataArr[index]){
// 			count++;
// 		}else{
// 			result += temp + ' ' + count+ ' '; 
// 			temp = dataArr[index];
// 			count = 1;
// 		}
// 	}
// 	console.log(initial);
// 	initial = result;
// }
