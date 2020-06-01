CC :=g++
LDFLAGS :=
LIB := -lpthread -lusb-1.0 -lwebsockets -lseekutil
SOURCES :=$(shell find ./ -name "*.cpp")
EXECUTABLE :=$(SOURCES:.c=)

INC_FLAGS := $(addprefix -I,/usr/local/src/seekutil/src/cxx/ /usr/local/src/libwebsockets/include/ ./)

<<<<<<< HEAD
#INC_FLAGS := $(addprefix -I,/usr/local/src/seekutil/src/cxx/ /usr/local/src/libwebsockets/include/ ./ /usr/local/src/libwebsockets/lib/core/ /usr/local/src/libwebsockets/build/ /usr/local/src/libwebsockets/lib/plat/unix/ /usr/local/src/libwebsockets/lib/tls/ /usr/local/src/libwebsockets/lib/event-libs/ /usr/local/src/libwebsockets/lib/event-libs/poll/ /usr/local/src/libwebsockets/lib/core-net/ /usr/local/src/libwebsockets/lib/roles/ /usr/local/src/libwebsockets/lib/roles/http/ /usr/local/src/libwebsockets/lib/roles/h1/ /usr/local/src/libwebsockets/lib/roles/h2/ /usr/local/src/libwebsockets/lib/roles/ws/)

=======
>>>>>>> master
all: 
	$(CC) $(LIB) $(CFLAGS) $(SOURCES) -o seekgate $(INC_FLAGS)

clean:
	    rm -rf $(EXECUTABLE)
