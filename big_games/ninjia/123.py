from flask import Flask
from flask import send_from_directory
app=Flask(__name__,static_folder='', static_url_path='')  
@app.route('/')  
def hello_world():  
    return "Hello World"  
@app.route('/test.html')  
def test():
    f=open('test.html','r')
    r=f.read()
    return r
@app.route('/index.html')
def hhh():
    f=open('index.html','r')
    r=f.read()
    return r
@app.route('/v/<filename>')
def get_file(filename):
    return send_from_directory('sound',filename)

if __name__ == '__main__':  
    app.run(host='0.0.0.0',port=8888)  
