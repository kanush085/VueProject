import iconlist from "../iconlist";
import service from "../../service/userservice";
import noteservice from "../../service/noteservice";
export default {
  name: "takenote",
  components: {
    iconlist
  },
  props: [],
  data() {
    return {
      flag: true,
      bgcolor: "#FFFFFF",
      isLable: [],
      isArchive: false,
      isPinned: false,
      isreminder: "",
      takeNote: {
        title: "",
        description: ""
      },
      pinflag: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    reverseFlag() {
      this.flag = !this.flag;
    },
    addnote() {
      this.flag = !this.flag;
      if (this.takeNote.title == "" && this.takeNote.description == "") {
        this.bgcolor = "#FFFFFF";
        return;
      } else {
        var note = {
          title: this.takeNote.title,
          description: this.takeNote.description,
          reminder: this.isreminder,
          pinned: this.isPinned,
          archive: this.isArchive,
          color: this.bgcolor,
          trash: false,
          image: "",
          label: this.isLable
        };
        console.log(note, "dsaaaaaddddaa");
        service.addNote(note).then(res => {
          console.log(res);
          noteservice.sendMessage("From  child to parent ");
          this.takeNote.title = "";
          this.takeNote.description = "";
        });
      }
    },
    changeColor(e) {
      this.bgcolor = e;
    },
    pinned() {
      this.pinflag = !this.pinflag
    }
  }
};