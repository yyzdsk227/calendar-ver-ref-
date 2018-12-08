// 캘린더 객체
var calendar = {
	LEAF : [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ], //윤년
	PLAIN : [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ], //평년
	
	iscLeafCheck :	function(year) {
		var isc = false;
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) { // 윤년이면
			isc = true;
		}
		return isc;
	},
	
	daysY :	function(year) {
		var daySum = 0;
		for (var i = 1; i < year; i++) { //1년부터계산하는것 2018년이면 daySum은 확실히 큰 값
			if (this.iscLeafCheck(i)) {
				daySum += 366;
			} else {
				daySum += 365;
			}
		}
		return daySum;
	},
	
	daysM :	function(year, month) {
		var daySum = this.daysY(year);
		for (var i = 1; i < month; i++) {
			daySum += this.PLAIN[i - 1];
		}
		if (month >= 2 && this.iscLeafCheck(year)) {
			daySum++;
		}
		return daySum;
	},
	
	daysD :	function(year, month, day) {
		return this.daysM(year, month) + day;
	},
	
	lastDay : function(year, month) {
		var last_day = 0;
		if (this.iscLeafCheck(year)) {
			last_day = this.LEAF[month - 1]; //31,29,31,30 ...
		} else {
			last_day = this.PLAIN[month - 1]; //31,28,31,30 ...
		}
		return last_day;
	},
	
	isBeforeDays :	function(year, month) {
		var days = 0;
		if (month == 1) {
			days = this.lastDay(year - 1, 12); //1월이면 31 
		} else {
			days = this.lastDay(year, month - 1); //12월이면 30, 11월이면 31
		}
		return days;
	},
	
	make :	function(year, month) {
		var dateOfWeek = (this.daysD(year, month, 1)) % 7; // 매달 1일의 요일 월 0 ~ 토 6
		var beforeLastDay = this.isBeforeDays(year, month);
		var startLastDay = beforeLastDay - dateOfWeek + 1;
		var last_day = this.lastDay(year, month); // 구하고자 하는 년월의 최대 일수
		var lastWeekDays = (7 - (dateOfWeek + last_day) % 7) % 7;
		if (this.iscLeafCheck(year)) {
			startLastDay++;
			lastWeekDays++;
		}
		var dayArray = new Array();
		var cnt = 0;
		for (var i = startLastDay; i <= beforeLastDay; i++, cnt++) {
			dayArray[cnt] = '-';  //2018.11 기준 앞의 28~31 
		}
		for (var i = 1; i <= last_day; i++, cnt++) {
			dayArray[cnt] = i; //dayArray값 새로 초기화
		}
		for (var i = 1; i <= lastWeekDays; i++, cnt++) {
			dayArray[cnt] = '-'; //2018.11 뒤의 1
		}
		return dayArray;
	},
	
	//달력 1개만??
	makeOne :	function(year, month){
		var last_day = this.lastDay(year, month); // 구하고자 하는 년월의 최대 일수
		var dayArray = new Array();
		var cnt = 0;
		for (var i = 1; i <= last_day; i++, cnt++) {
			dayArray[cnt] = i;
		}
		return dayArray;
	}
}