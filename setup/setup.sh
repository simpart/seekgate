#!/bin/bash
SCP_DIR=$(cd $(dirname $0);pwd);

apt-get install -y apache2 libusb-1.0-0-dev cmake libssl-dev

# init apache2
systemctl enable apache2

mv $SCP_DIR/../../seekgate /var/www/html/
SCP_DIR=/var/www/html/seekgate/setup/

# install seekthermal library
git clone https://github.com/simpart/seekutil.git /usr/local/src/seekutil
cd /usr/local/src/seekutil/src/cxx/
make && make install

# install websocket library
git clone https://github.com/warmcat/libwebsockets.git /usr/local/src/libwebsockets
mkdir /usr/local/src/libwebsockets/build
cd /usr/local/src/libwebsockets/build
cmake ..
make && make install
cp $SCP_DIR/libwebsockets.conf  /etc/ld.so.conf.d/
ldconfig

# build seekgate
cd $SCP_DIR/../src/cxx
make
cp ./seekgate /usr/local/sbin/

# deploy backend
a2enmod cgid
cp $SCP_DIR/../src/py/threshold.py /usr/lib/cgi-bin/
cp $SCP_DIR/../src/py/conf.json /usr/lib/cgi-bin/
chown www-data:www-data /usr/lib/cgi-bin/conf.json
systemctl restart apache2

# set daemon
cp $SCP_DIR/seekgate.service /etc/systemd/system/
systemctl enable seekgate
systemctl start seekgate

echo setup seekgate was successfully
echo please connect seekthermal and access to http://127.0.0.1/seekgate

