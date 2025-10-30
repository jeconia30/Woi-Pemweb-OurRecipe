function updateFollowerCount(increment) {
  const statsElement = document.querySelector(".profile-stats-inline strong");

  if (statsElement) {
    let currentCountText = statsElement.textContent.replace(/\./g, '');
    let currentCountNum = parseInt(currentCountText, 10);

    if (!isNaN(currentCountNum)) {
      if (increment) {
        currentCountNum++; 
      } else {
        currentCountNum--; 
      }
      statsElement.textContent = currentCountNum.toLocaleString('id-ID');
    }
  }
}
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
        updateFollowerCount(true);
      } 
      else if (currentButtonToUnfollow.classList.contains("following")) {
        let username = "@username"; 

        const feedUserCard =
          currentButtonToUnfollow.closest(".user-details-top");
        const profileUserCard =
          currentButtonToUnfollow.closest(".profile-details");

        if (feedUserCard) {
          const usernameEl = feedUserCard.querySelector(".username");
          if (usernameEl) {
            username = usernameEl.textContent;
          }
        } else if (profileUserCard) {
          const usernameEl = profileUserCard.querySelector(
            ".profile-user-info span"
          );
          if (usernameEl) {
            username = usernameEl.textContent;
          }
        }

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
      updateFollowerCount(false);
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
      const postUrl = "https://cookconnect.demo/post/example";
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(postUrl)
          .then(() => {
            showToast("Link resep disalin ke clipboard!");
          })
          .catch((err) => {
            showToast("Gagal menyalin link");
          });
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

window.addEventListener("load", () => {
  const hash = window.location.hash;

  if (hash === "#comments-section") {
    const targetElement = document.getElementById("comments-section");

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start", 
        });
      }, 100);
    }
  }
});

const myRecipesTab = document.querySelector("#tab-my-recipes");
const savedRecipesTab = document.querySelector("#tab-saved-recipes");
const myRecipesGrid = document.querySelector("#grid-my-recipes");
const savedRecipesGrid = document.querySelector("#grid-saved-recipes");

if (myRecipesTab && savedRecipesTab && myRecipesGrid && savedRecipesGrid) {
  
  myRecipesTab.addEventListener("click", (e) => {
    e.preventDefault();
    myRecipesTab.classList.add("active");
    savedRecipesTab.classList.remove("active");
    myRecipesGrid.classList.remove("hidden");
    savedRecipesGrid.classList.add("hidden");
  });

  savedRecipesTab.addEventListener("click", (e) => {
    e.preventDefault();
    savedRecipesTab.classList.add("active");
    myRecipesTab.classList.remove("active");
    savedRecipesGrid.classList.remove("hidden");
    myRecipesGrid.classList.add("hidden");
  });
}

const openModalBtn = document.querySelector("#open-edit-profile-modal");
const closeModalBtn = document.querySelector("#close-edit-profile-modal");
const editProfileModal = document.querySelector("#edit-profile-modal");

if (openModalBtn && closeModalBtn && editProfileModal) {
  
  const openModal = () => {
    editProfileModal.classList.add("modal-active");
  };

  const closeModal = () => {
    editProfileModal.classList.remove("modal-active");
  };

  openModalBtn.addEventListener("click", openModal);

  closeModalBtn.addEventListener("click", closeModal);

  editProfileModal.addEventListener("click", (e) => {
    if (e.target === editProfileModal) {
      closeModal();
    }
  });

  if (window.location.hash === '#edit') {
    openModal();
  }
}

function setupDynamicList(listId, addButtonId, placeholder) {
  const listContainer = document.querySelector(listId);
  const addButton = document.querySelector(addButtonId);

  if (!listContainer || !addButton) {
    return;
  }

  const addRemoveListener = (button) => {
    button.addEventListener("click", (e) => {
      e.target.closest(".dynamic-input-row").remove();
      checkRemoveButtons();
    });
  };

  const checkRemoveButtons = () => {
    const allRows = listContainer.querySelectorAll(".dynamic-input-row");
    if (allRows.length === 1) {
      allRows[0].querySelector(".remove-item-btn").style.display = "none";
    } else {
      allRows.forEach((row) => {
        row.querySelector(".remove-item-btn").style.display = "inline-block";
      });
    }
  };

  const addNewRow = () => {
    const newRow = document.createElement("div");
    newRow.classList.add("dynamic-input-row");

    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("placeholder", placeholder);

    const newRemoveBtn = document.createElement("button");
    newRemoveBtn.setAttribute("type", "button");
    newRemoveBtn.classList.add("remove-item-btn");
    newRemoveBtn.innerHTML = "&times;"; 

    newRow.appendChild(newInput);
    newRow.appendChild(newRemoveBtn);
    listContainer.appendChild(newRow);

    addRemoveListener(newRemoveBtn); 
    checkRemoveButtons(); 
  };

  addButton.addEventListener("click", addNewRow);

  addNewRow();
}

setupDynamicList(
  "#ingredients-list",
  "#add-ingredient-btn",
  "Cth: 200gr Daging Ayam"
);

setupDynamicList(
  "#steps-list",
  "#add-step-btn",
  "Cth: Panaskan minyak di wajan"
);