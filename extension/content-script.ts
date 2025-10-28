/**
 * This script is injected into the LinkedIn profile page to scrape recent posts.
 */
(() => {
  // Selectors for LinkedIn post text. These might need updating if LinkedIn changes its UI.
  const POST_SELECTOR = "div.feed-shared-update-v2";
  const TEXT_SELECTOR = "div.feed-shared-update-v2__description-wrapper span[dir='ltr']";
  const MAX_POSTS = 10;

  const scrapePosts = (): { history: string; count: number } => {
    const postElements = document.querySelectorAll(POST_SELECTOR);
    const postTexts: string[] = [];

    postElements.forEach((post, index) => {
      if (index >= MAX_POSTS) return;
      const textElement = post.querySelector(TEXT_SELECTOR);
      if (textElement) {
        // The text content might be split into multiple spans, so we need to get the whole container's text.
        const parentTextContainer = textElement.closest('div.feed-shared-update-v2__description-wrapper');
        if(parentTextContainer) {
            postTexts.push((parentTextContainer as HTMLElement).innerText.trim());
        }
      }
    });
    
    return {
        history: postTexts.join('\n\n---\n\n'),
        count: postTexts.length
    };
  };

  // The script's execution result is the return value of the last statement.
  scrapePosts();
})();