#ifndef __SEEKGATE_H__
#define __SEEKGATE_H__

#include <libwebsockets.h>

void * wsck_run (void *);

//void wsck_init (int);
//void wsck_service (void)
//void wsck_close (void);
static int wsck_callback (struct lws *, enum lws_callback_reasons, void *, void *, size_t);

#endif
