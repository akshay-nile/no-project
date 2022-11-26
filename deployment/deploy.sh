cd ../dist
zip -r 'no-project.zip' 'no-project'
curl -X POST -F 'build=@no-project.zip' 'http://akshaynile.pythonanywhere.com/no-project'
rm 'no-project.zip'
cd ..