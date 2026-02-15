document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // 후원 모달 관련 요소
    const donateBtn = document.getElementById('donateBtn');
    const donateModal = document.getElementById('donateModal');
    const closeBtn = document.querySelector('.close-btn');

    // 후원 버튼 클릭 시 모달 열기
    donateBtn.addEventListener('click', () => {
        donateModal.style.display = 'block';
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeBtn.addEventListener('click', () => {
        donateModal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target === donateModal) {
            donateModal.style.display = 'none';
        }
    });

    // 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // 테마 전환 이벤트
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    generateBtn.addEventListener('click', generateLottoNumbers);

    function generateLottoNumbers() {
        generateBtn.disabled = true; // 버튼 비활성화
        generateBtn.textContent = '추첨 중...';
        
        const numbers = new Set();
        while (numbers.size < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            numbers.add(num);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        displayNumbers(sortedNumbers);
    }

    function displayNumbers(numbers) {
        resultDiv.innerHTML = ''; // 기존 결과 초기화

        numbers.forEach((num, index) => {
            setTimeout(() => {
                const ball = document.createElement('div');
                ball.classList.add('ball');
                ball.textContent = num;
                
                // 번호 대역별 색상 클래스 추가
                if (num <= 10) ball.classList.add('range-1');
                else if (num <= 20) ball.classList.add('range-2');
                else if (num <= 30) ball.classList.add('range-3');
                else if (num <= 40) ball.classList.add('range-4');
                else ball.classList.add('range-5');

                resultDiv.appendChild(ball);

                // 마지막 공이 표시된 후 버튼 다시 활성화
                if (index === numbers.length - 1) {
                    setTimeout(() => {
                        generateBtn.disabled = false;
                        generateBtn.textContent = '번호 생성하기';
                    }, 200);
                }
            }, index * 200); // 0.2초 간격으로 하나씩 표시
        });
    }
});
