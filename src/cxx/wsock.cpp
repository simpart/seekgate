#include <libwebsockets.h>
#include <seekgate.h>
#include <iostream>
#include <vector>
#include <stdio.h>
#include <unistd.h>
using namespace std;

int client_count = 0;
struct lws *lws_list[WSCK_MAXCLIENT] = { NULL };

extern int service_loop;
static lws_protocols wsck_prot[] = {
    { "thermo", wsck_callback, 0, 0 },
    { NULL,     NULL,          0, 0 } /* terminator */
};

struct lws_context *wsck_contxt = NULL;

static int wsck_callback ( struct lws *wsi, enum lws_callback_reasons reason, void *user, void *in, size_t len ) {
    try {

        if (LWS_CALLBACK_ESTABLISHED == reason) {
            for (int add_idx=0; add_idx < 5 ;add_idx) {
                if (NULL == lws_list[add_idx]) {
                    lws_list[add_idx] = wsi;
                    break;
                }
            }
            client_count++;
            printf("established: client count is %d\n", client_count);
        } else if ((LWS_CALLBACK_WS_PEER_INITIATED_CLOSE == reason) || (LWS_CALLBACK_WSI_DESTROY == reason)) {

            for (int del_idx=0; del_idx < 5 ;del_idx++) {
                if (lws_list[del_idx] == wsi) {
                    lws_list[del_idx] = NULL;
                    client_count--;
                    printf("disconnected: client count is %d\n", client_count);
                    break;
                }
            }
        }
        return 0;
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
        throw;
    }
}

void wsck_sendall (unsigned char *buf, size_t len) {
    try {
        for (int i=0; i < 5 ;i++) {
            if (NULL != lws_list[i]) {
                lws_write(lws_list[i], buf, len, LWS_WRITE_TEXT);
            }
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