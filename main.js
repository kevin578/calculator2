window.onload = function() {


document.onkeydown = function(event) {

	if (event.keyCode > 47 && event.keyCode < 59 & !event.shiftKey) {
		numberButton(String.fromCharCode(event.keyCode));
	}

	else if (event.keyCode == '13') equalButton();
	else if (event.keyCode == '187' && event.shiftKey) operatorButton('+');
	else if (event.keyCode == '189') operatorButton('-');
	else if (event.keyCode == '191'&& event.shiftKey) operatorButton('/');
	else if (event.keyCode == '56' && event.shiftKey) operatorButton('*');
	else if (event.keyCode == '67') clearButton();
}



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

	else if (lastButtonPressed == 'equals') {
		displayNumber = 0;
		numbers = [];
	}

	displayNumber = "" + displayNumber + number;
	displayNumber = parseInt(displayNumber);
	lastButtonPressed = 'number';

	render(numbers.join(" ") + " " + displayNumber);

}

//operators
function operatorButton(operator) {

if (lastButtonPressed=='operator') {
	numbers[numbers.length - 1] = operator;
}

else if (lastButtonPressed == 'number') {
	numbers.push(displayNumber);
	displayNumber = 0;
	numbers.push(operator);

	render(numbers.join(" "));
}

else if (lastButtonPressed == 'equals') {
	var tmp = compute(numbers);
	numbers = [];
	numbers.push(tmp);
	numbers.push(operator);
	render(numbers.join(" "))
}

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


	if (lastButtonPressed == 'operator') numbers.pop();

	else if (lastButtonPressed == 'number') {
	numbers.push(displayNumber);
	render( compute(numbers) );
	lastButtonPressed = 'equals'
}
}


//render
function render(content) {
	document.getElementById("screen").getElementsByTagName("p")[0].innerHTML = content;
}


//takes array and boils it down to a single value
function compute(arrayOfNumbers) {

	checkForOperators('*', '/');
	checkForOperators('+', '-');

	function checkForOperators(op1, op2) {
		for (var i = 0; i < arrayOfNumbers.length; i++) {
			if (numbers[i] == op1) {
				sumItAll(arrayOfNumbers.indexOf(op1), arrayOfNumbers);
				checkForOperators(op1, op2);
			}

			else if (numbers[i] == op2) {
				sumItAll(arrayOfNumbers.indexOf(op2), arrayOfNumbers);
				checkForOperators(op1, op2);
			}				
		}
	}
	return arrayOfNumbers[0	];
}


//function that computes set of 3 in array and replaces them with a single value

function sumItAll(index, arr) {

	var x = arr[index - 1];
	var y = arr[index + 1];
	var op = arr[index];

	var math_it_up = {
			'+':  (x, y) => x + y,
			'-':  (x, y) => x - y,
			'*':  (x, y) => x * y,
			'/':  (x, y) => x / y
		};
	

	arr.splice(index - 1, 3, math_it_up[op](x,y));


}


}


