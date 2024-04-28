// (function () {

//     /*=====================================
//     Sticky
//     ======================================= */
//     window.onscroll = function () {
//         var header_navbar = document.querySelector(".navbar-area");
//         var sticky = header_navbar.offsetTop;

//         if (window.pageYOffset > sticky) {
//             header_navbar.classList.add("sticky");
//         } else {
//             header_navbar.classList.remove("sticky");
//         }



//         // show or hide the back-top-top button
//         var backToTo = document.querySelector(".scroll-top");
//         if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//             backToTo.style.display = "flex";
//         } else {
//             backToTo.style.display = "none";
//         }
//     };

//     // section menu active
// 	function onScroll(event) {
// 		var sections = document.querySelectorAll('.page-scroll');
// 		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

// 		for (var i = 0; i < sections.length; i++) {
// 			var currLink = sections[i];
// 			var val = currLink.getAttribute('href');
// 			var refElement = document.querySelector(val);
// 			var scrollTopMinus = scrollPos + 73;
// 			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
// 				document.querySelector('.page-scroll').classList.remove('active');
// 				currLink.classList.add('active');
// 			} else {
// 				currLink.classList.remove('active');
// 			}
// 		}
// 	};

//     window.document.addEventListener('scroll', onScroll);
    
//     // for menu scroll 
//     var pageLink = document.querySelectorAll('.page-scroll');

//     pageLink.forEach(elem => {
//         elem.addEventListener('click', e => {
//             e.preventDefault();
//             document.querySelector(elem.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth',
//                 offsetTop: 1 - 60,
//             });
//         });
//     });

//     "use strict";

// }) ();
(function () {
    "use strict";
  
    /*=====================================
    Sticky Header and Back-to-Top Button
    =======================================*/
    window.onscroll = function () {
      const headerNavbar = document.querySelector(".navbar-area");
      const sticky = headerNavbar.offsetTop; // The position at which the header becomes sticky
  
      // Add or remove the "sticky" class based on scroll position
      if (window.pageYOffset > sticky) {
        headerNavbar.classList.add("sticky");
      } else {
        headerNavbar.classList.remove("sticky");
      }
  
      // Show or hide the back-to-top button based on scroll position
      const backToTop = document.querySelector(".scroll-top");
      if (window.pageYOffset > 50) {
        backToTop.style.display = "flex";
      } else {
        backToTop.style.display = "none";
      }
    };
  
    /*=====================================
    Highlight Active Section in Navigation
    =======================================*/
    function onScroll() {
      const sections = document.querySelectorAll('.page-scroll');
      const scrollPos = window.pageYOffset; // Current scroll position
  
      sections.forEach((section) => {
        const href = section.getAttribute('href'); // Section ID
        const refElement = document.querySelector(href);
        const scrollTopMinus = scrollPos + 73; // Offset to account for fixed header
  
        // Check if the current scroll position is within the section's bounds
        if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
          sections.forEach((s) => s.classList.remove('active'));
          section.classList.add('active'); // Mark the current section as active
        } else {
          section.classList.remove('active'); // Remove active class if not in this section
        }
      });
    }
  
    window.addEventListener('scroll', onScroll); // Attach the scroll event listener to update active section
    
    /*=====================================
    Smooth Scroll for Navigation Links
    =======================================*/
    const pageLinks = document.querySelectorAll('.page-scroll');
  
    pageLinks.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        document.querySelector(elem.getAttribute('href')).scrollIntoView({
          behavior: 'smooth', // Smooth scrolling
          block: 'start', // Scroll to the start of the section
          inline: 'nearest',
        });
      });
    });
  
  })();
  