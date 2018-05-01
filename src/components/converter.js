export default class Converter {
    hsvToHsl(hue, saturation, value){
        const hsv = {
            h: hue,
            s: saturation,
            v: value
        };
        // determine the lightness in the range [0,100]
        const l = (2 - hsv.s / 100) * hsv.v / 2;
      
        // store the HSL components
        const hsl =
          {
            h : hsv.h,
            s : hsv.s * hsv.v / (l < 50 ? l * 2 : 200 - l * 2),
            l : l
          };
      
        // correct a division-by-zero error
        if (isNaN(hsl.s)) hsl.s = 0;
        return hsl;
    }

    rgbToHsl(color) {
        let colors = color.replace(/\s/g, '').split(",");
        var r = parseInt(colors[0], 10);
        var g = parseInt(colors[1], 10);
        var b = parseInt(colors[2], 10);
        
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        
        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            
            h /= 6;
            h *= 360;
            h = Math.round(h)
            s = Math.round(s * 100);
            l = Math.round(l * 100);
        }  
        
        return (h + ", " + s + ", " + l);
    }
    
    hslToRgb(color){
        let colors = color.replace(/\s/g, '').split(",");
        let r, g, b;
        var h = parseInt(colors[0], 10)/360;
        var s = parseInt(colors[1], 10)/100;
        var l = parseInt(colors[2], 10)/100;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t){
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
    }
    
    hexToRgb(color) {
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5), 16);
        
        return(r+ ", " + g + ", " + b);
    }
    
    rgbToHex(color) {
        var colors = color.replace(/\s/g, '').split(",");
        
        return "#" +
        parseInt(colors[0], 10).toString(16) +
        parseInt(colors[1], 10).toString(16) +
        parseInt(colors[2], 10).toString(16);
    }
}