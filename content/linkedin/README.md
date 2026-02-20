# LinkedIn Posts Content

This folder contains LinkedIn post embeds for the KnowMyCRM website.

## How to Add a New LinkedIn Post

1. Go to LinkedIn and find the post you want to embed
2. Click the "..." menu on the post → "Embed this post"
3. Copy the `src` URL from the iframe code (looks like: `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:XXXXX`)
4. Add a new object to `posts.json` with:
   - `id`: A unique identifier (e.g., `post-XXXXX` using the post ID)
   - `type`: Always `"iframe"` for embedded posts
   - `embedSrc`: The iframe src URL you copied
   - `title`: A descriptive title for accessibility
   - `date`: The post date in `YYYY-MM-DD` format
5. Redeploy the site

## Schema

```json
{
  "id": "post-7429752378242813952",
  "type": "iframe",
  "embedSrc": "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7429752378242813952?collapsed=1",
  "title": "KnowMyCRM LinkedIn Post",
  "date": "2026-02-20"
}
```

## Notes

- Posts are automatically sorted by date (newest first)
- If `embedSrc` is missing or invalid, a fallback card will be shown
- The `date` field is required for sorting; if missing, the post will appear at the end
