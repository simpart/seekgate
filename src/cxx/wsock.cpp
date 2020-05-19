#include <libwebsockets.h>
#include <seekgate.h>
#include <iostream>
#include <vector>
#include <stdio.h>
#include <unistd.h>
using namespace std;

int client_count = 0;
struct per_session_data__minimal *head;

struct msg {
    void *payload; /* is malloc'd */
    size_t len;
};

struct per_session_data__minimal {
    struct per_session_data__minimal *pss_list;
    struct lws *wsi;
    int last; /* the last message number we sent */
};

struct per_vhost_data__minimal {
    struct lws_context *context;
    struct lws_vhost *vhost;
    const struct lws_protocols *protocol;
    
    struct per_session_data__minimal *pss_list; /* linked-list of live pss*/

    struct msg amsg; /* the one pending message... */
    int current; /* the current message number we are caching */
};

extern int service_loop;
static lws_protocols wsck_prot[] = {
    { "thermo", wsck_callback, sizeof(struct per_session_data__minimal), 128, 0, NULL, 0 },
    { NULL,     NULL,          0, 0 } /* terminator */
};

struct lws_context *wsck_contxt = NULL;

static int wsck_callback ( struct lws *wsi, enum lws_callback_reasons reason, void *user, void *in, size_t len ) {
    try {
        struct per_session_data__minimal *pss = (struct per_session_data__minimal *)user;
	struct per_vhost_data__minimal   *vhd = (struct per_vhost_data__minimal *)
			lws_protocol_vh_priv_get(lws_get_vhost(wsi), lws_get_protocol(wsi));
        
        if (LWS_CALLBACK_PROTOCOL_INIT == reason) {
            vhd = (struct per_vhost_data__minimal *) lws_protocol_vh_priv_zalloc(
                      lws_get_vhost(wsi),
                      lws_get_protocol(wsi),
                      sizeof(struct per_vhost_data__minimal)
                  );
            vhd->context = lws_get_context(wsi);
            vhd->protocol = lws_get_protocol(wsi);
            vhd->vhost = lws_get_vhost(wsi);
        } else if (LWS_CALLBACK_ESTABLISHED == reason) {
            pss->wsi = wsi;
            lws_ll_fwd_insert(pss, pss_list, vhd->pss_list);
            if (0 == client_count) {
                head = pss;
            }
            client_count++;
            // printf("established\n");
        } else if (LWS_CALLBACK_PROTOCOL_DESTROY == reason) {
            client_count--;
            // printf("disconnected\n");
        } else if (LWS_CALLBACK_WS_PEER_INITIATED_CLOSE == reason) {
            lws_ll_fwd_remove(struct per_session_data__minimal, pss_list, pss, vhd->pss_list);
            client_count--;
            // printf("close\n");
        } else {
            // printf("websock: %d\n", reason);
        }
        return 0;
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
        throw;
    }
}

void wsck_sendall (unsigned char *buf, size_t len) {
    try {
        struct per_session_data__minimal *cur = head;
        
        for (int i=client_count; i > 0 ;i--) {
//            lws_write(cur->wsi, buf, len, LWS_WRITE_TEXT);
            cur = cur->pss_list;
        }
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
        throw;
    }
}


void * wsck_run (void *prm) {
    try {
        int *port = (int *) prm;
        struct lws_context_creation_info info;
        memset( &info, 0, sizeof(info) );

        info.port      = *port;
        info.protocols = wsck_prot;
        info.gid       = -1;
        info.uid       = -1;

        wsck_contxt = lws_create_context( &info );
        
        while (service_loop) {
            lws_service( wsck_contxt, /* timeout_ms = */ 1000000 );
            //printf("wsock\n");
        }
        
        lws_context_destroy(wsck_contxt);
        
        return NULL;
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
        throw;
    }
}

int wsck_count (void) {
    return client_count;
}
/* end of file */
