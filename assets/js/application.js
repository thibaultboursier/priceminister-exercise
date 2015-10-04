;(function () {
	'use strict';

	var Application = Application || {};

	/********************************
	/** METHOD INIT()
	*******************************/
	Application.init = function () {
		// PROPERTIES
		var self = this;

		this
			.moveArrow()
			.changeOfferOnClick()
			.addToCartOnClick();

		return this;
	};

	/********************************
	/** METHOD CHANGEOFFERONCLICK()
	*******************************/
	Application.changeOfferOnClick = function () {
		// PROPERTIES
		var self = this,
			offers = document.getElementsByClassName('js_offer'),
			i;

		for (i = 0; i < offers.length; i++) {
			offers[i].addEventListener('click', function (e) {
				if (!this.className.indexOf('active') != -1) {
					self
						.removeClassActive(offers)
						.addClassActive(this);
				}
			});
		}

		return this;
	};

	/********************************
	/** METHOD MOVEARROW()
	*******************************/
	Application.moveArrow = function () {
		// PROPERTIES
		var offerArrow = document.getElementsByClassName('js_offer-arrow'),
			container = document.getElementsByClassName('js_container')[0],
			blockOffers = document.getElementsByClassName('js_block-offers')[0],
			blockOffer = document.getElementsByClassName('js_block-offer')[0],
			containerWidth,
			blockOffersWidth,
			blockOfferWidth,
			i;

		containerWidth = parseInt(window.getComputedStyle(container).width, 10);
		blockOffersWidth = parseInt(window.getComputedStyle(blockOffers).width, 10);
		blockOfferWidth = parseInt(window.getComputedStyle(blockOffer).width, 10);

		for (i = 0; i < offerArrow.length; i++) {
			offerArrow[i].style.left = blockOffersWidth + ((containerWidth - (blockOfferWidth + blockOffersWidth)) - 42) + 'px';
		}

		return this;
	};

	/********************************
	/** METHOD ADDCLASSACTIVE()
	*******************************/
	Application.addClassActive = function (element) {
		// PROPERTIES
		var i;

		if (element.length !== undefined) {
			for (i = 0; i < element.length; i++) {
				element[i].className = element[i].className + ' active';
			}
		} else {
			element.className = element.className + ' active';
		}

		return this;
	};

	/********************************
	/** METHOD REMOVECLASSACTIVE()
	*******************************/
	Application.removeClassActive = function (element) {
		// PROPERTIES
		var i;

		if (element.length !== undefined) {
			for (i = 0; i < element.length; i++) {
				element[i].className = element[i].className.replace(/\bactive\b/,'');
			} 
		} else {
			element.className = element.className.replace(/\bactive\b/,'');
		}

		return this;
	};

	/********************************
	/** METHOD ADDTOCARTONCLICK()
	*******************************/
	Application.addToCartOnClick = function () {
		// PROPERTIES
		var self = this,
			btnAddtocart = document.getElementsByClassName('js_btn-addtocart')[0],
			blockLayer = document.getElementsByClassName('js_block-layer')[0],
			blockPopin = document.getElementsByClassName('js_block-popin')[0],
			blockLoader = document.getElementsByClassName('js_block-loader')[0],
			btnClose = blockPopin.getElementsByClassName('js_btn-close')[0];

		btnAddtocart.addEventListener('click', function (e) {
			self
				.addClassActive([
					blockLayer,
					blockLoader
				]);

			setTimeout(function () {
				self
					.addClassActive(blockPopin)
					.removeClassActive(blockLoader);
			}, 2000);
		});

		btnClose.addEventListener('click', function (e) {
			self
				.removeClassActive([
					blockLayer,
					blockPopin
				]);
		});

		return this;
	};

	/********************************
	/** DOCUMENT DOMCONTENTLOADED
	*******************************/
	document.addEventListener("DOMContentLoaded", function (event) { 
			Application.init();
	});

	/********************************
	/** WINDOW ONRESIZE
	*******************************/
	window.onresize = Application.moveArrow;
	
})();