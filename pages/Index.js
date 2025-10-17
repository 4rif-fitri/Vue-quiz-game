let Index = {
  name: "Index",
  mounted() {
    this.loadSaveGame()
  },
  methods: {
    toMudah() {
      this.$router.push({ name: "game", params: { mode: "mudah" } });
    },
    toSusah() {
      this.$router.push({ name: "game", params: { mode: "susah" } });
    },
    toLeaderBoard() {
      this.$router.push({ name: "leaderboard", params: { mode: "mudah" } });
    },
    loadSaveGame() {
        let data = JSON.parse(localStorage.getItem("autoSave"));
        console.log(data);
        if(!data) return
        this.$router.push({name:"game",params:{mode:data.mode}})
    },
  },
  template: `
		  <div class="card-index">
        <div class="card-index-iner">
          <h1>Quizz</h1>
          <button @click='toMudah' class="btn btn-success">Casual</button><br>
          <button @click='toSusah' class="btn btn-danger">Expert</button><br>
          <button @click='toLeaderBoard' class="btn btn-primary">Leader Board</button>
        </div>
      </div>
  	
  `,
};
export default Index