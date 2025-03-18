
window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: false,
  });
});

const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener) //this lines add the scroll event to the provided element
}
let myheader = document.getElementById('header');
if (myheader) {
  const headerScrolled = () => {
    if (window.scrollY > 100) {
      myheader.classList.add('header-scrolled')
    } else {
      myheader.classList.remove('header-scrolled')
    }
  }
  window.addEventListener('load', headerScrolled)
  onscroll(document, headerScrolled)
}

$(document).ready(function () {
  var navbarlinks = $('#navbar .nav-link');

  // Function to update active state of navbar links
  function navbarlinksActive() {
    var position = $(window).scrollTop() + 200;

    // Loop through each navbar link
    navbarlinks.each(function () {
      var navbarlink = $(this);
      var hash = navbarlink.attr('href');

      if (!hash) return;

      // Select the corresponding section
      var section = $(hash);

      if (!section.length) return;

      // Check if current scroll position is within section
      if (position >= section.offset().top && position <= (section.offset().top + section.outerHeight())) {
        navbarlink.addClass('active');
      } else {
        navbarlink.removeClass('active');
      }
    });
  }

  // Update active state of navbar links on page load
  $(window).on('load', navbarlinksActive);

  // Update active state of navbar links on scroll
  $(window).on('scroll', navbarlinksActive);

  // Function to scroll to an element with header offset
  function scrollto(el) {
    var headerHeight = $('#header').outerHeight();
    var elementPos = $(el).offset().top;

    // Scroll to element with header offset
    $('html, body').animate({
      scrollTop: elementPos - headerHeight
    }, 'slow');
  }
});

const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}

let backtotop = select('.back-to-top')
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active')
    } else {
      backtotop.classList.remove('active')
    }
  }
  window.addEventListener('load', toggleBacktotop)
  onscroll(document, toggleBacktotop)
}


$('.hd-toggler').click(function () {
  if ($(window).width() <= 767) {
    $(this).siblings('.hd-overlay').addClass('menu-show');
    $("body").addClass('noscroll');
  }
  $(".hide").click(function () {
    $(".hd-overlay").removeClass("menu-show");
    $("body").removeClass("noscroll");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const projectContainer = document.querySelector(".myworks-body"); // Your project grid container
  const projects = Array.from(projectContainer.children); // All project items
  const loader = document.createElement("div"); // Create a loader div
  loader.className = "loader";
  
  let projectsPerPage = 6;
  let currentIndex = projectsPerPage;

  // Show only the first 6 projects initially
  projects.forEach((project, index) => {
      if (index >= projectsPerPage) {
          project.style.display = "none";
      }
  });

  // Function to load more projects
  function loadMoreProjects() {
      if (currentIndex >= projects.length) return; // Stop if all projects are shown

      projectContainer.appendChild(loader); // Show loader

      setTimeout(() => {
          loader.remove(); // Remove loader
          for (let i = currentIndex; i < currentIndex + projectsPerPage; i++) {
              if (projects[i]) {
                  projects[i].style.display = "block";
              }
          }
          currentIndex += projectsPerPage;
      }, 1500); // Simulate loading delay
  }

  // Detect when user scrolls near the bottom
  window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
          loadMoreProjects();
      }
  });
});








