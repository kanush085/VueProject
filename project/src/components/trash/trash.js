import service from "../../service/userservice";
import displaynote from "../displaynote";
export default {
  name: "trash",
  components: { displaynote },
  props: [],
  data() {
    return {
      trashCard: [],
      trash: "trash"
    };
  },
  computed: {},
  mounted() {
    this.getTrashCards();
  },
  methods: {
    getTrashCards() {
      service.getNotes().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].trash) {
            console.log("Entered");
            this.trashCard.push(res.data[i]);
          }
        }
      });
    }
  }
};
