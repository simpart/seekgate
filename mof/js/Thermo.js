

class Thermo {
    constructor (thd) {
        try {
	    if ("number" !== typeof thd) {
                throw new Error("invalid parameter");
	    }
	    this.m_threshold = thd;
	    this.m_status    = "none";
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    
    start () {
        try {
	    /* connect websocket server */
            this.m_wsock = new WebSocket('ws:/'+ location.host +':5000', 'thermo');
            
            /* check connection */
	    let thermo  = this;
	    let ws_conn = false;
            this.m_wsock.addEventListener(
	        'open',
		(e) => {
		    ws_conn = true;
		    thermo.wsk_callback()(true);
		}
	    );
            this.m_wsock.addEventListener(
                'close',
                (e) => { 
                    thermo.wsk_callback()(false);
                }
            );
	    setTimeout(
	        () => {
		    if (false === ws_conn) {
		        alert("failed connect to thermo camera");
		    }
		},
		5000
            );
            
	    /* add message event */
            this.m_wsock.addEventListener(
	        'message',
		(msg) => {
		    if ("" === msg.data) {
                        return;
                    }
		    let msg_obj = JSON.parse(msg.data);
                    thermo.inf_event()(msg_obj);
                    let cur_sts = null;
                    if ((this.m_threshold - 1) > msg_obj.temperature) {
                        cur_sts = "none";
		    } else if (this.m_threshold > msg_obj.temperature) {
                        cur_sts = "pass";
		    } else {
                        cur_sts = "alert";
		    }
                    /* status event */
		    if (this.m_status !== cur_sts) {
		        this.m_status = cur_sts;
                        thermo.sts_event()(cur_sts);
		    }
		}
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    wsk_callback (fnc) {
        try {
            if (undefined === fnc) {
                /* getter */
		if (undefined === this.m_wskcb) {
                    throw new Error("could not find callback");
                }
		return this.m_wskcb;
	    }
	    if ("function" !== typeof fnc) {
                throw new Error("invalid parameter");
	    }
	    this.m_wskcb = fnc;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    inf_event (fnc) {
        try {
	    if (undefined === fnc) {
                /* getter */
		if (undefined === this.m_infcb) {
                    throw new Error("could not find event");
                }
                return this.m_infcb;
            }
            if ("function" !== typeof fnc) {
                throw new Error("invalid parameter");
            }
            this.m_infcb = fnc;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    sts_event (fnc) {
        try {
            if (undefined === fnc) {
                /* getter */
		if (undefined === this.m_stscb) {
                    throw new Error("could not find event");
		}
		return this.m_stscb;
            }
            if ("function" !== typeof fnc) {
                throw new Error("invalid parameter");
            }
            this.m_stscb = fnc;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
