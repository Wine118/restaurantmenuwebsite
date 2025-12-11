// ======== GET ELEMENTS ========
const openAmountModal = document.getElementById("openAmountModal");
const amountModal = document.getElementById("amountModal");
const closeAmountModal = document.getElementById("closeAmountModal");
const confirmAmount = document.getElementById("confirmAmount");


// ======== SHOW MODAL WHEN "Order Now" IS CLICKED ========
openAmountModal.addEventListener("click", () => {
    amountModal.style.display = "flex";   // flex because modal uses flexbox
});


// ======== HIDE MODAL WHEN "Cancel" IS CLICKED ========
closeAmountModal.addEventListener("click", () => {
    amountModal.style.display = "none";
});


// ======== ALSO HIDE WHEN CLICK OUTSIDE THE MODAL ========
window.addEventListener("click", (event) => {
    if (event.target === amountModal) {
        amountModal.style.display = "none";
    }
});


// ======== CONFIRM BUTTON (OPTIONAL: CLOSE MODAL AFTER CONFIRM) ========
confirmAmount.addEventListener("click", () => {
    // You can add payment logic here later
    amountModal.style.display = "none";
});
