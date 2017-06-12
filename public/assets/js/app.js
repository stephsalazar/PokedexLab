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
