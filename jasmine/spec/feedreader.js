/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is definied', function() {
            for (let feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url.constructor).toBe(String);
              expect(feed.url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is definied', function() {
            for (let feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name.constructor).toBe(String);
              expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* This suite is all about the slidebare menu.
     * It tests if the menu appears and disapears in
     * the wright moment
     */
    describe('The menu', function() {
        /* This test ensures that the menu element is
         * hidden by default.
         */
        it('menu is hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('after first click menu is not hidden, afrer second is hidden', function (){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This suite test if entry elements in .feed cointainer
     * are loading corectly.
     */
    describe('Initial Entries', function() {
      beforeEach(function(done){
        loadFeed(0,done);
      });


        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('after calling the loadFeed there is an entry in feed container', function(){
            const cont = $('.feed .entry');
            expect(cont.children.length > 0).toBe(true);
          });
   });

    /* This suite test if the contet changes after loading feeds */
  describe('New Feed Selection', function() {
        let firstFeed;
        let secondFeed;
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function(done){
           loadFeed(0,function(){
             // feed 0 done loading
             firstFeed = $('.entry-link').html();
             loadFeed(1,function(){
               // feed 1 done loading
               secondFeed = $('.entry-link').html();
               // all variables initialized, can begin tests
               done();
             });
           });
          });

        it('after a new feed is loaded content actually changes', function(){
          expect(firstFeed).not.toBe(secondFeed);
        });
      });
});
