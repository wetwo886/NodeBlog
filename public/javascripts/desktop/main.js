window.BLOG = {
  BASEPATH: '/javascript/desktop/',
  LIBPATH:'javascript/lib/'
};

require.config({
  baseUrl: '/web/',
  path: {
    'libJquery': window.BLOG.LIBPATH + 'jquery-2.1.0.min',
  }
});