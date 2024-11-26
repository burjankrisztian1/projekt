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
    kosar_szamlalo()
}

function kosarba_2(id) {
    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    let termek = kosar.find(item => item.id === id);
    if (termek) {
        termek.mennyiseg += 1;
    } else {
        kosar.push({ id: id, mennyiseg: 1 });
    }
    localStorage.setItem('kosar', JSON.stringify(kosar));
    kosar_szamlalo()
    kosaar()
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
    kosaar()
}


function kosar_szamlalo() {
    let kosar_counter_1 = document.getElementById('szamlalo_1');
    let kosar_counter_2 = document.getElementById('szamlalo_2');
    kosar_counter_1.innerText = "9+"
    kosar_counter_2.innerText = "9+"
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



function kosaar() {
    fetch('assets/adatok/termekek.json')
        .then(response => response.json())
        .then(products => {
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';

            if (nem_suti("nyelv") == "hu") {
                let kosar_text = document.getElementById('kosar_text');
                let kosar_button_text = document.getElementById('kosar_button_text');
                
                kosar_text.innerHTML = "Kosár"
                kosar_button_text.innerHTML = "Kosár bezárása"
            }else{
                let kosar_text = document.getElementById('kosar_text');
                let kosar_button_text = document.getElementById('kosar_button_text');
                kosar_text.innerHTML = "Cart"
                kosar_button_text.innerHTML = "Close Cart"
            }
            let kosar = JSON.parse(localStorage.getItem("kosar"));

            if (kosar && Array.isArray(kosar)) {
                kosar.forEach(item => {
                    Object.values(products).forEach(product => {
                        if (product.termek_id == item.id) {
                            const li = document.createElement('li');
                            if (nem_suti("nyelv") == "hu") {
                                li.innerHTML = `
                                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 0;">
                                    <img src="${product.termek_kep_path}" alt="${product.termek_nev}" 
                                         style="width: 50px; height: 50px; margin-right: 10px; object-fit: cover; border-radius: 5px;">
                                    <span style="flex-grow: 1;">${product.termek_nev} ${product.termek_ar_huf} Ft</span>
                                    <div style="display: flex; align-items: center;">
                                        <button class="gomb_1" onclick="kosarbol(${product.termek_id})" style="margin-right: 5px;">-</button>
                                        <span id="quantity-${product.id}" style="margin: 0 5px;">${item.mennyiseg}</span>
                                        <button class="gomb_1" onclick="kosarba_2(${product.termek_id})" style="margin-left: 5px;">+</button>
                                    </div>
                                </div>
                            `;
                            }else{
                                li.innerHTML = `
                                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 0;">
                                    <img src="${product.termek_kep_path}" alt="${product.termek_nev}" 
                                         style="width: 50px; height: 50px; margin-right: 10px; object-fit: cover; border-radius: 5px;">
                                    <span style="flex-grow: 1;">${product.termek_nev} $${product.termek_ar_usd}</span>
                                    <div style="display: flex; align-items: center;">
                                        <button class="gomb_1" onclick="kosarbol(${product.termek_id})" style="margin-right: 5px;">-</button>
                                        <span id="quantity-${product.id}" style="margin: 0 5px;">${item.mennyiseg}</span>
                                        <button class="gomb_1" onclick="kosarba_2(${product.termek_id})" style="margin-left: 5px;">+</button>
                                    </div>
                                </div>
                            `;
                            }
                            cartItemsContainer.appendChild(li);
                        }else{
                            const li = document.createElement('li');
                            li.innerHTML = "A kosár üres."
                        }
                    });
                });
            } else {
                const li = document.createElement('li');
                li.innerHTML = "A kosár üres."
            }
            document.getElementById('kosaar').style.display = 'block';
        })
        .catch(error => {
            console.error('Hiba történt a termékek betöltésekor:', error);
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '<li>Hiba történt a kosár betöltésekor.</li>';
        });
}



function kosar_kilepes() {
    document.getElementById('kosaar').style.display = 'none';
}


termek_betoltes()
kosar_szamlalo()