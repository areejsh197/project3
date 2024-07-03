const loginData = {
  id: "login_form",
  title: "Welcome to Cooknet!",
  sections: [
    {
      id: "login_section",
      title: "Login Section",
      subsections: [
        {
          id: "login_subsection",
          title: "Login",
          subtitle: "Please enter your details.",
          users: [
            {
              id: "user_name",
              name: "",
              type: "text",
              placeholder: "Your username",
            },
            {
              id: "user_pass",
              name: "",
              type: "password",
              placeholder: "Your password",
            },
            {
              id: "remember_me",
              name: "Remember me",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
};

const signupData = {
  id: "signup_form",
  title: "Welcome to Cooknet!",
  sections: [
    {
      id: "signup_section",
      title: "Sign Up Section",
      subsections: [
        {
          id: "signup_subsection",
          title: "Sign Up",
          subtitle: "Create a new account.",
          users: [
            {
              id: "signup_user_name",
              name: "",
              type: "text",
              placeholder: "Choose a username",
            },
            {
              id: "signup_user_email",
              name: "",
              type: "email",
              placeholder: "Your email",
            },
            {
              id: "signup_user_pass",
              name: "",
              type: "password",
              placeholder: "Choose a password",
            },
            {
              id: "signup_confirm_pass",
              name: " ",
              type: "password",
              placeholder: "Confirm your password",
            },
          ],
        },
      ],
    },
  ],
};

const contactData = {
  id: "contact_us_section",
  title: "Contact Cooknet",
  subsections: [
    {
      id: "contact_us_subsection",
      title: "",
      subtitle: "We would love to hear from you!",
      fields: [
        {
          id: "contact_name",
          name: "Name",
          type: "text",
          placeholder: "Your name",
        },
        {
          id: "contact_email",
          name: "Email",
          type: "email",
          placeholder: "Your email",
        },
        {
          id: "contact_message",
          name: "Message",
          type: "textarea",
          placeholder: "Your message",
        },
      ],
    },
  ],
};

module.exports = {
  loginData,
  signupData,
  contactData
};
