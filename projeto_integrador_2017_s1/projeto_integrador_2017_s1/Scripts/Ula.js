var btt = document.querySelector(".go");
var bin = document.querySelector(".v1");
var dec = document.querySelector(".v2");
var sRes = document.querySelector(".sRes");
var carrier = document.querySelector(".MSB");
var overflow = document.querySelector(".OVR");
var pl1 = document.querySelector(".pl1");
var pl2 = document.querySelector(".pl2");


function calculo(act) {
    var sVal1 = document.querySelector(".sVal1").value;
    var sVal2 = document.querySelector(".sVal2").value

    if (checkVals(sVal1) && checkVals(sVal2)) {
        sVal1 = reSize(sVal1);
        sVal2 = reSize(sVal2);
        bin.innerHTML = sVal1;
        dec.innerHTML = sVal2;
        v1 = parseInt(sVal1, 2);
        v2 = parseInt(sVal2, 2);

		// contas de acordo com o que é requerido
        if (act == "aMenosB") result = v1 - v2;
        if (act == "bMenosA") result = v2 - v1;
        if (act == "aMaisB") result = v1 + v2;

        overflow.innerHTML = 0;
        carrier.innerHTML = 0;
		overflow.classList.remove("over");
		carrier.classList.remove("over");
		pl1.classList.remove("over");
		pl2.classList.remove("over");

		// em caso de o valor sair negativo
        if (result < 0) {
            carrier.innerHTML = 1;
			carrier.classList.add("over");
			pl1.classList.add("over");
            result = result * -1;
        }
		if (result > 15) { // em caso do valor ser >15
            result = 0;
            overflow.innerHTML = 1;
			overflow.classList.add("over");
			pl2.classList.add("over");
        }

        resBin = reSize((result >>> 0).toString(2));
        sRes.innerHTML = resBin;
    } else alert("Um dos valores não é valido");
}

// verifica se a string digitada contem apenas 1's e 0's
function checkVals(val) {
    for (i = 0; i < val.length; i++) {
        if (val[i] != "0" && val[i] != "1") {
            return false;
        }
    }
    return true;
}

// Converte valores para inteiros
function convert(num) {
    return parseInt(num, 2);
}

// Corrige o tamanho dos valores para 4 digitos
function reSize(val) {
    if (val.length < 4) {
        return Array(5 - val.length).join("0") + val;
    }
    return val;
}
