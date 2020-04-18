

class Thermo {
    constructor (prm) {
        try {
            if (true !== Array.isArray(prm)) {
                throw new Error("invalid parameter");
	    }
	    this.m_cmpctl = prm;
	    this.m_status = false;
	    this.m_wsock  = null;
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    status () {
        return this.m_status;
    }

    switching (prm) {
        try {
	    if ('boolean' !== typeof prm) {
                throw new Error("invalid parameter");
	    }
            
            if (true === prm) {
                this.ws_connect(); 
	    } else {
	        if (null !== this.m_wsock) {
                    this.m_wsock.close();
		    this.m_wsock = null;
		}
	    }

            for (let cidx in this.m_cmpctl) {
                if (true === prm) {
                    this.m_cmpctl[cidx].start();
		} else {
                    this.m_cmpctl[cidx].stop();
		}
	    }
	    this.m_status = prm;
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    ws_connect () {
        try {
	    /* connect websocket server */
            this.m_wsock = new WebSocket('ws:/'+ location.host +':5000');
            
            /* check connection */
	    let ws_conn = false;
            this.m_wsock.addEventListener(
	        'open',
		(e) => { ws_conn = true; }
	    );
	    setTimeout(
	        () => {
		    if (false === ws_conn) {
                        alert('connection failed: ws:/'+ location.host +':5000');
		    }
		},
		1000
            );
            
	    /* add message event */
            this.m_wsock.addEventListener('message', this.ws_message);

	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    ws_message (msg) {
        try {
	    let srv_ret = JSON.parse(msg.data);
	    act.base64("data:image/bmp;base64," + srv_ret.image);
            temp_val.text(srv_ret.temp + "");
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
