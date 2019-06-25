# Mini Project: User Sorting
## Main Goal
Add functionality to sort users based on their information.
### When Accomplished
- Your app has a control to sort users, both ascending and descending, by
  - [ ] First name
  - [ ] Last name
  - [ ] Email address
  - [ ] **(Optional)** Date added
  - [ ] **(Optional)** Additional fields unique to your users
## Resources
- [Array.prototype.sort() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
## Known Issues
1. When dealing with array data using a `dom-repeat` or `iron-list` element, there is a [known issue]() in which it fails to update to reflect changes in the array. Be aware of this when testing your work.
## Notes
- Adding this functionality will impact user experience. Think critically about how a user might interact with this feature and consider how the context of sorting affects what data is being prioritized.
- If you are implementing a [live database](./add-a-database) then you will have other sorting options available to you. You are free to write your own sorting algorithm or use the sorting functionality provided by the database, but the feature should behave the same either way.