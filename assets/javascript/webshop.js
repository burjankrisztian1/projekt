function nem_suti(name) {
    return localStorage.getItem(name);
}


var kosar_gombok = document.querySelectorAll('.kosar-gomb');
if (nem_suti("nyelv") == "hu") {
    kosar_gombok.forEach(gomb => {
        gomb.textContent = "Kosárba";
    });
}else{
    kosar_gombok.forEach(gomb => {
        gomb.textContent = "Add to cart";
    });
}


function termek_betoltes() {
    const grid = document.getElementById("termekek");
    grid.innerHTML = "";
    fetch("assets/adatok/termekek.json")
        .then(response => response.json())
        .then(data => {
        Object.keys(data).forEach(key => {
            const termek = data[key];
      
            const termek_kartya = document.createElement("div");
            termek_kartya.className = "termek-kartya";
    
            if (nem_suti("nyelv") == "hu") {
            termek_kartya.innerHTML = `
                <div class="termek-kep">
                  <img src="${termek.termek_kep_path}" alt="${termek.termek_nev}">
                </div>
                <h3 class="termek-cim">${termek.termek_nev}</h3>
                <p class="termek-ar">${termek.termek_ar_huf} Ft</p>
                <button class="kosar-gomb" id = "${termek.termek_id}" onclick="kosarba(${termek.termek_id})" >Kosárba</button>
                `;
              }else{
                termek_kartya.innerHTML = `
                <div class="termek-kep">
                  <img src="${termek.termek_kep_path}" alt="${termek.termek_nev}">
                </div>
                <h3 class="termek-cim">${termek.termek_nev}</h3>
                <p class="termek-ar">$${termek.termek_ar_usd}</p>
                <button class="kosar-gomb" id = "${termek.termek_id}" onclick="kosarba(${termek.termek_id})">Add to cart</button>
            `;
            }
    
            grid.appendChild(termek_kartya);
        });
        })
        .catch(error => console.error("Hiba a termékek betöltésekor:", error));
}

  

function kosarba(id) {
    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    let termek = kosar.find(item => item.id === id);
    if (termek) {
        termek.mennyiseg += 1;
    } else {
        kosar.push({ id: id, mennyiseg: 1 });
    }
    localStorage.setItem('kosar', JSON.stringify(kosar));

    var gomb = document.getElementById(id);
    if (nem_suti("nyelv") == "hu") {
        gomb.textContent = "Hozzáadva!";
    }else{
        gomb.textContent = "Added!";
    }

    kosar_szamlalo()

    setTimeout(function() {
    if (nem_suti("nyelv") == "hu") {
        gomb.textContent = "Kosárba";
    }else{
        gomb.textContent = "Add to cart";
    }
    }, 500);
    
}

function kosarbol(id) {
    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    let termek = kosar.find(item => item.id === id);
    if (termek) {
        termek.mennyiseg -= 1;
        if (termek.mennyiseg <= 0) {
            kosar = kosar.filter(item => item.id !== id);
        }
    } else {
        kosar.push({ id: id, mennyiseg: 1 });
    }

    localStorage.setItem('kosar', JSON.stringify(kosar));
    kosar_szamlalo();
}

function kosar_szamlalo() {
    const kosar = JSON.parse(localStorage.getItem('kosar'));
    let kosar_counter_1 = document.getElementById('szamlalo_1');
    let kosar_counter_2 = document.getElementById('szamlalo_2');

    const mennyiseg = kosar.reduce((sum, item) => sum + item.mennyiseg, 0);
    if (mennyiseg > 9) {
        kosar_counter_1.innerText = "9+"
        kosar_counter_2.innerText = "9+"
    }else{
        kosar_counter_1.innerText = mennyiseg
        kosar_counter_2.innerText = mennyiseg
    }
}


termek_betoltes()
kosar_szamlalo()