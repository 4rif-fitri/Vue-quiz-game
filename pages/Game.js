let Game = {
  name: "Game",
  data() {
    return {
      QUESTION_BANK: [
        {
          cat: "Sains",
          q: "Planet ke-3 dari Matahari?",
          choices: ["Marikh", "Bumi", "Zuhrah", "Musytari"],
          answer: 1,
        },
        {
          cat: "Sains",
          q: "H2O merujuk kepada?",
          choices: ["Oksigen", "Air", "Hidrogen", "Karbon Dioksida"],
          answer: 1,
        },
        {
          cat: "Sejarah",
          q: "Negara merdeka Malaysia pada tahun?",
          choices: ["1955", "1957", "1963", "1970"],
          answer: 1,
        },
        {
          cat: "IT",
          q: "HTML bermaksud?",
          choices: [
            "Hyperlinks and Text Markup Language",
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language",
          ],
          answer: 1,
        },
        {
          cat: "IT",
          q: "CSS digunakan untuk?",
          choices: ["Struktur", "Gaya/rekabentuk", "Pangkalan", "Pelayan"],
          answer: 1,
        },
        {
          cat: "Sukan",
          q: "Berapa pemain bola sepak sepasukan di padang?",
          choices: ["9", "10", "11", "12"],
          answer: 2,
        },
        {
          cat: "Umum",
          q: "Ibu negara Jepun?",
          choices: ["Osaka", "Kyoto", "Tokyo", "Sapporo"],
          answer: 2,
        },
        {
          cat: "Umum",
          q: "Gunung tertinggi di dunia?",
          choices: ["K2", "Everest", "Kinabalu", "Alps"],
          answer: 1,
        },
        {
          cat: "Sains",
          q: "Simbol kimia bagi Natrium?",
          choices: ["Na", "So", "Sn", "No"],
          answer: 0,
        },
        {
          cat: "Sains",
          q: "Unit SI bagi arus elektrik?",
          choices: ["Volt", "Ampere", "Ohm", "Watt"],
          answer: 1,
        },
        {
          cat: "Geografi",
          q: "Sungai terpanjang di dunia?",
          choices: ["Nil", "Amazon", "Yangtze", "Mississippi"],
          answer: 1,
        },
        {
          cat: "Sejarah",
          q: "Empayar Rom jatuh pada abad?",
          choices: ["5", "10", "12", "15"],
          answer: 0,
        },
        {
          cat: "IT",
          q: "JavaScript jalan di?",
          choices: [
            "Hanya server",
            "Hanya pelayar",
            "Pelayar & server",
            "Hanya CLI",
          ],
          answer: 2,
        },
        {
          cat: "Umum",
          q: "Bahasa rasmi Malaysia?",
          choices: ["Inggeris", "Melayu", "Mandarin", "Tamil"],
          answer: 1,
        },
        {
          cat: "Sains",
          q: "Kelajuan cahaya ~?",
          choices: ["3×10^8 m/s", "3×10^6 m/s", "3×10^5 km/s", "3×10^7 m/s"],
          answer: 0,
        },
        {
          cat: "Geografi",
          q: "Benua terbesar?",
          choices: ["Afrika", "Amerika", "Asia", "Eropah"],
          answer: 2,
        },
        {
          cat: "Umum",
          q: "WHO bermaksud?",
          choices: [
            "World Hope Org",
            "World Health Organization",
            "Wildlife Health Org",
            "World Human Org",
          ],
          answer: 1,
        },
        {
          cat: "IT",
          q: "Git digunakan untuk?",
          choices: ["Reka grafik", "Kawalan versi", "Rangkaian", "Keselamatan"],
          answer: 1,
        },
        {
          cat: "Sains",
          q: "pH < 7 ialah?",
          choices: ["Asid", "Basa", "Neutral", "Garam"],
          answer: 0,
        },
        {
          cat: "Sukan",
          q: "Gelanggang badminton maksimum mata set?",
          choices: ["15", "21", "25", "30"],
          answer: 1,
        },
        {
          cat: "Umum",
          q: "Simbol Ringgit Malaysia?",
          choices: ["$", "RM", "R$", "MY$"],
          answer: 1,
        },
        {
          cat: "Sains",
          q: "Organ pam darah?",
          choices: ["Paru-paru", "Hati", "Jantung", "Buah pinggang"],
          answer: 2,
        },
        {
          cat: "IT",
          q: "SQL merujuk kepada?",
          choices: [
            "Sequential Query Language",
            "Structured Query Language",
            "Server Query Language",
            "Standard Query Language",
          ],
          answer: 1,
        },
        {
          cat: "Umum",
          q: "Hari kebangsaan Malaysia?",
          choices: ["31 Ogos", "16 Sept", "1 Jan", "14 Feb"],
          answer: 0,
        },
      ],
      mode: this.$route.params.mode == "mudah" ? "Casual" : "Susah",
      limit: this.$route.params.mode == "mudah" ? 10 : 20,
      currIndex: 0,
      score: 0,
      saat: 0,
      totalSaat: 0,
      minit: 0,
      dahTekan: false,
      idTimer: 0,
      idTimeOut: 0,
      idautoSave: 0,
      name: null,
      id: Math.floor(Math.random() * 1000000000000),
      possTime: null,
      possScore: null,
      randomQ:0
    };
  },
  mounted() {
    this.init();
    this.loadSaveGame();
  },
  watch: {
    currIndex(value) {
      if (value >= this.limit) {
        this.input();
      }
    },
  },
  computed: {},
  methods: {
    init() {
      // console.log(this.$route.params.mode);
      // let b = JSON.parse(localStorage.getItem("DataGame" + this.mode));
      // console.log(b);

      this.timer();
      this.autoSave();
    },

    random(){

      this.randomQ = Math.floor(Math.random() * this.QUESTION_BANK.length);
      //  this.random = this.QUESTION_BANK[0];
      // console.log(this.randomQ);

    },

    sortData() {
      let datas = JSON.parse(localStorage.getItem("DataGame" + this.mode)) || [];
      let now = {
        mode: this.mode,
        limit: this.limit,
        currIndex: this.currIndex,
        score: this.score,
        saat: this.saat,
        minit: this.minit,
        dahTekan: this.dahTekan,
        idTimer: this.idTimer,
        idTimeOut: this.idTimeOut,
        totalSaat: this.totalSaat,
        id: this.id,
      };

      datas = [...datas, now];

      let dataSort = [...datas].sort((a, b) => b.score - a.score);
      // console.table(dataSort);

      dataSort.filter((element, index) => {
        element.id === this.id ? (this.possScore = index) : "";
      });

      // console.log(this.possScore);
    },

    sortDataTime() {
      let datas = JSON.parse(localStorage.getItem("DataGame" + this.mode)) || [];
      let now = {
        mode: this.mode,
        limit: this.limit,
        currIndex: this.currIndex,
        score: this.score,
        saat: this.saat,
        minit: this.minit,
        dahTekan: this.dahTekan,
        idTimer: this.idTimer,
        idTimeOut: this.idTimeOut,
        totalSaat: this.totalSaat,
        id: this.id,
      };

      datas = [...datas, now];

      let dataSort = [...datas].sort((a, b) => b.totalSaat - a.totalSaat);
      // console.table(dataSort);

      dataSort.filter((element, index) => {
        element.id === this.id ? (this.possTime = index) : "";
      });

      // console.log(this.possTime);
    },

    loadSaveGame() {
      let data = JSON.parse(localStorage.getItem("autoSave")) || [];
      if (data.length <= 0) return;
      console.log(data);

      this.mode = data.mode;
      this.limit = data.limit;
      this.currIndex = data.currIndex;
      this.score = data.score;
      this.saat = data.saat;
      this.minit = data.minit;
      this.dahTekan = data.dahTekan;
      this.idTimer = data.idTimer;
      this.idTimeOut = data.idTimeOut;
      this.totalSaat = data.totalSaat;
      this.id = data.id;

      if (this.currIndex >= this.limit) {
        this.continuee();
      } else {
        this.pause();
      }
    },

    timer() {
      this.idTimer = setInterval(() => {
        this.totalSaat++;
        if (this.saat >= 60) {
          this.minit++;
          this.saat = 0;
        } else {
          this.saat += 1;
        }
      }, 1000);
    },

    semak(e, id) {
      if (this.dahTekan == true) return;
      this.sortData();
      this.sortDataTime();

      if (this.QUESTION_BANK[this.randomQ].answer === id) {
        e.target.classList.remove("btn-light");
        e.target.classList.add("btn-success");

        this.score++;
      } else {
        e.target.classList.remove("btn-light");
        e.target.classList.add("btn-danger");

        let btns = document.querySelectorAll(".bawah button");
        btns.forEach((btn, i) => {
          if (btn.dataset.idx == this.QUESTION_BANK[this.randomQ].answer) {
            btn.classList.remove("btn-light");
            btn.classList.add("btn-success");
          }
        });
      }
      this.dahTekan = true;
      this.delay();
    },

    delay() {
      document.querySelector(".bar").style.animation = "bar 1s linear";

      this.idTimeOut = setTimeout(() => {
        this.random();
        this.currIndex++;
        this.dahTekan = false;

        this.btnDefault();

        document.querySelector(".bar").style.animation = "none";
      }, 1000);
    },

    btnDefault() {
      let btns = document.querySelectorAll(".bawah button");
      btns.forEach((btn, i) => {
        btn.classList.remove("btn-success");
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-light");
      });
    },

    autoSave() {
      clearInterval(this.idTimer);
      this.idautoSave = setInterval(() => {
        localStorage.setItem(
          "autoSave",
          JSON.stringify({
            mode: this.mode,
            limit: this.limit,
            currIndex: this.currIndex,
            score: this.score,
            saat: this.saat,
            minit: this.minit,
            dahTekan: this.dahTekan,
            idTimer: this.idTimer,
            idTimeOut: this.idTimeOut,
            totalSaat: this.totalSaat,
            id: this.id,
          })
        );
      }, 1000);
    },

    pause() {
      clearInterval(this.idTimer);
      document.querySelector(".pop").style.display = "flex";
      document.querySelector(".pop_pause").classList.remove("hide");


    },
    continuee() {
      document.querySelector(".pop").style.display = "none";
      document.querySelector(".pop_pause").classList.add("hide");

      this.timer();
    },
    input() {
      document.querySelector(".pop").style.display = "flex";
      document.querySelector(".input").classList.remove("hide");
    },

    submitGame() {
      let a = document.querySelector("input").value.trim();
      if (a.length <= 0) {
        alert("Please Input Name");
        return;
      } else {
        console.log(a);
        this.storeData(a);
      }
    },

    storeData(nama) {
      let b = JSON.parse(localStorage.getItem("DataGame" + this.mode)) || [];

      let data = {
        name: nama,
        mode: this.mode,
        limit: this.limit,
        currIndex: this.currIndex,
        score: this.score,
        saat: this.saat,
        minit: this.minit,
        dahTekan: this.dahTekan,
        idTimer: this.idTimer,
        idTimeOut: this.idTimeOut,
        totalSaat: this.totalSaat,
        id: this.id,
      };

      let datas = [...b, data];
      // console.log(datas);

      localStorage.setItem("DataGame" + this.mode, JSON.stringify(datas));

      this.exit();
    },

    restart() {
      (this.currIndex = 0),
        (this.score = 0),
        (this.saat = 0),
        (this.minit = 0),
        (this.dahTekan = false),
        (this.idTimer = 0);
      clearTimeout(this.idTimeOut);
      clearInterval(this.idTimer);
      this.btnDefault();
      document.querySelector(".bar").style.animation = "none";
    },
    exit() {
      clearInterval(this.idautoSave);
      localStorage.removeItem("autoSave");
      this.$router.push("/");
    },
  },

  template: `
		  <div class="crad">
      <div class="pop">
        <div class="pop_pause hide">
          <h3>Continue</h3><br>
          <button @click="continuee" class="btn btn-primary">continue</button>
        </div>
        <div class="input hide">
              <h4>Game Compplate</h4>
              <h5>Mode : {{ mode }}</h5>
              <h5>Score : {{ score }}/{{ limit }} #{{ possScore+1 }}</h5>
              <h5>Time : {{ minit }}:{{ saat }} #{{ possTime+1 }}</h5>
              <input>
          <button @click="submitGame" class="btn btn-primary">Submit
          </button>
        </div>
      </div>
       <div class="atas">
        <div class="kiri">
          <h5>MODE : {{ mode }}</h5>
          <h5>Question : {{ currIndex+1 }} / {{ limit }}</h5>
          <h5>SCORE : {{ score }}</h5>
          <h5>TIME : {{ minit }}:{{ saat }}</h5>
        </div>
        <div class="kanan">
          <button @click="pause" class="btn btn-primary">Pause</button><br>
          <button @click="restart" class="btn btn-warning">Restart</button><br>
          <button @click="exit" class="btn btn-danger">Exit</button>
        </div>
       </div>
       <div class="bawah">
        <div class="bar"></div>
        <h2><strong>{{ QUESTION_BANK[randomQ].q }}</strong></h2>
        <button data-idx=0 @click="(e) => semak(e,0)" class="btn btn-light">{{ QUESTION_BANK[randomQ].choices[0] }}</button>
        <button data-idx=1 @click="(e) => semak(e,1)" class="btn btn-light">{{ QUESTION_BANK[randomQ].choices[1] }}</button>
        <button data-idx=2 @click="(e) => semak(e,2)" class="btn btn-light">{{ QUESTION_BANK[randomQ].choices[2] }}</button>
        <button data-idx=3 @click="(e) => semak(e,3)" class="btn btn-light">{{ QUESTION_BANK[randomQ].choices[3] }}</button>
       </div>
      </div>
	`,
};
export default Game