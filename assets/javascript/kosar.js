const kosar = document.getElementById("kosar");

function nem_suti(name) {
    return localStorage.getItem(name);
}

function kosaar() {
    const kosar = document.getElementById("kosar");
    let ossz_huf = 0;
    let ossz_usd = 0;
    let tableContent = '';
    const kosar_text = document.getElementById("kosar_text");
    const kosar_text_2 = document.getElementById("kosar_text_2");
    if (nem_suti("nyelv") == "hu") {
        kosar_text.textContent = "Kosár"
        kosar_text_2.childNodes[1].nodeValue = "Vissza a termékekhez";
    }else{
        kosar_text.textContent = "Cart"
        kosar_text_2.childNodes[1].nodeValue = "Back to Products";
    }

    fetch('assets/adatok/termekek.json')
        .then(response => response.json())
        .then(termekek => {
            let kosar_adatok = JSON.parse(localStorage.getItem("kosar"));
            if (kosar_adatok && kosar_adatok.length > 0) {
                kosar_adatok.forEach(item => {
                    Object.values(termekek).forEach(termek => {
                        if (termek.termek_id == item.id) {
                            let termek_ossz_huf = termekek[`${termek.termek_id}_termek`].termek_ar_huf * item.mennyiseg;
                            let termek_ossz_usd = termekek[`${termek.termek_id}_termek`].termek_ar_usd * item.mennyiseg;
                            ossz_huf += termek_ossz_huf;
                            ossz_usd += termek_ossz_usd;

                            if (nem_suti("nyelv") == "hu") {
                                tableContent += `
                                <div class="row mb-4 d-flex justify-content-between align-items-center text-center">
                                    <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                                      <img src="${termek.termek_kep_path}" class="img-fluid rounded-3">
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mt-sm-2 mb-2 mt-2">
                                      <h6 class="text-black mb-0">${termek.termek_nev}</h6>
                                    </div>
                                    <div class="col-12 col-sm-5 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                      <h5 class="mb-0">${termek_ossz_huf} Ft</h5>
                                    </div>
                                    <div class="col-5 col-sm-4 col-md-3 col-lg-3 col-xl-2 d-flex">
                                      <button class="btn border-0 text-muted" onclick="kosarbol(${termek.termek_id})"><i class="fas fa-minus"></i></button>
                
                                      <input type="number" id="number-input" value="${item.mennyiseg}" class="form-control">
                
                                      <button class="btn border-0 text-muted" onclick="kosarba(${termek.termek_id})"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="col-5 col-sm-3 col-md-1 col-lg-1 col-xl-1 text-end">
                                      <a href="#" class="link-danger" onclick="kosar_torles(${termek.termek_id})"><i class="fas fa-times"></i></a>
                                    </div>
                                </div>
                                <hr class="my-2 my-md-4">
                                `;
                            }else{
                                tableContent += `
                                <div class="row mb-4 d-flex justify-content-between align-items-center text-center">
                                    <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                                      <img src="${termek.termek_kep_path}" class="img-fluid rounded-3">
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mt-sm-2 mb-2 mt-2">
                                      <h6 class="text-black mb-0">${termek.termek_nev}</h6>
                                    </div>
                                    <div class="col-12 col-sm-5 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                      <h5 class="mb-0">$${Math.round(termek_ossz_usd * 100) / 100}</h5>
                                    </div>
                                    <div class="col-5 col-sm-4 col-md-3 col-lg-3 col-xl-2 d-flex">
                                      <button class="btn border-0 text-muted" onclick="kosarbol(${termek.termek_id})"><i class="fas fa-minus"></i></button>
                
                                      <input type="number" id="number-input" value="${item.mennyiseg}" class="form-control">
                
                                      <button class="btn border-0 text-muted" onclick="kosarba(${termek.termek_id})"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="col-5 col-sm-3 col-md-1 col-lg-1 col-xl-1 text-end">
                                      <a href="#" class="link-danger" onclick="kosar_torles(${termek.termek_id})"><i class="fas fa-times"></i></a>
                                    </div>
                                </div>
                                <hr class="my-2 my-md-4">
                                `;
                            }


                        }
                    });
                });

                if (nem_suti("nyelv") == "hu") {
                    kosar.innerHTML = `
                    <hr class="my-2 my-md-4">
                    ${tableContent}
                    <div class="d-flex justify-content-between row">
                        <h4 class="col-6 text-start">Összesen:</h4>
                        <h4 class="col-6 text-end">${ossz_huf} Ft</h4>
                    </div>`
                }else{
                    kosar.innerHTML = `
                    <hr class="my-2 my-md-4">
                    ${tableContent}
                    <div class="d-flex justify-content-between row">
                        <h4 class="col-6 text-start">Total:</h4>
                        <h4 class="col-6 text-end">$${Math.round(ossz_usd * 100) / 100}</h4>
                    </div>`
                }

            } else {
                if (nem_suti("nyelv") == "hu") {
                    kosar.innerHTML = `
                    <h1>A kosár üres!</h1>
                    `;
                }else{
                    kosar.innerHTML = `
                    <h1>The cart is empty!</h1>
                    `;
                }
            }
        })
        .catch(error => console.error('Error:', error));
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
    kosaar()
}

function kosar_torles(id) {
    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    kosar = kosar.filter(item => item.id !== id);
    localStorage.setItem('kosar', JSON.stringify(kosar));
    kosaar();
}

kosaar()