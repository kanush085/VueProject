import router from "../../router";
import { required, email, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import service from "../../service/userservice";
export default {
  name: "register",
  mixins: [validationMixin],
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      form: {
        firstname: null,
        lastname: null,
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
      firstname: {
        required,
        minLength: minLength(3)
      },
      lastname: {
        required,
        minLength: minLength(3)
      },
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
      this.form.firstname = null;
      this.form.lastname = null;
    },
    showSnackbar() {
      this.userSaved = false;
    },
    saveUser() {
      var postdata = {
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        email: this.form.email,
        password: this.form.password
      };
      this.sending = true;
      service.register(postdata).then(
        result => {
          console.log(result);
          router.push("/login");
          this.lastUser = `${this.form.email}`;
          this.sending = false;
          this.loading = false;
          this.clearForm();
        },
        error => {
          if (error) {
            this.loading = false;
            this.lastUser = `${this.form.email}`;
            this.userSaved = true;
            this.sending = false;
          }
        }
      );
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;
        this.saveUser();
      }
    },
    login() {
      router.push("/login");
    }
  }
};
