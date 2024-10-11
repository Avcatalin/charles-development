document.addEventListener("DOMContentLoaded", function() {
  function highlightQuery(text, query) {
    // Split the query into words and filter out any empty strings (in case of multiple spaces)
    const queryWords = query.split(/\s+/).filter(word => word.length > 0);

    // Escape special characters in each query word for RegExp and highlight each word
    queryWords.forEach((word) => {
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regExp = new RegExp(`(${escapedWord})`, 'gi');
      text = text.replace(regExp, '<span class="highlight">$1</span>');
    });

    return text;
  }

  document.getElementById('searchQuery').addEventListener('input', function() {
    const query = this.value; // Get the current value of the input
    if (query.length < 3) { // Optionally, wait for at least 3 characters
      document.getElementById('autocompleteDropdown').style.display = 'none';
      return;
    }

    // Throttling or debouncing the input could be added here to reduce API calls

    fetch(`https://resource-hub-search-content.catalin-avarvarei-ext.workers.dev/?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
      // console.log(data);
      const dropdown = document.getElementById('autocompleteDropdown');
      dropdown.innerHTML = ''; // Clear previous results

      if (data.results && data.results.length > 0) {
        dropdown.style.display = 'block'; // Show the dropdown

        data.results.forEach(result => {
          const div = document.createElement('div');
          div.className = 'dropdown-item';
          // Use the highlightQuery function for title and description
          const highlightedTitle = highlightQuery(result.title, query);
          const highlightedDescription = highlightQuery(result.description, query);
          div.innerHTML = `
            <a href="${result.url}">
              <p class="result-title">${highlightedTitle}</h4>
              <p class="result-content">${highlightedDescription}</p>              
              <img src="https://www.hello-charles.com/hubfs/Resources%20Hub/icons/external-link.svg" class="external-icon" loading="easger" width="24" height="24" />
            </a>
          `;
          div.addEventListener('click', function() {
            dropdown.style.display = 'none'; // Hide the dropdown
          });
          dropdown.appendChild(div);
        });
      } else {
        dropdown.style.display = 'none'; // Hide the dropdown if no results
      }
    })
      .catch(error => {
      console.error('Error:', error);
      document.getElementById('autocompleteDropdown').style.display = 'none';
    });
  });

  const searchInput = document.getElementById('searchQuery');
  const autocompleteDropdown = document.getElementById('autocompleteDropdown');
  const searchWrapper = document.querySelector('.search-container');
  const overlay = document.getElementById('overlay');

  function clearSearch() {
    searchWrapper.classList.remove('expanded');
    autocompleteDropdown.style.display = 'none';
    autocompleteDropdown.innerHTML = ''; // Clear the dropdown contents
    overlay.style.display = 'none';
    document.getElementById('total-count').style.display = 'block';
    searchInput.value = ''; // Clear the search input
  }

  // Call clearSearch on page load to ensure we start with a clean state
  clearSearch();

  searchInput.addEventListener('click', function(event) {
    event.stopPropagation();
    searchWrapper.classList.add('expanded');
    document.getElementById('total-count').style.display = 'none';
    // Do not display dropdown immediately on click; it should only show when there are results
    // autocompleteDropdown.style.display = 'block';
    overlay.style.display = 'block';
  });

  // Other event listeners...
  document.addEventListener('click', function(event) {
    if (!searchWrapper.contains(event.target)) {
      clearSearch();
    }
  });

  window.addEventListener('pageshow', function(event) {
    // The persisted property is true if the page is loaded from the cache
    if (event.persisted) {
      clearSearch();
    } else {
      // Also clear search when coming back to the page not from cache
      clearSearch();
    }
  });

  // Event listener to handle clicking on a search result
  autocompleteDropdown.addEventListener('click', function(event) {
    let target = event.target;
    // Traverse up the DOM to find the .dropdown-item if a child was clicked
    while (target != null && !target.classList.contains('dropdown-item')) {
      target = target.parentElement;
    }
    if (target) {
      // Do something with the clicked result here if needed, e.g., navigate to the result's URL
      clearSearch();
    }
  });
});

