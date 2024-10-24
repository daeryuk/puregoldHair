
# 크롤링을 하기 위해서 이 파이썬 파일을 실행하면 됩니다.
# 네이버 리뷰를 긁어와 reviews.json에 저장합니다.
# 현재 코드는 더보기 기능이 없습니다.
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

def get_reviews():
    # Chrome 옵션 설정
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  # 헤드리스 모드
    
    # Chrome 드라이버 설정
    service = Service('C:\\Users\\kdr\\Desktop\\kdrComDoc\\kdr_vscode\\Sources\\WEB\\chromedriver-win64\\chromedriver.exe')  # 크롬 드라이버 경로
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    reviews_data = []  # 리뷰 데이터를 저장할 리스트

    try:
        # URL 접속
        url = 'https://m.place.naver.com/hairshop/1216414317/review/visitor?reviewItem=0'
        driver.get(url)
        
        # 페이지 로딩 대기
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'pui__NMi-Dp')))
        
        # HTML 가져오기
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        # 리뷰 정보 수집
        reviews = soup.select('.pui__NMi-Dp')  # 이름
        images = soup.select('.place_thumb img')  # 이미지
        contents = soup.select('.pui__xtsQN-')   # 리뷰 내용
        date_elements = soup.select('.pui__QKE5Pr')  # 날짜와 인증 수단 정보

        # 리뷰 정보를 수집
        for i in range(len(reviews)):
            name = reviews[i].text.strip() if i < len(reviews) else '정보 없음'
            image = images[i]['src'] if i < len(images) and 'src' in images[i].attrs else '정보 없음'
            
            # 공백 처리: 리뷰 내용에서 공백 2칸 이상을 1칸으로 변경
            content = contents[i].text.strip().replace('  ', ' ') if i < len(contents) else '정보 없음'
            while '  ' in content:  # 반복적으로 공백을 줄입니다.
                content = content.replace('  ', ' ')
            
            # 날짜, 재방문 여부 및 인증 수단 추출
            if i < len(date_elements):
                date_info = date_elements[i].find_all('span', class_='pui__gfuUIT')
                
                # '방문일' 대신 '날짜'만 추출
                date = date_info[0].find('time').text.strip() if date_info[0].find('time') else '정보 없음'
                
                # '재방문 여부' 추출
                revisit = date_info[1].text.strip() if len(date_info) > 1 else '정보 없음'
                
                # '영수증'이라는 글자만 추출
                receipt = '영수증' if '영수증' in date_info[2].text else '정보 없음'
            else:
                date = '정보 없음'
                revisit = '정보 없음'
                receipt = '정보 없음'
            
            # 리뷰 데이터를 리스트에 추가
            reviews_data.append({
                'name': name,
                'image': image,
                'content': content,
                'date': date,
                'revisit': revisit,
                'receipt': receipt
            })

            # 출력 형식
            print(f"이름: {name}")
            print(f"이미지: {image}")
            print(f"리뷰 내용: {content}")
            print(f"날짜: {date}")
            print(f"재방문 여부: {revisit}")
            print(f"인증 수단: {receipt}")
            print("-" * 40)  # 구분선

    except Exception as e:
        print(f"오류 발생: {e}")
    finally:
        # 드라이버 종료
        driver.quit()

    # 수집한 리뷰 데이터를 JSON 파일로 저장
    with open('reviews.json', 'w', encoding='utf-8') as json_file:
        json.dump(reviews_data, json_file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    get_reviews()
