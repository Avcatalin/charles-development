// Listing optimized code
document.addEventListener("DOMContentLoaded", function() {
  // JavaScript to show and hide the spinner
  function showSpinner() {
    document.querySelector('.resource-overlay').classList.remove('hide');
  }
  function hideSpinner() {
    document.querySelector('.resource-overlay').classList.add('hide');    
  }
  function toggleElement(id, displayStyle = 'block') {
    const element = document.getElementById(id);
    if (element) element.style.display = displayStyle;
  }
  // Get id element
  function setInnerHTML(id, html) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = html;
  }
  // Handle error
  function handleError(error, containerId, message = 'Error loading content. Please try again later.') {
    console.error('Error:', error);
    setInnerHTML(containerId, `<p>${message}</p>`); 
  }

  // Triggers
  const triggerButton = document.getElementById('blog-trigger-it');
  const triggerSuccessListing = document.getElementById('success-trigger-it');
  const triggerWebinars = document.getElementById('webinar-trigger-it');
  const triggerHomepage = document.getElementById('home-trigger-it');
  const loadMore = document.getElementById('load-more');

  // Containers
  const container = document.getElementById('blog-posts-container'); 
  const successContainer = document.getElementById('success-stories-container'); 
  const homepageContainer = document.getElementById('resource-hub-listing');
  const webinarsContainer = document.getElementById('webinars-container');
  const newestTopicsTitle = document.getElementById('newest-topics-title');

  // Toggle visibility of sections
  function showSection(containerToShow, title, fetchDataFunction) {
    toggleElement('success-stories-container', 'none');
    toggleElement('blog-posts-container', 'none');
    toggleElement('resource-hub-listing', 'none'); 
    toggleElement('webinars-container', 'none');
    toggleElement('load-more', 'none'); 
    toggleElement(containerToShow);
    toggleElement('newest-topics-title');
    newestTopicsTitle.innerHTML = title;
    fetchDataFunction();
  }

  triggerButton.addEventListener('click', async () => {
    showSection('blog-posts-container', 'charles Blog', fetchBlogPosts); 
  });

  triggerSuccessListing.addEventListener('click', async () => {
    showSection('success-stories-container', 'Success storiees', fetchSuccessStories); 
  });

  triggerWebinars.addEventListener('click', async () => {
    showSection('webinars-container', 'Webinars', fetchWebinars); 
  });

  // Fetch all authors and return a map of author ID to author object
  async function fetchAllAuthors() {
    try {
      const response = await fetch('https://resource-hub-authors.catalin-avarvarei-ext.workers.dev/');
      const data = await response.json();
      const authorsMap = data.results.reduce((acc, author) => {
        acc[author.id] = author;
        return acc;
      }, {});
      return authorsMap;
    } catch (error) {
      console.error('Error fetching authors:', error);
      return {};
    }
  }

  // Fetching Functions
  async function fetchTags() {
    try {
      const response = await fetch('https://resource-hub-articles-tag.catalin-avarvarei-ext.workers.dev/');
      return await response.json();
    } catch (error) {
      handleError(error, 'blog-posts-container');
    }
  }

  const backgroundClasses = ['a-pink', 'a-purple', 'a-green', 'a-yellow', 'a-blue'];

  // Global variables to store the authors map and the 'after' token for pagination
  let globalAuthorsMap = {};

  // Global Isotope instance
  let iso;

  let nextAfterToken = ''; // For pagination

  function createPostElement(post, tagMap, author, colorClass, tagNames) {
    const postElement = document.createElement('div');
    postElement.classList.add('post', 'content-item', 'grid-item', colorClass); // Add classes directly
    postElement.style.opacity = '0'; 
    postElement.setAttribute('data-post-id', post.id);
    postElement.setAttribute('data-tags-names', tagNames);
    postElement.setAttribute('data-tags', post.tagIds.join(', '));
    postElement.style.cursor = 'pointer';

    postElement.innerHTML = `
    <div class="inner-content">
      <a href="${post.url}" class="post_url">
        <img src="${post.featuredImage}" alt="${post.featuredImageAltText}" />
        <p class="article-title">${post.htmlTitle.replace(' | charles', '')}</p>
        <p class="author-name"><img class="avatar" src="${author ? author.avatar : 'https://www.hello-charles.com/hubfs/typie-the-author.svg'}" width="24" height="24" loading="lazy" /> <span>${author.fullName}</span></p>
        <div class="article-summary">${post.postSummary}</div>
      </a>
    </div>
  `;

    return postElement;
  }

  async function fetchBlogPosts(after = '') {
    let apiUrl = `https://hs-resource-blog-it.catalin-avarvarei-ext.workers.dev/${after ? `&after=${after}` : ''}`; 

    showSpinner(); // Show loading state immediately

    try {
      // Fetch tags and posts concurrently, but only fetch authors if we haven't already
      const tagsResponse = await fetchTags();
      const postsResponse = await fetch(apiUrl);
      if (Object.keys(globalAuthorsMap).length === 0) {
        globalAuthorsMap = await fetchAllAuthors();
      }

      const tags = tagsResponse.results || [];
      const data = await postsResponse.json();

      const tagMap = tags.reduce((acc, tag) => {
        acc[tag.id] = tag.name;
        return acc;
      }, {});

      // Update the next 'after' token for pagination
      nextAfterToken = data.paging && data.paging.next ? data.paging.next.after : '';
      document.getElementById('load-more').style.display = nextAfterToken ? 'block' : 'none'; // Toggle button visibility

      // Update container for initial fetch or pagination
      const container = document.getElementById('blog-posts-container');
      if (after === '') {
        container.innerHTML = '';  // Clear for initial fetch
      } 

      if (data.results && data.results.length > 0) {
        let colorClassCounter = document.querySelectorAll('.grid-item').length;

        const fragment = document.createDocumentFragment();

        data.results.forEach(post => {
          const tagNames = post.tagIds.map(tagId => tagMap[tagId] || 'Unknown Tag').join(', ');
          const bgColorClass = backgroundClasses[colorClassCounter++ % backgroundClasses.length];
          const authorId = String(post.blogAuthorId);
          const author = globalAuthorsMap[authorId];
          const colorClass = backgroundClasses[colorClassCounter++ % backgroundClasses.length];

          const postElement = createPostElement(post, tagMap, author, colorClass); 

          fragment.appendChild(postElement);
        });

        // Appending nwe items to grid
        const newItems = Array.from(fragment.childNodes);
        container.appendChild(fragment);

        // Isotope loading
        imagesLoaded(container, function() {
          // This re-arranges all items including the new ones
          window.iso.arrange();
          // Isotope needs to be informed about the new items
          window.iso.reloadItems();
          window.iso = new Isotope(container, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            gutter: 10,
            percentPosition: true,
          });
          newItems.forEach(item => {
            item.style.transition = '0.3s ease';
            item.style.opacity = '1';
          });
        });

      } else {
        container.innerHTML = '<p>No posts found.</p>';
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      handleError(error, 'blog-posts-container', 'Error fetching blog posts. Please try again.'); // More specific error
    } finally {
      hideSpinner();
    }
  }

  // Fetch success stories
  function createSuccessStoryElement(post, assignedClass) {
    // Create the main element 
    const successStoryElement = document.createElement('div');
    successStoryElement.classList.add('success-story', 'content-item', 'grid-item', assignedClass);

    successStoryElement.innerHTML = `
    <a href="${post.values.button_link}" target="_blank">
      <img src="${post.values.photo.url}" alt="${post.values.photo.altText}" />
      <p class="title">${post.values.name}</p>
      <p class="content">${post.values.content}</p>
    </a>
  `; 
    return successStoryElement; // Return the created DOM element
  }

  async function fetchSuccessStories() {
    try {
      const apiUrl = `https://hs-success-stories-it.catalin-avarvarei-ext.workers.dev/`; // Get the URL based on current language
      const response = await fetch(apiUrl);
      const data = await response.json();

      const successContainer = document.getElementById('success-stories-container');
      successContainer.innerHTML = ''; // Clear for initial loading

      if (data.results && data.results.length > 0) {
        const fragment = document.createDocumentFragment(); // Efficient rendering

        data.results.forEach((post, index) => {
          const colorClassIndex = index % backgroundClasses.length;
          const colorClass = backgroundClasses[colorClassIndex];

          const successStoryElement = createSuccessStoryElement(post, colorClass);
          fragment.appendChild(successStoryElement);
        });

        successContainer.appendChild(fragment);

        // Re-initialize or update Isotope here
        imagesLoaded(successContainer, function() {
          window.iso = new Isotope(successContainer, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            gutter: 10,
            percentPosition: true,
          });
        });

      } else {
        successContainer.innerHTML = '<p>No success stories found.</p>';
      }
    } catch (error) {
      console.error('Error fetching success stories:', error);
      handleError(error, 'success-stories-container', 'Error loading success stories. Please try again.'); // More specific
    } finally {
      hideSpinner(); 
    }
  }

  // Fetch webinars
  function createWebinarElement(post, colorClass, assignedClass) {
    // Create the main element 
    const webinarElement = document.createElement('div');
    webinarElement.classList.add('webinar', 'content-item', 'grid-item', assignedClass);

    webinarElement.innerHTML = `
      <div class="inner-webinar">
          <a href="${post.values.webinar_link}" target="_blank">
            <img src="${post.values.feature_image.url}" alt="${post.values.feature_image.altText}" loading="lazy" />
            <div class="bottom-webinar-content">
              <p class="title">${post.values.name}</p>
              <p class="content">${post.values.content}</p>
            </div>
          </a>
        </div>
  `; 
    return webinarElement; // Return the created DOM element
  } 

  async function fetchWebinars() {
    try {
      const apiUrl = `https://hs-webinars-it.catalin-avarvarei-ext.workers.dev/`; // Get the URL based on current language
      const response = await fetch(apiUrl);
      const data = await response.json();

      webinarsContainer.innerHTML = ''; // Clear for initial loading

      if (data.results && data.results.length > 0) {
        const fragment = document.createDocumentFragment(); // Efficient rendering

        data.results.forEach((post, index) => {
          const colorClassIndex = index % backgroundClasses.length;
          const colorClass = backgroundClasses[colorClassIndex];

          const webinarElement = createWebinarElement(post, colorClass);
          fragment.appendChild(webinarElement);
        });

        webinarsContainer.appendChild(fragment);

        // Re-initialize or update Isotope here
        imagesLoaded(webinarsContainer, function() {
          window.iso = new Isotope(webinarsContainer, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            gutter: 10,
            percentPosition: true,
          });
        });

      } else {
        webinarsContainer.innerHTML = '<p>No webinars found.</p>'; // Directly set if simple
      }

    } catch (error) {
      console.error('Error fetching webinars:', error); 
      handleError(error, 'webinars-container', 'Error loading webinars. Please try again.');
    } finally {
      hideSpinner();
    }
  }

  // Fetch last article
  async function fetchAndDisplayArticle() {
    try {
      const apiUrl = `https://hs-spotlight-article-it.catalin-avarvarei-ext.workers.dev/`; // Get the URL based on current language
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Access the article assuming the structure is data.results[0].article
      const article = data.results[0];

      const articleContainer = document.getElementById('blog-spotlight-container');
      const classSelectSpotlight = articleContainer.getAttribute('data-class-select-spotlight');
      const classBtnStyles = articleContainer.getAttribute('data-class-select-btn-style');
      const btnLabel = articleContainer.getAttribute('data-btn-label');

      // Now we can use article.title and article.content
      const articleHtml = `
        <div class="spotlight-block ${classSelectSpotlight}" data-post-id="${article.id}">
          <a href="${article.url}" class="post_url">
            <div class="spotlight-content">
              <p class="title">${article.htmlTitle.replace(' | charles', '')}</p>
              ${article.postSummary}
              <span class="spotlight-btn ${classBtnStyles}">${btnLabel}</span>
            </div>
            <div class="featured-image">
              <img src="${article.featuredImage}" loading="eager" />
            </div>
          </a>
        </div>
      `;
      articleContainer.innerHTML = articleHtml;

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      articleContainer.innerHTML = '<p>Failed to load the article. Please try again later.</p>';
    } finally {
      hideSpinner();
    }     
  }

  // Initial Calls
  fetchAndDisplayArticle();

  // Fetch Custom ads
  async function fetchCustomAds() {
    try {
      const response = await fetch(`https://hs-custom-ads-it.catalin-avarvarei-ext.workers.dev/`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results.map(post => `
          <div class="custom-ads content-item grid-item" data-tags-names="${post.values.filter_tag.name}" style="cursor:pointer;">
            <a href="${post.values.ad_link}" target="_blank">
            <img src="${post.values.ad_image.url}" alt="${post.values.ad_image.altText}" />
            </a>
          </div>
        `);
      } else {
        return ['<p>No ads found.</p>'];
      }
    } catch (error) {
      console.error('Error loading ads:', error);
      return ['<p>Error loading ads.</p>'];
    }
  }

  // Fetch blog posts
  async function fetchBlogPostsLimited() {
    try {
      const [tagsResponse, postsResponse, authorsMap] = await Promise.all([
        fetchTags(),
        fetch(`https://hs-resource-blog-limit-it.catalin-avarvarei-ext.workers.dev/`),
        fetchAllAuthors() // Fetch all authors here
      ]);

      const tags = tagsResponse.results || [];
      const data = await postsResponse.json();
      const tagMap = tags.reduce((acc, tag) => {
        acc[tag.id] = tag.name;
        return acc;
      }, {});

      // Array of class names for background colors, ensure it's defined or imported in your script
      const backgroundClasses = ['a-pink', 'a-purple', 'a-green', 'a-yellow', 'a-blue'];
      let colorClassCounter = 0; // Initialize a counter for cycling through background color classes

      if (data.results && data.results.length > 0) {
        return data.results.map(post => {
          const tagNames = post.tagIds.map(tagId => tagMap[tagId] || 'Unknown Tag').join(', ');
          const bgColorClass = backgroundClasses[colorClassCounter % backgroundClasses.length]; // Cycle through the array
          const authorId = String(post.blogAuthorId);
          const author = authorsMap[authorId]; // Lookup the author using the post's authorId
          colorClassCounter++; // Increment counter

          return `
            <div class="post content-item grid-item" data-post-id="${post.id}" data-tags-names="${tagNames}" data-tags="${post.tagIds.join(', ')}" style="cursor:pointer;">
              <div class="inner-content ${bgColorClass}">
                <a href="${post.url}" class="post_url">
                  <img src="${post.featuredImage}" alt="${post.featuredImageAltText}" />
                  <p class="article-title">${post.htmlTitle.replace(' | charles', '')}</p>              
                  <p class="author-name"><img class="avatar" src="${author ? author.avatar : 'https://www.hello-charles.com/hubfs/typie-the-author.svg'}" width="24" height="24" loading="lazy" /> <span>${author.fullName}</span></p>
                  <div class="article-summary">${post.postSummary}</div>
                </a>
              </div>
            </div>
          `;
        });
      } else {
        return ['<p>No posts found.</p>'];
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return ['<p>Error loading posts.</p>'];
    }
  }

  // Fetch limited success stories for the homepage
  async function fetchSuccessStoriesLimited() {
    try {
      const response = await fetch(`https://hs-success-stories-limit-it.catalin-avarvarei-ext.workers.dev/`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Use map to iterate over each post, and also use the index to determine which class to assign
        return data.results.map((post, index) => {
          // Calculate the index for the backgroundClasses array using modulo operation
          const classIndex = index % backgroundClasses.length;
          const assignedClass = backgroundClasses[classIndex];

          return `
            <div class="success-story content-item grid-item ${assignedClass}" data-tags-names="${post.values.filter_tag.name}" data-case-id="${post.values.customer_tag.id}" style="cursor:pointer;">
              <a href="${post.values.button_link}" target="_blank">
                <img src="${post.values.photo.url}" alt="${post.values.photo.altText}" />
                <p class="title">${post.values.name}</p>
                <p class="content">${post.values.content}</p>
              </a>
            </div>
          `;
        });
      } else {
        return ['<p>No success stories found.</p>'];
      }
    } catch (error) {
      console.error('Error loading success stories:', error);
      return ['<p>Error loading success stories.</p>'];
    }
  }

  // Fetch webinars for homepage
  async function fetchWebinarsLimited() {
    try {
      const response = await fetch(`https://hs-webinars-it.catalin-avarvarei-ext.workers.dev/`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Use map to iterate over each post, and also use the index to determine which class to assign
        return data.results.map((post, index) => {
          // Calculate the index for the backgroundClasses array using modulo operation
          const classIndex = index % backgroundClasses.length;
          const assignedClass = backgroundClasses[classIndex];

          return `
            <div class="webinar content-item grid-item" data-tags-names="${post.values.filter_tag.name}">
              <div class="inner-webinar">
                <a href="${post.values.webinar_link}" target="_blank">
                  <img src="${post.values.feature_image.url}" alt="${post.values.feature_image.altText}" loading="lazy" />
                  <div class="bottom-webinar-content">
                    <p class="title">${post.values.name}</p>
                    <p class="content">${post.values.content}</p>
                  </div>
                </a>
              </div>
            </div>
          `;
        });
      } else {
        return ['<p>No webinars found.</p>'];
      }
    } catch (error) {
      console.error('Error loading webinars:', error);
      return ['<p>Error loading webinars.</p>'];
    }
  }

  // Combine all elements
  async function combineAndDisplayContent() {
    showSpinner();

    // Fetch content
    const blogPostsHtmlStrings = await fetchBlogPostsLimited();
    const successStoriesHtmlStrings = await fetchSuccessStoriesLimited();
    const customAdsStrings = await fetchCustomAds();
    const webinarHtmlStrings = await fetchWebinarsLimited();

    loadMore.style.display = "none";

    // Clear existing Isotope items and HTML content
    if (window.iso) {
      window.iso.remove(window.iso.getItemElements());
      window.iso.layout();
    }
    homepageContainer.innerHTML = ''; // Clear the HTML container

    let combinedContent = [];
    let indexes = [0, 0, 0, 0]; // [blogIndex, successIndex, adsIndex, webinarIndex]

    // Calculate the total number of iterations needed
    const totalCycles = Math.ceil((blogPostsHtmlStrings.length + successStoriesHtmlStrings.length + customAdsStrings.length + webinarHtmlStrings.length) / 4);

    for (let cycle = 0; cycle < totalCycles; cycle++) {
      for (let i = 0; i < 4; i++) { // Loop through each content type
        let currentArray = [blogPostsHtmlStrings, successStoriesHtmlStrings, customAdsStrings, webinarHtmlStrings][i];
        if (indexes[i] < currentArray.length) {
          combinedContent.push(currentArray[indexes[i]++]);
        }
      }
    }

    // Append new combined content
    homepageContainer.innerHTML = combinedContent.join('');

    // Ensure all images are loaded before reinitializing Isotope
    imagesLoaded(homepageContainer, function() {
      if (window.iso) {
        window.iso.reloadItems(); // Notify Isotope of new items
      }
      window.iso = new Isotope(homepageContainer, {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        gutter: 10,
        percentPosition: true,
      });
      window.iso.arrange(); // Arrange items after loading new content
    });
  }
  // Load combined materials
  combineAndDisplayContent();

  // Load more button for pagination
  document.getElementById('load-more').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default button action
    if (nextAfterToken) {
      fetchBlogPosts(nextAfterToken);
    }
  });
});