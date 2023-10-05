var __bhPhysicianSearch = __bhPhysicianSearch || {};
__bhPhysicianSearch.kyruusSearchWidget = {
  injectKyruusSearchWidget: function (pmUrl, customerCode, ksSearchKeyword, ksSearchLocation) {
    (function () {
      var kyruusSearchWidget = new KyruusSearchWidget({
        pm_url: pmUrl,
        el: document.getElementById('kyruus-search-widget'),
        customer_code: customerCode,

        show_location: true,
        typeahead_categories: [
          {
            category: "primary_care"
          },
          {
            category: "clinical_experience"
          },
          {
            category: "specialty_synonym"
          },
          {
            category: "name"
          }
         
        ],
        pre_filters: ["show_in_pmc:Yes", "pmc_db_only_provider_flag:F"],
        use_primary_care_condition: false,
        search_label: __bhPhysicianSearch.kyruusSearchWidget.getSearchBoxLabel(),
        message: ksSearchKeyword,
        show_powered_by: false,
        location_search_radius: 10,
        legal_message: "off",
        location_message: ksSearchLocation,
        sort_order: "networks,relevance"
      });
    }());
  },

  injectUseMyLocationButton: function () {
    var locationParent = $(".ky-input-location");
    if (locationParent === null || locationParent.length !== 1) {
      alert("injectUseMyLocationButton failing. locationParent not found.");
      return;
    }
    var myDiv = document.createElement("div");
    myDiv.setAttribute("style", "display:block!important;"); //The Kyruus code seems to, just sometimes, add a display:none to this div...
    myDiv.setAttribute("class", "mt-3 mt-lg-1");
    myDiv.innerHTML = "<a id='bh-useMyLocationLink'>" +
      "<span class='banner-fontUseLocation'></span>&nbsp;&nbsp;" +
      "<span id='bh-useMyLocationText' class='text-secondary'><i class='fas fa-map-marker-alt'></i> Use Current Location</span></a>";

    //Inject a span tag before the link's div so that the Medtouch JS code won't hide/show the link as that code does elsewhere.
    var mySpan = document.createElement("span");
    //locationParent[0].appendChild(mySpan);

    //Now add the link's div
    //locationParent[0].appendChild(myDiv);

    // Hide/show error message div if search input box is empty
    $("#physician_search form button").on("click", function () {
      if ($("#physician_search form input[id='query']").val() === "") {
        $("#physician_search form .errorMessage").show();
      }
      else {
        $("#physician_search form .errorMessage").hide();
      }
    });
  },

  setWidgetStyles: function (ksError, ksSearchButton) {   //Since the widget gets generated at run time and the Kyruus styles supplied at that time too, one has to set the styles at run time too in order to override them successfully.
    $('input').blur();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $("#physician_search form").attr("style", "background: #00205B"); //redisgn
    $("#physician_search form input[type='text']").attr("style", "border: none!important;");

    //Kyruus uses !important on some of their CSS specifications.  To get around it and replace those settings, I removed two classes from the relevant element.
    $("#physician_search form button span").removeClass("ky-icons-search"); //redisgn
    $("#physician_search form button span").removeClass("icons-search"); //redisgn
    $("#physician_search form button").append('<b><svg class="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fa" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg><!-- <i class="fa fa-search"></i> -->&nbsp;&nbsp;' + ksSearchButton + '</b>');
    $("#physician_search form button").removeClass("ky-button ky-btn-l ky-full-width ky-btn-positive kyruus-config-secondary-color")
    $("#ky-location-label").attr("style", "color:#fff;margin-bottom:0px")    
    $(".ky-submit-search label").attr("style", "color:#fff;margin-bottom:0px")
    $("#submit").addClass("btn bg-primary text-white").attr("style","border-color:#0577b3;padding:24.5px 30px !important");
    $("#query").addClass("form-control");
    $("#location").addClass("form-control").attr("style", "padding-left:25px;padding-right:25px;padding-top:30px;padding-bottom:30px;height:72px;");
    $("#query").attr("style", "padding-left:25px;padding-right:25px;padding-top:30px;padding-bottom:30px;display: inline;height:72px;");
    $("#kyruus-search-widget form button .ky-icon-search").hide();
    
    $("#search-bar-label").attr('style', 'color:#00205B; margin-bottom:22px');
    $(".ky-search-bar.kyruus-config-primary-color.kyruus-config-font").attr('style', 'padding:0px;background: #00205B');

    //Removing kyruus widget class and adding bootstrap class
    $(".ky-search-form").addClass("form-row").removeClass("ky-search-form");
    $(".ky-input-search-terms.ky-show-location").addClass("form-group col-12 mb-3 mb-lg-5  col-lg-6").removeClass("ky-input-search-terms ky-show-location").attr('id', 'ky-input-search-terms');;
    $(".ky-right-input-group.ky-show-location").addClass("form-group col-12 mb-3 mb-lg-5  col-lg-6").removeClass("ky-right-input-group.ky-show-location");
    $(".form-row").attr('style', 'display:flex');
    $(".ky-input-location").attr('style', 'padding:0');
    $("#bh-useMyLocationLink").attr('style', 'cursor:pointer');
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE) {
      $(".tt-dropdown-menu").css({'margin-top':'20px'});
    }
    __bhPhysicianSearch.kyruusSearchWidget.addErrorMessageDiv(ksError);
    $("#location").val($('[data-target="#geoLocationModal"]').text().trim().split(/(\d+)/)[1]);
  },

  addErrorMessageDiv: function (ksError) {
    var errorMessage, searchForm, errorDiv;
    errorMessage = ksError;
    //searchForm = $(".ky-input-search-terms");
    searchForm = $("#ky-input-search-terms");
    errorDiv = $('<div class="errortext errorMessage" style="color:#C11B17">' + errorMessage + '</div>');
    searchForm.append(errorDiv);
    errorDiv.hide();
  },

  setLocation: function (zipCode) {
    //Set the location field in the search widget to the set location's zip code.
    $("#location").val(zipCode);
  },

  setSearchDistance: function (SearchDistance) {
    $("#ky-location-label").text(SearchDistance);
  },

  getSearchBoxLabel: function () {
    //return "";
    var path = window.location.pathname;
    //Now we have something like "/physician-directory" or "/banner-md-anderson/physician-directory".
    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
      };
    }

    return " ";


  }


};

__bhPhysicianSearch.userLocation = {

  callBackFunction: null,

  setLocationFromCurrent: function (position, callback) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var latlon = lat + ',' + long;
    $.ajax({
      url: '/Cards/Geolocation/GetCurrentLocation',
      method: 'GET',
      data: {
        'address': latlon
      },
      success: function (response) {
        callBackFunction(response);
      },
      error: function (response) {
        console.log(response)
      }
    });
  },

  getCurrentLocation: function (callback) {
    callBackFunction = callback;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocationFromCurrent);
    }
  }

};
$(document).ready(function () {
  //The bh.com script.js code adds the X icons and they look crappy.  Remove them.
  //$("#kyruus-search-widget a.closeToggle").remove();
 
});
