window.onload = () => {
  const dom = document.querySelector("a[href='/sfc-sfs/']");
  if (dom === null) return;
  const currentUrlParams = new URLSearchParams(window.location.search);
  const urlParams = {
    id: currentUrlParams.get('id'),
    type: currentUrlParams.get('type'),
    mode: 0,
    lang: currentUrlParams.get('lang'),
  }
  const queryStr = Object.keys(urlParams).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(urlParams[k])}`).join('&');
  dom.href = `https://vu.sfc.keio.ac.jp/sfc-sfs/portal_s/s01.cgi?${queryStr}`;
}
