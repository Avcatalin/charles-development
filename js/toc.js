document.addEventListener('DOMContentLoaded', function () {
  // Check if the article body exists
  const blogPostBody = document.querySelector('.blog-post__body');
  if (!blogPostBody) return;

  // Get the ToC element
  const toc = document.getElementById('ToC');
  if (!toc) return;

  // Get all the h2 tags within the article
  const headers = blogPostBody.querySelectorAll('h2');
  if (headers.length === 0) {
    toc.remove();
    return;
  }

  // Create the ToC header
  const tocHeader = document.createElement('b');
  tocHeader.textContent = 'Jump to';
  toc.appendChild(tocHeader);

  // Create the ToC list
  const tocList = document.createElement('ol');
  toc.appendChild(tocList);

  headers.forEach((header, index) => {
    const headerText = header.textContent;
    const headerId = 'section' + index;
    header.id = headerId;

    const tocListItem = document.createElement('li');
    const tocEntry = document.createElement('a');
    tocEntry.href = '#' + headerId;
    tocEntry.textContent = headerText;
    tocEntry.classList.add('redirection-link', 'link-hover-effect');
    tocListItem.appendChild(tocEntry);
    tocList.appendChild(tocListItem);
  });

  // Function to update ToC based on scroll position
  function onScroll() {
    let scrollPos = window.scrollY || document.documentElement.scrollTop;
    headers.forEach(header => {
      const tocLink = toc.querySelector(`a[href="#${header.id}"]`);
      let headerTop = header.offsetTop;
      let headerBottom = headerTop + header.offsetHeight;

      if (scrollPos >= headerTop && scrollPos < headerBottom && tocLink) {
        toc.querySelectorAll('a').forEach(link => link.classList.remove('active'));
        tocLink.classList.add('active');
      }
    });
  }

  // Attach scroll event listener
  window.addEventListener('scroll', onScroll);

  // Smooth scrolling for ToC links
  tocList.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});