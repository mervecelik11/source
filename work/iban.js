
function verifyIBAN(s) {
    const ASCII_0 = 48, ASCII_A = 65;
    if (typeof s != 'string') s = String(s)
    const E = /[A-Z]{2}[0-9]{2}[A-Z0-9]+/
    if (!s.match(E)) return false;
    var acc = 0;
    function add(n) {
        if (n == 32) return
        // if (acc > 1000000) acc %= 97;
        acc = n < ASCII_A ? 10 * acc + n - ASCII_0 
            : 100 * acc + n - ASCII_A + 10;
        acc %= 97;
    }
    s = s.substring(4)+s.substring(0,4)
    for (let i=0; i<s.length; ++i) 
        add(s.charCodeAt(i));
    return acc == 1;
}
function report() {
    let v = kimlik.value.replaceAll(/\s/g, '')
    let t = ''
    if (v.length === 11) {
        t = verifyTC(v)
        if (t === true) t = 'TC ✓'
    } else {
        t = verifyIBAN(v)? 'IBAN ✓' : 'hatalı'
    }
    out.innerText += '\n'+v+' '+t
    console.log(v, t)
}
function mod97(string) {
    var checksum = string.slice(0, 2), fragment;
    for (var offset = 2; offset < string.length; offset += 1) {
        fragment = String(checksum) + string.substring(offset, offset + 1);
        checksum = parseInt(fragment, 10) + 97;
    }
    return checksum;
}