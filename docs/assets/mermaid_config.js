document$.subscribe(function() {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      primaryColor: '#fdf6e3',
      primaryTextColor: '#3c3c3c',
      primaryBorderColor: '#5C4033',
      lineColor: '#5C4033',
      secondaryColor: '#D2B48C',
      tertiaryColor: '#fdf6e3',
      fontFamily: '"EB Garamond", serif',
      fontSize: '16px'
    }
  });
});