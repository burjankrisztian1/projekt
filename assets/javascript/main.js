function nem_suti(name) {
  return localStorage.getItem(name);
}

function text_csere(nyelv, oldal) {
  // classneve_text_sorszam
  const elemek = {
    navbar_brand: 'navbar_brand_text',
    navbar_kezdolap: 'navbar_kezdolap_text',
    navbar_rolunk: 'navbar_rolunk_text',
    navbar_webshop: 'navbar_webshop_text',
    elso_szekcio_szoveg: 'elso_szekcio_szoveg_text',
    elso_szekcio_gomb: 'elso_szekcio_gomb_text',
    h2_masodik_szekcio: 'h2_masodik_szekcio_text',
    strong_masodik_szekcio_1: 'strong_masodik_szekcio_text_1',
    p_masodik_szekcio_1: 'p_masodik_szekcio_text_1',
    strong_masodik_szekcio_2: 'strong_masodik_szekcio_text_2',
    p_masodik_szekcio_2: 'p_masodik_szekcio_text_2',
    strong_masodik_szekcio_3: 'strong_masodik_szekcio_text_3',
    p_masodik_szekcio_3: 'p_masodik_szekcio_text_3',
    harmadik_szekcio_h1: 'harmadik_szekcio_h1_text',
    navbar_brand_webshop: 'navbar_brand_text_webshop',
    navbar_kezdolap_webshop: 'navbar_kezdolap_text_webshop',
    navbar_rolunk_webshop: 'navbar_rolunk_text_webshop',
    p_rolunk_szekcio_text_1: 'p_rolunk_szekcio_text_1',
    p_rolunk_szekcio_text_2: 'p_rolunk_szekcio_text_2',
    p_rolunk_szekcio_text_3: 'p_rolunk_szekcio_text_3',
  };

  fetch('assets/adatok/messages.json') //assets/adatok/messages.json
    .then(response => response.ok ? response.json() : Promise.reject('Failed to load JSON'))
    .then(data => {
      const nyelv_adatok = data[nyelv];
      Object.keys(elemek).forEach(key => {
        const elem = document.getElementById(elemek[key]);
        if (elem) {
          elem.textContent = nyelv_adatok[oldal][elemek[key]];
        }
      });
      }
    )
    .catch(error => {
      console.error('Error: ', error);
    });
}

function start() {
  if (nem_suti('nyelv') === 'hu') {
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/hu.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/hu.png';
    text_csere("hu", "kezdolap")
    text_csere("hu", "webshop")
  }else{
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/usa.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/usa.png';
    text_csere("en", "kezdolap")
    text_csere("en", "webshop")
  }
}

function valtas(nyelv, oldal) {
  const zaszlo = document.getElementById('zaszlo');
  const zaszlo_2 = document.getElementById('zaszlo_2');
  const lang = nyelv === 'hu' ? 'usa.png' : 'hu.png';
  zaszlo.src = `assets/images/egyeb/${lang}`;
  zaszlo_2.src = `assets/images/egyeb/${lang}`;
  localStorage.setItem('nyelv', nyelv);
  text_csere(nyelv, oldal);
}


function valtas_kezdolap() {
  if (nem_suti('nyelv') === 'hu') {
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/usa.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/usa.png';
    localStorage.setItem('nyelv', 'en');
    text_csere("en", "kezdolap")
  }else{
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/hu.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/hu.png';
    localStorage.setItem('nyelv', 'hu');
    text_csere("hu", "kezdolap")
  }
}

function valtas_webshop() {
  if (nem_suti('nyelv') === 'hu') {
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/usa.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/usa.png';
    localStorage.setItem('nyelv', 'en');
    text_csere("en", "webshop")
  }else{
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/hu.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/hu.png';
    localStorage.setItem('nyelv', 'hu');
    text_csere("hu", "webshop")
  }
}

function valtas_rolunk() {
  if (nem_suti('nyelv') === 'hu') {
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/usa.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/usa.png';
    localStorage.setItem('nyelv', 'en');
    text_csere("en", "rolunk")
  }else{
    var zaszlo = document.getElementById('zaszlo');
    zaszlo.src = 'assets/images/egyeb/hu.png';
    var zaszlo_2 = document.getElementById('zaszlo_2');
    zaszlo_2.src = 'assets/images/egyeb/hu.png';
    localStorage.setItem('nyelv', 'hu');
    text_csere("hu", "rolunk")
  }
}



if (!nem_suti("nyelv")) {
  localStorage.setItem('nyelv', 'hu');
}
start()
if (window.location.pathname.includes("index.html")) {
  text_csere("en", "kezdolap")
}
if (window.location.pathname.includes("rolunk.html")) {
  text_csere("en", "rolunk")
}
if (window.location.pathname.includes("webshop.html")) {
  text_csere("en", "webshop")
}