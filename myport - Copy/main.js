 // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Initialize projects carousel
 $(document).ready(function(){
  $('.projects-carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

   contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show modal with loading animation
  successModal.classList.remove('hidden');
  document.getElementById('loadingAnimation').classList.remove('hidden');
  document.getElementById('successAnimation').classList.add('hidden');
  
  const formData = new FormData(contactForm);
  
  fetch('https://formspree.io/f/mwpojgpw', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      contactForm.reset();
      setTimeout(() => {
        document.getElementById('loadingAnimation').classList.add('hidden');
        document.getElementById('successAnimation').classList.remove('hidden');
      }, 1500); // 1.5 second loading animation
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    successModal.classList.add('hidden');
    alert('There was a problem sending your message. Please try again later.');
  });
});


    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
      successModal.classList.add('hidden');
    });

    // Close modal when clicking close button
    modalCloseBtn.addEventListener('click', function() {
      successModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === successModal) {
        successModal.classList.add('hidden');
      }
    });

    // Scroll animation
    const sections = document.querySelectorAll('.section-hidden');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = '0';
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          skillObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });

   

  // Modal functions
  function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Initialize slider for this modal
    initSlider(modalId);
  }

  function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  // Close modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target.classList.contains('fixed')) {
      const modals = document.querySelectorAll('.fixed.hidden');
      modals.forEach(modal => {
        if (!modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
          document.body.style.overflow = 'auto';
        }
      });
    }
  }

 function initSlider(modalId) {
    const modal = document.getElementById(modalId);
    const slider = modal.querySelector('.project-slider');
    const prevBtn = modal.querySelector('.slider-prev');
    const nextBtn = modal.querySelector('.slider-next');
    const slides = slider.querySelectorAll('div');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Set initial slider width and position
    slider.style.width = `${totalSlides * 100}%`;
    
    // Set each slide to be 100%/totalSlides wide
    slides.forEach(slide => {
        slide.style.width = `${100 / totalSlides}%`;
    });

    function goToSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        const translateX = -currentSlide * (100 / totalSlides);
        slider.style.transform = `translateX(${translateX}%)`;
        slider.style.transition = 'transform 0.5s ease';
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Initialize first slide
    goToSlide(0);

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') nextSlide();
            else if (e.key === 'ArrowLeft') prevSlide();
            else if (e.key === 'Escape') closeModal(modalId);
        }
    });

    // Verify images are loading
    const images = slider.querySelectorAll('img');
    images.forEach((img, index) => {
        img.onerror = () => {
            console.error(`Image ${index + 1} failed to load:`, img.src);
            img.src = 'https://via.placeholder.com/800x500?text=Image+Not+Found';
        };
    });
}





const projectFiles = {
  project1: {
    url: 'https://drive.google.com/file/d/1OMDuIJsNBmXHtmPoOimYdSpmckmrbl19/view?usp=drive_link',
    filename: 'online-leave.zip'
  },
  project2: {
    url: 'https://drive.google.com/file/d/1oNQfgy1wXDiz4H1lYmewGT6oAJ53QF9y/view?usp=sharing',
    filename: 'laundry1.zip'
  },
  project3: {
    url: 'https://drive.google.com/file/d/1mXyPMIZeMHv8qe_XkFBwHCg-uakMOGaQ/view?usp=sharing',
    filename: 'exam1.zip'
  },
  project4: {
    url: 'https://drive.google.com/file/d/1Si1a_Nr1OAdy65W606c0N2XqTWXI0vHA/view?usp=sharing',
    filename: 'EXAM.zip'
  }
};

// Add click event listeners to all download buttons
document.querySelectorAll('#downloadAndShowInstructions').forEach(button => {
  button.addEventListener('click', function() {
    const projectId = this.getAttribute('data-project');
    const project = projectFiles[projectId];
    
    if (project) {
      const link = document.createElement('a');
      link.href = project.url;
      link.setAttribute('download', project.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
});



// download cv

// Convert to direct download link (add this to your main JS file)
document.getElementById('downloadCvBtn').addEventListener('click', () => {
  const fileId = 'YOUR_FILE_ID'; // Replace with actual ID from your link
  const fileName = 'myport.zip'; // Customize download filename
  
  // Direct download link format
  const downloadUrl = `https://drive.google.com/file/d/1KtTuvgyMTS9E_1NifVdhDMCDlUeETx_A/view?usp=sharing`;
  
  // Create invisible download link
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', fileName);
  link.style.display = 'none';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Fallback if direct download fails
  setTimeout(() => {
    if (!document.body.contains(link)) {
      window.open(`https://drive.google.com/file/d/${fileId}/view`, '_blank');
    }
  }, 2000);
});




// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
window.onclick = function(event) {
  if (event.target.classList.contains('fixed')) {
    const modals = document.querySelectorAll('.fixed.hidden');
    modals.forEach(modal => {
      if (!modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

 function scrollProjects(direction) {
      const container = document.getElementById("projectSlider");
      const scrollAmount = container.offsetWidth * 0.85;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }





   const modalSlidePositions = {};

function changeSlide(direction, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const slides = container.children;
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  if (modalSlidePositions[containerId] === undefined) {
    modalSlidePositions[containerId] = 0;
  }

  modalSlidePositions[containerId] += direction;
  
  if (modalSlidePositions[containerId] >= totalSlides) {
    modalSlidePositions[containerId] = 0;
  } else if (modalSlidePositions[containerId] < 0) {
    modalSlidePositions[containerId] = totalSlides - 1;
  }

  const offset = -modalSlidePositions[containerId] * 100;
  container.style.transform = `translateX(${offset}%)`;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  const containerId = modalId.replace('Modal', 'SlidesContainer');
  modalSlidePositions[containerId] = 0;
  const container = document.getElementById(containerId);
  if (container) {
    container.style.transform = 'translateX(0)';
  }
  
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}




const slider = document.getElementById('projectSlider');
const projects = slider.children;
let activeIndex = 0;

// Initialize active card
function initSlider() {
  updateActiveCard();
}

function updateActiveCard() {
  for (let i = 0; i < projects.length; i++) {
    projects[i].classList.toggle('active', i === activeIndex);
  }
  // On desktop, remove 'active' class to show all cards as grid
  if (window.innerWidth >= 768) {
    for (let i = 0; i < projects.length; i++) {
      projects[i].classList.remove('active');
      projects[i].style.display = '';
      projects[i].style.opacity = '';
      projects[i].style.margin = '';
      projects[i].style.minWidth = '';
      projects[i].style.maxWidth = '';
    }
  }
}

function scrollProjects(direction) {
  if (direction === 'left') {
    activeIndex = (activeIndex - 1 + projects.length) % projects.length;
  } else if (direction === 'right') {
    activeIndex = (activeIndex + 1) % projects.length;
  }
  updateActiveCard();
}

// Update on window resize to reset styles if needed
window.addEventListener('resize', updateActiveCard);

// Initialize slider on page load
initSlider();
