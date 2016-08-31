var contador = 0;
var f = 0;


function dibujarMatriz(filas, columnas, tabla) {
    tabla.innerHTML = "";
    for (i = 0; i < filas; i++) {
        var nuevaFila = tabla.insertRow(-1)
        for (j = 0; j < columnas; j++) {
            var celda = nuevaFila.insertCell(-1)
            var input = document.createElement('input')
            input.setAttribute('type', 'text')
            input.setAttribute('data-fila', i)
            input.setAttribute('data-columna', j)
            input.setAttribute('size', '3')
            celda.appendChild(input)
        }
    }
}
var es = {
    vacio: function(str) {
        if (str === '' || str === null) {
            return true
        } else {
            return false
        }
    },
    entero: function(str) {
        if (str === parseInt(str, 10).toString()) {
            return true
        } else {
            return false
        }
    },
    numero: function(str) {
        if (str === parseFloat(str).toString()) {
            return true
        } else {
            return false
        }
    }
}

function validarVacio(parametros) {
    for (var i = 0; i < parametros.length; i++) {
        if (typeof(parametros[i]) === "object") {
            for (var j = 0; j < parametros.length; j++) {
                if (es.vacio(parametros[i][j])) {
                    return true
                }
            }
        } else if (es.vacio(parametros[i])) {
            return true
        }
    }
    return false
}

function validarEntero(parametros) {
    for (var i = 0; i < parametros.length; i++) {
        if (typeof(parametros[i]) === "object") {
            for (var j = 0; j < parametros[i].length; j++) {
                if (!es.entero(parametros[i][j])) {
                    return false
                }
            }
        } else if (!es.entero(parametros[i])) {
            return false
        }
    }
    return true
}

function validarNumero(parametros) {
    for (var i = 0; i < parametros.length; i++) {
        if (typeof(parametros[i]) === "object") {
            for (var j = 0; j < parametros[i].length; j++) {
                if (!es.numero(parametros[i][j])) {
                    return false
                }
            }
        } else if (!es.numero(parametros[i])) {
            return false
        }
    }
    return true
}

function convertirAArreglo(filas, columnas, tabla) {
    var arreglo = new Array()
    contador += 2;
    for (i = 0; i < filas; i++) {
        contador += 4;
        for (j = 0; j < columnas; j++) {
            if (arreglo[i] === undefined) {
                arreglo[i] = new Array()
            }
            contador += 13;
            arreglo[i][j] = tabla.querySelectorAll('[data-fila="' + i + '"][data-columna="' + j + '"]')[0].value
        }
    }
    f = 13 * Math.pow(filas, 3) + 7 * Math.pow(columnas, 2) + (4 * columnas) + 2;
    return arreglo;


}

function ponerEnTabla(matriz, tabla) {
    for (i = 0; i < matriz.length; i++) {
        for (j = 0; j < matriz[0].length; j++) {
            tabla.querySelectorAll('[data-fila="' + i + '"][data-columna="' + j + '"]')[0].value = matriz[i][j]
        }
    }
}

function creandoMatrices() {
    var formulario = document.getElementById('dimensionesA')
    var filasA = formulario.elements['filas'].value
    var columnasA = formulario.elements['columnas'].value
    var matrizA = document.getElementById("matrizA")
    var formulario = document.getElementById('dimensionesB')
    var filasB = formulario.elements['filas'].value
    var columnasB = formulario.elements['columnas'].value
    var matrizB = document.getElementById("matrizB")
    try {
        if (validarVacio([filasA, columnasA, filasB, columnasB])) {
            throw new Error('Algunos campos se encuentran vacíos')
        }
        if (!validarEntero([filasA, columnasA, filasB, columnasB])) {
            throw new Error('Algunos campos no son enteros')
        }
        if (!(columnasA === filasB)) {
            throw new Error('El número de columnas de la matriz A no es igual al número de filas de la matriz B')
        }
    } catch (e) {
        window.alert(e)
        return e
    }
    dibujarMatriz(filasA, columnasA, matrizA)
    dibujarMatriz(filasB, columnasB, matrizB)
    var boton = document.createElement('input')
    boton.setAttribute('type', 'button')
    boton.setAttribute('class', 'boton-central')
    boton.setAttribute('value', 'Calcular Multiplicación')
    boton.onclick = function() {
        calcular(filasA, columnasA, matrizA, filasB, columnasB, matrizB)
    }
    document.getElementById('container').appendChild(boton)
}

function sumatoria(i, j, matrizA, matrizB) {
    //https://es.wikipedia.org/wiki/Multiplicaci%C3%B3n_de_matrices
    var n = matrizB.length //o matrizA[0].length
    var sumatoria = 0;
    contador += 2;
    for (var r = 0; r < n; r++) {
        contador += 4;
            sumatoria += parseFloat(matrizA[i][r]) * parseFloat(matrizB[r][j])
    }
    return sumatoria


}

function dibujarArregloMatriz(matriz, tabla) {
    var filas = matriz.length
    var columnas = matriz[0].length
    dibujarMatriz(filas, columnas, tabla)
    ponerEnTabla(matriz, tabla)
}

function calcular(filasA, columnasA, matrizA, filasB, columnasB, matrizB) {
    matrizA = convertirAArreglo(filasA, columnasA, matrizA)
    matrizB = convertirAArreglo(filasB, columnasB, matrizB)
    try {
        if (validarVacio(matrizA)) {
            throw new Error('Algunos campos de la matriz A se encuentran vacíos')
        }
        if (validarVacio(matrizB)) {
            throw new Error('Algunos campos de la matriz B se encuentran vacíos')
        }
        if (!validarNumero(matrizA)) {
            throw new Error('Algunos campos de la matriz A no son números')
        }
        if (!validarNumero(matrizB)) {
            throw new Error('Algunos campos de la matriz B no son números')
        }
    } catch (e) {
        window.alert(e)
        return e
    }
    //console.log(matrizA, matrizB)
    document.getElementById('container').innerHTML = ''
        //https://algoritmiafordummies.wikispaces.com/Algoritmo+del+producto+de+matrices
    var matrizC = new Array()
    var filasA = matrizA.length
    var columnasB = matrizB[0].length
    for (var i = 0; i < filasA; i++) {
        for (var j = 0; j < columnasB; j++) {
            if (matrizC[i] === undefined) {
                matrizC[i] = new Array()
            }
            matrizC[i][j] = sumatoria(i, j, matrizA, matrizB)
        }
    }
    //console.log(matrizC)
    var tabla = document.createElement('table')
    tabla.setAttribute('class', 'center')
    document.getElementById('container').appendChild(tabla)
    dibujarArregloMatriz(matrizC, tabla)

    window.alert("Contador " + contador + "\n" + "Ecuacion Temporal " + f);
    //window.alert("Funcion Temporal."+f);
}
