document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const header = document.querySelector('.main-header');
const scrollThreshold = 50; 

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const showRegisterLink = document.querySelector('#show-register');
const showLoginLink = document.querySelector('#show-login');

if (loginForm && registerForm && showRegisterLink && showLoginLink) {
  
  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });
}

function setupPasswordToggle(toggleId, inputId) {
    const toggleIcon = document.querySelector(toggleId);
    const inputField = document.querySelector(inputId);

    if (toggleIcon && inputField) {
        toggleIcon.addEventListener('click', () => {
            const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
            inputField.setAttribute('type', type);
            
            if (type === 'password') {
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        });
    }
}

setupPasswordToggle('#toggle-password', '#login-password');
setupPasswordToggle('#toggle-reg-password', '#reg-password');
setupPasswordToggle("#toggle-reg-confirm", "#reg-password-confirm");
setupPasswordToggle("#toggle-new-pass", "#new-password");
setupPasswordToggle("#toggle-confirm-pass", "#confirm-password");


const allFollowButtons = document.querySelectorAll(".follow-button");
const unfollowModal = document.querySelector("#unfollow-modal");
const modalBtnBatal = document.querySelector("#modal-btn-batal");
const modalBtnYa = document.querySelector("#modal-btn-ya");
const modalUsername = document.querySelector("#modal-message-username");

let currentButtonToUnfollow = null;

if (allFollowButtons.length > 0 && unfollowModal) {
  allFollowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); 

      currentButtonToUnfollow = e.currentTarget;

      if (currentButtonToUnfollow.classList.contains("follow")) {
        currentButtonToUnfollow.textContent = "Mengikuti";
        currentButtonToUnfollow.classList.remove("follow");
        currentButtonToUnfollow.classList.add("following");
      }
      else if (currentButtonToUnfollow.classList.contains("following")) {
        const userCard = currentButtonToUnfollow.closest(".user-details-top");
        const username = userCard.querySelector(".username").textContent;

        modalUsername.textContent = username;
        unfollowModal.classList.add("modal-active");
      }
    });
  });

  modalBtnBatal.addEventListener("click", () => {
    unfollowModal.classList.remove("modal-active");
    currentButtonToUnfollow = null; 
  });

  modalBtnYa.addEventListener("click", () => {
    if (currentButtonToUnfollow) {
      currentButtonToUnfollow.textContent = "Ikuti";
      currentButtonToUnfollow.classList.remove("following");
      currentButtonToUnfollow.classList.add("follow");
    }
    unfollowModal.classList.remove("modal-active");
    currentButtonToUnfollow = null;
  });

  unfollowModal.addEventListener("click", (e) => {
    if (e.target === unfollowModal) {
      unfollowModal.classList.remove("modal-active");
      currentButtonToUnfollow = null;
    }
  });
}


const copyToast = document.querySelector("#copy-toast");
const toastMessage = document.querySelector("#toast-message");

function showToast(message) {
  if (copyToast && toastMessage) {
    toastMessage.textContent = message;
    copyToast.classList.add("toast-active");

    setTimeout(() => {
      copyToast.classList.remove("toast-active");
    }, 3000);
  }
}

const allActionButtons = document.querySelectorAll(".post-actions button");

allActionButtons.forEach((button) => {
  const icon = button.querySelector("i");

  if (icon && icon.classList.contains("fa-share-square")) {
    button.addEventListener("click", (e) => {
      e.preventDefault(); 

      const postUrl = "https://cookconnect.demo/post/" + Math.random().toString(36).substring(2, 9);

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(postUrl)
          .then(() => {
            showToast("Link resep disalin ke clipboard!");
          })
          .catch((err) => {
            showToast("Gagal menyalin link");
            console.error("Gagal menyalin: ", err);
          });
      } else {
        alert("Fitur salin link tidak didukung di browser ini.");
      }
    });
  }
});


const allLikeButtons = document.querySelectorAll(
  ".post-actions button i.fa-heart"
);

allLikeButtons.forEach((icon) => {
  const button = icon.closest("button"); 

  button.addEventListener("click", (e) => {
    e.preventDefault();

    button.classList.toggle("like-active");

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
    }
    
  });
});


const allBookmarkButtons = document.querySelectorAll(
  ".post-actions button i.fa-bookmark"
);

allBookmarkButtons.forEach((icon) => {
  const button = icon.closest("button"); 

  button.addEventListener("click", (e) => {
    e.preventDefault();

    button.classList.toggle("save-active");

    const textNode = button.lastChild;

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      if (textNode && textNode.nodeType === 3) {
        textNode.nodeValue = " Disimpan"; 
      }
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      if (textNode && textNode.nodeType === 3) {
        textNode.nodeValue = " Simpan"; 
      }
    }
  });
});
