#!/usr/bin/env bash

echo "Platform : " $2
echo "Command found : " $1
echo "Replacing google service file..."

# ANDROID
if [ $2 = "android" ]
then
    if [[ $1 == *"Development"* ]]; then
        echo "Setting Android Development"
        cp -f ../../app/config/environment/development/google-services.json ./google-services.json && echo "cp command success" || echo "cp command failed"
    elif [[ $1 == *"Production"* ]]; then
        echo "Setting Android Production"
        cp -f ../../app/config/environment/production/google-services.json ./google-services.json && echo "cp command success" || echo "cp command failed"
    else
        echo "Setting Android Development by default"
        cp -f ../../app/config/environment/development/google-services.json ./google-services.json && echo "cp command success" || echo "cp command failed"
    fi
fi

# IOS
if [ $2 = "ios" ]
then
    if [[ $1 == *"dev"* ]]; then
        echo "Setting iOS Development"
        cp -f ../app/config/environment/development/GoogleService-Info.plist ./GithubUsers/GoogleService-Info.plist && echo "cp command success" || echo "cp command failed"
    elif [[ $1 != *"prod"* ]]; then
        echo "Setting iOS Production"
        cp -f ../app/config/environment/production/GoogleService-Info.plist ./GithubUsers/GoogleService-Info.plist && echo "cp command success" || echo "cp command failed"
    else
        echo "Setting iOS Development by default"
        cp -f ../app/config/environment/development/GoogleService-Info.plist ./GithubUsers/GoogleService-Info.plist && echo "cp command success" || echo "cp command failed"
    fi
fi

echo "Replacing google service file finished."
