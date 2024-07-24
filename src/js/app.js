document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();

  navigation();

  createGallery();

  links();

  scrollnav();

});

function navigation() {
    const header = document.querySelector('.header');
    const infoFest = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function() {
        if (infoFest.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
            
        }
       
    })

}

function createGallery() {
  // console.log('from gallery');
  const qtyImage = 16;
  const gallery = document.querySelector(".gallery-image");
  // console.log(gallery);

  for (let i = 1; i <= qtyImage; i++) {
    // console.log(i);
    const image = document.createElement("IMG");
    image.src = `src/img/gallery/full/${i}.jpg`;
    image.alt = `gallery image`;

    // console.log(image);

    //Event Handle

    image.onclick = function () {
      // console.log('click', i);
      showImage(i);
    };

    gallery.appendChild(image);
  }
}

function showImage(i) {
  const image = document.createElement("IMG");
  image.src = `src/img/gallery/full/${i}.jpg`;
  image.alt = `gallery image`;

  // console.log('from show image', i);
  //modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");
  modal.onclick = closeModal; //como no toma argumento esta funcion se pasa sin los parentesis

  //button close modal
  const closeModalBtn = document.createElement("BUTTON");
  closeModalBtn.innerHTML = "X";
  closeModalBtn.classList.add("btn-close");
  closeModalBtn.onclick = closeModal

  modal.appendChild(image);
  modal.appendChild(closeModalBtn);
  
  //Add Modal
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  
  body.appendChild(modal);
}

function closeModal() {
  // console.log('from close modal');
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");

  setTimeout(() => {
    modal?.remove(); //remueve el modal si existe.

    const body = document.querySelector("body"); //para eliminar el overflow y habilitar el scroll
    body.classList.remove("overflow-hidden");
  }, 500); //half second
}

function links() {
    document.addEventListener('scroll', () =>{
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a')
        let actual = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        })

        navLinks.forEach(link =>{
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
        })
    })
}

function scrollnav() {
  const navLinks = document.querySelectorAll('.navegacion-principal a')

  navLinks.forEach( link =>{
    link.addEventListener('click', e =>{
      e.preventDefault();
      const sectionScroll = e.target.getAttribute('href')
      // console.log(sectionScroll);
      const section = document.querySelector(sectionScroll)
      // console.log(section);
      section.scrollIntoView({behavior: 'smooth'});
    })
  })
}