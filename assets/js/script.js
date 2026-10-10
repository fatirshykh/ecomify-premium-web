const CONFIG = {
  whatsappNumber: "923271110133",
  businessEmail: "info.ecomifyglobal@gmail.com",
};

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage || (currentPage === "" && href === "index.html")) {
    link.classList.add("active");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const backTop = document.querySelector(".back-top");
if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
  });
  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

function encodeMessage(data) {
  return [
    "Hello Ecomify Global,",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Service: ${data.service || "General inquiry"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  const status = document.querySelector("#formStatus");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm).entries());
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    if (!name || !email || !message) {
      status.textContent = "Please complete your name, email and message.";
      status.className = "form-status show error";
      return;
    }

    const text = encodeMessage({ ...data, name, email, message });
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    status.textContent =
      "Opening WhatsApp with your message. You can send it directly to our team.";
    status.className = "form-status show success";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

// Replace the WhatsApp number in CONFIG once if the business number changes.
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const customMessage =
    link.dataset.message ||
    "Hello Ecomify Global, I would like to discuss your services.";
  link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(customMessage)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-email]").forEach((link) => {
  link.href = `mailto:${CONFIG.businessEmail}`;
  link.textContent = CONFIG.businessEmail;
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
