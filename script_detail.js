document.addEventListener('DOMContentLoaded', () => {
    /* --- Accordéon pour la Méthodologie --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        accordionItem.classList.toggle('active');
        const content = this.nextElementSibling;
        if (accordionItem.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  
    /* --- Optionnel : Pause du carrousel au survol --- */
    const toolsCarousel = document.querySelector('.tools-carousel');
    toolsCarousel.addEventListener('mouseover', function(){
      toolsCarousel.style.animationPlayState = 'paused';
    });
    toolsCarousel.addEventListener('mouseout', function(){
      toolsCarousel.style.animationPlayState = 'running';
    });
  
    /* --- Gestion du formulaire de devis --- */
    const quoteForm = document.getElementById('quoteForm');
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('client-name').value.trim();
      const email = document.getElementById('client-email').value.trim();
      const details = document.getElementById('client-details').value.trim();
      if(name === "" || email === "" || details === ""){
        alert("Veuillez remplir tous les champs.");
      } else {
        alert("Votre demande de devis a été envoyée !");
        quoteForm.reset();
      }
    });
  });
  