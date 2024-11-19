from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0)

ARTICLE = """ New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York.
A year later, she got married again in Westchester County, but to a different man and without divorcing her first husband.
Only 18 days after that marriage, she got hitched yet again. Then, Barrientos declared "I do" five more times, sometimes only within two weeks of each other.
In 2010, she married once more, this time in the Bronx. In an application for a marriage license, she stated it was her "first and only" marriage.
Barrientos, now 39, is facing two criminal counts of "offering a false instrument for filing in the first degree," referring to her false statements on the
2010 marriage license application, according to court documents.
Prosecutors said the marriages were part of an immigration scam.
On Friday, she pleaded not guilty at State Supreme Court in the Bronx, according to her attorney, Christopher Wright, who declined to comment further.
After leaving court, Barrientos was arrested and charged with theft of service and criminal trespass for allegedly sneaking into the New York subway through an emergency exit, said Detective
Annette Markowski, a police spokeswoman. In total, Barrientos has been married 10 times, with nine of her marriages occurring between 1999 and 2002.
All occurred either in Westchester County, Long Island, New Jersey or the Bronx. She is believed to still be married to four men, and at one time, she was married to eight men at once, prosecutors say.
Prosecutors said the immigration scam involved some of her husbands, who filed for permanent residence status shortly after the marriages.
Any divorces happened only after such filings were approved. It was unclear whether any of the men will be prosecuted.
The case was referred to the Bronx District Attorney\'s Office by Immigration and Customs Enforcement and the Department of Homeland Security\'s
Investigation Division. Seven of the men are from so-called "red-flagged" countries, including Egypt, Turkey, Georgia, Pakistan and Mali.
Her eighth husband, Rashid Rajput, was deported in 2006 to his native Pakistan after an investigation by the Joint Terrorism Task Force.
If convicted, Barrientos faces up to four years in prison.  Her next court appearance is scheduled for May 18.
"""
print(summarizer(ARTICLE, max_length=130, min_length=30, do_sample=False))

ARTICLE = """ PaddleOCR Quick Start¶
Note: This tutorial mainly introduces the usage of PP-OCR series models, please refer to PP-Structure Quick Start for the quick use of document analysis related functions. In addition, the All-in-One development tool PaddleX relies on the advanced technology of PaddleOCR to support low-code full-process development capabilities in the OCR field, significantly reducing development time and complexity. It also integrates the 17 models involved in text image intelligent analysis, OCR, layout parsing, table recognition, formula recognition, and seal text recognition into 6 pipelines, which can be invoked with a simple Python API. For more details, please see Low-Code Full-Process Development.

1. Installation¶
1.1 Install PaddlePaddle¶
If you do not have a Python environment, please refer to Environment Preparation.

If you have CUDA 11 installed on your machine, please run the following command to install

pip install paddlepaddle-gpu
If you have no available GPU on your machine, please run the following command to install the CPU version

python -m pip install paddlepaddle
For more software version requirements, please refer to the instructions in Installation Document for operation.

1.2 Install PaddleOCR Whl Package¶

pip install "paddleocr>=2.0.1" # Recommend to use version 2.0.1+
For windows users: If you getting this error OSError: [WinError 126] The specified module could not be found when you install shapely on windows. Please try to download Shapely whl file here.
Reference: Solve shapely installation on windows

2. Easy-to-Use¶
2.1 Use by Command Line¶
PaddleOCR provides a series of test images, click here to download, and then switch to the corresponding directory in the terminal


cd /path/to/ppocr_img
If you do not use the provided test image, you can replace the following --image_dir parameter with the corresponding test image path

2.1.1 Chinese and English Model¶
Detection, direction classification and recognition: set the parameter--use_gpu false to disable the gpu device

paddleocr --image_dir ./imgs_en/img_12.jpg --use_angle_cls true --lang en --use_gpu false
Output will be a list, each item contains bounding box, text and recognition confidence


[[[441.0, 174.0], [1166.0, 176.0], [1165.0, 222.0], [441.0, 221.0]], ('ACKNOWLEDGEMENTS', 0.9971134662628174)]
[[[403.0, 346.0], [1204.0, 348.0], [1204.0, 384.0], [402.0, 383.0]], ('We would like to thank all the designers and', 0.9761400818824768)]
[[[403.0, 396.0], [1204.0, 398.0], [1204.0, 434.0], [402.0, 433.0]], ('contributors who have been involved in the', 0.9791957139968872)]
......
pdf file is also supported, you can infer the first few pages by using the page_num parameter, the default is 0, which means infer all pages


paddleocr --image_dir ./xxx.pdf --use_angle_cls true --use_gpu false --page_num 2
Only detection: set --rec to false

paddleocr --image_dir ./imgs_en/img_12.jpg --rec false
Output will be a list, each item only contains bounding box


[[397.0, 802.0], [1092.0, 802.0], [1092.0, 841.0], [397.0, 841.0]]
[[397.0, 750.0], [1211.0, 750.0], [1211.0, 789.0], [397.0, 789.0]]
[[397.0, 702.0], [1209.0, 698.0], [1209.0, 734.0], [397.0, 738.0]]
......
Only recognition: set --det to false

paddleocr --image_dir ./imgs_words_en/word_10.png --det false --lang en
Output will be a list, each item contains text and recognition confidence
"""
print(summarizer(ARTICLE, max_length=130, min_length=30, do_sample=False))

# >>> [{'summary_text': 'Liana Barrientos, 39, is charged with two counts of "offering a false instrument for filing in the first degree" In total, she has been married 10 times, with nine of her marriages occurring between 1999 and 2002. She is believed to still be married to four men.'}]
