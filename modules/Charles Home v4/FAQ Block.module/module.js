document.addEventListener("DOMContentLoaded", function() {
  // Grab all accordion headers
  const accordionHeaders = document.querySelectorAll('.accordion-section-header');
  let currentlyOpenSection = null;

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const associatedContent = header.nextElementSibling;

      // If there's an open section and it's not the clicked one, close it
      if (currentlyOpenSection && currentlyOpenSection !== associatedContent) {
        currentlyOpenSection.style.maxHeight = null;
        currentlyOpenSection.previousElementSibling.classList.remove('opened');
      }

      // If the clicked section is already open, close it; otherwise, open it
      if (associatedContent.style.maxHeight) {
        associatedContent.style.maxHeight = null;
        header.classList.remove('opened');
        currentlyOpenSection = null;
      } else {
        associatedContent.style.maxHeight = `${associatedContent.scrollHeight}px`;
        header.classList.add('opened');
        currentlyOpenSection = associatedContent;
      }
    });
  });
});
