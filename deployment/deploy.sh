cd ../dist
zip -r build.zip no-project
curl -X POST -F 'build=@build.zip' http://akshaynile.pythonanywhere.com/no-project
rm build.zip
cd ..