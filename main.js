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

	render();

}

//operators
function operatorButton(operator) {

	if (lastButtonPressed == 'number') {
		numbers.push(displayNumber);
	}
	else if (lastButtonPressed == 'operator') {
		numbers[numbers.length - 1] = operator;
	}


	if (numbers.length % 2 != 0 && numbers.length >= 3) {
		numbers[lastItem] = sumItAll();
		numbers.push(operator);
		render(numbers[lastItem]);


	}
	else if (lastButtonPressed == 'number') {
		numbers.push(operator);
	}

lastButtonPressed = 'operator';

}

//clear button
function clearButton(){
	numbers = [];
	lastButtonPressed = 'start';
	displayNumber = 0;
	render(0);
}


//equal button
function equalButton() {
	if (lastButtonPressed == 'number') {
		numbers.push(displayNumber);
		numbers[numbers.length - 1] = sumItAll();
	}
	lastButtonPressed = 'equals';
	render(numbers);
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
var display = document.getElementById("screen").getElementsByTagName("p")[0].innerHTML;

if (content == numbers) {
	display = numbers.reduce(function(x,y) {
		return x + " " +y;
	})
}
}

}
