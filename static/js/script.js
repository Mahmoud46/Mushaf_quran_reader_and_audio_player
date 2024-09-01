let surahasContainer = document.querySelector(".surahs-names"),
	surahAyahs = document.querySelector(".surah-ayahs"),
	surahsMenu = document.querySelector(".surahs-menu"),
	audio = document.querySelector("audio"),
	slider = document.querySelector(".audio-player input"),
	durationTimes = document.querySelectorAll(".duration-time span"),
	layout = document.querySelector(".layout"),
	playPauseBtn = document.querySelector(".play-pause"),
	surahs_file_names = [
		"001.mp3",
		"002.mp3",
		"003.mp3",
		"004.mp3",
		"005.mp3",
		"006.mp3",
		"007.mp3",
		"008.mp3",
		"009.mp3",
		"010.mp3",
		"011.mp3",
		"012.mp3",
		"013.mp3",
		"014.mp3",
		"015.mp3",
		"016.mp3",
		"017.mp3",
		"018.mp3",
		"019.mp3",
		"020.mp3",
		"021.mp3",
		"022.mp3",
		"023.mp3",
		"024.mp3",
		"025.mp3",
		"026.mp3",
		"027.mp3",
		"028.mp3",
		"029.mp3",
		"030.mp3",
		"031.mp3",
		"032.mp3",
		"033.mp3",
		"034.mp3",
		"035.mp3",
		"036.mp3",
		"037.mp3",
		"038.mp3",
		"039.mp3",
		"040.mp3",
		"041.mp3",
		"042.mp3",
		"043.mp3",
		"044.mp3",
		"045.mp3",
		"046.mp3",
		"047.mp3",
		"048.mp3",
		"049.mp3",
		"050.mp3",
		"051.mp3",
		"052.mp3",
		"053.mp3",
		"054.mp3",
		"055.mp3",
		"056.mp3",
		"057.mp3",
		"058.mp3",
		"059.mp3",
		"060.mp3",
		"061.mp3",
		"062.mp3",
		"063.mp3",
		"064.mp3",
		"065.mp3",
		"066.mp3",
		"067.mp3",
		"068.mp3",
		"069.mp3",
		"070.mp3",
		"071.mp3",
		"072.mp3",
		"073.mp3",
		"074.mp3",
		"075.mp3",
		"076.mp3",
		"077.mp3",
		"078.mp3",
		"079.mp3",
		"080.mp3",
		"081.mp3",
		"082.mp3",
		"083.mp3",
		"084.mp3",
		"085.mp3",
		"086.mp3",
		"087.mp3",
		"088.mp3",
		"089.mp3",
		"090.mp3",
		"091.mp3",
		"092.mp3",
		"093.mp3",
		"094.mp3",
		"095.mp3",
		"096.mp3",
		"097.mp3",
		"098.mp3",
		"099.mp3",
		"100.mp3",
		"101.mp3",
		"102.mp3",
		"103.mp3",
		"104.mp3",
		"105.mp3",
		"106.mp3",
		"107.mp3",
		"108.mp3",
		"109.mp3",
		"110.mp3",
		"111.mp3",
		"112.mp3",
		"113.mp3",
		"114.mp3",
	];

let surahNumber = 1,
	repeat = false,
	shuffle = false;

surahs.forEach(
	(surah) => (surahasContainer.innerHTML += `<p>${surah.name}</p>`)
);
surahasContainer.querySelectorAll("p").forEach((surah) => {
	surah.addEventListener("click", (_) => {
		layout.classList.add("active");
		surahAyahs.innerHTML = "";
		surahasContainer.querySelector("p.active")?.classList.remove("active");
		surah.classList.add("active");
		getSurah(surah.innerText);
	});
});
document.querySelector(".menu").addEventListener("click", (e) => {
	surahsMenu.classList.toggle("active");
	e.target.classList.toggle("active");
	surahsMenu.classList.contains("active")
		? (e.target.innerText = "menu_open")
		: (e.target.innerText = "menu");
});

slider.addEventListener("input", (_) => {
	durationTimes[0].innerText = foramtTime(slider.value);
	audio.currentTime = slider.value;
});

playPauseBtn.addEventListener("click", (_) => {
	if (playPauseBtn.innerText == "play_arrow") {
		audio.play();
		playPauseBtn.innerText = "pause";
	} else {
		playPauseBtn.innerText = "play_arrow";
		audio.pause();
	}
});

audio.addEventListener("ended", (_) => {
	playPauseBtn.innerText = "play_arrow";
	audio.pause();
	if (shuffle) {
		document.querySelector(".next").click();
		playPauseBtn.innerText = "pause";
		audio.play();
	} else if (repeat) {
		playPauseBtn.innerText = "pause";
		audio.play();
	}
});

document.querySelector(".next").addEventListener("click", (_) => {
	surahNumber++;
	if (surahNumber > surahs_file_names.length) surahNumber = 1;
	getSurahUsingNumber(surahNumber);
});

document.querySelector(".prev").addEventListener("click", (_) => {
	surahNumber--;
	if (surahNumber < 1) surahNumber = surahs_file_names.length;
	getSurahUsingNumber(surahNumber);
});

document.querySelector(".shuffle").addEventListener("click", (e) => {
	e.target.classList.toggle("active");
	shuffle = e.target.classList.contains("active");
});

