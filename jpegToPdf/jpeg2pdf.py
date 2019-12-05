#!/usr/bin/env python3.6

from fpdf import FPDF
import subprocess
import optparse

parser = optparse.OptionParser()

#parser.add_option("-s","--source",dest="source", help="list of images");

imagelist = parser.parse_args()[1]

pdf =FPDF('P', 'mm','A4')
for image in imagelist:
	print (image)
	pdf.add_page()
	pdf.image(image, 0, 0, 210, 297)
	print ('.')
pdf.output("result.pdf","F")

