#!/bin/bash


echo "killing running emulator process..."
pkill -f datastore

echo "sleeping 1 second"
sleep 1

#clear any remaining data in datastore
echo "removing pre-existing data"
rm ~/.config/gcloud/emulators/datastore/WEB-INF/appengine-generated/local_db.bin

echo "sleeping 1 second"
sleep 1

#start datastore emulator
echo "starting datastore emulator"
gcloud beta emulators datastore start &

echo "sleeping 3 seconds"
sleep 3

echo "process id:"
echo $!

#set environment variables
echo "setting env variables"
$(gcloud beta emulators datastore env-init)

echo "sleeping 1 second"
sleep 1

#build database with mock data
echo "populating emulator db"
node utils/dbsetup.js
