#include <seekgate.h>
#include <iostream>
#include <libwebsockets.h>

#include <stdio.h>
#include <unistd.h>

using namespace std;

extern int service_loop;
static struct lws_protocols protocols[] = {
    { "thermo", wsck_callback, 0, 0 },
    { NULL,     NULL,          0, 0 } /* terminator */
};

struct lws_context *context = NULL;

static int wsck_callback ( struct lws *wsi, enum lws_callback_reasons reason, void *user, void *in, size_t len ) {
    try {
        return 0;
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
        info.protocols = protocols;
        info.gid       = -1;
        info.uid       = -1;

        context = lws_create_context( &info );
        
        while (service_loop) {
            lws_service( context, /* timeout_ms = */ 1000000 );
            printf("wsock\n");
        }
        
        lws_context_destroy(context);
        
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
        throw;
    }
}

/* end of file */
