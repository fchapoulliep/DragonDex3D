import requests
from bs4 import BeautifulSoup

url = "https://www.models-resource.com/pc_computer/dragonballfighterz/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

div = soup.find('div', class_='updatesheeticons')
if div:
    links = div.find_all('a')
    values = [link['href'].split('/')[4] for link in links]

    for value in values:
        url = f"https://www.models-resource.com/download/{value}/"
        response = requests.get(url)
        if response.status_code == 200:
            with open(f"{value}.zip", 'wb') as file:
                file.write(response.content)
        else:
            print(f"Failed to download {url}")
else:
    print("No updatesheeticons div found")
    