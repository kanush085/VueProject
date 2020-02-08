import VueRouter from "vue-router";
import Vue from "vue";
import { mdbInput, mdbContainer } from "mdbvue";
import router from "../../router";
import noteService from "../../service/noteservice";
Vue.use(VueRouter);
export default {
  name: "dashboard",
  components: {
    mdbInput,
    mdbContainer
  },
  props: [],
  data() {
    return {
      form: {
        label: null
      },
      flag: false,
      showDialog: false,
      Keepname: "Keep",
      menuVisible: false,
      imageflag: true,
      selectedEmployee: null,
      username: String,
      useremail: String,
      url: String,
      image: String,
      labelArray: [],
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone",
        "Creed Bratton",
        "Oscar Nunez",
        "Toby Flenderson",
        "Stanley Hudson",
        "Meredith Palmer",
        "Phyllis Lapin-Vance"
      ],
    };
  },
  computed: {},
  mounted() {
    this.username = localStorage.getItem("firstname");
    this.useremail = localStorage.getItem("email");
    this.url = "Notes";
    noteService.getLabel().then(res => {
      this.labelArray = res.data;
    });
    this.image = localStorage.getItem('image')
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    logout() {
      localStorage.clear();
      router.push("/login");
    },
    archive() {
      if (router.currentRoute.path === "/dashboard/archive") {
        this.url = "Archive";
      }
      this.Keepname = "Archive";
      this.imageflag = !this.imageflag;
      // router.push("/dashboard/archive");
    },
    note() {
      if (router.currentRoute.path === "/dashboard/note") {
        this.url = "Notes";
      }
      this.Keepname = "Keep";
      this.imageflag = !this.imageflag;
    },
    trash() {
      if (router.currentRoute.path === "/dashboard/trash") {
        this.url = "Trash";
      }
      this.Keepname = "Trash";
      this.imageflag = !this.imageflag;
      // router.push("/dashboard/trash");
    },

    tick() {
      var data = {
        userId: localStorage.getItem("userid"),
        label: this.form.label
      };
      noteService.createLabel(data).then(res => {
        this.form.label = null;
        this.labelArray.push(res.data);
      });
    },
    wrong() {
      this.form.label = null;
    },

    deletelabel(label) {
      var key = this.labelArray.indexOf(label);
      this.labelArray.splice(key, 1);
      var data = {
        labelID: [label._id]
      };
      noteService.deletelabel(data).then(res => {
        console.log(res, "Delete label data");
      });
    },
    reversflag(label) {
      console.log(label);

      this.flag = !this.flag;

    },
    editlabels(label) {
      console.log("Came to to edit label");
      var data = {
        labelID: label._id,
        label: label.label
      };
      noteService.editlabel(data).then(res => {
        console.log(res, "xxxxxxxxxxxxxxxxxxxxxxxx");
      });
    },
    processFile(e) {
      const filedata = new FormData()
      filedata.append('image', e.target.files[0])
      noteService.setprofilepic(filedata).then(res => {
        this.image = res.data
        localStorage.setItem('image', res.data)

      })
    }
  }
};
