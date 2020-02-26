import takenote from "../takenote";
import displaynote from "../displaynote";
import service from "../../service/userservice";
import noteservice from "../../service/noteservice";

// import Vue from 'vue';
// Vue.forceUpdate();
export default {
  name: "note",
  components: {
    takenote,
    displaynote
  },
  props: [],
  data() {
    return {
      cards: [],
      parentmessage: "",
      Unpinnedcards: []
    };
  },
  computed: {},
  mounted() {


  },

  created() {
    console.log(localStorage.getItem('firstname'));

    service.getNotes().then(res => {

      console.log("dsssssssssssssssssssssssssssssssssssssss");
      this.cards = [];
      this.Unpinnedcards = [];

      for (let i = 0; i < res.data.length; i++) {
        if (!res.data[i].archive && !res.data[i].trash && res.data[i].pinned) {
          this.cards.push(res.data[i]);
        } else if (!res.data[i].archive && !res.data[i].trash && !res.data[i].pinned) {
          this.Unpinnedcards.push(res.data[i])
        }
      }
      this.cards = this.cards.slice().reverse();
      this.Unpinnedcards = this.Unpinnedcards.slice().reverse();
    });
    this.subscription = noteservice.getMessage().subscribe(message => {
      console.log(message, "ssssssss");

      if (message) {
        // add message to local state if not empty
        service.getNotes().then(res => {
          this.cards = [];
          this.Unpinnedcards = [];
          for (let i = 0; i < res.data.length; i++) {
            if (!res.data[i].archive && !res.data[i].trash && res.data[i].pinned) {
              this.cards.push(res.data[i]);
            } else if (!res.data[i].archive && !res.data[i].trash && !res.data[i].pinned) {
              this.Unpinnedcards.push(res.data[i])
            }
          }
          this.cards = this.cards.slice().reverse();
          this.Unpinnedcards = this.Unpinnedcards.slice().reverse();

        });
      }
    });
  },
  beforeDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  },
  methods: {
    recievedPinned($event) {
      // console.log("in $",$event);
      let ind = this.cards.indexOf($event)
      this.Unpinnedcards.splice(0, 0, $event)
      this.cards.splice(ind, 1)
    },

    recieveUnPinned($event) {
      let ind = this.Unpinnedcards.indexOf($event)
      this.Unpinnedcards.splice(ind, 1)
      this.cards.splice(0, 0, $event)
    }
  }
};