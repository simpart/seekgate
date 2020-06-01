CC :=g++
LDFLAGS :=
LIB := -lpthread -lusb-1.0 -lwebsockets -lseekutil
SOURCES :=$(shell find ./ -name "*.cpp")
EXECUTABLE :=$(SOURCES:.c=)

INC_FLAGS := $(addprefix -I,/usr/local/src/seekutil/src/cxx/ /usr/local/src/libwebsockets/include/ ./)

all: 
	$(CC) $(LIB) $(CFLAGS) $(SOURCES) -o seekgate $(INC_FLAGS)

clean:
	    rm -rf $(EXECUTABLE)
