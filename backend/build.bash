
#!/bin/bash

#!/usr/bin/env fish


cd \var\www\theedibles

    git stash
    # to stash package-lock.json file changes

    git pull
    git checkout master
    git pull origin master

    echo 'Going to build frontend'


  cd frontend
  yarn build

  echo 'Build Success'
    #rm -rf node_modules/


    pm2 restart 4

    exit
