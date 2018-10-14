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
    
    /**
     * set invert listener
     *
     * @note private method
     */
    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined === ret) {
                let style = prm.styleTgt();
                let fnc   = (p1, p2, p3) => {
                    try {
                        let clr = mf.func.getColor(p1[p3.targetColor()]);
                        if (null === clr) {
                            return;
                        }
                        let rgb = clr.rgb();
                        if (p3.value() > (rgb[0]+ rgb[1] + rgb[2])) {
                            if (true !== p3.invStatus()) {
                                p3.execHandler(true);
                                p3.invStatus(true);
                            }
                        } else {
                            if (false !== p3.invStatus()) {
                                p3.execHandler(false);
                                p3.invStatus(false);
                            }
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                style.styleListener(this.targetColor(), fnc, this);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents () {}
    
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
    
    /**
     * setter/getter invert status
     * 
     * @param prm (true) inverted color
     * @param prm (false) not inverted color
     * @param prm (undefined) call as getter
     * @return (boolean) invert status
     */
    invStatus (prm) {
        try { return this.member('invStatus', 'boolean', prm, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * kick effect
     * @note private method
     */
    execEffect (eff, prm) {
        try { eff.execute(prm[0]); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.event.Invclr;
/* end of file */
