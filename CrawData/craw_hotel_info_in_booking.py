# Craw hotel info data (name, rate, location, decreption) in Booking.com website

# Import library
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import csv

# Define chrome browser
URL = r'https://www.booking.com/searchresults.vi.html?label=gog235jc-1DCAMo9AE4sgNIKlgDaPQBiAEBmAEquAEXyAEM2AED6AEB-AECiAIBqAIDuALV_--hBsACAdICJDQ0NmE0NGJiLTkzODgtNGM4My1hYTgzLTE5MjlhYmI0MWU0NtgCBOACAQ&sid=440fd871b1751cfe51165582c4bff9f7&aid=356980&ss=%C4%90%C3%A0+N%E1%BA%B5ng&ssne=%C4%90%C3%A0+N%E1%BA%B5ng&ssne_untouched=%C4%90%C3%A0+N%E1%BA%B5ng&lang=vi&sb=1&src_elem=sb&src=searchresults&dest_id=-3712125&dest_type=city&checkin=2023-04-22&checkout=2023-04-23&group_adults=1&no_rooms=1&group_children=0&sb_travel_purpose=leisure&offset=0'

chrome_option = Options()

chrome_option.add_argument('incognito')
# chrome_option.add_argument('headless')

prefs = {'profile.managed_default_content_settings.images': 2}

chrome_option.add_experimental_option('prefs', prefs)

browser = webdriver.Chrome(
    chrome_options=chrome_option,
    executable_path='chromedriver.exe'
)

# Open browser
browser.get(URL)
browser.implicitly_wait(30)

hotels_card_info = browser.find_elements(
    By.CSS_SELECTOR,
    'div[data-testid="property-card"]'
)

hotels_name_list = []
hotels_location_list = []
# hotels_rate_list = []
# hotels_rate_num_list = []
hotels_content_list = []


for i in hotels_card_info:
    try:
        hotel_detail_link = i.find_element(
            By.XPATH,
            'div[1]/div[2]/div/div[1]/div/div[1]/div/div[1]/div/h3/a'
        )

        browser.execute_script('arguments[0].click();', hotel_detail_link)
        browser.switch_to.window(browser.window_handles[1])

        browser.implicitly_wait(30)
    
    
        # Get data info
        hotel_name = browser.find_element(
            By.XPATH,
            '//*[@id="hp_hotel_name"]/div/h2'
        )
        print(hotel_name.text)

        hotel_location = browser.find_element(
            By.XPATH,
            '//*[@id="showMap2"]/span[1]'
        )

        hotel_content = browser.find_element(
            By.XPATH,
            '//*[@id="property_description_content"]'
        )
        
        # hotel_rate = browser.find_element(
        #     By.XPATH,
        #     '//*[@id="guest-featured_reviews__horizontal-block"]/div[2]/div/div/div[2]/div/button/div/div/div[2]/span[1]'
        # )

        # hotel_rate_num = browser.find_element(
        #     By.XPATH,
        #     '//*[@id="guest-featured_reviews__horizontal-block"]/div[2]/div/div/div[2]/div/button/div/div/div[1]'
        # )

        hotels_name_list.append(hotel_name.text) 
        hotels_location_list.append(hotel_location.text) 
        # hotels_rate_list.append(hotel_rate.text) 
        # hotels_rate_num_list.append(hotel_rate_num.text) 
        hotels_content_list.append(hotel_content.text)

        browser.close()
        browser.switch_to.window(browser.window_handles[0])
    except:
        print("craw data erorr!")

hotels_info = zip (
    hotels_name_list,
    hotels_location_list,
    # hotels_rate_num_list,
    # hotels_rate_list,
    hotels_content_list
)

header_csv = ['name', 'location', 'content']

with open('hotel_info_file.csv', 'w', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(header_csv)
    
    for name, location, content in hotels_info:
        writer.writerow([name, location, content])

browser.quit()
