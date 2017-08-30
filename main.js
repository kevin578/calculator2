window.onload = function() {


var numbers = [];
var displayNumber = 0;
var lastButtonPressed = 'start';

//set event listeners for buttons
press('digits', numberButton);
press('operators', operatorButton);
press('clear', clearButton);
press('equals', equalButton);



function press(className, functionName) {
	let dig = document.getElementsByClassName(className);
	for (var i = 0; i < dig.length; i++) {
			let content = dig[i].innerHTML;
	    dig[i].addEventListener('click', function() {
				functionName(content);
			});
	}
}


//callbacks once event listeners are set

//numbers
function numberButton(number) {
	if (lastButtonPressed == 'operator'){
		displayNumber = 0;
	}

	displayNumber = "" + displayNumber + number;
	displayNumber = parseInt(displayNumber);
	lastButtonPressed = 'number';

	render(numbers.join(" ") + " " + displayNumber);

}

//operators
function operatorButton(operator) {

if (lastButtonPressed==operator) {
	numbers[numbers.length - 1] = operator;
}

else if (lastButtonPressed == 'number') {
	numbers.push(displayNumber);
	displayNumber = 0;
	numbers.push(operator);

	render(numbers.join(" "));
}

//else if ()

else {
	return;
}

lastButtonPressed = 'operator';

}

//clear button
function clearButton(){
	numbers = [];
	displayNumber = 0;
	render(displayNumber);
}


//equal button
function equalButton() {
	console.log(numbers)
	if (lastButtonPressed == 'operator') numbers.pop();
	console.log(numbers)
	var total = numbers[i];
	for (var i = 0; i < numbers.length; i++) {
		//total = 
	}
}


//function to compute last two numbers
function sumItAll() {
var y = numbers[numbers.length - 1]
var op = numbers[numbers.length - 2]
var x = numbers[numbers.length - 3]


	var math_it_up = {
			'+':  (x, y) => x + y,
			'-':  (x, y) => x - y,
			'*':  (x, y) => x * y,
			'/':  (x, y) => x / y
		};

		return math_it_up[op](x,y);


}



//render
function render(content) {
	document.getElementById("screen").getElementsByTagName("p")[0].innerHTML = content;


}


}


