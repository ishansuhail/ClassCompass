from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import csv

try:

    # Specify the path to your chromedriver
    service = Service("/usr/bin/chromedriver")  # Update the path to /usr/bin/chromedriver

    # Specify the path to your Google Chrome for Testing binary
    options = Options()
    options.binary_location = "/opt/google/chrome/chrome"  # Path to the Chrome binary

    # Create a WebDriver instance
    driver = webdriver.Chrome(service=service, options=options)

    # Define the link template
    link_template = "https://assessment.rpi.edu/index.cfm/page/AefisCourseSection.SyllabusForm?courseSectionId="

    # Open arbitrary page to first do dual factor authentication
    driver.get(link_template + "10000")
    input("Press Enter once you're logged in...")

    # Open the csv file we want to populate
    with open("syllabus_data.csv", "a", newline="") as file:
        # Create a writer object
        writer = csv.writer(file)
        
        for section_id in range(10000, 11000):
            # Open the next page
            curr_link = link_template + str(section_id)
            driver.get(curr_link)
            
            try: 
                # Extract term name, subject and school within RPI
                elements = driver.find_elements(By.CLASS_NAME, "mdl-chip__text")
                texts = [element.text for element in elements]
                [term_name, subject, school] = texts

                # Print the extracted course title
                title_info = driver.find_element(By.CSS_SELECTOR, "div.span8 h1").text.split(" ")
                course_code = title_info[0] + " " + title_info[1]
                section = title_info[2]
                course_name = " ".join(title_info[4:])

                # Extract the term id
                term_div = driver.find_element(By.XPATH, "//td/div[contains(text(), 'Term')]")
                term_text = term_div.text
                term_id = term_text.split("[")[-1].split("]")[0]  # Extracts the value inside brackets

                # Create the row to write and write it
                row = [section_id, course_code, section, course_name, term_id, term_name, subject, school, curr_link]
                print(row)

                # Write the row
                writer.writerow(row)
            except Exception:
                print("Error encountered for SectionID:", section_id)

except Exception as e:
    print("An error occurred:", e)

finally:
    # Ensure the browser is closed in case of error
    driver.quit()


