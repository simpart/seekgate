#include <seekgate.h>
#include <signal.h>
#include <libwebsockets.h>
#include <iostream>

#include <unistd.h>

#define WSCK_PORT 5000

using namespace std;

pthread_t tid;
bool service_loop = true;

void sigevt (int signo) {
    try {
        service_loop = false;
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
        throw;
    }
}

int main (int argc,char *argv[]) {
    try {
        int port = WSCK_PORT;
        
        /* set ctrl+c quit */
        if (signal(SIGINT, sigevt) == SIG_ERR) {
            throw "SIGINT error";
        }
        
        /* start websocket */
        pthread_create(&tid, NULL, wsck_run, &port);
        
	while (service_loop) {
            sleep(1);
            printf("get thermo info\n");
        }
        
        pthread_join(tid, NULL);
        
        return 0;
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
    }
}
/* end of file */
