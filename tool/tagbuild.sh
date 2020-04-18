#!/bin/bash

WEBPACK=node_modules/.bin/webpack
MFTAG=node_modules/.bin/mofron-tag
#echo $MFTAG
SCP_DIR=$(cd $(dirname $0);pwd);

if [[ $1 == "" ]]; then
    INPUT="$SCP_DIR/../mof/index.mof"
else
    INPUT="$SCP_DIR/../mof/$1.mof"
fi

if [[ $1 == "" ]]; then
    OUTPUT="$SCP_DIR/../src/js/init/index.js"
else
    OUTPUT="$SCP_DIR/../src/js/init/$1.js"
fi

EXEC="node $SCP_DIR/../$MFTAG ${INPUT} ${OUTPUT}"
echo $EXEC
echo $($EXEC);

bash $SCP_DIR/build.sh $1

#while read -d $'\0' file; do
#    
#    echo "$file" | gawk -F/ '{print $NF}' | awk -F'.mf' '{print $1}' | { 
#        read file_nm;
#        
#        conf_file="$SCP_DIR/../conf/webpack/webpack.config.${file_nm}.js"
#        EXEC_MFTAG="$MFTAG $conf_file $SCP_DIR/../src/js/init/$file_nm.js"
#        echo $EXEC_MFTAG
#        
#        # exec webpack
#        #bash $SCP_DIR/build.sh ${file_nm} $1
#    }
#    
#done < <(find $SCP_DIR/../mftag -mindepth 1 -maxdepth 1 -print0)

