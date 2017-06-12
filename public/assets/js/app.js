var contadorImagen = 1;
var cargarPagina = function() {
    cargarPokemones();
    $(document).on("click", ".pokemon", cargarDetallesPokemones);
};

var cargarPokemones = function() {
  var url ='http://pokeapi.co/api/v2/pokemon-species/';
  $.getJSON(url, function(response){
    var pokemons = response.results;
    crearPokemons(pokemons);
  });
};

var crearPokemons = function(pokemons) {
  var $section = $('#pokemons');
  pokemons.forEach(function(pokemon) {
    var $espacioIndividualPokemon = $("<div />");
    var $imagen = $("<img />");
    var $parrafo = $("<p />");

    $section.addClass("center-align");

    $espacioIndividualPokemon.addClass("pokemon center-align col s3");
    $espacioIndividualPokemon.attr("data-url", pokemon.url);

    $imagen.attr("src", "assets/images/"+ contadorImagen + ".jpg");
    $imagen.addClass("center-align responsive-img");

    $parrafo.text(pokemon.name);
    $parrafo.addClass("center-align");

    $section.append($espacioIndividualPokemon);
    $espacioIndividualPokemon.append($imagen);
    $espacioIndividualPokemon.append($parrafo);

    contadorImagen++;
  });
};

var cargarDetallesPokemones = function() {
  var url = $(this).data('url');
  console.log(url);
  $.getJSON(url, function(response){
    var colorPokemon = response.color.name;
    var habitatPokemon = response.habitat.name;
    var shapePokemon = response.shape.name;
    var generaPokemon = response.genera[0].genus;
      mostrarDetallePokemon(colorPokemon, habitatPokemon, shapePokemon, generaPokemon);
    });
};

var mostrarDetallePokemon = function(colorPokemon, habitatPokemon, shapePokemon, generaPokemon) {
    var $detallePokemonContenedor = $('#DetallePokemon');
        $detallePokemonContenedor.html(
        plantilla.replace('__color__', colorPokemon)
                .replace('__habitat__', habitatPokemon)
                .replace('__shape__', shapePokemon)
                .replace('__genera__', generaPokemon)
            );
    };

var plantilla = '<h2>Datos Pokemon</h2>' +
  '<p><strong>Color: </strong>__color__</p>' +
  '<p><strong>Habitat: </strong>__habitat__</p>' +
  '<p><strong>Shape: </strong>__shape__</p>' +
  '<p><strong>Genera: </strong>__genera__</p>';

$(document).ready(cargarPagina);