document.querySelector(".repeat").addEventListener("click", (e) => {
	e.target.classList.toggle("active");
	repeat = e.target.classList.contains("active");
});

setInterval((_) => {
	durationTimes[0].innerText = foramtTime(audio.currentTime);
	slider.value = audio.currentTime;
}, 500);

getSurah("سُورَةُ ٱلْفَاتِحَةِ");
surahasContainer.querySelectorAll("p")[0].classList.add("active");

function getSurahUsingNumber(surahNumber) {
	layout.classList.add("active");
	surahAyahs.innerHTML = "";
	surahasContainer.querySelector("p.active")?.classList.remove("active");
	surahasContainer
		.querySelectorAll("p")
		[surahNumber - 1].classList.add("active");
	surahs.forEach((surah) => {
		if (surahNumber == surah.number) {
			document.querySelector(".suhra-name").innerText = surah.name;
			setSurahAudio(surahs_file_names[surah.number - 1]);
			surah.ayahs.forEach((ayah) => {
				let en_ayah = getEnglishAyah(surah.name, ayah.numberInSurah);
				if (ayah.numberInSurah == 1) {
					if (
						ayah.text.split(" ").slice(4).join(" ") == "" &&
						ayah.text.split(" ").splice(0, 4).join(" ") ==
							"﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
					) {
						document.querySelector(".bsm.active")?.classList.remove("active");
						insertAyahsCard(ayah, en_ayah);
					} else if (
						ayah.text.split(" ").splice(0, 4).join(" ") !=
						"بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
					) {
						insertAyahsCard(ayah, en_ayah);
						document.querySelector(".bsm.active")?.classList.remove("active");
						console.log(true);
					} else {
						document.querySelector(".bsm").classList.add("active");
						surahAyahs.innerHTML += `
                            <div class="ayah-card">
                                <p>
                                    ${ayah.text.split(" ").slice(4).join(" ")}
                                    <i>&#1757 <small>${
																			en_ayah.numberInSurah
																		}</small></i>
                                </p>
                                <p> 
                                    ${en_ayah.text}
                                </p>
                            </div>
                        `;
					}
					console.log(ayah.text.split(" ").slice(4));
				} else insertAyahsCard(ayah, en_ayah);
			});
		}
	});
}

function getSurah(surahName) {
	surahs.forEach((surah) => {
		if (surahName == surah.name) {
			document.querySelector(".suhra-name").innerText = surah.name;
			surahNumber = surah.number;
			setSurahAudio(surahs_file_names[surah.number - 1]);
			surah.ayahs.forEach((ayah) => {
				let en_ayah = getEnglishAyah(surah.name, ayah.numberInSurah);
				if (ayah.numberInSurah == 1) {
					if (
						ayah.text.split(" ").slice(4).join(" ") == "" &&
						ayah.text.split(" ").splice(0, 4).join(" ") ==
							"﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
					) {
						document.querySelector(".bsm.active")?.classList.remove("active");
						insertAyahsCard(ayah, en_ayah);
					} else if (
						ayah.text.split(" ").splice(0, 4).join(" ") !=
						"بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
					) {
						insertAyahsCard(ayah, en_ayah);
						document.querySelector(".bsm.active")?.classList.remove("active");
						console.log(true);
					} else {
						document.querySelector(".bsm").classList.add("active");
						surahAyahs.innerHTML += `
                            <div class="ayah-card">
                                <p>
                                    ${ayah.text.split(" ").slice(4).join(" ")}
                                    <i>&#1757 <small>${
																			en_ayah.numberInSurah
																		}</small></i>
                                </p>
                                <p> 
                                    ${en_ayah.text}
                                </p>
                            </div>
                        `;
					}
					console.log(ayah.text.split(" ").slice(4));
				} else insertAyahsCard(ayah, en_ayah);
			});
		}
	});
}

function insertAyahsCard(ar_ayah, en_ayah) {
	surahAyahs.innerHTML += `
        <div class="ayah-card">
            <p>
                ${ar_ayah.text}
                <i>&#1757 <small>${ar_ayah.numberInSurah}</small></i>
            </p>
            <p> 
                ${en_ayah.text}
            </p>
        </div>
    `;
}

function getEnglishAyah(surahName, ayahNumber) {
	let en_ayah = {};
	en_surahs.forEach((surah) =>
		surah.name == surahName
			? surah.ayahs.forEach((ayah) =>
					ayah.numberInSurah == ayahNumber ? (en_ayah = ayah) : null
			  )
			: null
	);
	return en_ayah;
}

function setSurahAudio(fileName) {
	audio.src = `./static/audio/${fileName}`;
	slider.value = 0;
	audio.addEventListener("loadedmetadata", (_) => {
		durationTimes[1].innerText = foramtTime(audio.duration);
		slider.max = audio.duration;
		layout.classList.remove("active");
		playPauseBtn.innerText = "play_arrow";
		audio.pause();
	});
}

function foramtTime(time) {
	let min = Math.floor((time % (60 * 60)) / 60),
		sec = Math.floor((time % (60 * 60)) % 60),
		hrs = Math.floor(time / (60 * 60));
	min = min < 10 ? `0${min}` : min;
	sec = sec < 10 ? `0${sec}` : sec;
	hrs = hrs < 10 ? `0${hrs}` : hrs;
	return `${hrs}:${min}:${sec}`;
}
