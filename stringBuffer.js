// StringBuffer html string 직접 생성, 성능적으로도 향상인듯
var StringBuffer = function() {
	this.buffer = new Array();
};
StringBuffer.prototype.append = function(str) {
	this.buffer[this.buffer.length] = str;
};
StringBuffer.prototype.toString = function() {
	return this.buffer.join("");
};