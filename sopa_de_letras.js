module.exports = function (palabras, size) {
    var sopa = [];
    // Inicializando sopa de letra
    for (var i = 0; i < size; i++) {
        var letra_al = [];
        for (var j = 0; j < size; j++) {
            letra_al.push(' ');
        }
        sopa.push(letra_al);
    }

    var inicializarCoordenada = function (palabra, max, invertida = true) {
        var coordenada;
        if (invertida) {
            coordenada = max - Math.floor(Math.random() * (max - (palabra.length - 1)));
        } else {
            coordenada = Math.floor(Math.random() * (max - (palabra.length - 1)));
        }
        return coordenada;
    };

    function comparar(letra, casilla) {
        casilla = casilla.toUpperCase();
        letra = letra.toUpperCase();
        //console.log('Prueba ' + casilla + '=' + letra.toUpperCase());
        if (casilla.localeCompare(letra) !== 0) {
            if (casilla.localeCompare(' ') !== 0) {
                console.log('Colisión ' + casilla + '<>' + letra.toUpperCase());
                return false;
            }
        }
        return true;
    };
    
    var trayectoria_lineal =function (x, y, tipo) {
                switch (tipo) {
                    case 'horizontal+':
                        x++;
                        break;
                    case 'horizontal-':
                        x--;
                        break;
                    case 'vertical+':
                        y++;
                        break;
                    case 'vertical-':
                        y--;
                        break;
                    case 'diagonal_der+':
                        y++;
                        x++;
                        break;
                    case 'diagonal_der-':
                        y--;
                        x--;
                        break;
                    case 'diagonal_izq+':
                        y++;
                        x--;
                        break;
                    case 'diagonal_izq-':
                        y--;
                        x++;
                        break;
                    default:
                        break;
                }
                return [x,y];
            };
    var origen =function (tipo,palabra,max) {
        var x=0;
        var y=0;
                switch (tipo) {
                    case 'horizontal+':
                        x=inicializarCoordenada(palabra,max, false);
                        y=inicializarCoordenada(palabra,max, false);
                        break;
                    case 'horizontal-':
                        x=inicializarCoordenada(palabra,max);
                        y=inicializarCoordenada(palabra,max, false);
                        break;
                    case 'vertical+':
                        x=inicializarCoordenada(palabra,max, false);
                        y=inicializarCoordenada(palabra,max, false);
                        break;
                    case 'vertical-':
                        y=inicializarCoordenada(palabra,max);
                        x=inicializarCoordenada(palabra,max, false);
                        break;
                    case 'diagonal_der+':
                        x=inicializarCoordenada(palabra,max, false);
                        y=inicializarCoordenada(palabra,max, false);
                        break;
                    case 'diagonal_der-':
                        x=inicializarCoordenada(palabra,max);
                        y=inicializarCoordenada(palabra,max);
                        break;
                    case 'diagonal_izq+':
                        x=inicializarCoordenada(palabra,max);
                        y=inicializarCoordenada(palabra,max, false);
                        break;
                    case 'diagonal_izq-':
                        x=inicializarCoordenada(palabra,max, false);
                        y=inicializarCoordenada(palabra,max);
                        break;
                    default:
                        break;
                }
                return [x,y];
            };
            
    var tipos=['horizontal+','horizontal-','vertical+','vertical-','diagonal_der+','diagonal_der-','diagonal_izq+','diagonal_izq-'];
    
    function escribirLinea(sopa, palabra, trayectoria, m, n) {
        var fragmentada = palabra.split('');
        var posX = m;
        var posY = n;
        if (palabra.length > (size - 1)) {
            return false;
        }
        var colision = false;

        fragmentada.forEach(function (letra) {
            var casilla = sopa[m][n];
            if (!comparar(letra, casilla)) {
                colision = true;
            }
            [m, n] = trayectoria_lineal(m,n,trayectoria);
        });
        if (colision) {
            return false;
        }
        n = posY;
        m = posX;
        fragmentada.forEach(function (letra, fn) {
            sopa[m][n] = letra.toUpperCase();
            [m, n] = trayectoria_lineal(m,n,trayectoria);
        });
        return true;
    }
    ;

    var inventor = function (sopa, palabra, max) {
        var ok = false;
        if (palabra.length > (max - 1)) {
            console.log('Imposible insertar ' + palabra);
            ok = true;
        }
        while (!ok) {
            var fnMax = 7;
            var tipo=Math.floor(Math.random() * fnMax);
            var trayectoria_nombre=tipos[tipo];
            var cord_origen=origen(trayectoria_nombre,palabra, (max - 1));
            ok = escribirLinea(sopa, palabra,trayectoria_nombre, cord_origen[0], cord_origen[1]);
        }
        console.log('Se insertó ' + palabra+' en '+trayectoria_nombre);
    };
    palabras.forEach(function (palabra) {
        var casting = palabra.toUpperCase();
        inventor(sopa, casting, size);
    });
    return sopa;
};