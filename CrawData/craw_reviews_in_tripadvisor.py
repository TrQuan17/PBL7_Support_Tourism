from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import csv
import time

element_num = 0
count = 0
url_list = []

while (element_num < 1061):
    page_url = 'https://www.tripadvisor.com.vn/Attractions-g298085-Activities-oa{num}-Da_Nang.html'.format(
        num=element_num)
    url_list.append(page_url)
    element_num += 30

chrome_option = Options()

chrome_option.add_argument('incognito')
chrome_option.add_argument('--headless')

prefs = {'profile.managed_default_content_settings.images': 2}

chrome_option.add_experimental_option('prefs', prefs)

# Open chrome browser
browser = webdriver.Chrome(
    chrome_options=chrome_option,
    executable_path='chromedriver.exe'
)
            
for URL in url_list:
    print('-----------------------')
    print(element_num)
    print('-----------------------')
    
    # Open browser
    browser.get(URL)
    browser.implicitly_wait(30)

    # Get tourist attraction
    tourist_attractions = []
    tourist_attractions = browser.find_elements(
        By.CSS_SELECTOR,
        'div[class="alPVI eNNhq PgLKC tnGGX"]'
    )

    # Open tourism detail page in tourist_attractions list
    for i in tourist_attractions:
        tourist_link = i.find_element(By.XPATH, 'a[1]')
        browser.execute_script('arguments[0].click();', tourist_link)
        browser.switch_to.window(browser.window_handles[1])
        
        browser.implicitly_wait(30)
        
        reviews_box = browser.find_element(By.XPATH, '//div[@class="LbPSX"]')
        reviews_element = reviews_box.find_elements(By.XPATH, '//div[@class="_T FKffI"]/div[1]/div/span')
        rates_element = reviews_box.find_elements(By.CSS_SELECTOR, 'svg.UctUV.d.H0')
        
        for rate, review in zip(rates_element, reviews_element): 
            count = count + 1
            print('-----------------------------')
            print(count, review.text)
            with open('comments.csv', 'a', encoding='utf-8-sig') as f:
                writer = csv.writer(f)
                writer.writerow([rate.get_attribute('aria-label'), review.text])
        
        browser.close()
        browser.switch_to.window(browser.window_handles[0])
        
    if count > 600: break

browser.quit()
