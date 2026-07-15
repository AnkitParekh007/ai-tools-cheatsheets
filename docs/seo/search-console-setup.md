# Search Console and Webmaster Setup

Use this page to connect the GitHub Pages site to Google Search Console and Bing Webmaster Tools without committing verification secrets into the repository.

## Recommended Property Type

- Google Search Console:
  Use a URL-prefix property for `https://ankitparekh007.github.io/ai-tools-cheatsheets/`
- Bing Webmaster Tools:
  Use the same GitHub Pages URL as the site property

## Verification Options

### Recommended for GitHub Pages

- HTML file upload
- HTML meta tag

### Alternative

- DNS verification if you later add a custom domain

Do not commit a real verification token unless it is intentionally meant to be public and the maintainer approves it.

## Sitemap Submission

Submit:

- `https://ankitparekh007.github.io/ai-tools-cheatsheets/sitemap.xml`

## After Verification

1. Use URL inspection on the homepage and key pages.
2. Confirm index coverage for:
   - homepage
   - comparison matrix
   - AGENTS.md
   - MCP overview
   - team rollout guide
3. Monitor performance reports for:
   - branded vs non-branded queries
   - high-impression pages with weak CTR

## Ongoing Monitoring

- indexing issues
- manual actions
- security issues
- sitemap fetch errors
- mobile usability
- Core Web Vitals

## Safe Repository Practice

- keep tokens out of source control
- if a meta tag is required, add a placeholder workflow note first and only commit the real tag when approved
