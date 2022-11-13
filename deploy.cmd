set WEBDIR=C:\Apache\apache-tomcat-9.0.46\webapps\no-project
rmdir /q /s "%WEBDIR%"
mkdir "%WEBDIR%"
xcopy "dist\no-project\*" "%WEBDIR%"
set CATALINA_HOME=C:\Apache\apache-tomcat-9.0.46
C:\Apache\apache-tomcat-9.0.46\bin\startup.bat
