/**
 * @file mofron-event-invclr/index.js
 * @brief invert color event for mofron
 * @author simpart
 */
const mf = require('mofron');
/**
 * @class mofron.event.Invclr
 * @brief invert color event class for component
 */
mf.event.Invclr = class extends mf.Event {
    
    constructor (po, p2) {
        try {
            super();
            this.name('Invclr');
            this.prmMap(['handler', 'targetColor']);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (tgt) {
        try {
            let sty_env = (p1, p2, p3) => {
                try {
                    let clr = mf.func.getColor(p1[p3.targetColor()]);
                    if (null === clr) {
                        return;
                    }
                    let rgb = clr.rgb();
                    p3.execHandler((p3.value() > (rgb[0]+ rgb[1] + rgb[2])) ? true : false);
                    
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            this.component().styleTgt().styleListener(this.targetColor(), fnc, this);
            let tgt_sty = {};
            tgt_sty[this.targetColor()] = this.style(this.targetColor());
            sty_env(tgt_sty, null, this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter target color
     * it trigger event when target color inverts
     * 
     * @param prm (string) css color key, default key is 'background'
     * @param prm (undefined) call as getter
     * @return (string) css color key
     */
    targetColor (prm) {
        try {
            return this.member('targetColor', 'string', prm, 'background');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter invert limit value 
     * this value is used for invert judgment
     * 
     * @param prm (number) sum of rgb
     * @param prm (undefined) call as getter
     * @return (number) sum of rgb
     */
    value (prm) {
        try { return this.member('value', 'number', prm, 390); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.event.Invclr;
/* end of file */
