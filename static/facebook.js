window.fbAsyncInit = function () {
  FB.init({
    appId: "650046632701251",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v2.10",
  });
};

(function (d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  const js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
