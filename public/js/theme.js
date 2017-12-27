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
  
  
  $("#submit").click(function() {
    
    
    var checkin = $("#checkin").val();
    var checkout = $("#checkout").val();
    var destination = $("#destination").val();
    var guests = $("#guests").val();
    var suppliers = $("#suppliers").val();

  $.getJSON( "/hotels", {
    checkin: checkin,
    checkout: checkout,
    destination: destination,
    guests: guests,
    suppliers: suppliers
  })
    .done(function( data ) {
      console.log(data)
      $("#results-table").find("tbody").html('');
      var markup = "";
      for(var i = 0; i < data.length; i++) {
        markup += "<tr><td>" +data[i].id+"</td><td>" +data[i].price+"</td><td>" +data[i].supplier+ "</td></tr>";
      }
      console.log(markup)
      $("#results-table").find("tbody").html(markup);
    });
    
  })

})(jQuery); // End of use strict
