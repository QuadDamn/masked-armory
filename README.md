# Masked Armory

Masked Armory was originally created in 2007 as a way for World of Warcraft players to create anonymous armory profiles to aid in buying, selling and trading their accounts.  At the time of creation, there were a couple of other competing sites, but they lacked the rich feature set and the speed of the sites was abysmal as well.

### Feature Set Explained

- The building and rendering of a profile takes <2 seconds.  The rendering of a profile via a profile URL takes <1 second.  With the building of the actual profile, there is a ton of work being done to pull from the API and then get the data into a format that is easy to work with when needing to render the profile.
- 100% responsive site with mobile navigation and mobile item tooltips!
- A profile consists of the items (mobile tooltips are supported), character statistics, mounts, pets, titles, achievements (legacy and feats are listed out).

### Technology Stack Explained

The backend of this application utilizies NodeJS/Express and MongoDB.  The code is fairly simplistic as it is just API calls, DB store/fetch, and data manipulation to help to keep the frontend from having to do a bunch of heavy lifting.

The frontend is pure React.  React Router (v4) is used for application routing.  

### Future Enchancements

- [In Progress] **SSR with NextJS** -- The reason for this is due to losing SEO with client side rendering.  There is a lot of dynamic SEO content that is not getting picked up on with client side rendering.
- [On Deck] **Image Service** -- To help rendering times for images, I want to get them to be local and so they can be easily cached.
