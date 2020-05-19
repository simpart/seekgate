CC :=g++
LDFLAGS :=
#LIB := -lpthread -lusb-1.0 -lwebsockets
LIB := -lpthread -lwebsockets
SOURCES :=$(shell find ./ -name "*.cpp")
EXECUTABLE :=$(SOURCES:.c=)

INC_FLAGS := $(addprefix -I,./thermo /usr/local/src/libwebsockets/lib ./)

all: 
	$(CC) $(LIB) $(CFLAGS) $(SOURCES) -o seekgate $(INC_FLAGS)
