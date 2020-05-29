#include <seekgate.h>
#include <seekutil.h>
#include <signal.h>
#include <libwebsockets.h>
#include <iostream>

#include <unistd.h>

#define IMGSIZE_BASE64 129864 + 1
#define MSG_BUFSIZE IMGSIZE_BASE64 + 128


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
        unsigned char * msg = NULL;
        SeekUtil seek;
        SeekInfo info;
        
        /* set ctrl+c quit */
        if (signal(SIGINT, sigevt) == SIG_ERR) {
            throw "SIGINT error";
        }
        
        msg = (unsigned char *) malloc(MSG_BUFSIZE + LWS_PRE);
        memset(msg, 0x00, MSG_BUFSIZE + LWS_PRE);
        msg += LWS_PRE;
        
        char *img_buf = (char *) malloc(IMGSIZE_BASE64);
        memset(img_buf, 0x00, sizeof(IMGSIZE_BASE64));
        
        /* start websocket */
        pthread_create(&tid, NULL, wsck_run, &port);
       
        int dbg_count = 0; 
	while (service_loop) {
            if (0 >= wsck_count()) {
                sleep(5);
                continue;
            }
            
            memset(msg, 0x00, MSG_BUFSIZE - LWS_PRE);
            /* get thermo information */
            seek.getinfo(&info);
            /* convert bmp to base64 */
            base64(img_buf, IMGSIZE_BASE64, (const unsigned char *) info.image, sizeof(info.image));
            
            //printf("base64 len:%d\n", strlen(img_buf));
            
            /* generate json string */
            snprintf(
                (char *) msg,
                MSG_BUFSIZE-1,
                "{\"image\":\"%s\",\"temperature\":\"%4.2f\"}",
                img_buf,
                info.temperature.max
            );
            
            dbg_count++;
            //printf("send len:%d\n", strlen((char *)msg));
            wsck_sendall(msg, strlen((char *)msg));
        }
        
        free(msg - LWS_PRE);
        free(img_buf);
        pthread_join(tid, NULL);
        
        return 0;
    } catch (char const* err) {
        cout << "[error]" << err << ": " << __FILE__ << " -> " << __LINE__ << endl;
    }
}
/* end of file */
