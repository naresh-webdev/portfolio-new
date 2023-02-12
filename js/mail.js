export class mail {
  error = document.querySelector(".error");
  errorText = document.querySelector(".errorText");
  success = document.querySelector(".success");
  successText = document.querySelector(".successText");
  constructor(serviceID, templateID, publicKey) {
    this.serviceId = serviceID;
    this.templateId = templateID;
    this.publicKey = publicKey;
    this.templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("textarea").value,
    };

    document
      .querySelector(".submit-btn")
      .addEventListener("click", this.btnOnClick.bind(this));
  }

  btnOnClick(e) {
    e.preventDefault;
    this.templateParams.name = document.getElementById("name").value;
    this.templateParams.email = document.getElementById("email").value;
    this.templateParams.subject = document.getElementById("subject").value;
    this.templateParams.message = document.getElementById("textarea").value;

    // * 1.check if all the field are not empty
    if (
      this._isEmpty([
        this.templateParams.name,
        this.templateParams.email,
        this.templateParams.subject,
        this.templateParams.message,
      ])
    ) {
      // *2.check if the name has atleast 3 characters
      if (this.templateParams.name.length >= 3) {
        this._isDeliverable(this.templateParams.email);
      } else {
        //! error for condition 2-solved
        // alert("name should be atleast 3 character or more");
        if (this.error.classList.contains("success")) {
          revertSuccess.call(this, "Name cannot be less than 3 characters !!!");
        }
        this.errorText.textContent =
          "Name cannot be less than 3 characters !!!";
        this.error.style.opacity = 1;
      }
    } else {
      //! error for condition 1-solved
      if (this.error.classList.contains("success")) {
        revertSuccess.call(this, "Empty fields not allowed !!!");
      }
      // alert("empty fields not allowed !!!");
      this.errorText.textContent = "Empty fields not allowed !!!";
      this.error.style.opacity = 1;
    }
  }

  _isEmpty([...args]) {
    // console.log(args);
    if (args.every((field) => field !== "")) {
      return true;
    } else {
      return false;
    }
  }

  _isDeliverable(email) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    return fetch(
      `http://api.eva.pingutil.com/email?email=${email}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "success") {
          if (res.data.deliverable) {
            this._sendMail();
          } else {
            //!raise error-solved
            if (this.error.classList.contains("success")) {
              revertSuccess.call(this, "Invalid email address !!!");
            }
            this.errorText.textContent = "Invalid email address !!!";
            this.error.style.opacity = 1;
            throw new Error("email address not delievarable");
          }
        } else {
          //!raise error-solved
          if (this.error.classList.contains("success")) {
            revertSuccess.call(this, "Enter a valid email address !!!");
          }
          this.errorText.textContent = "Enter a valid email address !!!";
          this.error.style.opacity = 1;
          throw new Error("enter a valid email address");
        }
      })
      .catch((err) => {
        //!raise error-solved
        if (this.error.classList.contains("success")) {
          revertSuccess.call(this, ` Error: ${err.message} !!!`);
        }
        this.errorText.textContent = ` Error: ${err.message} !!!`;
        this.error.style.opacity = 1;
      });
  }

  _sendMail() {
    emailjs.init(this.publicKey);
    emailjs
      .send(
        this.serviceId,
        this.templateId,
        this.templateParams,
        this.publicKey
      )
      .then((res) => {
        if (res.status === 200) {
          //!success message
          // alert("success message sent");
          successMessageTemplate.call(this);
        } else {
          //!raise error - solved
          if (this.error.classList.contains("success")) {
            revertSuccess.call(
              this,
              `message couldn't send please try again!!!`
            );
          }
          // alert("message couldn't send please try again");
          this.errorText.textContent = `message couldn't send please try again!!!`;
          this.error.style.opacity = 1;
        }
      })
      .catch((err) => console.error(err));
  }
}

const successMessageTemplate = function () {
  const img = document.querySelector(".close-icon-error");
  img.src = "img/x-green.svg";
  img.addEventListener("load", () => {
    this.error.style.backgroundColor = "#dff2bf";
    this.error.style.color = "#270";
    this.errorText.textContent = "Message sent";
    this.error.style.opacity = 1;
  });
  this.error.classList.add("success");
};

const revertSuccess = function (errorMessage) {
  const img = document.querySelector(".close-icon-error");
  img.src = "img/x.svg";
  img.addEventListener("load", () => {
    this.error.style.backgroundColor = "#f03e3e";
    this.error.style.color = "#f5f5f5";
    this.errorText.textContent = errorMessage;
    this.error.classList.remove("success");
  });
};
