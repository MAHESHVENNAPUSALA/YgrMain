import urllib.request
import urllib.parse
class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers): return fp
    http_error_301 = http_error_303 = http_error_307 = http_error_302
opener = urllib.request.build_opener(NoRedirectHandler())
urllib.request.install_opener(opener)
data = urllib.parse.urlencode({'name':'Vennapusala Mahesh7', 'email':'maheshve8nnapusala3@gmail.com', 'phone':'7656654562'}).encode()
req = urllib.request.Request('http://127.0.0.1:8000/register/1/', data=data)
res = urllib.request.urlopen(req)
body = res.read()
print("STATUS:", res.status)
print("LOCATION:", res.getheader('Location'))
