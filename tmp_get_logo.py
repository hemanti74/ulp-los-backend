import urllib.request
import re
try:
    html = urllib.request.urlopen('https://uncia.ai').read().decode('utf-8')
    matches = re.findall(r'<img[^>]+src=[\"\']([^\"\']+logo[^\"\']+)[\"\']', html, re.IGNORECASE)
    print("Found direct logo URLs:", matches)
    matches2 = re.findall(r'[\"\']([^\"\']+\.png)[\"\']', html, re.IGNORECASE)
    print("Found PNGs:", [m for m in matches2 if 'logo' in m.lower()])
except Exception as e:
    print(e)
