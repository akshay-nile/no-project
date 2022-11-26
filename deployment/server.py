import os
from flask import Flask, Response, render_template, request

app = Flask(__name__)

BUILD_PATH = '..\\dist\\no-project'
MIME_TYPES = {'html': 'html', 'css': 'css', 'js': 'javascript', 'svg': 'svg', 'txt': 'text'}


@app.route('/no-project', methods=['GET','POST'])
@app.route('/no-project/')
@app.route('/no-project/<path:path>')
def no_project(path = 'index.html'):
    if request.method == 'GET':
        filepath = os.path.join(BUILD_PATH, path)

        if not os.path.isfile(filepath):
            path = 'index.html'
            filepath = os.path.join(BUILD_PATH, path)

        extension = path.split('.')[-1].strip().lower()
        mimetype = MIME_TYPES.get(extension)

        filemode, mimetype = ('rb', '*/*') if mimetype is None else ('r', f'text/{mimetype}')
        return Response(open(filepath, filemode).read(), mimetype=mimetype)
    else:
        request.files.getlist('build')[0].save('no-project.zip')
        os.system('rm -rf no-project')
        os.system('unzip no-project.zip')
        os.remove('no-project.zip')
        return 'success'
    return 'failed'


app.run(debug = True)
