let CSS = `
html { background-color: white !important;} 
.interviews{
    background-image: none !important;
}
/*  change all text to black */ 
.search-page, .search-page *,.loading-quote__modal, .loading-quote__modal *, .podcast-index__list * , .podcast-index .podcast-index__header, section *, header *, footer *, #comments *, article *, .learn__title, .learn__articles *, .meetups-index *, .group .group__header, .group .group__subheader, .group__header *, .group__subheader *, .group-index *, .interview .interview-article, .interview-body *, .interview-comments *, .interview-article *, .interviews__body *, .start__main *, .product-index *, .products-index__content *, .products-index__header *, .site-footer *, .community__content *, .post-page__content *, .user__content * { 
color: #4a4a4a !important; background-color: white !important; fill: #1F364D;
background-image: none !important;
} 
.content-piece .title-bar{
    background-color:black !important;
}
.contribute .contribute__hero{
    background-color: white !important;
}
.podcast-index__episode-number{
    background-color: transparent !important;
}
.products .products-index .products-index__header{
    background-image: none !important;
}
/*  all links should be different color */
.start__main * :hover, .product-index * :hover, .products-index__content * :hover, .products-index__header * :hover, .site-footer * :hover, .community__content * :hover, .post-page__content * :hover, .user__content * :hover { 
    background-color: white !important; fill: #1F364D;  
    background-image: none !important;
} 
/*  all links should be different color */
.soc-fd .feed-item__title-link:hover, .start__main a :hover, .product-index a :hover, .products-index__content a :hover, .products-index__header a :hover, .site-footer a :hover, .community__content a :hover, .post-page__content a :hover, .user__content a :hover { 
    color: #A3C2FF !important;    
} 
/* change the box borders to work better with light */
.community .community__groups-section, .community .community__milestones-section, .community .community__posts-section, .community .forum-period-paginator, .soc-fd .feed-item__user-link--for-avatar .user-link__avatar, .community .community-sidebar .groups__group-icon, .community .community-sidebar .upcoming-meetups__date-icon, .community .community-sidebar .community-sidebar__title, .community .community-sidebar .podcast__thumbnail-wrapper,.community .community__groups-section .groups-section__group-icon, .community .community__milestones-section .groups-section__group-icon, .community .community__posts-section .groups-section__group-icon, .milestone-entry .milestone-entry__avatar{
    border: 3px solid #e4e6e8 !important;
}
.site-footer__logo-type {
    background-color: black !important;
}
.community .community__header::after, .community .groups-section__header::after, .community .posts-section__header::after{
    background-color:white !important;
}
/* remove background from NEW POST button */
 .community .groups-section__create-button::before, .community .posts-section__create-button::before, .post-page .post-page__follow-button::before{
     background-image:unset !important;
 }
/* Lighter comments indicator */
.embedded-comments .comment-tree:hover::before{
    border-left-color: #e5e5e5 !important;
}
.start .participant__link::after {
    background-image: linear-gradient(to bottom,rgba(22,45,67,0), white) !important;
}
`;

function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  style.id='ih-theme-light-extension';
  document.head.prepend(style);
}
let CODE = 'let CSS=`' + CSS.toString() + '`;' + addStyle.toString() + `;addStyle(CSS);`;

chrome.webNavigation.onCommitted.addListener(function(o) {
  chrome.pageAction.show(o.tabId);
  chrome.tabs.executeScript(o.tabId, {runAt: "document_start", code: CODE});
}, {
  url: [{hostContains: 'indiehackers.com'}] 
});

chrome.pageAction.onClicked.addListener(function (tab){
   chrome.pageAction.getTitle({
      "tabId": tab.id }, function(title){
        if (title.indexOf('Light') !== -1){
         chrome.pageAction.setTitle({
            "tabId": tab.id, 'title': 'IndieHackers Dark Theme Enabled (click to toggle)'
          });

         chrome.pageAction.setIcon({
            "tabId": tab.id, 'path': {
              "16": "icons/ih-dark-16x16.png",
              "24": "icons/ih-dark-24x24.png",
              "32": "icons/ih-dark-32x32.png",        
              "48": "icons/ih-dark-48x48.png",
              "64": "icons/ih-dark-64x64.png",
              "128": "icons/ih-dark-128x128.png"
            }
            });

        chrome.tabs.executeScript(null, {code: `if (document.getElementById('ih-theme-light-extension')){ 
          document.getElementById('ih-theme-light-extension').parentNode.removeChild(document.getElementById('ih-theme-light-extension'));
        }`});        
      }
      else{
         chrome.pageAction.setTitle({
            "tabId": tab.id, 'title': 'IndieHackers Light Theme Enabled (click to toggle)'
          });

         chrome.pageAction.setIcon({
            "tabId": tab.id, 'path': {
              "16": "icons/ih-light-16x16.png",
              "24": "icons/ih-light-24x24.png",
              "32": "icons/ih-light-32x32.png",        
              "48": "icons/ih-light-48x48.png",
              "64": "icons/ih-light-64x64.png",
              "128": "icons/ih-light-128x128.png"
            }
            });

        chrome.tabs.executeScript(null, {code: ` addStyle(CSS);`});   
      }
      });
});