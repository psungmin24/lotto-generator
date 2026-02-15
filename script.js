document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');

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
