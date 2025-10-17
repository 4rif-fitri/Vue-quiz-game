let Leaderboard = {
  name: "leaderboard",
  data() {
    return {
      mode: this.$route.params.mode === "mudah" ? "Casual" : "Expert",
      datas: null,
      dataSort: null,
      dataSortTime: null,
    };
  },
  mounted() {
    // let a = localStorage
    // console.log(this.$route.params.mode);
    this.init();
  },
  watch: {
    datas(s) {
      this.sortData();
      this.sortDataTime();
    },
  },
  methods: {
    toLeaderBoardMudah() {
      this.mode = "Casual";
      this.$router.push({ name: "leaderboard", params: { mode: "mudah" } });
      this.datas = JSON.parse(localStorage.getItem("DataGame" + this.mode));
      // console.log(this.datas);
    },
    toLeaderBoardSusah() {
      this.mode = "Susah";
      this.$router.push({ name: "leaderboard", params: { mode: "susah" } });
      this.datas = JSON.parse(localStorage.getItem("DataGame" + this.mode));
      // console.log(this.datas);
    },

    sortData() {
      this.dataSort = [...this.datas].sort((a, b) => b.score - a.score);
    },

    sortDataTime() {
      // console.table(this.datas);
      
      // this.dataSortTime = [...this.datas].sort((a, b) => b.totalSaat - a.totalSaat);
      // this.dataSortTime = [...this.datas].sort(
        // (a, b) => b.totalSaat - a.totalSaat
      // );
      this.dataSortTime = [...this.datas];
      for (let i = 0; i < this.dataSortTime.length; i++) {
        for (let j = 0; j < this.dataSortTime.length - 1; j++) {
          // console.log({i});
          // console.log({j});
          console.log(this.dataSortTime[j].totalSaat);
          if (
            this.dataSortTime[j].totalSaat > this.dataSortTime[j + 1].totalSaat
          ) {
            let temp = this.dataSortTime[j + 1];
            this.dataSortTime[j + 1] = this.dataSortTime[j];
            this.dataSortTime[j] = temp;
          }
        }
      }
      
      console.table(this.datas);
    },

    init() {
      let a = JSON.parse(localStorage.getItem("DataGame" + this.mode));
      // console.log(a);
      this.datas = a;
    },

    toBack() {
      this.$router.push("/");
    },
  },
  template: `
        <div class="card-liader-boadr">
        <div class="_atas">
          <h1>Leader board</h1>
          <div class="mode">
            <button @click="toLeaderBoardMudah" class="casual"><h6>Casual Mode</h6></button>
            <button @click="toLeaderBoardSusah" class="expert"><h6>Expert Mode</h6></button>
          </div>
          <hr />
        </div>
        <div class="_tengah">
          <div class="_kiri">
            <h3>Score Rankings</h3>
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="datas" v-for="(data, index) in dataSort">
                  <th scope="row">{{ index+1 }}</th>
                  <td>{{ data.name }}</td>
                  <td>{{ data.score }}</td>
                </tr>

                <tr v-else>
                  <td></td>
                  <td>No Record Yet</td>
                  <td></td>
                </tr>

                <tr></tr>
              </tbody>
            </table>
          </div>
          <div class="_kanan">
            <h3>Score Rankings</h3>
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="datas" v-for="(data, index) in dataSortTime">
                  <th scope="row">{{ index+1 }}</th>
                  <td>{{ data.name }}</td>
                  <td>{{ data.minit }}:{{ data.saat }}</td>
                </tr>
                
                <tr v-else>
                  <td></td>
                  <td>No Record Yet</td>
                  <td></td>
                </tr>
                
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="_bawah">
          <button @click="toBack" class="btn btn-secondary">Exit</button>
        </div>
      </div>
	`,
};
export default Leaderboard;
