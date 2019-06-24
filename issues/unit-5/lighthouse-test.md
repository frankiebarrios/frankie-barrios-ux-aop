# Mini Project: Performance Audits/Google Lighthouse Optimization
## Main Goal
Optimize your app as a progressive web app (PWA) by following suggestions provided by Google Lighthouse.
### When Accomplished
- Your app scores 80 or higher on the following audits:
  - [ ] Performance
  - [ ] Progressive Web App
  - [ ] Accessibility
  - [ ] Best Practices
## Resources
- [Lighthouse - Google Developers](https://developers.google.com/web/tools/lighthouse/)
  - The audit references are available in the left sidebar of this page in case you need to look up specific criteria.
- [Web App Manifest - MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Workbox - Plug 'n Play Service Worker](https://developers.google.com/web/tools/workbox/)
## Notes
- Lighthouse audits are useful but are only available in Chrome DevTools.
- Running the local version of your app via HTTPS is not required.
- After your app passes all the audits, you may want to exclude any service worker to production only, as precaching is counterintuitive to rapid development.