TODO
====

Critical
--------
* Get Jade working
* Get drag + drop working
* Implement server side file upload
* Hook up client side to read down file http://elegantcode.com/2011/04/06/taking-baby-steps-with-node-js-pumping-data-between-streams/

Good
----
* Write site copy
* Write about us page
* Install the things below:

Install Google Analytics code:

    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-27191932-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>

FB like button:

Before head:

    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=328427747173158";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

Actual like button:

    <div class="fb-like" data-href="http://pipeit.io" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false"></div>

Twitter button:
    <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://pipeit.io" data-text="pipeit.io: Send your files over the series of tubes! via @dickeytk @whatgoodisaroad" data-count="horizontal" data-related="dickeytk:whatgoodisaroad">Tweet</a><script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
