window.addEventListener("load", function () {
  const faqCard = document.querySelector(".faq-card");
  const faqList = document.querySelector(".faq-list");
  const faqItems = [...document.querySelectorAll(".faq-item")];
  const faqItemHeaders = [...document.querySelectorAll(".faq-item-header")];

  function displayActiveIcon(activeIcon, inactiveIcon) {
    activeIcon.style.display = "block";
    inactiveIcon.style.display = "none";
  }

  const closeFaqItems = function () {
    faqItems.forEach((faqItem) => {
      const closeHeight =
        faqItem.querySelector(".faq-item-header").scrollHeight;
      faqItem.style.maxHeight = `${closeHeight}px`;
      faqItem.dataset.openFaqList = false;
      displayActiveIcon(
        faqItem.querySelector(".plus-icon"),
        faqItem.querySelector(".minus-icon")
      );
    });
  };

  closeFaqItems();

  faqList.addEventListener("click", function (event) {
    if (event.target.closest(".faq-item-header")) {
      const targetFaqItem = event.target
        .closest(".faq-item-header")
        .closest(".faq-item");
      if (targetFaqItem.dataset.openFaqList === "false") {
        closeFaqItems();
        targetFaqItem.style.maxHeight = `${targetFaqItem.scrollHeight}px`;
        targetFaqItem.dataset.openFaqList = true;
        displayActiveIcon(
          targetFaqItem.querySelector(".minus-icon"),
          targetFaqItem.querySelector(".plus-icon")
        );
      } else {
        closeFaqItems();
      }
    }
  });
  /*
  faqList.addEventListener("keydown", function (event) {
    if (event.target.closest(".faq-item-header") && event.keyCode === 13) {
      const faqItem = event.target.closest(".faq-item");
      if (faqItem.dataset.openFaqList === "false") {
        closeFaqItems();
        faqItem.style.maxHeight = `${faqItem.scrollHeight}px`;
        faqItem.dataset.openFaqList = true;
        displayActiveIcon(
          faqItem.querySelector(".minus-icon"),
          faqItem.querySelector(".plus-icon")
        );
      } else {
        closeFaqItems();
      }
    }
  });
  */

  let initialFaqCardWidth = faqCard.offsetWidth;

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width } = entry.contentRect;
      if (initialFaqCardWidth !== width) {
        faqItems.forEach((faqItem) => {
          if (faqItem.dataset.openFaqList === "false") {
            const faqItemHeader = faqItem.querySelector(".faq-item-header");
            faqItem.style.maxHeight = `${faqItemHeader.offsetHeight}px`;
          } else {
            faqItem.style.maxHeight = `${faqItem.scrollHeight}px`;
          }
        });
      }
    }
  });

  resizeObserver.observe(faqCard);
});
