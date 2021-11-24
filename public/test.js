(function(w,d,s,r,k,h,m){
    if(w.performance && w.performance.timing && w.performance.navigation) {
      w[r] = w[r] || function(){(w[r].q = w[r].q || []).push(arguments)};
      h=d.createElement('script');h.async=true;h.setAttribute('src',s+k);
      d.getElementsByTagName('head')[0].appendChild(h);
      (m = window.onerror),(window.onerror = function (b, c, d, f, g) {
      m && m(b, c, d, f, g),g || (g = new Error(b)),(w[r].q = w[r].q || []).push(["captureException",g]);})
    }
  })