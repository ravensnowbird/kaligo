(function($) {
  "use strict"; // Start of use strict

  // Vide - Video Background Settings

  $('.datepicker').datepicker({
    format: 'dd/mm/yyyy'
  }).on('changeDate', function(e){
    $(this).datepicker('hide');
  });
  var processed_airports = jQuery.map( airports, function( n, i ) {
    return ({id:i,text: n["city"] + ", " + n["country"] + " - " + n["iata"]  } );
  });


  $(".airport-select").select2({
    placeholder: "Destination",
    data: processed_airports
  });


  $(".supplier-select").select2({
    createSearchChoice:function(term, data) { if ($(data).filter(function() { return this.text.localeCompare(term)===0; }).length===0) {return {id:term, text:term};} },
    multiple: true,
    data: [{id: 0, text: 'Supplier 1'},{id: 1, text: 'Supplier 2'},{id: 2, text: 'Supplier 3'}]
});

})(jQuery); // End of use strict
