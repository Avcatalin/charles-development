// Fetch last article
async function fetchAndDisplayArticle() {
  const apiUrl = 'https://resource-hub-spotlight-article.catalin-avarvarei-ext.workers.dev/'; // Replace with your Cloudflare Worker URL
  try {
    // Fetch the article data from the Cloudflare Worker
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Assuming the data is returned in JSON format

    // Access the article assuming the structure is data.results[0].article
    const article = data.results[0];

    const articleContainer = document.getElementById('blog-spotlight-container');
    const classSelectSpotlight = articleContainer.getAttribute('data-class-select-spotlight');

    // Now we can use article.title and article.content
    const articleHtml = `
      <div class="spotlight-block ${classSelectSpotlight}" data-post-id="${article.id}">
        <div class="spotlight-content">
          <p class="title">${article.name}</p>
          ${article.postSummary}
        </div>
        <div class="featured-image">
          <img src="${article.featuredImage}" loading="eager" />
        </div>
      </div>
    `;
    articleContainer.innerHTML = articleHtml;

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    document.getElementById('article-container').innerHTML = '<p>Failed to load the article. Please try again later.</p>';
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayArticle);

const spotlightContainer = document.getElementById('blog-spotlight-container');
// Attach a click event listener to the blog posts container for delegation
spotlightContainer.addEventListener('click', function(event) {
  let targetElement = event.target;
  // Traverse up the DOM to find the closest article div
  while (targetElement != null && !targetElement.classList.contains('spotlight-block')) {
    targetElement = targetElement.parentElement;
  }
  // If a post element was clicked, call fetchPostDetails with its data-post-id
  if (targetElement != null && targetElement.classList.contains('spotlight-block')) {
    const spotlightId = targetElement.getAttribute('data-post-id');
    fetchPostDetails(spotlightId);
  }
});
