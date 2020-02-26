import noteservice from "../../service/noteservice";
import {
  reverse,
  filterBy,
  findBy
} from '../../service/filter';



export default {
  name: "iconlist",
  components: {},
  props: {
    notecard: {
      type: Object
    },
    more: {
      type: String
    }
  },
  data() {
    return {
      flag1: false,
      Addlabel: "",
      checklabel: "",
      colorArray: [
        [{
            color: "#FFFFFF",
            name: "White"
          },
          {
            color: "#F28B82",
            name: "Red"
          },
          {
            color: "#FBBC04",
            name: "Orange"
          },
          {
            color: "#FFF475",
            name: "Yellow"
          }
        ],

        [{
            color: "#CCFF90",
            name: "Green"
          },
          {
            color: "#A7FFEB",
            name: "Teal"
          },
          {
            color: "#CBF0F8",
            name: "Blue"
          },
          {
            color: "#AECBFA",
            name: "Darkblue"
          }
        ],

        [{
            color: "#D7AEFB",
            name: "Purple"
          },
          {
            color: "#FDCFE8",
            name: "Pink"
          },
          {
            color: "#E6C9A8",
            name: "Brown"
          },
          {
            color: "#E8EAED",
            name: "Gray"
          }
        ]
      ],
      image: String,
      labelArray: [],
      userInput: "",
      ailabel: []
    };
  },
  computed: {},
  mounted() {
    noteservice.getLabel().then(res => {
      this.labelArray = res.data;
      for (let index = 0; index < this.labelArray.length; index++) {
        this.ailabel.push(this.labelArray[index].label)
      }

    });
  },
  methods: {
    reverse,
    filterBy,
    findBy,
    colorsEdit(color, card) {
      if (card == undefined) {
        this.$emit("cardcolor", color);
      } else {
        card.color = color;
        this.updateColor(color, card);
      }
    },
    updateColor(color, card) {
      // console.log("card......", card);
      // console.log("color", card.color);
      var data = {
        color: color,
        noteID: card._id
      };
      noteservice.updateColor(data).then(data => {
        console.log(data, "hnbnnnnnnnnnnnnnn");
      });
    },
    reverseFlag() {
      this.flag1 = !this.flag1
    },
    doArchive(card) {
      // console.log(card,"cardddd")
      // console.log(card._id, "cardidddddddddd")
      // if (card == undefined) {

      //   this.archivednoteCard.emit(true)
      // }
      // else {
      var data = {
        archive: true,
        noteID: [card._id]
      };
      noteservice.archiveNote(data).then(res => {
        console.log(res, "NOTE ARCHIVED");
        this.cardArchive(card);
      });

      // }
    },
    cardArchive(card) {
      card.archive = true;
      this.$emit("card", card);
    },

    doUnArchive(card) {
      console.log("in unarchive", card);
      var data = {
        archive: false,
        noteID: [card._id]
      };
      noteservice.archiveNote(data).then(res => {
        console.log(res, "NOTE UNARCHIVED");
        this.notArchive(card);
      });
    },
    notArchive(card) {
      card.archive = false;
      this.$emit("unarchivecard", card);
    },

    deletecard(card) {
      console.log("came to delete", card);
      var data = {
        trash: true,
        noteID: [card._id]
      };
      noteservice.trashNote(data).then(res => {
        console.log(res, "dsssssssssss");
        this.isDeleted(card);
      });
    },
    isDeleted(card) {
      card.trash = true;
      this.$emit("deleteNote", card);

    },
    processFile(e) {
      console.log(e);
      console.log(e.target.files[0].name);
      this.image = e.target.files[0].name;
      // this.$emit("image",this.image)
    },
    addlabel(card, label) {
      console.log(card, label, "xxxxxxxxxxxxxxxxxxxxxxxxxx");
      noteservice.saveLabeltoNote({
        "noteID": [card._id],
        "label": label.label
      }).then(result => {
        console.log("label select ", result);
        card.label.push(label.label)

      })
    }
  }
};