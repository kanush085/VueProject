import iconlist from "../iconlist";
// import note  from "../note";
import noteService from "../../service/noteservice";
import {
  serverBus
} from "../../main";
export default {
  name: "displaynote",
  components: {
    iconlist
  },
  props: {
    card: {
      type: Array,
      required: true
    },
    archived: {
      type: String
    },
    trash: {
      type: String
    }
  },
  data() {
    return {
      image: String,
      showDialog: false,
      pinflag: false,
      updatetitle: String,
      updatedescription: String,
      updatecard: Object,
      updatecolor: String,
      view: Boolean,
    };
  },
  computed: {},
  created() {
    // Using the server bus
    serverBus.$on('serverSelected', (server) => {
      this.view = server;

    });
  },

  mounted() {},
  methods: {
    archive(e) {
      let ind = this.card.indexOf(e);
      this.card.splice(ind, 1);
    },
    unarchive(e) {
      this.archive(e);
    },

    trashNote(e) {
      let ind = this.card.indexOf(e);
      this.card.splice(ind, 1);
    },
    restore(array) {
      var data = {
        trash: false,
        noteID: [array._id]
      };
      noteService.trashNote(data).then(data => {
        console.log(data, "dddddddddddddddddddd");
        let ind = this.card.indexOf(array);
        this.card.splice(ind, 1);
      });
    },
    deleteForever(array) {
      var data = {
        noteID: [array._id]
      };
      noteService.deleteNote(data).then(data => {
        console.log(data);
        let ind = this.card.indexOf(array);
        this.card.splice(ind, 1);
      });
    },

    pinned(array) {
      var obj = {
        "pinned": true,
        "noteID": [array._id]
      }
      noteService.doPinned(obj).then(data => {
        console.log("data in pinned", data);
        this.unPinbar(array)
      })
    },
    unPinbar(array) {
      console.log("I CAME ", array);
      array.pinned = true
      this.$emit("unpinnedcards", array);
    },
    doUnPinned(array) {
      var data = {
        "pinned": false,
        "noteID": [array._id]
      }
      noteService.doPinned(data).then(data => {
        console.log("data in unpinned", data);
        this.pinbar(array)
      })
    },
    pinbar(array) {
      array.pinned = false
      this.$emit("pinnedcards", array);
    },
    updatepinned() {
      this.pinflag = !this.pinflag
    },
    showDialogpop(card) {
      console.log(card);
      this.showDialog = true
      this.updatetitle = card.title
      this.updatedescription = card.description
      this.updatecolor = card.color
      this.updatecard = card


    },
    update() {
      this.showDialog = false
      var data = {
        "noteID": this.updatecard._id,
        "title": this.updatetitle,
        "updateDescription": this.updatedescription
      }
      // if ((this.updatetitle === this.updatecard.title) || (this.updateDescription === this.updatecard.description)) {
      //   return
      // } else {
      noteService.updateNote(data).then(res => {
        console.log(res);
        this.updatecard.title = this.updatetitle;
        this.updatecard.description = this.updatedescription;
      })
      // }

    },
    deletelabel(card, label) {
      noteService.deleteNoteLabel({
        "noteID": [card._id],
        "label": label
      }).then(data => {
        console.log("After deleting the label ", data);
        let ind = card.label.indexOf(label)
        if (ind != -1) {
          card.label.splice(ind, 1)
        }

      })
    }
  }
};