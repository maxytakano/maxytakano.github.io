$(document).ready(function() {
    
            $('.toggle_eot').click(function() {
            $('.toggle_eot').toggleClass("toggle_open");
            $('.description_eot').slideToggle('slow');
            });
            
            $('.toggle_mazerunner').click(function() {
            $('.toggle_mazerunner').toggleClass("toggle_open");
            $('.description_mazerunner').slideToggle('slow');
            });
            
            $('.toggle_ichi').click(function() {
            $('.toggle_ichi').toggleClass("toggle_open");
            $('.description_ichi').slideToggle('slow');
            });
            
            $('.toggle_toki2').click(function() {
            $('.toggle_toki2').toggleClass("toggle_open");
            $('.description_toki2').slideToggle('slow');
            });
            
            $('.toggle_toki').click(function() {
            $('.toggle_toki').toggleClass("toggle_open");
            $('.description_toki').slideToggle('slow');
            });
            
            $('.toggle_ice').click(function() {
            $('.toggle_ice').toggleClass("toggle_open");
            $('.description_ice').slideToggle('slow');
            });
            
            $('.toggle_gba').click(function() {
            $('.toggle_gba').toggleClass("toggle_open");
            $('.description_gba').slideToggle('slow');
            });
            
            $('.toggle_board').click(function() {
            $('.toggle_board').toggleClass("toggle_open");
            $('.description_board').slideToggle('slow');
            });
            
            $('.toggle_trailers').click(function() {
            $('.toggle_trailers').toggleClass("toggle_open");
            $('.description_trailers').slideToggle('slow');
            });

			$("#slides_eot").SexySlider({
				auto      : false,
				width     : 550,
				height    : 308,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_eot',
				control   : '#control_eot',
				effect    : 'fade',
				direction : 'left'
			});	
			
			$("#slides_mazerunner").SexySlider({
				auto      : false,
				width     : 550,
				height    : 308,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_mazerunner',
				control   : '#control_mazerunner',
				effect    : 'fade',
				direction : 'left'
			});	
			
			$("#slides_intro").SexySlider({
				auto	  : true,
				width     : 867,
				height    : 363,
				delay     : 4500,
				strips    : 1,
				stripSpeed: 250,
				titleSpeed: 250,
				autopause : true,
				navigation: '#navigation_intro',
				control   : '#control_intro',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_photo").SexySlider({
				auto	  : true,
				width     : 867,
				height    : 363,
				delay     : 2500,
				strips    : 1,
				stripSpeed: 250,
				titleSpeed: 250,
				autopause : true,
				navigation: '#navigation_photo',
				control   : '#control_photo',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_ichi").SexySlider({
				auto      : false,
				width     : 550,
				height    : 363,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_ichi',
				control   : '#control_ichi',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_iceage").SexySlider({
				auto      : false,
				width     : 550,
				height    : 363,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_iceage',
				control   : '#control_iceage',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_swapthis").SexySlider({
				auto      : false,
				width     : 550,
				height    : 363,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_swapthis',
				control   : '#control_swapthis',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_swordsandsoldiers").SexySlider({
				auto      : false,
				width     : 550,
				height    : 363,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_swordsandsoldiers',
				control   : '#control_swordsandsoldiers',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_tokitori").SexySlider({
				auto      : false,
				width     : 550,
				height    : 308,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_tokitori',
				control   : '#control_tokitori',
				effect    : 'fade',
				direction : 'left'
			});			
			$("#slides_tokitori2").SexySlider({
				auto      : false,
				width     : 550,
				height    : 308,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_tokitori2',
				control   : '#control_tokitori2',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_boardgame").SexySlider({
				auto      : false,
				width     : 550,
				height    : 308,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_boardgame',
				control   : '#control_boardgame',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_about").SexySlider({
				auto      : false,
				width     : 550,
				height    : 308,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_about',
				control   : '#control_about',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_gbagame").SexySlider({
				auto      : false,
				width     : 550,
				height    : 308,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_gbagame',
				control   : '#control_gbagame',
				effect    : 'fade',
				direction : 'left'
			});
			$("#slides_trailers").SexySlider({
				auto      : false,
				width     : 550,
				height    : 309,
				strips    : 1,
				stripSpeed: 200,
				titleSpeed: 200,
				autopause : true,
				navigation: '#navigation_trailers',
				control   : '#control_trailers',
				effect    : 'fade',
				direction : 'left'
			});
			
			$("ul.trailer_list").ytplaylist({deepLinks: true, addThumbs:true, autoPlay: true});
			
			var $root = $('html, body');
			$('a').click(function() {
			    var href = $.attr(this, 'href');
			    $root.animate({
			        scrollTop: $(href).offset().top -16
			    }, 1000, function () {
			        window.location.hash = href;
			    });
			    return false;
			});

		});
