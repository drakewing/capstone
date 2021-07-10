#!/bin/bash


echo "killing running emulator process..."
taskkill -f datastore

sleep 5

#clear any remaining data in datastore
rm ~/.config/gcloud/emulators/datastore/WEB-INF/appengine-generated/local_db.bin

sleep 1

#start datastore emulator
gcloud beta emulators datastore start &


sleep 5

echo "process id:"
echo $!

#set environment variables
$(gcloud beta emulators datastore env-init)

sleep 1

#build database with mock data
node src/dbsetup.js
