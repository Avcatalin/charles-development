// Script for desktop Vertical Tabs
( function( $ ) {
	// Variables
	const $tabLink = $( '#tabs-section .tab-link' );
	const $tabBody = $( '#tabs-section .tab-body' );
	let timerOpacity;

	// Toggle Class
	const init = () => {
		// Menu Click
		$tabLink.off( 'click' ).on( 'click', function( e ) {
			// Prevent Default
			e.preventDefault();
			e.stopPropagation();

			// Clear Timers
			window.clearTimeout( timerOpacity );

			// Toggle Class Logic
			// Remove Active Classes
			$tabLink.removeClass( 'active ' );
			$tabBody.removeClass( 'active ' );
			$tabBody.removeClass( 'active-content' );

			// Add Active Classes
			$( this ).addClass( 'active' );
			$( $( this ).attr( 'href' ) ).addClass( 'active' );

			// Opacity Transition Class
			timerOpacity = setTimeout( () => {
				$( $( this ).attr( 'href' ) ).addClass( 'active-content' );
			}, 50 );
		} );
	};

	// Document Ready
	$( function() {
		init();
	} );
}( jQuery ) );

// Script for mobile accordion
var acc = document.getElementsByClassName("accordion-item");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "block";
    } else {
      panel.style.display = "block";
    }
  });
}
