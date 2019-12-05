### create pdf from list of images ###

*use [fpdf](https://pyfpdf.readthedocs.io/en/latest/reference/FPDF/index.html)*

*use parseopt*

1) install fpdf:

``` 
pip install fpdf --user

```

2) write your shebang in jpegToPdf.py:

for me:  python 3.6 & pip 3.6 use

```
#!/usr/bin/env python3.6
```

3) add executable rights to jpegToPdf.py

```
sudo chmod +x for jpegTopdf.py
```

use conver!

for example:

```
 ./jpeg2pdf.py 1.jpg 2.jpg
```

and see file result.pdf in current directory!

