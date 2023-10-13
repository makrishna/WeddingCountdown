"use strict";

// Check IE Function
//==================================================================================
var isIE = function isIE() {
  if (
    window.navigator.userAgent.indexOf("MSIE ") > 0 ||
    !!navigator.userAgent.match(/Trident\/7\./)
  ) {
    return 1;
  }
};

// Check Safari Function
//===================================================================================
if (
  navigator.userAgent.indexOf("Safari") != -1 &&
  navigator.userAgent.indexOf("Mac") != -1 &&
  navigator.userAgent.indexOf("Chrome") == -1
) {
  $("body").addClass("safari-mac");
}

$(document).ready(function () {
  // PACE
  //==================================================================================
  setTimeout(function () {
    $("#preloader-overlay").css("visibility", "visible");
  }, 500);

  Pace.on("done", function () {
    $("#logo_loader").hide();
    $("#white-screen").hide();
  });
  Pace.on("hide", function () {
    // GALLERY - MASONRY
    //==================================================================================
    var $gallery = $("#gallery-masonry");

    if (device.tablet() || device.mobile()) {
      $gallery.masonry({
        columnWidth: ".grid_sizer",
        itemSelector: ".masonry_col",
        transitionDuration: 0,
      });
    } else {
      $gallery.masonry({
        columnWidth: ".grid_sizer",
        itemSelector: ".masonry_col",
        transitionDuration: "1s",
      });
    }

    // BRIDESMAID - GALLERY
    //==================================================================================
    var $bridesmaid = $("#bridesmaid-masonry");

    if (device.tablet() || device.mobile()) {
      $bridesmaid.masonry({
        columnWidth: ".grid_sizer",
        itemSelector: ".masonry_col",
        transitionDuration: 0,
      });
    } else {
      $bridesmaid.masonry({
        columnWidth: ".grid_sizer",
        itemSelector: ".masonry_col",
        transitionDuration: "1s",
      });
    }

    $(window).resize(function () {
      $bridesmaid.masonry();
    });

    // GROOMSMEN - GALLERY
    //==================================================================================
    var $groomsmen = $("#groomsmen-masonry");

    if (device.tablet() || device.mobile()) {
      $groomsmen.masonry({
        columnWidth: ".grid_sizer",
        itemSelector: ".masonry_col",
        transitionDuration: 0,
      });
    } else {
      $groomsmen.masonry({
        columnWidth: ".grid_sizer",
        itemSelector: ".masonry_col",
        transitionDuration: "1s",
      });
    }

    $(window).resize(function () {
      $groomsmen.masonry();
    });

    // WAYPOINT
    //====================================================
    if (!device.tablet() && !device.mobile()) {
      $(".animation").css({
        visibility: "hidden",
      });

      $(".animation").waypoint(
        function () {
          $(this).css({ visibility: "visible" });
          $(this).addClass("animated");
        },
        {
          offset: "95%",
        }
      );
    }

    // Refresh Waypoint After Masonry Layout Complete
    if (!device.tablet() && !device.mobile()) {
      $gallery.masonry(
        "on",
        "layoutComplete",
        function (msnryInstance, laidOutItems) {
          $.waypoints("refresh");
        }
      );
    }

    $(window).resize(function () {
      $gallery.masonry();
      if (!device.tablet() && !device.mobile() && $(window).width() < 1200) {
        setTimeout(function () {
          $.waypoints("refresh");
        }, 1000);
      }
    });

    // PARALLAX MAIN PHOTO
    //======================================================================================
    var parallax_photo = function () {
      if ($(window).width() > 1199 && !device.tablet() && !device.mobile()) {
        $("#gallery-main-photo").parallax("50%", 0.1);
        $("#bridesmaid-main-photo").parallax("50%", 0.1);
        $("#groomsmen-main-photo").parallax("50%", 0.1);
        $("#blog-main-photo").parallax("50%", 0.1);
        $("#events-main-photo").parallax("50%", 0.1);
        $("#rsvp-main-photo").parallax("50%", 0.1);
      } else if ($(window).width() > 1199 && device.tablet()) {
        $(
          "#gallery-main-photo, #bridesmaid-main-photo, #groomsmen-main-photo, #blog-main-photo, #events-main-photo, #rsvp-main-photo"
        ).css("background-attachment", "scroll");
      }
    };

    //Execute on load
    if (!$("body").hasClass("safari-mac")) {
      parallax_photo();
    }

    //Execute on window resize
    $(window).resize(function () {
      if (!$("body").hasClass("safari-mac")) {
        parallax_photo();
      }
    });

    // FADEOUT PRELOADER OVERLAY
    //======================================================================================
    $("#preloader-overlay").fadeOut("2000");
  });

  // NICESCROLL
  //==================================================================================
  var desktop_nicescroll = function () {
    $("html").niceScroll({
      cursorcolor: "#1A212C",
      zindex: "999",
      cursorminheight: 60,
      scrollspeed: 80,
      cursorwidth: 7,
      autohidemode: true,
      background: "#aaa",
      cursorborder: "none",
      cursoropacitymax: 0.7,
      cursorborderradius: 0,
      horizrailenabled: false,
    });
  };

  if (
    !device.tablet() &&
    !device.mobile() &&
    isIE() != 1 &&
    !$("body").hasClass("safari-mac")
  ) {
    //Execute on load
    desktop_nicescroll();
  }

  //Execute on window resize
  $(window).resize(function () {
    if (
      !device.tablet() &&
      !device.mobile() &&
      !$("body").hasClass("is-popup") &&
      isIE() != 1 &&
      !$("body").hasClass("safari-mac")
    ) {
      desktop_nicescroll();
    }
  });

  // DISABLE TRANSITION ON TABLET / MOBILE
  //==================================================================================
  if (device.tablet() || device.mobile()) {
    // Layout To Right
    $("#main-menu, .sidebar-menuicon, #content-wrapper").css(
      "transition",
      "none"
    );
    // Main Menu
    $("#main-menu ul li a").css("transition", "none");
    $("#main-menu ul li a:hover:after").css("transition", "none");
    // de-icon
    $(".de-icon, .de-icon i").css("transition", "none");
    // Photo-item
    $(".photo-item-preview > .autocrop-image, .photo-item-preview > img").css(
      "transition",
      "none"
    );
    $(".photo-item-overlay").css("transition", "none");
  }

  // SIDEBAR NAVBAR & MENU (FOR SIDEBAR VERSION)
  //==================================================================================

  // Desktop Menu
  $("#desktop-menu").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("open");
    $("header, #content-wrapper").toggleClass("moveto-right");
    $("#blocker").toggleClass("visible");
  });

  // Mobile Menu
  $("#mobile-menu").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("open");
    $("#main-menu").stop().slideToggle(350);
  });

  // Menu on Window Resize
  $(window).resize(function () {
    if ($(window).width() <= 1199) {
      if ($("#desktop-menu").hasClass("open")) {
        $("#desktop-menu").removeClass("open");
        $("header, #content-wrapper").removeClass("moveto-right");
      }
      if (!$("#mobile-menu").hasClass("open")) {
        $("#main-menu").css("display", "none");
      }
      $("#blocker").removeClass("visible");
    } else {
      if ($("#mobile-menu").hasClass("open")) {
        $("#mobile-menu").removeClass("open");
      }
      $("#main-menu").css("display", "block");
    }
  });

  // Hide Dropdown Menu
  $("#main-menu li").each(function () {
    if ($(this).find("> ul").length > 0) {
      $(this).children(".child").hide();
    }
  });

  // Toggle Dropdown Menu
  $('#main-menu li:has(">ul")').on("click", "a[href^='#']", function () {
    $(this)
      .parent()
      .find(".child")
      .stop(true, true)
      .slideToggle(500, "easeOutExpo");
    return false;
  });

  // On Menu Click Hide Main Menu
  var hide_mainmenu = function () {
    if ($(window).width() <= 1199) {
      $("#main-menu").hide();
      $("#mobile-menu").removeClass("open");
    } else {
      setTimeout(function () {
        $("#blocker").removeClass("visible");
        $("#desktop-menu").removeClass("open");
        $("header, #content-wrapper, #main-menu").removeClass("moveto-right");
      }, 1200);
    }
  };

  $("#main-menu li").click(hide_mainmenu);

  // On Menu Icon Click Hide Main Menu if Opened
  $("#navbar-menuicon .smoothscroll, #navbar-menuicon .popup-link").click(
    function () {
      if (
        $("#desktop-menu").hasClass("open") ||
        $("#mobile-menu").hasClass("open")
      ) {
        hide_mainmenu();
      }
    }
  );

  // On Menu Click (Bootstrap Menu)
  var navMain = $(".navbar-collapse");
  navMain.on("click", "a", null, function () {
    if ($(this).attr("href") !== "#") {
      navMain.collapse("hide");
    }
  });

  // Add Block to Content when Desktop Nav Open
  $("#content").append('<div id="blocker"></div>');

  $("#blocker").on("click", function () {
    $(this).removeClass("visible");
    $("#desktop-menu").removeClass("open");
    $("header, #content-wrapper, #main-menu").removeClass("moveto-right");
  });

  // SLIDER
  //==================================================================================
  jQuery(function ($) {
    $.supersized({
      slides: [{ image: "images/slide4.jpg" }, { image: "images/slide4.jpg" }],
      horizontal_center: 0,
      vertical_center: 0,
    });
  });

  // COUNTDOWN
  //===================================================================================
  var theday = new Date();
  theday = new Date(2023, 11, 22);
  $("#countdown").countdown({ until: theday, format: "DHMS" });

  // STICKY NAV (MOBILE) - FOR SIDEBAR VERSION
  //===================================================================================
  var sticky_nav = function () {
    if (
      device.landscape() &&
      $(window).width() <= 640 &&
      $(window).scrollTop() == 0
    ) {
      $(".sidebar-menuicon").hide();
    } else {
      $(".sidebar-menuicon").show();
    }
  };

  //Execute on load
  sticky_nav();

  //Execute on window resize
  $(window).resize(function () {
    sticky_nav();
  });

  //Execute on scroll
  $(window).scroll(function () {
    sticky_nav();
  });

  // ONE PAGE NAV
  //======================================================================================
  $(".nav").onePageNav({
    scrollSpeed: 1200,
    currentClass: "active",
    scrollThreshold: 0.5,
    filter: ":not(.external)",
  });

  // SMOOTH SCROLL
  //======================================================================================
  var smooth_scroll = function () {
    if ($("body").hasClass("top-bar")) {
      $(".smoothscroll").smoothScroll({
        speed: 1000,
        offset: -$("#logo").innerHeight(),
        afterScroll: function () {
          if ($(this).hasClass("havehash")) {
            window.location.href = $(this).attr("href");
          }
        },
      });
    } else {
      if ($(window).width() > 1199) {
        $(".smoothscroll").smoothScroll({
          speed: 1000,
          afterScroll: function () {
            if ($(this).hasClass("havehash")) {
              window.location.href = $(this).attr("href");
            }
          },
        });
      } else {
        $(".smoothscroll").smoothScroll({
          speed: 1000,
          offset: -$(".sidebar-menuicon").height(),
          afterScroll: function () {
            if ($(this).hasClass("havehash")) {
              window.location.href = $(this).attr("href");
            }
          },
        });
      }
    }
  };

  //Execute on load
  smooth_scroll();

  //Execute on window resize
  $(window).resize(function () {
    smooth_scroll();
  });

  // MAGNIFIC POPUP
  //==================================================================================
  $(".magnific-zoom").magnificPopup({
    type: "image",
    image: {
      // options for image content type
      titleSrc: "title",
    },
    fixedContentPos: true,
    callbacks: {
      open: function () {
        // Will fire when this exact popup is opened
      },
      afterClose: function () {
        // Will fire when popup is closed
        if (
          !device.tablet() &&
          !device.mobile() &&
          isIE() != 1 &&
          !$("body").hasClass("safari-mac")
        ) {
          $("html").css("overflow", "hidden");
        }
      },
    },
  });

  // AJAX POPUP
  //==================================================================================
  $(".ajax-popup").magnificPopup({
    type: "ajax",
    ajax: {
      settings: { cache: false },
      // Ajax settings object that will extend default one - http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
      // For example:
      // settings: {cache:false, async:false}
    },
    fixedContentPos: true,
    callbacks: {
      open: function () {
        // Will fire when this exact popup is opened
      },
      afterClose: function () {
        // Will fire when popup is closed
        if (
          !device.tablet() &&
          !device.mobile() &&
          isIE() != 1 &&
          !$("body").hasClass("safari-mac")
        ) {
          $("html").css("overflow", "hidden");
        }
      },
    },
  });

  // GALLERY - MAGNIFIC POPUP
  //==================================================================================
  $("#gallery-masonry").magnificPopup({
    delegate: ".magnific-zoom-gallery", // child items selector, by clicking on it popup will open
    type: "image",
    gallery: {
      enabled: true,
    },
    image: {
      // options for image content type
      titleSrc: "title",
    },
    fixedContentPos: true,
    callbacks: {
      open: function () {
        // Will fire when this exact popup is opened
      },
      afterClose: function () {
        // Will fire when popup is closed
        if (
          !device.tablet() &&
          !device.mobile() &&
          isIE() != 1 &&
          !$("body").hasClass("safari-mac")
        ) {
          $("html").css("overflow", "hidden");
        }
      },
    },
  });

  // BRIDESMAID GALLERY - MAGNIFIC POPUP
  //==================================================================================
  $("#bridesmaid-masonry").magnificPopup({
    delegate: ".magnific-zoom-gallery", // child items selector, by clicking on it popup will open
    type: "image",
    image: {
      // options for image content type
      titleSrc: "title",
    },
    gallery: {
      enabled: true,
    },
    fixedContentPos: true,
    callbacks: {
      open: function () {
        // Will fire when this exact popup is opened
      },
      afterClose: function () {
        // Will fire when popup is closed
        if (
          !device.tablet() &&
          !device.mobile() &&
          isIE() != 1 &&
          !$("body").hasClass("safari-mac")
        ) {
          $("html").css("overflow", "hidden");
        }
      },
    },
  });

  // GROOMSMEN GALLERY - MAGNIFIC POPUP
  //==================================================================================
  $("#groomsmen-masonry").magnificPopup({
    delegate: ".magnific-zoom-gallery", // child items selector, by clicking on it popup will open
    type: "image",
    image: {
      // options for image content type
      titleSrc: "title",
    },
    gallery: {
      enabled: true,
    },
    fixedContentPos: true,
    callbacks: {
      open: function () {
        // Will fire when this exact popup is opened
      },
      afterClose: function () {
        // Will fire when popup is closed
        if (
          !device.tablet() &&
          !device.mobile() &&
          isIE() != 1 &&
          !$("body").hasClass("safari-mac")
        ) {
          $("html").css("overflow", "hidden");
        }
      },
    },
  });

  // PHOTO ITEM ICON AND CAPTION ANIMATION
  //==================================================================================
  $(".photo-item").hover(
    function () {
      if ($(window).width() > 1199 && !device.tablet() && !device.mobile()) {
        $(this).find(".de-icon").addClass("animated");
        $(this).find(".photo-caption").addClass("animated");
        $(this).find(".other-caption").addClass("animated");
      }
    },
    function () {
      if ($(window).width() > 1199 && !device.tablet() && !device.mobile()) {
        $(this).find(".de-icon").removeClass("animated");
        $(this).find(".photo-caption").removeClass("animated");
        $(this).find(".other-caption").removeClass("animated");
      }
    }
  );

  // BLOG CAROUSEL
  //==================================================================================
  $("#blog-carousel").owlCarousel({
    items: 3,
    pagination: true,
  });

  $("#blog-carousel .photo-item").on("mouseover touchstart", function (e) {
    $(this).addClass("hover");
  });

  $("#blog-carousel .photo-item").on("mouseout touchleave", function () {
    $(this).removeClass("hover");
  });

  // TOOLTIPS
  //==================================================================================
  var menu_tooltips = function () {
    $(".use-tooltips").tooltip("destroy");
    if ($(window).width() > 1199 && !device.tablet() && !device.mobile()) {
      $(".use-tooltips").tooltip({
        placement: "right",
      });
    }
  };

  //Execute on load
  menu_tooltips();

  //Execute on window resize
  $(window).resize(function () {
    menu_tooltips();
  });

  // PLACEHOLDER
  //==================================================================================
  $("input, textarea").placeholder();
});

