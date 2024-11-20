function load_tortenelmi() {
    fetch('archivum/tortenelem.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
  .then(data => {
    const container = document.getElementById('container');
    for (let i = 0; i < data.archivum.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card'); // Hozzáadja a 'card' osztályt
    
        card.textContent = data.archivum[i].nev || "Nincs adat";
    
        container.appendChild(card);
    }
  })    
}


load_tortenelmi()