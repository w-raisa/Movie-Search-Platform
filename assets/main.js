$(document).ready(function(){
  $("form").submit(function(e) {
    e.preventDefault();
    var mytext = $("#input-create-item").val();
    $("#input-create-item").val("");
    var api_output = ""

    $.ajax({
      url: "/search",
      data: {
        text: mytext,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function(res) {
        JSON.stringify(res.from)
        $("#container").empty()
        let html = ""
        if (mytext && res.from.results.length != 0)
          html+= "<h1>Search results for " + mytext + "</h1>"
        else if (mytext.length == 0){
          html+= "<h1>Enter a movie title in the search bar</h1>"
        }
        else if (res.from.results.length == 0) {
          html+= "<h1>No results found for " + mytext + "</h1>"
        }
        $("#container").append(html)
        $.each(res.from.results, (index, value) => {
          let html = ""
          JSON.stringify(value)
          html+= "<h2>" + value.original_title + "</h2>"
          const image_path = "https://image.tmdb.org/t/p/w300/" + value.poster_path
          if (value.poster_path) {
            html+= "<img src=" + image_path + "></img>"
          }
          else {
            html+= "<p>" + "No image provided :(" + "</p>"
          }
          html+= "<p>" + "Popularity: " + value.popularity + "</p>"
          html+= "<p>" + "Vote Count: " + value.vote_count + "</p>"
          html+= "<p>" + "ID: " + value.id + "</p>"
          html+= "<p>" + "Vote Average: " + value.vote_average + "</p>"
          html+= "<p>" + "Overview: " + value.overview + "</p>"
          html+= "<p>" + "Release Date: " + value.release_date + "</p>"
          $("#container").append(html)
        })
      }, error: function(err){
        console.log(err)
      }
    })

  })

  $.fn.getTrending = function(){
    $.ajax({
      url: "/trending",
      method: "POST",
      success: function(res) {
        JSON.stringify(res.from)
        $("#container").empty()
        let html = ""
        html+= "<h1>TRENDING</h1>"
        $("#container").append(html)
        $.each(res.from.results, (index, value) => {
          let html = ""
          JSON.stringify(value)
          if (value.name){
              html+= "<h2>" + value.name + "</h2>"
          }
          else if (value.original_name){
              html+= "<h2>" + value.original_name + "</h2>"
          }
          else if (value.original_title){
              html+= "<h2>" + value.original_title + "</h2>"
          }
          const image_path = "https://image.tmdb.org/t/p/w300/" + value.poster_path
          if (value.poster_path) {
            html+= "<img src=" + image_path + "></img>"
          }
          else {
            html+= "<p>" + "No image available :(" + "</p>"
          }
          html+= "<p>" + "Popularity: " + value.popularity + "</p>"
          html+= "<p>" + "Vote Count: " + value.vote_count + "</p>"
          html+= "<p>" + "ID: " + value.id + "</p>"
          html+= "<p>" + "Vote Average: " + value.vote_average + "</p>"
          html+= "<p>" + "Overview: " + value.overview + "</p>"
          if (value.release_date){
            html+= "<p>" + "Release Date: " + value.release_date + "</p>"
          }
          else {
            html+= "<p>"+ "Not released yet" + "</p>"
          }
          $("#container").append(html)
        })
      }, error: function(err){
        console.log(err)
      }
    })
  }

  $("#see-trending").click(function(){
    $.fn.getTrending();
  });

  $.fn.getTrending()

  // $.fn.home_page = function() {
  //   $.ajax({
  //     url: "/",
  //     method: "POST",
  //     success: function(res) {
  //       console.log("hehexd")
  //     }
  //   })
  // }
  //
  // $("#home-page").click(function(){
  //   $.fn.home_page();
  // });




})
