var contadorImagen = 1;

var cargarPagina = function() {
    cargarPokemones();
    $(document).on("click", ".pokemon", cargarDetallesPokemones);
    $('.modal').modal();
};

var cargarPokemones = function() {
  var url ='https://pokeapi.co/api/v2/pokemon-species/';
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

    $espacioIndividualPokemon.addClass("pokemon center-align col s4");
    $espacioIndividualPokemon.attr("data-url", pokemon.url);
    $espacioIndividualPokemon.attr("data-target", "modal1");
    $espacioIndividualPokemon.attr("data-src", "assets/images/"+ contadorImagen + ".jpg");

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
  var src = $(this).data('src');
  var imagenModal = $("<img />");

  imagenModal.attr("src", src);
  imagenModal.addClass("imagenModal");

  $.getJSON(url, function(response){
    var nombre = response.name;
    var colorPokemon = response.color.name;
    var habitatPokemon = response.habitat.name;
    var shapePokemon = response.shape.name;
    var generaPokemon = response.genera[0].genus;

    mostrarDetallePokemon(nombre, colorPokemon, habitatPokemon, shapePokemon, generaPokemon, imagenModal);
    });
};

var mostrarDetallePokemon = function(nombre, colorPokemon, habitatPokemon, shapePokemon, generaPokemon, imagenModal) {

      $("#nombre").text(nombre);
      $("#color").text(colorPokemon);
      $("#habitat").text(habitatPokemon);
      $("#shape").text(shapePokemon);
      $("#genero").text(generaPokemon);
      $("#imagen").html(imagenModal);
    };

$(document).ready(cargarPagina);
