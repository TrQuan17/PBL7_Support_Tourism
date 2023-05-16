# Craw data about tourist attractions in Danang in tripadvisor.com website
# Info craw: username, category, reviews_count, about, address, rate_num

# Import library
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import csv
import time

element_num = 60

url_list = []

while(element_num < 1061):
    page_url = 'https://www.tripadvisor.com/Attractions-g298085-Activities-oa{num}-Da_Nang.html'.format(num = element_num)
    url_list.append(page_url)
    element_num += 30

chrome_option = Options()

chrome_option.add_argument('incognito')
# chrome_option.add_argument('--headless')

prefs = {'profile.managed_default_content_settings.images': 2}

chrome_option.add_experimental_option('prefs', prefs)

browser = webdriver.Chrome(
    chrome_options=chrome_option,
    executable_path='chromedriver.exe'
)

tourists_name = []
tourists_category = []
tourists_reviews_count = []
tourists_about = []
tourists_address = []
tourists_rate_num = []

for URL in url_list:

    # Open browser
    browser.get(URL)
    browser.implicitly_wait(30)

    # Get tourist attraction
    tourist_attractions = []
    tourist_attractions = browser.find_elements(
        By.CSS_SELECTOR,
        'div[class="alPVI eNNhq PgLKC tnGGX"]'
    )

    # Open tourist detail page in tourist_attractions list
    for i in tourist_attractions:
        tourist_link = i.find_element(By.XPATH, 'a[1]')
        browser.execute_script('arguments[0].click();', tourist_link)
        browser.switch_to.window(browser.window_handles[1])

        browser.implicitly_wait(15)

        # Get data info
        # Name
        try:
            name = browser.find_element(
                By.CSS_SELECTOR,
                '#lithium-root > main > div:nth-child(1) > div.hJiTo.z > div.QvCXh.mvTrV.cyIij.fluiI > header > div.mmBWG > div.ycuCc > div > h1'
            )
            
            print('-------------------------')
            print(name.text)
        except:
            name = None
            
        # Reviews count 
        try:    
            reviews_count = browser.find_element(
                By.CSS_SELECTOR,
                '#tab-data-qa-reviews-0 > div > div.bdeBj.e > div.C > div > div.f.u.j > div.jVDab.o.W.f.u.w.GOdjs > span'
            )
        except:
            reviews_count = None
        
        # Category   
        try:
            category = browser.find_element(
                By.CSS_SELECTOR,
                'div.fIrGe._T.bgMZj'
            )
            
            print(category.text)
        except:
            category = None

        # About
        try:
            about = browser.find_element(
                By.CSS_SELECTOR,
                'div.WRRwX.Gg.A > div.IxAZL > div > div._d.MJ > div > div.fIrGe._T.bgMZj > div'
            )
            print(about.text)
        except:
            about = None

        # Address
        try:
            address = browser.find_element(
                By.CSS_SELECTOR,
                '#tab-data-WebPresentation_PoiLocationSectionGroup > div > div > div.AcNPX.A > div.ZhNYD > div > div > div > div > button > span'
            )
        except:
            address = None

        # Rate num 
        try:
            rate_num = browser.find_element(
                By.CSS_SELECTOR,
                '#tab-data-qa-reviews-0 > div > div.bdeBj.e > div.C > div > div.f.u.j > div.biGQs._P.fiohW.hzzSG.uuBRH'
            )
        except:
            rate_num = None

        tourists_name.append(name.text if name else '')
        tourists_category.append(category.text if category else '')
        tourists_reviews_count.append(reviews_count.text if reviews_count else '')
        tourists_about.append(about.text if about else '')
        tourists_address.append(address.text if address else '')
        tourists_rate_num.append(rate_num.text if rate_num else '')

        browser.close()
        browser.switch_to.window(browser.window_handles[0])

# Save all info tourists to csv
tourists_data = zip(
    tourists_name,
    tourists_address,
    tourists_rate_num,
    tourists_reviews_count,
    tourists_category,
    tourists_about
)

header = ['name', 'address', 'rate_num',
          'reviews_count', 'category', 'about']

with open('tourists_info.csv', 'a', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    # writer.writerow(header)
    writer.writerows(tourists_data)

browser.quit()
