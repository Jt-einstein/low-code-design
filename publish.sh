#!/bin/bash
LOG_FILE="publish.log"
if [ $1 = "dev" ];then
  echo "publish dev"
  lerna publish prerelease --preid dev --dist-tag dev --registry http://npm.mananacare.cn --y > $LOG_FILE
else
  echo "publish prod"
  lerna publish patch --preid latest --dist-tag latest --registry http://npm.mananacare.cn --y > $LOG_FILE
fi

cat publish.log
echo "lerna publish finished."

# 判断成功结果字符串
SUCCESS_STR="Successfully published" 

if [ `grep -c "$SUCCESS_STR" ./$LOG_FILE` -ne '0' ];then
  echo "publish success."
  exit 0
else
  echo "publish fail!"
  exit 1
fi 