document.addEventListener("DOMContentLoaded", function() {
  // Define your default active filters here with the actual IDs you want to start as active.
  let activeFilters = []; 
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const placeholder = dropdown.querySelector('.placeholder');
  const filterButtons = document.querySelectorAll('.filter-button');

  // Helper function to update the display based on active filters
  function updateDropdownDisplay() {
    placeholder.innerHTML = activeFilters.length === 0 ? 
      '' : 
    activeFilters.map(filter => {
      const filterButton = document.querySelector(`.filter-button[data-tag-id="${filter}"]`);
      const classes = filterButton ? filterButton.className : 'filter-button';
      return `<span class="${classes}">${filter}</span>`;
    }).join('');
    dropdownMenu.classList.remove('show');
    dropdown.classList.remove('enabled');
  }

  // Function to adjust the dropdown menu's height dynamically
  function adjustDropdownMenuHeight() {
    const maxHeight = window.innerHeight - dropdownMenu.getBoundingClientRect().top - 20; // 20px for padding
    dropdownMenu.style.maxHeight = `${maxHeight}px`;
  }

  // Function to filter content by tags using Isotope
  function filterContentByTags() {
    const filter = activeFilters.length === 0 || activeFilters.includes('all') ?
          '*' : // Show everything if no specific filters are active or 'all' is selected
    activeFilters.map(f => `[data-tags-names*="${f}"]`).join(', ');

    if (window.iso) {
      window.iso.arrange({ filter: filter });
    }
  }

  // Function to set default active filters and update display
  function setDefaultActiveFilters() {
    // Remove active class from all buttons
    filterButtons.forEach(button => button.classList.remove('active'));

    // Set the default active tags
    activeFilters.forEach(tagId => {
      const filterButton = document.querySelector(`.filter-button[data-tag-id="${tagId}"]`);
      if (filterButton) {
        filterButton.classList.add('active');
      }
    });

    // Filter content and update display
    filterContentByTags();
    updateDropdownDisplay();
  }

  //   window.addEventListener('load', function() {
  //     // Check if the viewport width is more than 768px
  //     if (window.innerWidth > 768) {
  //       setTimeout(() => {
  //         setDefaultActiveFilters();
  //       }, 1250);
  //     }
  //   });

  // Event listeners for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tagId = this.getAttribute('data-tag-id');
      if(tagId === 'all') {
        activeFilters = ['all'];
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      } else {
        const index = activeFilters.indexOf(tagId);
        if(index > -1) {
          activeFilters.splice(index, 1);
          this.classList.remove('active');
        } else {
          activeFilters.push(tagId);
          this.classList.add('active');
          document.querySelector('.filter-button[data-tag-id="all"]').classList.remove('active');
          const allIndex = activeFilters.indexOf('all');
          if(allIndex > -1) {
            activeFilters.splice(allIndex, 1);
          }
        }
      }
      filterContentByTags();
      updateDropdownDisplay();
    });
  });

  // Event listener for toggling the dropdown
  dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle('show');
    dropdown.classList.toggle('enabled');
  });

  // Close the dropdown if clicked outside
  document.addEventListener('click', event => {
    if (!dropdown.contains(event.target)) {
      dropdownMenu.classList.remove('show');
      dropdown.classList.remove('enabled');
    }
  });

  // Remove active filters
  //   function resetActiveFilters() {
  //     // Clear active filters
  //     activeFilters = [];
  //     // Update the filters
  //     filterContentByTags();
  //     // Update the display
  //     updateDropdownDisplay();
  //     // Remove the active class on dropdown
  //     filterButtons.forEach(btn => btn.classList.remove('active'));
  //   }

  //   ['blog-trigger', 'success-trigger', 'webinar-trigger'].forEach(triggerId => {
  //     document.getElementById(triggerId).addEventListener('click', resetActiveFilters);
  //   });

  // Adjust the dropdown menu height on page load and resize
  window.addEventListener('load', adjustDropdownMenuHeight);
  window.addEventListener('resize', adjustDropdownMenuHeight);

  // Assigning color classes to filter buttons
  const classesArray = ['b-black', 'b-purple', 'b-yellow', 'b-green'];
  filterButtons.forEach((button, index) => {
    button.classList.add(classesArray[index % classesArray.length]);
  });

  // Initialize total tags count display
  document.getElementById('total-count').textContent = `+${filterButtons.length}`;

});
