// بيانات اللعبة
let currentQuestion = 0;
let score = 0;
let playerNames = { name1: '', name2: '' };

// أسئلة اختبار الحب
const questions = [
    {
        question: "كم مرة تتحدثان يومياً؟",
        answers: [
            { text: "طوال الوقت 💬", points: 10 },
            { text: "عدة مرات في اليوم 📱", points: 8 },
            { text: "مرة واحدة يومياً 📞", points: 5 },
            { text: "أحياناً فقط 😅", points: 2 }
        ]
    },
    {
        question: "ما هو شعوركما عند رؤية بعضكما البعض؟",
        answers: [
            { text: "فرحة وسعادة غامرة 😍", points: 10 },
            { text: "راحة وطمأنينة 😊", points: 8 },
            { text: "سعادة عادية 🙂", points: 5 },
            { text: "لا أشعر بشيء خاص 😐", points: 1 }
        ]
    },
    {
        question: "هل تتشاركان نفس الاهتمامات؟",
        answers: [
            { text: "نعم، تقريباً كل شيء 🎯", points: 10 },
            { text: "معظم الأشياء 👍", points: 8 },
            { text: "بعض الأشياء 🤔", points: 5 },
            { text: "قليل جداً 😕", points: 2 }
        ]
    },
    {
        question: "كيف تقضيان الوقت معاً؟",
        answers: [
            { text: "نستمتع بكل لحظة ⭐", points: 10 },
            { text: "وقت ممتع ومفيد 😄", points: 8 },
            { text: "وقت عادي 😊", points: 5 },
            { text: "أحياناً مملاً 😴", points: 2 }
        ]
    },
    {
        question: "هل تثقان ببعضكما البعض؟",
        answers: [
            { text: "ثقة مطلقة 💯", points: 10 },
            { text: "ثقة كبيرة 👌", points: 8 },
            { text: "ثقة متوسطة 🤝", points: 5 },
            { text: "ثقة قليلة 😬", points: 2 }
        ]
    },
    {
        question: "كيف تحلان المشاكل بينكما؟",
        answers: [
            { text: "نتحدث ونحل كل شيء 💬", points: 10 },
            { text: "نحاول الحل معاً 🤝", points: 8 },
            { text: "أحياناً نحل المشاكل 😅", points: 5 },
            { text: "نتجنب المشاكل 🙈", points: 2 }
        ]
    },
    {
        question: "هل تخططان للمستقبل معاً؟",
        answers: [
            { text: "دائماً نخطط معاً 🌟", points: 10 },
            { text: "أحياناً نتحدث عن المستقبل 💭", points: 8 },
            { text: "نادراً ما نخطط 🤷", points: 5 },
            { text: "لا نفكر في المستقبل 😐", points: 1 }
        ]
    },
    {
        question: "ما مدى دعمكما لبعضكما البعض؟",
        answers: [
            { text: "ندعم بعضنا في كل شيء 💪", points: 10 },
            { text: "دعم قوي في معظم الأوقات 👍", points: 8 },
            { text: "دعم متوسط 🤝", points: 5 },
            { text: "دعم قليل 😕", points: 2 }
        ]
    }
];

// نتائج الاختبار
const results = {
    perfect: {
        range: [80, 100],
        title: "حب مثالي! 💕",
        description: "أنتما مخلوقان لبعضكما البعض! علاقتكما قوية ومليئة بالحب والتفاهم. استمرا هكذا! 🌟",
        emoji: "💯"
    },
    excellent: {
        range: [65, 79],
        title: "حب رائع! ❤️",
        description: "علاقتكما جميلة جداً ومليئة بالحب. هناك تفاهم كبير بينكما مع مساحة للنمو أكثر! 🌹",
        emoji: "💖"
    },
    good: {
        range: [50, 64],
        title: "حب جيد! 💗",
        description: "علاقتكما لها أساس جيد. مع المزيد من التواصل والوقت معاً، ستصبح أقوى! 💪",
        emoji: "💕"
    },
    average: {
        range: [35, 49],
        title: "حب متوسط 💙",
        description: "علاقتكما تحتاج إلى المزيد من الاهتمام والتواصل. اعملا معاً لتقوية الرابطة بينكما! 🤝",
        emoji: "💙"
    },
    weak: {
        range: [0, 34],
        title: "تحتاجان للعمل أكثر 💜",
        description: "علاقتكما تحتاج إلى الكثير من العمل والتفاهم. لا تيأسا، كل علاقة تحتاج وقت لتنمو! 🌱",
        emoji: "💜"
    }
};

