#!/bin/bash

git stash
git pull
git stash apply
./gitify.sh