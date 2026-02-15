document.addEventListener('DOMContentLoaded', () => {
    const generateOneBtn = document.getElementById('generateOneBtn');
    const generateFiveBtn = document.getElementById('generateFiveBtn');
    const resultDiv = document.getElementById('result');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // 후원 모달 관련 요소
    const donateBtn = document.getElementById('donateBtn');
    const donateModal = document.getElementById('donateModal');
    const closeBtn = document.querySelector('.close-btn');
    const copyAccountBtn = document.getElementById('copyAccountBtn');
    const openTossBtn = document.getElementById('openTossBtn');
    const copyMessage = document.getElementById('copyMessage');

    // 후원 버튼 클릭 시 모달 열기
    donateBtn.addEventListener('click', () => {
        donateModal.style.display = 'block';
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeBtn.addEventListener('click', () => {
        donateModal.style.display = 'none';
        copyMessage.classList.remove('show');
    });

    // 계좌번호 복사 기능
    copyAccountBtn.addEventListener('click', () => {
        // 여기에 본인의 계좌번호를 입력하세요
        const accountText = "카카오뱅크 3333-XX-XXXXXX (예금주: 홍길동)";
        
        navigator.clipboard.writeText(accountText).then(() => {
            copyMessage.textContent = "계좌번호가 복사되었습니다!";
            copyMessage.classList.add('show');
            setTimeout(() => {
                copyMessage.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('복사 실패:', err);
            copyMessage.textContent = "복사에 실패했습니다.";
            copyMessage.classList.add('show');
        });
    });

    // 토스 송금 버튼
    openTossBtn.addEventListener('click', () => {
        // 여기에 본인의 토스 익명 송금 링크를 입력하세요 (예: https://toss.me/your_id)
        const tossLink = "https://toss.me/your_id"; 
        
        if (tossLink === "https://toss.me/your_id") {
            alert("토스 송금 링크가 설정되지 않았습니다.");
        } else {
            window.open(tossLink, '_blank');
        }
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

    generateOneBtn.addEventListener('click', () => generateLotto(1));
    generateFiveBtn.addEventListener('click', () => generateLotto(5));

    function generateLotto(count) {
        // 버튼 비활성화
        generateOneBtn.disabled = true;
        generateFiveBtn.disabled = true;
        
        resultDiv.innerHTML = ''; // 기존 결과 초기화

        // 요청한 횟수만큼 게임 생성
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const numbers = getLottoNumbers();
                const row = document.createElement('div');
                row.classList.add('game-row');
                resultDiv.appendChild(row);

                // 각 번호 표시
                numbers.forEach((num, index) => {
                    setTimeout(() => {
                        const ball = createBall(num);
                        row.appendChild(ball);
                    }, index * 100); // 공 하나당 0.1초
                });

                // 모든 게임 생성이 끝났는지 확인하여 버튼 활성화
                if (i === count - 1) {
                    setTimeout(() => {
                        generateOneBtn.disabled = false;
                        generateFiveBtn.disabled = false;
                    }, 800);
                }
            }, i * 300); // 각 게임 줄마다 0.3초 간격
        }
    }

    function getLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            numbers.add(num);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function createBall(num) {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = num;
        
        // 번호 대역별 색상 클래스 추가
        if (num <= 10) ball.classList.add('range-1');
        else if (num <= 20) ball.classList.add('range-2');
        else if (num <= 30) ball.classList.add('range-3');
        else if (num <= 40) ball.classList.add('range-4');
        else ball.classList.add('range-5');

        return ball;
    }
});