// بدء اللعبة
function startGame() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (!name1 || !name2) {
        alert('يرجى إدخال الأسماء أولاً! 😊');
        return;
    }
    
    if (name1.length > 20 || name2.length > 20) {
        alert('الأسماء طويلة جداً! يرجى استخدام أسماء أقصر 😅');
        return;
    }
    
    playerNames.name1 = name1;
    playerNames.name2 = name2;
    currentQuestion = 0;
    score = 0;
    
    showPage('questionsPage');
    displayQuestion();
}

// عرض السؤال الحالي
function displayQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('questionText').textContent = question.question;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer.points);
        answersContainer.appendChild(button);
    });
}

// اختيار الإجابة
function selectAnswer(points) {
    score += points;
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        setTimeout(() => {
            displayQuestion();
        }, 300);
    } else {
        setTimeout(() => {
            showResults();
        }, 500);
    }
}

// عرض النتائج
function showResults() {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    let result;
    
    // تحديد النتيجة بناءً على النسبة المئوية
    for (const key in results) {
        const range = results[key].range;
        if (percentage >= range[0] && percentage <= range[1]) {
            result = results[key];
            break;
        }
    }
    
    document.getElementById('resultTitle').textContent = 
        `${playerNames.name1} و ${playerNames.name2}: ${result.title}`;
    document.getElementById('lovePercentage').textContent = `${percentage}% ${result.emoji}`;
    document.getElementById('resultDescription').textContent = result.description;
    
    showPage('resultsPage');
    
    // إضافة تأثيرات صوتية (اختيارية)
    if (percentage >= 80) {
        celebrateResult();
    }
}

// احتفال بالنتيجة العالية
function celebrateResult() {
    // إضافة المزيد من التأثيرات البصرية
    const fireworks = document.querySelectorAll('.fireworks');
    fireworks.forEach((firework, index) => {
        setTimeout(() => {
            firework.style.animation = 'bounce 0.5s ease-in-out 3';
        }, index * 200);
    });
}

// مشاركة النتيجة
function shareResult() {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    const shareText = `🔥 ${playerNames.name1} و ${playerNames.name2} حصلا على ${percentage}% في اختبار الحب! 💕\n\nجرب الاختبار بنفسك واكتشف مدى قوة علاقتك! ❤️\n\n#اختبار_الحب #الحب #العلاقات`;
    
    if (navigator.share) {
        navigator.share({
            title: 'اختبار الحب 💕',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        // نسخ النص للحافظة
        navigator.clipboard.writeText(shareText + '\n' + window.location.href)
            .then(() => {
                alert('تم نسخ النتيجة! يمكنك مشاركتها الآن 📱');
            })
            .catch(() => {
                // عرض النص في نافذة منبثقة كبديل
                prompt('انسخ هذا النص وشاركه:', shareText + '\n' + window.location.href);
            });
    }
    
    // تتبع المشاركات (لأغراض التحليل)
    trackShare(percentage);
}

// تتبع المشاركات
function trackShare(percentage) {
    // يمكن إضافة Google Analytics أو أي أداة تحليل أخرى هنا
    console.log(`مشاركة: ${percentage}% - ${playerNames.name1} و ${playerNames.name2}`);
    
    // محاكاة إرسال البيانات لخدمة التحليل
    // في التطبيق الحقيقي، يمكن إرسال هذه البيانات لخادم للتحليل
}

// اللعب مرة أخرى
function playAgain() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('name1').value = '';
    document.getElementById('name2').value = '';
    showPage('startPage');
}

// عرض الصفحة
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// تأثيرات إضافية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات تفاعلية للأزرار
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // إضافة تأثير الكتابة للمدخلات
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startGame();
            }
        });
    });
    
    // تأثيرات الخلفية المتحركة
    createFloatingHearts();
});

// إنشاء قلوب متحركة في الخلفية
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '💘'];
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% احتمال كل ثانية
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.opacity = '0.7';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '-1';
            heart.style.animation = 'floatUp 4s linear forwards';
            
            document.body.appendChild(heart);
            
            // إزالة القلب بعد انتهاء الحركة
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }
    }, 1000);
}

// إضافة CSS للقلوب المتحركة
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// منع النقر بالزر الأيمن (حماية بسيطة)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// منع تحديد النص (لتحسين تجربة المستخدم على الهاتف)
document.addEventListener('selectstart', function(e) {
    if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }
});