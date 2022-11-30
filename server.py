import os
from mimetypes import guess_type
from flask import Flask, Response, render_template, request

app = Flask(__name__)

BUILD_PATH = 'dist\\no-project'

@app.route('/no-project', methods=['GET','POST'])
@app.route('/no-project/')
@app.route('/no-project/<path:path>')
def no_project(path = 'index.html'):
    if request.method == 'GET':
        filepath = os.path.join(BUILD_PATH, path)

        if not os.path.isfile(filepath):
            path = 'index.html'
            filepath = os.path.join(BUILD_PATH, path)

        content = open(filepath, 'rb').read()
        mimetype = guess_type(filepath, strict=True)[0]
        return Response(response=content, mimetype=mimetype, status=200)
    else:
        if request.headers.get('Password') != r'${{secrets.PASSWORD}}':
            return 'unauthentic'
        try:
            request.files.getlist('build')[0].save('no-project.zip')
            os.system('rm -rf no-project')
            os.system('unzip no-project.zip')
            os.remove('no-project.zip')
        except Exception as error:
            return str(error)
        return 'success'
    return 'failed'


app.run(debug = True)
