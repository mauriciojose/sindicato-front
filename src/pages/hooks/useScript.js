const loadScript = (src) => {
  const existingScript = document.getElementById('teste');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = src;
    script.type = "text/javascript";
    document.body.appendChild(script);

    script.onload = () => {
      // if (callback) callback();
    };
  }

  // if (existingScript && callback) callback();
};

export default loadScript;