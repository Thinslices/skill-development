# SPA, SSR in web apps
| SPA, SSR in web apps | |
| --- | --- | 
| Developer | Răzvan Onofrei |

| Timeline | |
| --- | --- |
| Theory | 03.02.2023 |
| Practice | TBD |

## Summary
1. What is a single-page application (SPA)?
2. How does using the SPA approach affect a web app?
3. Should one always use the SPA approach?
4. What are the downsides of using SPAs?
5. Are there any native browser features that may need to be re-implemented in SPAs?
6. Are there any ways to improve the areas in which SPAs are lacking?
7. What is Server-side Rendering (SSR)?
8. How does SSR work?
9. Are there any downsides of using SSR in a SPA?
10. Is it possible to do SSR only for sections of a web page?
11. When should you use a SPA?

### 1. What is a single-page application (SPA)?
A single-page application (SPA) is a dynamic web application that updates content without full page reloads during navigation.

### 2. How does using the SPA approach affect a web app?
Adopting the single-page application (SPA) approach can provide benefits to a web application in the form of improved performance and a superior user experience. The reduction in network data transmission, achieved through the delivery of only essential updates to the client, contributes to a seamless and efficient navigation experience.

### 3. Should one always use the SPA approach?
While using single-page applications (SPAs) can give you a faster and better experience, it's also important to think about some of the challenges that might come up, like compatibility issues or longer loading times. The best choice for your web application will depend on what you need, so it's good to take a close look at all the options.

### 4. What are the downsides of using SPAs?

**Browser compatibility**

Single page applications require JavaScript and modern web APIs support. Also, there are many browser features and APIs that need to be replicated in a SPA. 

**Initial load time**

SPAs may have longer initial load times compared to traditional web applications, as the entire JavaScript application and its dependencies need to be loaded and parsed before the application can become interactive.

**Search Engine Optimization**

SPAs can have challenges with SEO, as the initial content of the page may not be fully rendered on the server and may require additional work to be optimized for search engines.

### 5. Are there any native browser features that may need to be re-implemented in SPAs?

There are quite a few features that you are giving away when implementing a single-page application.
- **Content streaming** - browsers can render content as it is downloaded and parsed.
- **History API** - managing the navigation history in a SPA increases the complexity of the code
- **Form state** - browsers already have a mechanism of saving the content in forms while navigating in a web app
- **Scroll position** - is something that also needs to be taken into account when navigating back and forward through pages
- **Memory management** - SPAs can be a source of memory leaks, and a classic web app can avoid becoming slow or even non-interactive by doing a full page reload

Most of the problems mentioned above are solved in modern frameworks and routers but at the cost of code, which in turn increases the initial loading time of your application.

### 6. Are there any ways to improve the areas in which SPAs are lacking?
Server-side Rendering (SSR) can improve the perceived loading time and Search Engine Optimisation of your web appligation.

### 7. What is Server-side Rendering (SSR)?
Server-side rendering (SSR) is a technique where the initial HTML content of a single-page application (SPA) is generated on the server and then sent to the browser. 

### 8. How does SSR work?
The server generates the initial HTML for the page based on the requested URL, which is then delivered to the browser and rendered, creating a static version of the page.

The client-side JavaScript code is then evaluatedand and executed adding event listeners, re-attaching dynamic data, and making any other necessary updates to the page through a process called hydration.

### 9. Are there any downsides of using SSR in a SPA?
Hydration involves the client downloading the same markup twice, once in the initial HTML response from the server, and again as part of the JavaScript code executed on the client to transform the static HTML content.

To minimize the impact of the double-download, steps can be taken to optimize the size and performance of the SPA and to weigh the pros and cons of hydration.

### 10. Is it possible to do SSR only for sections of a web page?
Yes, specific components or sections of a single-page application (SPA) can be server-side rendered (SSR) and loaded asynchronously. This approach is sometimes known as "partial" or "incremental" SSR.

By using partial SSR, important parts of the SPA can be pre-rendered on the server and delivered to the browser, while other parts are loaded dynamically on the client. This approach balances the benefits of SSR with improved SEO, while also reducing server load and complexity.

### 11. When should you use a SPA?
When choosing between a single-page application (SPA) and a multiple-page application (MPA), it is important to consider various factors that align with the goals and requirements of the application. While SPAs are well-suited for highly interactive and dynamic applications, MPAs are better for content-focused applications where SEO is a priority. This is because in an MPA, resources can be accessed via unique URLs, which enables direct linking and crawling by search engines.

The decision between SPA and MPA should take into account the level of user engagement, the type of content being served, and the importance of SEO. Additionally, it's worth noting that SPAs are often kept open in a single tab for prolonged periods of time, like a desktop app, while MPAs may have content accessed directly through unique URLs, with navigation done through opening new tabs.