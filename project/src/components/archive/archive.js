import service from "../../service/userservice";
import displaynote from "../displaynote";
export default {
  name: "archive",
  components: { displaynote },
  props: [],
  data() {
    return {
      archivedCard: [],
      more: "archive"
    };
  },
  computed: {},
  mounted() {
    this.getArchivedCards();
  },
  methods: {
    getArchivedCards() {
      service.getNotes().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].archive) {
            console.log("Entered");
            this.archivedCard.push(res.data[i]);
          }
        }
      });
    }
  }
};
