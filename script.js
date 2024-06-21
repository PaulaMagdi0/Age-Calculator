const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const resultElement = document.getElementById('result');
const downloadButton = document.getElementById('downloadButton');

function calculateAge() {
    const today = new Date();
    const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);

    if (birthDate > today) {
        resultElement.textContent = "Please Enter a Valid Age";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        days += lastMonth.getDate();
        months--;
    }

    if (dayInput.value <= 31 && dayInput.value > 0 && monthInput.value <= 12 
        && monthInput.value > 0 && yearInput.value >= 100 ) {
        resultElement.textContent = `${years} years ${months} months ${days} days`;
    }else {
        if (!dayInput.value || dayInput.value > 31) {
            resultElement.textContent = `Please Enter a Valid Day`;
        }else if (!monthInput.value || monthInput.value > 12) {
            resultElement.textContent = `Please Enter a Valid Month`;
        }else if (!yearInput.value || yearInput.value < 100){
            resultElement.textContent = `Please Enter a Valid Years`;
        }
    }
}

dayInput.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
    }
});

monthInput.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
    }
});

yearInput.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
    }
});

function downloadResult() {
    const resultElement = document.getElementById('result');
    const link = document.createElement('a');

    html2canvas(resultElement, {
        useCORS: true,
        logging: true,
        scale: 2,
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const img = new Image();
        img.src = imgData;

        // Create a new canvas to add some styling to the image
        const styledCanvas = document.createElement('canvas');
        const styledCtx = styledCanvas.getContext('2d');
        styledCanvas.width = canvas.width;
        styledCanvas.height = canvas.height;

        // Add a background color and some padding
        styledCtx.fillStyle = '#f9f9f9';
        styledCtx.fillRect(0, 0, styledCanvas.width, styledCanvas.height);
        styledCtx.drawImage(img, 20, 20);

        // Add some text styling to the result
        styledCtx.font = '24px Arial';
        styledCtx.fillStyle = '#333';
        styledCtx.textAlign = 'center';
        styledCtx.textBaseline = 'middle';
        styledCtx.fillText(resultElement.textContent, styledCanvas.width / 2, styledCanvas.height / 2);

        // Convert the styled canvas to a data URL
        const styledImgData = styledCanvas.toDataURL('image/png');

        // Create a link to download the image
        link.href = styledImgData;
        link.download = 'age_result.png';
        link.click();
    });
}

calculateAge();

dayInput.addEventListener('input', calculateAge);
monthInput.addEventListener('input', calculateAge);
yearInput.addEventListener('input', calculateAge);

downloadButton.addEventListener('click', downloadResult);

particlesJS("particles-js", 
    {"particles":
        {"number":
            {"value":300,"density":
                {"enable":true,"value_area":1000}
            },
            "color":{"value":"#ffffff"},
            "shape":
            {
                "type":"circle",
                "stroke":{"width":0,"color":"#000000"},
                "polygon":{"nb_sides":5},
                "image":{"src":"img/github.svg","width":100,"height":100}
            },
            "opacity":
            {
                "value":0.5,"random":false,
                "anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}
            },
            "size":
            {
                "value":5,"random":true,
                "anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}
            },
            "line_linked":
            {"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},
            "move":{
                "enable":true,"speed":6,
                "direction":"none",
                "random":false,
                "straight":false,
                "out_mode":"out",
                "bounce":false,
                "attract":{"enable":false,"rotateX":600,"rotateY":1200}
            }
        },
        "interactivity":
        {"detect_on":"canvas","events":
            {
                "onhover":
                {"enable":true,"mode":"repulse"},
                "onclick":{"enable":true,"mode":"push"},
                "resize":true
            },
            "modes":
            {
                "grab":
                {"distance":400,"line_linked":
                    {"opacity":1}
                },
                "bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},
                "repulse":{"distance":200,"duration":0.4},
                "push":{"particles_nb":4},
                "remove":{"particles_nb":2}
            }
        },
        "retina_detect":true
    }
);

var count_particles, stats, update; 
stats = new Stats; stats.setMode(0); 
stats.domElement.style.position = 'absolute'; 
stats.domElement.style.left = '0px'; 
stats.domElement.style.top = '0px'; 
document.body.appendChild(stats.domElement); 
count_particles = document.querySelector('.js-count-particles'); 
update = function() { stats.begin(); stats.end(); 
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { 
        count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; 
    } 
    requestAnimationFrame(update); 
}; 
requestAnimationFrame(update);
