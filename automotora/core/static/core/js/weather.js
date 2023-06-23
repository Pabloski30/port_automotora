$(document).ready(function() {
    $("#weather-form").validate({
      rules: {
        city: {
          required: true
        }
      },
      messages: {
        city: {
          required: "Por favor ingrese una ciudad"
        }
      },
      submitHandler: function(form) {
        var city = $("#city-input").val();
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=627c991abfbf9bd37a296b4bcd60e135&units=metric&lang=es";
        
        $.getJSON(url, function(data) {
          var temp = Math.round(data.main.temp);
          var feels_like = Math.round(data.main.feels_like);
          var temp_min = Math.round(data.main.temp_min);
          var temp_max = Math.round(data.main.temp_max);
          var humidity = data.main.humidity;
          var wind_speed = data.wind.speed;
          var weather = data.weather[0].description;
          var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          
          var html = "<h3>Clima en " + data.name + "</h3>" +
                     "<p><img src='" + icon + "'>" + temp + "°C, " + weather + "</p>" +
                     "<p>Sensación térmica: " + feels_like + "°C</p>" +
                     "<p>Temperatura mínima: " + temp_min + "°C</p>" +
                     "<p>Temperatura máxima: " + temp_max + "°C</p>" +
                     "<p>Humedad: " + humidity + "%</p>" +
                     "<p>Velocidad del viento: " + wind_speed + " m/s</p>";
                     
          $("#weather-info").html(html);
        })
        .fail(function(jqXHR) {
          if (jqXHR.status === 404) {
            $("#weather-info").html("<p class='text-danger'>Esta Ciudad no existe</p>");
          } else {
            $("#weather-info").html("<p class='text-danger'>Se produjo un error al procesar la solicitud</p>");
          }
        });
      }
    });
  });