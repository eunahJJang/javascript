var line = process.argv.slice(2);
var initial ='1 ';

for (var i = 0; i<line ; i++) {
	var result = ''
		, dataArr = initial.split(' ')
		, index = 0
		, count = 1
		, temp = dataArr[0];
		
	for(var index =1 ; index<dataArr.length ; index++){
		if(temp == dataArr[index]){
			count++;
		}else{
			result += temp + ' ' + count+ ' '; 
			temp = dataArr[index];
			count = 1;
		}
	}
	console.log(initial);
	initial = result;
}
