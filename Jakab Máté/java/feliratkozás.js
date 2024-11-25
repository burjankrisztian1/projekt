function feliratkozas(){
    let email = document.getElementById('email');
    if(email.value != ""){
        email.value = "";
        alert("Sikerült feliratkozni! A gombok mégis jók valamire!")
    } else{
        alert("Kérem adja meg az Emailjét, hogy eladhasuk Kínának!");
    }
}