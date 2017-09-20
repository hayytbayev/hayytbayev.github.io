function applyMargins() {
	var leftToggler = $(".mini-submenu-left");
	var rightToggler = $(".mini-submenu-right");
	if (leftToggler.is(":visible")) {
		$("#map .ol-zoom")
		.css("margin-left", 0)
		.removeClass("zoom-top-opened-sidebar")
		.addClass("zoom-top-collapsed");
	} else {
		$("#map .ol-zoom")
		.css("margin-left", $(".sidebar-left").width())
		.removeClass("zoom-top-opened-sidebar")
		.removeClass("zoom-top-collapsed");
	}
	if (rightToggler.is(":visible")) {
		$("#map .ol-rotate")
		.css("margin-right", 0)
		.removeClass("zoom-top-opened-sidebar")
		.addClass("zoom-top-collapsed");
	} else {
		$("#map .ol-rotate")
		.css("margin-right", $(".sidebar-right").width())
		.removeClass("zoom-top-opened-sidebar")
		.removeClass("zoom-top-collapsed");
	}
}

function isConstrained() {
	return $("div.mid").width() == $(window).width();
}

function applyInitialUIState() {
	if (isConstrained()) {
		$(".sidebar-left .sidebar-body").fadeOut('slide');
		$(".sidebar-right .sidebar-body").fadeOut('slide');
		$('.mini-submenu-left').fadeIn();
		$('.mini-submenu-right').fadeIn();
	}
}

$(function(){
	$('.sidebar-left .slide-submenu').on('click',function() {
		var thisEl = $(this);
		thisEl.closest('.sidebar-body').fadeOut('slide',function(){
			$('.mini-submenu-left').fadeIn();
			applyMargins();
		});
	});

	$('.mini-submenu-left').on('click',function() {
		var thisEl = $(this);
		$('.sidebar-left .sidebar-body').toggle('slide');
		thisEl.hide();
		applyMargins();
	});

	$('.sidebar-right .slide-submenu').on('click',function() {
		var thisEl = $(this);
		thisEl.closest('.sidebar-body').fadeOut('slide',function(){
			$('.mini-submenu-right').fadeIn();
			applyMargins();
		});
	});

	$('.mini-submenu-right').on('click',function() {
		var thisEl = $(this);
		$('.sidebar-right .sidebar-body').toggle('slide');
		thisEl.hide();
		applyMargins();
	});

	$(window).on("resize", applyMargins);

	
	applyInitialUIState();
	applyMargins();
	
	//sonradan eklenenler
	var format = 'image/png';
			
	var mapLayer = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	
	/*var ytuLayer = new ol.layer.Image({
		source: new ol.source.ImageWMS({
		ratio: 1,
		url: 'http://localhost:8081/geoserver/localhost/wms',
		params: {'FORMAT': format,
		'VERSION': '1.1.1',  
		STYLES: '',
		LAYERS: 'localhost:test',
		}
		})
	});
	
	var usaStatesLayer = new ol.layer.Image({
		source: new ol.source.ImageWMS({
		ratio: 1,
		url: 'http://localhost:8081/geoserver/topp/wms',
		params: {'FORMAT': format,
		'VERSION': '1.1.1',  
		STYLES: '',
		LAYERS: 'topp:states',
		}
		})
	});
	
	var istanbulUtmLayer = new ol.layer.Image({
		source: new ol.source.ImageWMS({
		ratio: 1,
		url: 'http://localhost:8081/geoserver/topp/wms',
		params: {'FORMAT': format,
		'VERSION': '1.1.1',  
		STYLES: '',
		LAYERS: 'topp:istanbul_utm',
		}
		})
	});
	
	var piterLayer = new ol.layer.Image({
		source: new ol.source.ImageWMS({
		  ratio: 1,
		  url: 'http://localhost:8081/geoserver/localhost/wms',
		  params: {'FORMAT': format,
				   'VERSION': '1.1.1',  
				STYLES: '',
				LAYERS: 'localhost:St-Pettersburg-2',
		  }
		})
	  });*/
	
	var ytuTF = document.getElementById("ytu").checked;
	var usaTF = document.getElementById("usa-population").checked;
	var istTF = document.getElementById("istanbul-utm").checked;
	var piterTF = document.getElementById("piter").checked;
	
	ytuLayer.setVisible(false);
	usaStatesLayer.setVisible(false);
	istanbulUtmLayer.setVisible(false);
	piterLayer.setVisible(false);
	
	if(ytuTF)
		ytuLayer.setVisible(true);
	if(usaTF)
		usaStatesLayer.setVisible(true);
	if(istTF)
		istanbulUtmLayer.setVisible(true);
	if(piterTF)
		piterLayer.setVisible(true);
	
	var allLayers = [mapLayer,ytuLayer,usaStatesLayer,istanbulUtmLayer,piterLayer];
	
	var map = new ol.Map({
		target: "map",
		layers: allLayers,
		view: new ol.View({
			center: [0, 0],
			zoom: 2
		})
	});
});	