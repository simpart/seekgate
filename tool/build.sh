#!/bin/bash
SCP_DIR=$(cd $(dirname $0);pwd);
WEBPACK="${SCP_DIR}/../node_modules/.bin/webpack"

error () {
    echo "ERROR : $1"
    echo "Usage:"
    echo "  build.sh [conf] [mode]"
    echo "    conf : path to config file path"
    echo "    mode : 'pro', 'dev'"
    exit -1
}

# get target file
if [[ $1 == "" ]]; then
    TARGET="$SCP_DIR/../conf/webpack/webpack.config.index.js"
else
    TARGET="$SCP_DIR/../conf/webpack/webpack.config.$1.js"
fi
if [ ! -f $TARGET ]; then
    error "could not found webpack config file (${TARGET})"
fi

# get mode
if [[ $2 = "pro" ]]; then
  MODE='production'
else
  MODE='development'
fi


EXEC="$WEBPACK --config ${TARGET} --mode $MODE"
echo $EXEC
echo $($EXEC);
