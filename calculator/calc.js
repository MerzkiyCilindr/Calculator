// Пытался импортировать для квадратного корня но через браузер не сработало.
//import "math";

let a = '';
let b = '';
let sign = '';
let finish = false;
percentCheck = false;
calculateResult = '';
currentInput = '';


const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['+', '-', 'X', '/'];

// Экран вывода
const out = document.querySelector('.calc-screen p');

// Функция отчистки
function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    percentCheck = false;
    currentInput = '';
    out.textContent = 0;
}

// Если нажата клавиша С. Стирает вообще все.
document.querySelector('.c').onclick = clearAll;

//Проверка нажатой клавиши 
document.querySelector('.buttons').onclick = function (event) {
    if (!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('c')) return;


    out.textContent = '';

    const key = event.target.textContent;

    // Если нажата цифра или точка
    if (digit.includes(key)) {
        if (finish) {
            finish = false;
        }
        if(b === '' && sign === '') {
            a += key;
            out.textContent = a;
            currentInput = 'a';
        }
        // Вроде уже не нужно...
        //else if (a !== '' && b !== '' && finish) {
          //  b = key;
            //finish = false;
            //out.textContent = b;
        //}
        else {
            b += key;
            out.textContent = b;
            currentInput = 'b';
        }
    }

    // Если нажата клавиша + - * /
    if (action.includes(key)) {
        if (finish) {
            a = String(calculateResult);
            finish = false;
        }
        sign = key;
        out.textContent = key;
        currentInput = 'key';
    }

    // Если нажата клавиша =
    if(key === '=') {
        // Проверяем знак
        if(b === '') b = a;
        switch (sign) {
            case "+":
                calculateResult = (+a) + (+b);
                out.textContent = calculateResult;
                break
            case "-":
                calculateResult = (+a) - (+b)
                out.textContent = calculateResult
                break
            case "X":
                if (percentCheck) {
                    calculateResult = (+a) * (+b/100);
                    percentCheck = false;
                }
                else {
                    calculateResult = (+a) * (+b);
                }
                out.textContent = calculateResult;
                break;
            case "/":
                calculateResult = (+a) / (+b);
                out.textContent = calculateResult;
                break;
        }
        finish = true;
        a = '';
        b = '';
        sign = '';
    }

    // Если нажата клавиша +/-
    if(key === '+/-') {
        if (finish) {
            a = String(-calculateResult);
            finish = false;
            out.textContent = a;
        }
        else if (b === '') {
            a = -a;
            out.textContent = a;
        }
        else {
            b = -b;
            out.textContent = b;
        }

    }

    // Если нажата клавиша 1/x. Если на экране набран x то выводит 1/x
    if (key === '1/x') {
        if (finish) {
            a = String(1/calculateResult)
            finish = false;
            out.textContent = a;
        }
        else if(b === '') {
            a = 1/a;
            out.textContent = a;
        }
        else {
            b = 1/b;
            out.textContent = b;
        }
    }

    // Если нажата клавиша процента. Работает только на второе набранное число. percentCheck нужен чтобы правильно высчитывалось после нажатия =. 
    if (key === '%') {
        if (a !== '' && (+b) > 0 && sign === 'X') {
            percentCheck = true;
            out.textContent = b + '%';
        }
    }

    // Если нажата клавиша квадратного корня.(Не работает. Модуль math не хочет импортироваться)
//     if (key === '√') {
//         if (currentInput === 'a' || currentInput === 'key') {
//             a = math.pow(a, 1/2);
//             out.textContent = a;
//         }
//         else if (currentInput === 'b') {
//             b = math.pow(b, 1/2);
//             out.textContent = b;
//         }
//     }

    // Если нажата клавиша Cancel. Постепенно стирает все элементы по символу.
    if (key === 'CNL') {
        if (currentInput === 'a') {
            a = a.slice(0, -1)
            out.textContent = a;
        }
        if (currentInput === 'key') {
            sign = ''
            currentInput = 'a'
            out.textContent = a
        }
        if (currentInput === 'b') {
            b = b.slice(0, -1)
            if (b.length > 0) {
                out.textContent = b;
            }
            else if (b.length === 0) {
                out.textContent = sign;
                currentInput = 'key';
            }
        }
    }


    console.log(a, sign, b);
}
