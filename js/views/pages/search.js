let recherche= document.getElementById("recherche");

if(recherche){
    recherche.addEventListener("submit", function(event){
    event.preventDefault();
    let query = recherche.value;
    console.log("Recherche : " + query);
    // Effectuer une action de recherche avec la valeur de la requête
});
}else{
    console.log("Element de recherche non trouvé");
}
