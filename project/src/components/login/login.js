import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import router from "../../router";
import service from "../../service/userservice";

export default {
  name: "login",
  mixins: [validationMixin],
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    };
  },

  validations: {
    form: {
      password: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.password = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;
      var data = {
        email: this.form.email,
        password: this.form.password
      };
      service.login(data).then(
        result => {
          console.log(result);
          localStorage.setItem("firstname", result.data[0].firstname);
          localStorage.setItem("email", result.data[0].email);
          localStorage.setItem("token", result.token.token);
          localStorage.setItem("userid", result._id);
          router.push("/dashboard");
          this.userSaved = true;
          this.sending = false;
          this.loading = false;
          this.clearForm();
        },
        error => {
          console.log("error", error);
          this.loading = false;
          this.userSaved = true;
          this.sending = false;
          this.lastUser = `${this.form.email} ${this.form.password}`;
        }
      );
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 5000);
        this.saveUser();
      }
    },

    register() {
      router.push("/register");
    }
  }
};
