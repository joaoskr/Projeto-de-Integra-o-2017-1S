function start(act) {
    limpar();
    var valorA = document.querySelector(".valorA").value;
    var valorB = document.querySelector(".valorB").value;

    if (checkVals(valorA) && checkVals(valorB)) {
        valorA = reSize(valorA);
        valorB = reSize(valorB);
        fillValores("a", valorA, 4);
        fillValores("b", valorB, 4);

        // contas de acordo com o que é requerido
        if (act == "asubb") subtra(valorA, valorB, "010");
        if (act == "bsuba") subtra(valorB, valorA, "001");
        if (act == "soma") soma(valorA, valorB, "011");
        if (act == "aeb") aeb(valorA, valorB, "110");
        if (act == "aoub") aoub(valorA, valorB, "101");
        if (act == "axorb") axorb(valorA, valorB, "100");
    } else alert("Um dos valores não é valido");
}

// Subtração generalizado
function subtra(valA, valB, s) {
    var negativo = false;
    fillVal("cn", "1");
    fillValores("s", s, 3);
    var result = parseInt(valA, 2) - parseInt(valB, 2);
    if (result < 0) {
        fillVal("cn4", "1");
        result *= -1;
        negativo = true;
    }
    if (result > 7 && negativo) {
        fillValores("f", "0", 4);
        fillVal("ovr", "1");
        return;
    }

    result = (result >>> 0).toString(2);
    result = reSize(result);
    fillValores("f", result, 4);
}

// Soma os dois valores
function soma(valorA, valorB, s) {
    var result;
    fillVal("cn", "0");
    fillValores("s", s, 3);
    result = parseInt(valorA, 2) + parseInt(valorB, 2);
    if (result > 15) {
        fillValores("f", "0", 4);
        fillVal("ovr", "1");
        return;
    }
    result = (result >>> 0).toString(2);
    fillValores("f", result, 4);
}

// Comando and: se valorA e valorB = 1 -> f = 1
function aeb(valorA, valorB, s) {
    var result;
    fillVal("cn", "0");
    fillValores("s", s, 3);
    for (var i = 0; i < 4; i++) {
        if (valorA[i] == "1" && valorB[i] == "1") result += "1";
        else result += "0";
    }
    fillValores("f", result, 4);
}

// Comando or: se valorA ou valorB = 1 -> F = 1
function aoub(valorA, valorB, s) {
    var result;
    fillVal("cn", "0");
    fillValores("s", s, 3);
    for (var i = 0; i < 4; i++) {
        if (valorA[i] == "1" || valorB[i] == "1") result += "1";
        else result += "0";
    }
    fillValores("f", result, 4);
}

// Comando xor: valorA diferente valorB = 1
function axorb(valorA, valorB, s) {
    var result;
    fillVal("cn", "0");
    fillValores("s", s, 3);
    for (var i = 0; i < 4; i++) {
        if (valorA[i] == valorB[i]) result += "0";
        else result += "1";
    }
    fillValores("f", result, 4);
}

// Zera todos os valores
function limpar() {
    fillValores("f", "0", 4);
    fillValores("a", "0", 4);
    fillValores("b", "0", 4);
    fillValores("s", "0", 3);
    fillVal("cn", "0");
    fillVal("cn4", "0");
    fillVal("ovr", "0");
}

// Chama limpar() e em seguida altera s = 111 e f = 1111
function setar() {
    limpar();
    fillValores("f", "1111", 4);
    fillValores("s", "111", 3);
}

// Verifica se a string digitada contem apenas 1's e 0's
function checkVals(val) {
    for (var i = 0; i < val.length; i++) {
        if (val[i] != "0" && val[i] != "1") return false;
    }
    return true;
}

// Corrige o tamanho dos valores para 4 digitos
function reSize(val) {
    if (val.length < 4) {
        return Array(5 - val.length).join("0") + val;
    }
    return val;
}

// Simplifica a saida de um valor
function fillVal(saida, inform) {
    document.querySelector("." + saida).innerHTML = inform;
    mudaCor("." + saida);
}

// Simplifica a saida de n valores
function fillValores(saida, inform, vz) {
    if (inform != "s" && inform != "f") {
        inform = inform.split("").reverse().join("");
    }
    if (inform.length < 2) inform = inform.repeat(vz);
    for (var i = 0; i < vz; i++) {
        document.querySelector("." + saida + i).innerHTML = inform[i];

        mudaCor("." + saida + i);
    }
}

function mudaCor(val) {
    val = document.querySelector(val);
    if (val.innerHTML == "1") {
        val.classList.add("corUm");
        val.classList.remove("corZero");
    } else {
        val.classList.add("corZero");
        val.classList.remove("corUm");
    }
}
