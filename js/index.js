const App_ID = '4f8037bcee56c6f9c4de91b715b84b7c';
const DEFAULT_VALUE = '--';
// tạo biến default_value để khi dữ liệu kh có sẽ hiển thị dấu --

const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');

searchInput.addEventListener('change', function(e) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${App_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            // phần weather ta sẽ dựa theo ở phần console trên trình duyệt
            // data.weather[0].description: lấy data ở phần weather
            // ở phần tử số 0 có thuộc tính là description vì nó có chứa phần mình cần           
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            // giống như ở phần weatherState thay 10d mặc định của API
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
            // data.main.temp giống như phần weatherState
            // nhưng trog phần console thì nhiệt độ ở phần main và trog temp
            // và để làm tròn số ta dùng Math.round()

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
            // lưu ý: speed ở đây nó sẽ hiển thị m/s
            //muốn hiển thị km/h ta phải nhân vs 3.6
            //khi nhân vs 1 số thập phân sẽ ra số lẻ nên ta sex fixed nó giữ lại 2 số thập phân
        });
});

// Trợ lý ảo
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'vi-VI';
recognition.continuous = false;

const microphone = document.querySelector('.microphone');

microphone.addEventListener('click', (e) => {
    e.preventDefault();

    recognition.start();
});

recognition.onspeechend = () => {
    recognition.stop();
}

recognition.onerror = (err) => {
    console.error(err);
}

recognition.onresult = (e) => {
    console.log('onresult', e);
}