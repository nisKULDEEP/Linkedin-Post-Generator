/**
 * This script is injected into the LinkedIn profile page to scrape recent posts.
 * The return value of this script is the result of the scrapePosts function.
 */

// Selectors for LinkedIn post text. These might need updating if LinkedIn changes its UI.
const POST_SELECTOR = "div.feed-shared-update-v2";
const TEXT_WRAPPER_SELECTOR = "div.feed-shared-update-v2__description-wrapper";
const MAX_POSTS = 10;

function scrapePosts(): { history: string; count: number } {
  const postElements = document.querySelectorAll(POST_SELECTOR);
  const postTexts: string[] = [];

  postElements.forEach((post, index) => {
    if (index >= MAX_POSTS) return;
    const textElement = post.querySelector(TEXT_WRAPPER_SELECTOR);
    if (textElement) {
        // innerText is better here as it captures text from nested elements correctly.
        postTexts.push((textElement as HTMLElement).innerText.trim());
    }
  });
  
  return {
      history: postTexts.join('\n\n---\n\n'),
      count: postTexts.length
  };
}

// The result of the final expression in the script is returned to the caller.
scrapePosts();