// EVENTS - RSVP BUTTON
//==================================================================================
$(document).on("click", ".popup-button-scroll", function (e) {
  e.preventDefault();
  var hashlink = $(this).attr("href");
  $.magnificPopup.close();
  if ($(window).width() > 1199) {
    $.smoothScroll({
      scrollElement: $("html, body"),
      scrollTarget: hashlink,
      speed: 1000,
    });
  } else {
    $.smoothScroll({
      scrollElement: $("html, body"),
      scrollTarget: hashlink,
      speed: 1000,
      offset: -$(".sidebar-menuicon").height(),
    });
  }

  //Change hash link
  //window.location.href = $(this).attr("href");
});

$(window).load(function () {
  // OPEN LOCATION MAP
  //==================================================================================
  $(".popup-map, #map-menu").click(function (e) {
    e.preventDefault();
    $("#location").show(0, function () {
      $("#location_map").gMap({
        maptype: google.maps.MapTypeId.ROADMAP,
        zoom: 14,
        markers: [
          {
            latitude: -33.898361,
            longitude: 151.17529,
            html: "<strong>The Ceremony</strong><br/>Manalia Tower Floor 24 Room 256<br/>Anfix Street ST01<br/><strong>GPS:</strong> -33.898361, 151.175290",
            popup: true,
          },
          {
            latitude: -33.905485,
            longitude: 151.169131,
            html: "<strong>Wedding Party</strong><br/>Forine Restaurant<br/>Rose Street ST08<br/><strong>GPS:</strong> -33.905485, 151.169131",
            popup: true,
          },
        ],
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        scrollwheel: false,
        styles: [
          { stylers: [{ hue: "#bb5844" }, { gamma: 1 }, { saturation: -60 }] },
        ],
        onComplete: function () {
          // Resize and re-center the map on window resize event
          var gmap = $("#location_map").data("gmap").gmap;
          window.onresize = function () {
            google.maps.event.trigger(gmap, "resize");
            $("#location_map").gMap("fixAfterResize");
          };
        },
      });
    });

    $(document).bind("touchmove", function (event) {
      event.preventDefault();
    });

    if (
      !device.tablet() &&
      !device.mobile() &&
      isIE() != 1 &&
      !$("body").hasClass("safari-mac")
    ) {
      $("html").getNiceScroll().remove();
    }

    $("html").css("overflow", "hidden");

    $("body").addClass("is-popup");
  });

  // CLOSE LOCATION MAP
  //==================================================================================
  $("#location-overlay").click(function () {
    $("body").removeClass("is-popup");
    $(document).unbind("touchmove");
    $("html").css("overflow", "auto");

    if (isIE() == 1) {
      $("#groomsmen-masonry, #bridesmaid-masonry, #gallery-masonry").masonry();
    }

    if (
      !device.tablet() &&
      !device.mobile() &&
      isIE() != 1 &&
      !$("body").hasClass("safari-mac")
    ) {
      $("html").niceScroll({
        cursorcolor: "#1A212C",
        zindex: "999",
        cursorminheight: 60,
        scrollspeed: 80,
        cursorwidth: 7,
        autohidemode: true,
        background: "#aaa",
        cursorborder: "none",
        cursoropacitymax: 0.7,
        cursorborderradius: 0,
        horizrailenabled: false,
      });
    }
    $("#location").hide();
  });
});
