import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Setup Selenium WebDriver
options = Options()
options.headless = True  # Run in headless mode (no GUI)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# URL of the page with emotion-based book recommendations
url = "https://www.whichbook.net/mood-emotion"
driver.get(url)
time.sleep(5)  # Allow time for dynamic content to load

# Scroll to load more books
for _ in range(5):  # Adjust based on how many books you want
    driver.find_element(By.TAG_NAME, "body").send_keys(Keys.PAGE_DOWN)
    time.sleep(2)

# Scrape book details
books = []
book_elements = driver.find_elements(By.CSS_SELECTOR, "div.book-title-author")

for book in book_elements:
    try:
        title = book.find_element(By.CSS_SELECTOR, "h3").text
        author = book.find_element(By.CSS_SELECTOR, "p").text.replace("by ", "")
        books.append({"title": title, "author": author})
    except Exception as e:
        print(f"Error extracting book: {e}")

# Save data to CSV
df = pd.DataFrame(books)
df.to_csv("emotion_books.csv", index=False)

print("Scraping completed. Data saved to emotion_books.csv")
driver.quit()