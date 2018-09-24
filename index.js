/**
 * @file mofron-event-invclr/index.js
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
            this.prmMap('handler', 'colorTgt', 'value');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined === ret) {
                let style = prm.styleTgt();
                let fnc   = (p1, p2, p3) => {
                    try {
                        let clr = mf.func.getColor(p1[p3.colorTgt()]);
                        if (null === clr) {
                            return;
                        }
                        let rgb = clr.rgb();
                        if (p3.value() > (rgb[0]+ rgb[1] + rgb[2])) {
                            if (true !== p3.status()) {
                                p3.execHandler(true);
                                p3.status(true);
                            }
                        } else {
                            if (false !== p3.status()) {
                                p3.execHandler(false);
                                p3.status(false);
                            }
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                style.styleListener(this.colorTgt(), fnc, this);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents () {}
    
    colorTgt (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_clrtgt) ? 'background' : this.m_clrtgt;
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_clrtgt = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_value) ? 390 : this.m_value;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_value = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    status (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_status) ? null : this.m_status;
            }
            if ('boolean' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_status = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.event.Invclr;
/* end of file */
