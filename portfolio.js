
var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function opentab(tabName) {
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active-link");
    }
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active-tab");
    }
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabName).classList.add("active-tab");
}

const teacherData = [
    {
        name: "Hazee Marie Ilao",
        img: "Images/7dfa6590-83b8-474b-9e02-c331bd6da309.jpeg",
        bio: "A dedicated educator committed to fostering a supportive learning environment. Known for simplify complex concepts, she inspires students through personalized mentorship.",
        fb: "https://www.facebook.com/iamhazee.i"
    },
    {
        name: "Lhesler Saldivar",
        img: "Images/cfa59fae-5a42-4818-a157-d66e6eb89701.jpeg",
        bio: "A highly disciplined professional who values excellence and precision. He challenges students to exceed their expectations and prepares them for the rigors of the industry.",
        fb: "https://www.facebook.com/lhesler.saldivar.2025"
    },
    {
        name: "Kyzyl Jane Laurio",
        img: "Images/ca888bba-16e6-4f17-b281-924d49d8e83d.jpeg",
        bio: "An innovative educator with a passion for creative problem-solving. She integrates modern trends into her curriculum, encouraging students to approach tech with a fresh perspective.",
        fb: "https://www.facebook.com/Kyzlaurel"
    }
];

function loadTeachers() {
    const container = document.getElementById('workList');
    let html = "";
    for (let i = 0; i < teacherData.length; i++) {
        const teacher = teacherData[i];
        html += `
            <div class="work">
                <img src="${teacher.img}" alt="${teacher.name}">
                <div class="layer">
                    <h3>${teacher.name}</h3>
                    <p>${teacher.bio}</p>
                    <a href="${teacher.fb}" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

window.onload = loadTeachers;