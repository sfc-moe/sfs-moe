window.onload = () => {
  // Env detection
  const frame = document.getElementsByClassName("frame")[0];
  if (frame === undefined) return 0;
  const updateBtn = document.getElementsByClassName('update')[0];
  if (updateBtn === undefined) return 0;

  // Setup options
  let refreshTrigger = window.sessionStorage.getItem('refreshTrigger') === 'true';
  let time = 9;
  
  // Setup the UI
  const text = document.createElement('h4');
  text.className = 'w3-text-teal';
  text.innerText = `自動同期 Auto Refresh (${time}s)`;
  const lbl = document.createElement('label');
  lbl.className = 'switch';

  const cbx = document.createElement('input');
  cbx.checked = refreshTrigger;
  cbx.type = 'checkbox';
  const spn = document.createElement('span');
  spn.className= 'slider round';

  lbl.appendChild(cbx);
  lbl.appendChild(spn);
  text.appendChild(lbl);

  frame.insertAdjacentElement('beforebegin', text);

  cbx.addEventListener('change', () => {
    refreshTrigger = cbx.checked;
    window.sessionStorage.setItem('refreshTrigger', refreshTrigger);
  });

  // Setup the Timer
  window.setInterval(() => {
    if (cbx.checked) {
      time -= 1;
      text.innerText = `自動同期 Auto Refresh (${time}s)`;
      text.appendChild(lbl);
    }

    if (time === 0) {
      updateBtn.click();
    }
  }, 1000);
}
