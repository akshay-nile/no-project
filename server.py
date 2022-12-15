import os
from mimetypes import guess_type
from flask import Flask, Response, render_template, request

dists = set([d for d in os.listdir() if os.path.isdir(d) and 'index.html' in os.listdir(d)])

app = Flask(__name__)

@app.errorhandler(404)
def try_angular(not_found):
    words = list(filter(lambda word: len(word) > 0, request.path.split('/')))

    if not words:
        return Response(f'<h1>404 - NOT FOUND</h1><p>{request.path}</p>', status=404)

    if request.method == 'GET':
        filepath = os.path.join(*words)

        if not os.path.isfile(filepath):
            filepath = os.path.join(words[0], 'index.html')

            if not os.path.isfile(filepath):
                return Response(f'<h1>404 - NOT FOUND</h1><p>{request.path}</p>', status=404)

        if words[0] not in dists:
            return Response(f'<h1>403 - FORBIDDEN</h1><p>{request.path}</p>', status=403)

        content = open(filepath, 'rb').read()
        mimetype = guess_type(filepath, strict=True)[0]
    
        return Response(response=content, mimetype=mimetype, status=200)
    
    if request.headers.get('Password') != r'${{secrets.PASSWORD}}':
        return 'unauthentic'

    if request.method == 'POST':
        try:
            request.files.getlist('angular')[0].save(f'{words[0]}.zip')
            
            if os.path.exist(words[0]):
                os.system(f'rm -rf f{words[0]}')

            os.system('unzip no-project.zip')
            os.remove('no-project.zip')

            dists.add(words[0])
        except Exception as error:
            return str(error)

        return 'success'

    if request.method == 'DELETE':
        try:
            if os.path.exists(words[0]):
                os.system(f'rm -rf f{words[0]}')
            
            dists.discard(words[0])
        except Exception as error:
            return str(error)

        return 'success'
    
    return Response(f'<h1>405 - METHOD NOT ALLOWED</h1><p>{request.method}</p>', status=405)


app.run(debug = True)
