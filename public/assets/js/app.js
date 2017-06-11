$.getJSON( "http://pokeapi.co/api/v2/pokemon/", function( response ) {
    var pokemons = response.results;
    crearPokemons(pokemons)
});

function crearPokemons(pokemons) {
    var contenedor = document.getElementById("pokemons");
    pokemons.forEach(function (pokemon) {
        var div = document.createElement("div");
        var img= document.createElement("img")
        var p = document.createElement("div");

        p.textContent = pokemon.name

        img.src="https://dummyimage.com/150x50/000/fff"
        div.appendChild(img);
        div.appendChild(p);

        contenedor.appendChild(div)
    });
}
