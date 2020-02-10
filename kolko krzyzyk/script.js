//  ZMIENNE

var tablica;
const ty = 'O';
const komputer = 'X';
const wygrana = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

// POBIERAM TD (html)

const komorki = document.querySelectorAll('.komorka');
//ROZPOCZĘCIE GRY !
StartGry();

// FUNKCJE

function StartGry() {
    document.querySelector(".KoniecGry").style.display = "none";
    tablica = Array.from(Array(9).keys());
    for (var i = 0; i < komorki.length; i++) {
        komorki[i].innerText = '';
        komorki[i].style.removeProperty('background-color');
        komorki[i].addEventListener('click', wybor, false);
    }
}

function kolej(kwadratId, gracz) {
    tablica[kwadratId] = gracz;
    document.getElementById(kwadratId).innerText = gracz;
    let wygranaGra = Wygrany(tablica, gracz)
    if (wygranaGra) przegranaGra(wygranaGra)
}

function wybor(pole) {
    if (typeof tablica[pole.target.id] == 'number') {
        kolej(pole.target.id, ty)
        if (!Wygrany(tablica, ty) && !sparuj()) kolej(najlepszeMiejsce(), komputer);
    }
}

function Wygrany(plansza, gracz) {
    let gry = plansza.reduce((a, e, i) =>
        (e === gracz) ? a.concat(i) : a, []);
    let wygranaGra = null;
    for (let [index, win] of wygrana.entries()) {
        if (win.every(elem => gry.indexOf(elem) > -1)) {
            wygranaGra = {
                index: index,
                gracz: gracz
            };
            break;
        }
    }
    return wygranaGra;
}

function przegranaGra(wygranaGra) {
    for (let index of wygrana[wygranaGra.index]) {
        document.getElementById(index).style.backgroundColor =
            wygranaGra.gracz == ty ? "blue" : "red";
    }
    for (var i = 0; i < komorki.length; i++) {
        komorki[i].removeEventListener('click', wybor, false);
    }
    wybierzWygranego(wygranaGra.gracz == ty ? "Wygrałeś!" : "Przegrałeś, spróbuj ponownie");
}

function wybierzWygranego(kto) {
    document.querySelector(".KoniecGry").style.display = "block";
    document.querySelector(".KoniecGry .text").innerText = kto;
}

function pustePola() {
    return tablica.filter(s => typeof s == 'number');
}

function najlepszeMiejsce() {
    return minimax(tablica, komputer).index;
}

function sparuj() {
    if (pustePola().length == 0) {
        for (var i = 0; i < komorki.length; i++) {
            komorki[i].style.backgroundColor = "green";
            komorki[i].removeEventListener('click', wybor, false);
        }
        wybierzWygranego("Brawo! Nie dałeś się ograć")
        return true;
    }
    return false;
}

// ALGORYTM MINI MAX

function minimax(nowaPlansza, gracz) {
    var dostepnePola = pustePola();

    if (Wygrany(nowaPlansza, ty)) {
        return {
            punkty: -10
        };
    } else if (Wygrany(nowaPlansza, komputer)) {
        return {
            punkty: 10
        };
    } else if (dostepnePola.length === 0) {
        return {
            punkty: 0
        };
    }
    var Ruchy = [];
    for (var i = 0; i < dostepnePola.length; i++) {
        var ruch = {};
        ruch.index = nowaPlansza[dostepnePola[i]];
        nowaPlansza[dostepnePola[i]] = gracz;

        if (gracz == komputer) {
            var wynik = minimax(nowaPlansza, ty);
            ruch.punkty = wynik.punkty;
        } else {
            var wynik = minimax(nowaPlansza, komputer);
            ruch.punkty = wynik.punkty;
        }

        nowaPlansza[dostepnePola[i]] = ruch.index;

        Ruchy.push(ruch);
    }

    var najlepszyRuch;
    if (gracz === komputer) {
        var rekord = -1000;
        for (var i = 0; i < Ruchy.length; i++) {
            if (Ruchy[i].punkty > rekord) {
                rekord = Ruchy[i].punkty;
                najlepszyRuch = i;
            }
        }
    } else {
        var rekord = 1000;
        for (var i = 0; i < Ruchy.length; i++) {
            if (Ruchy[i].punkty < rekord) {
                rekord = Ruchy[i].punkty;
                najlepszyRuch = i;
            }
        }
    }

    return Ruchy[najlepszyRuch];
}