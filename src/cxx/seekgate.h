#ifndef __SEEKGATE_H__
#define __SEEKGATE_H__

#ifdef __AVR__
    #include <avr/pgmspace.h>
#else
    #define PROGMEM
#endif

#include <libwebsockets.h>

void * wsck_run (void *);
void wsck_sendall (unsigned char *, size_t);
int wsck_count (void);
static int wsck_callback (struct lws *, enum lws_callback_reasons, void *, void *, size_t);


static inline size_t base64len(size_t n) {
    return (n + 2) / 3 * 4;
}

static size_t base64(char *buf, size_t nbuf, const unsigned char *p, size_t nn) {
    const char t[] PROGMEM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    size_t m = base64len(nn);
    long long i,n = (long long) nn;
    unsigned x;

    if (nbuf >= m)
        for (i = 0; i < n; ++i) {
            x = p[i] << 0x10;
            x |= (++i < n ? p[i] : 0) << 0x08;
            x |= (++i < n ? p[i] : 0) << 0x00;

            *buf++ = t[x >> 3 * 6 & 0x3f];
            *buf++ = t[x >> 2 * 6 & 0x3f];
            *buf++ = (((n - 0 - i) >> 31) & '=') |
            (~((n - 0 - i) >> 31) & t[x >> 1 * 6 & 0x3f]);
            *buf++ = (((n - 1 - i) >> 31) & '=') |
            (~((n - 1 - i) >> 31) & t[x >> 0 * 6 & 0x3f]);
        }

    return m;
}

#endif
