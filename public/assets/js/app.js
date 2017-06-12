// starwars muestra
var cargarPagina = function() {
    cargarPokemones();
    $(document).on("click", ".pokemon", mostrarDetallePokemon);
};

var cargarPokemones = function() {
    var url ='http://pokeapi.co/api/v2/pokemon/';
    $.getJSON(url, function(response){
        var pokemons = response.results;
        crearPokemons(pokemons);
    });
};

var cargarDetallesPokemones = function() {
    var url = $(this).data('url');
    $.getJSON(url, function(response){
        var habilidadPokemon = response.abilities;
        cargarDetallesHabilidadPokemones(habilidadPokemon);
    });
};

var cargarDetallesHabilidadPokemones = function(habilidadPokemon) {
    var url = $(this).data('url');
    $.getJSON(url, function(response){
        var habilidadPokemon = response.ability;
        mostrarDetallePokemon(habilidadPokemon);
    });
};

var crearPokemons = function(pokemons) {
  pokemons.forEach(function(pokemon) {
    var $li = $("<li />");
    var $div = $("<div />");
    var $img = $("<img />");

    var $ul = $('#pokemons');

    $ul.append($li);
    $ul.append($div);
    $div.append($img);
    $img.src="https://dummyimage.com/150x50/000/fff"
    $li.attr("data-url", pokemon.url);
    $li.addClass("pokemon");
    $li.text(pokemon.name);

  });
};

var plantilla = '<h2>Datos Pokemon</h2>' +
'<p><strong>Habilidad: </strong>__habilidad__</p>' ;
// '<p><strong>Clima: </strong>__clima__</p>';


var mostrarDetallePokemon = function(habilidadPokemon) {
    var url = $(this).data('url');
    var $detallePokemonContenedor = $('#DetallePokemon');
    $.getJSON(url, function(response) {
        $detallePokemonContenedor.html(
        plantilla.replace('__habilidad__', response.ability)
                // .replace('__clima__', response.climate)
            );
    });
};


$(document).ready(cargarPagina);

// starwars

// var mostrarTotalPersonajes = function(total) {
//     $('#total').text(total);
// };
