export function hsvToHsl(hue, saturation, value) {
    let l = (2 - saturation / 100) * value / 2;
    let s = saturation * value / (l < 50 ? l * 2 : 200 - l * 2);

    if (isNaN(s)) s = 0;

    return hue + ", " + Math.round(s) + "%, " + Math.round(l) + "%";
};

export function hslToRgb(color) {
    let colors = color.replace(/\s/g, '').split(",");
    let r, g, b;
    var h = parseInt(colors[0], 10)/360;
    var s = parseInt(colors[1], 10)/100;
    var l = parseInt(colors[2], 10)/100;
    
    if (s == 0) {
        r = g = b = l;
    } else {
        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return (Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255));
};

export function rgbToHex(color) {
    var colors = color.replace(/\s/g, '').split(",");
    
    return "#" +
    parseInt(colors[0], 10).toString(16) +
    parseInt(colors[1], 10).toString(16) +
    parseInt(colors[2], 10).toString(16);
};