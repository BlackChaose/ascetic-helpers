#!/usr/bin/env bash

#curl -X GET 'http://localhost:5000/script_sanitize_mobile_and_save_old_mobile.php?start=0&end=1000'
echo "!!!!!!"
for END in {1000..8000..1000}
do
   let START=$END-1000
   ADDRESS="http://localhost:5000/script_sanitize_mobile_and_save_old_mobile.php?start=$START&end=$END"
   curl -I -X GET $ADDRESS
done
echo "!END"