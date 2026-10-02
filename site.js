// Edit ONLY this block to change your business details everywhere on the site.
var SITE = {
  name: 'Your Company Name',
  phone: '+256 787 543 387',
  whatsapp: '256787543387',      // digits only, with country code, no + sign
  email: 'lazarustaiso7@gmail.com',
  address: 'Your address, Uganda',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  mapEmbed: ''                   // optional: Google Maps "Embed a map" link (https://...)
};

// ---- Do not edit below this line ----
(function () {
  var D = { name: 'Your Company Name', phone: '+256 787 543 387', phoneTel: '+256787543387', wa: '256787543387',
            email: 'lazarustaiso7@gmail.com', address: 'Your address, Uganda', hours: 'Mon - Sat: 8:00 AM - 6:00 PM' };
  var pairs = [
    [D.phone, SITE.phone], [D.phoneTel, SITE.phone.replace(/[^\d+]/g, '')], [D.wa, SITE.whatsapp.replace(/\D/g, '')],
    [D.email, SITE.email], [D.address, SITE.address], [D.hours, SITE.hours], [D.name, SITE.name]
  ];
  function swap(s) { pairs.forEach(function (p) { s = s.split(p[0]).join(p[1]); }); return s; }

  function apply() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, nodes = [];
    while ((n = w.nextNode())) { if (!/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) nodes.push(n); }
    nodes.forEach(function (t) { var v = swap(t.nodeValue); if (v !== t.nodeValue) t.nodeValue = v; });
    document.querySelectorAll('a[href]').forEach(function (a) { a.setAttribute('href', swap(a.getAttribute('href'))); });
    document.title = swap(document.title);
    if (SITE.mapEmbed) document.querySelectorAll('iframe[title="Map"]').forEach(function (f) { f.src = SITE.mapEmbed; });
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function makeRef(prefix) {
    var d = new Date();
    return prefix + '-' + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  function labelFor(el) {
    var box = el.closest('div'); var l = box && box.querySelector('label');
    return l ? l.textContent.replace('*', '').trim() : el.name;
  }

  function prefill() {
    var q = new URLSearchParams(location.search);
    ['destination', 'vehicle'].forEach(function (k) {
      var el = document.querySelector('form [name="' + k + '"]');
      if (el && q.get(k)) el.value = q.get(k);
    });
  }

  function setupForms() {
    document.querySelectorAll('form[data-kind]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var via = (e.submitter && e.submitter.getAttribute('data-via')) || 'wa';
        var kind = f.getAttribute('data-kind');
        var prefix = { safari: 'SAF', vehicle: 'VEH', contact: 'MSG' }[kind] || 'REQ';
        var title = { safari: 'Safari inquiry', vehicle: 'Vehicle hire inquiry', contact: 'Website message' }[kind];
        var ref = makeRef(prefix);
        var lines = [title + ' ' + ref, ''];
        f.querySelectorAll('input[name], select[name], textarea[name]').forEach(function (el) {
          if (el.value.trim() !== '') lines.push(labelFor(el) + ': ' + el.value.trim());
        });
        var text = lines.join('\n');
        var url = via === 'email'
          ? 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(title + ' ' + ref) + '&body=' + encodeURIComponent(text)
          : 'https://wa.me/' + SITE.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(text);
        var note = f.querySelector('.sent');
        if (note) { note.hidden = false; note.innerHTML = '<strong>Your reference: ' + ref + '</strong><br>Your message is ready. If it did not open, tap the button again and press Send in WhatsApp or your email app.'; }
        window.location.href = url;
      });
    });
  }

  document.addEventListener('click', function (e) { if (e.target.closest('.nav a')) document.body.classList.remove('nav-open'); });
  document.addEventListener('DOMContentLoaded', function () { apply(); prefill(); setupForms(); });
})();
