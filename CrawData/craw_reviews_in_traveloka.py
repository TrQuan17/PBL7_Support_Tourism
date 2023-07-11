import csv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

URL = r'https://www.traveloka.com/vi-vn/hotel/search?spec=09-11-2022.10-11-2022.1.1.HOTEL_GEO.10010083.%C4%90%C3%A0%20N%E1%BA%B5ng.2'

chromeOptions = Options()
chromeOptions.add_argument('incognito')
chromeOptions.add_argument('headless')

prefs = {
    'profile.managed_default_content_settings.images': 2
    }
chromeOptions.add_experimental_option('prefs',prefs)

browser = webdriver.Chrome (
    options=chromeOptions,
    executable_path='chromedriver.exe'
    )

browser.get(URL)

browser.implicitly_wait(10)
closeLogin = browser.find_element (
    By.CSS_SELECTOR, 
    'div[data-testid="login-modal-benefit-close-button"]')

browser.execute_script('arguments[0].click();', closeLogin)

numPage = 0
commentCount = 0
userRate = []
userComment = []

positiveCount = 0

while numPage < 10 and commentCount <= 1000:
    browser.implicitly_wait(30)
    
    cardItems = browser.find_elements(
        By.CSS_SELECTOR,
        'div[data-testid="tvat-hotelName"]'
    )

    for i in cardItems:
        browser.execute_script('arguments[0].click();', i)
        browser.switch_to.window(browser.window_handles[1])
        
        browser.implicitly_wait(30)

        try:
            
            browser.execute_script('window.scrollTo(0, 100)')
            
            showComment = browser.find_element (
                By.XPATH,
                '//*[@id="room-navigation-bar"]/div/div[1]/div[1]/div[7]/div'
            )
            
            browser.execute_script('arguments[0].click();', showComment)
            
            browser.implicitly_wait(30)
            
            commentInfo = browser.find_elements(
                By.CSS_SELECTOR,
                'div[class="css-1dbjc4n r-1guathk r-1yzf0co"]'
            )
            
            for c in commentInfo:               
                rate = c.find_element(
                    By.CSS_SELECTOR,
                    'div[class="css-901oao r-1i6uqv8 r-1sixt3s r-ubezar r-majxgm r-135wba7 r-fdjqy7"]'
                )
                
                comment = c.find_element(
                    By.CSS_SELECTOR, 
                    'div[class="css-1dbjc4n r-1wzrnnt r-1udh08x"]'
                )
                
                if comment.text == '' or len(comment.text.split(' ')) > 100 : 
                    print('---------------------------')
                    print(len(comment.text.split(' ')))
                    print('---------------------------')
                    continue
                
                if float(rate.text) > 8.0 :
                    positiveCount += 1
                
                if positiveCount >= 500 and float(rate.text) > 8.0:
                    continue  
                    
                userComment.append(comment.text)
                userRate.append(rate.text)
                
                print(f'{commentCount} - {rate.text} - {comment.text}')
                commentCount += 1
                         
        except:
            print('No get comments !!!')
        
        browser.close()
        browser.switch_to.window(browser.window_handles[0])
    try:
        btnNextPage = browser.find_element ( 
                        By.CSS_SELECTOR, 
                        'div[data-testid="tvat-pageButton-nextPage"]')
        
        browser.execute_script('arguments[0].click();', btnNextPage)
        
        numPage += 1
    except:
        break

data = zip(userComment, userRate)

header = ['Comment', 'Rate']

with open('comments.csv', 'w', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(header)

    for comment, rate in data:
        writer.writerow([comment, rate])
        
browser.quit()
