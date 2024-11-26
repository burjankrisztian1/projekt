var baloldali_kep = document.getElementById('bal');
var kozepso_kep = document.getElementById('kozep');
var jobboldali_kep = document.getElementById('jobb');

function nem_suti(name) {
    return localStorage.getItem(name);
}



function slider_text_csere(nyelv) {
    fetch('assets/adatok/termekek.json') 
    .then(response => response.ok ? response.json() : Promise.reject('Failed to load JSON'))
    .then(data => {
      const termek_adatok = data[nyelv];
        var termek_penznem = termek_adatok.termek_penznem;
        let termek_penznem_display;

        var elso_termek_nev = termek_adatok.elso_termek.termek_nev;
        var elso_termek_ar = termek_adatok.elso_termek.termek_ar;
        var elso_termek_kep_path = termek_adatok.elso_termek.termek_kep_path;

        var masodik_termek_nev = termek_adatok.masodik_termek.termek_nev;
        var masodik_termek_ar = termek_adatok.masodik_termek.termek_ar;
        var masodik_termek_kep_path = termek_adatok.masodik_termek.termek_kep_path;

        var harmadik_termek_nev = termek_adatok.harmadik_termek.termek_nev;
        var harmadik_termek_ar = termek_adatok.harmadik_termek.termek_ar;
        var harmadik_termek_kep_path = termek_adatok.harmadik_termek.termek_kep_path;


        var kozepso_kep_path = document.getElementById('kozep').src;
        var heti_termek_nev = document.getElementById('heti_termek_nev');
        var heti_termek_ar = document.getElementById('heti_termek_ar');
        var heti_termek_gomb = document.getElementById('heti_termek_gomb');

        if (termek_penznem == "HUF") {
            termek_penznem_display = "Ft"
            heti_termek_gomb.textContent = "VÁSÁRLÁS"
        }else{
            termek_penznem_display = "$"
            heti_termek_gomb.textContent = "BUY"
        }


        if (kozepso_kep_path.includes(elso_termek_kep_path)) {
            heti_termek_nev.textContent = elso_termek_nev
            heti_termek_ar.textContent = `${elso_termek_ar} ${termek_penznem_display}`
        }else if(kozepso_kep_path.includes(masodik_termek_kep_path)){
            heti_termek_nev.textContent = masodik_termek_nev
            heti_termek_ar.textContent = `${masodik_termek_ar} ${termek_penznem_display}`
        }else if(kozepso_kep_path.includes(harmadik_termek_kep_path)){
            heti_termek_nev.textContent = harmadik_termek_nev
            heti_termek_ar.textContent = `${harmadik_termek_ar} ${termek_penznem_display}`
        }
      }
    )
    .catch(error => {
      console.error('Error: ', error);
    });
}

function start(nyelv) {
    fetch('assets/adatok/termekek.json') 
    .then(response => response.ok ? response.json() : Promise.reject('Failed to load JSON'))
    .then(data => {
      const termek_adatok = data[nyelv];
        var elso_termek_kep_path = termek_adatok.elso_termek.termek_kep_path;
        var masodik_termek_kep_path = termek_adatok.masodik_termek.termek_kep_path;
        var harmadik_termek_kep_path = termek_adatok.harmadik_termek.termek_kep_path;

        baloldali_kep.src = elso_termek_kep_path;
        kozepso_kep.src = masodik_termek_kep_path;
        jobboldali_kep.src = harmadik_termek_kep_path;
      }
    )
    .catch(error => {
      console.error('Error: ', error);
    });
}

function balra() {
    var temp = jobboldali_kep.src;
    jobboldali_kep.src = kozepso_kep.src;
    kozepso_kep.src = baloldali_kep.src;
    baloldali_kep.src = temp;
    slider_text_csere(nem_suti("nyelv"))
}

function jobbra() {
    var temp = baloldali_kep.src;
    baloldali_kep.src = kozepso_kep.src;
    kozepso_kep.src = jobboldali_kep.src;
    jobboldali_kep.src = temp;
    slider_text_csere(nem_suti("nyelv"))
}

function igazitas() {
    start(nem_suti("nyelv"))
    slider_text_csere(nem_suti("nyelv"))
}

start(nem_suti("nyelv"))
slider_text_csere(nem_suti("nyelv"))


