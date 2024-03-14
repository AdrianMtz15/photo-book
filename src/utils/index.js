import moment from "moment";

moment.locale("es", {
  monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
  weekdaysShort: "Lun_Mar_Mie_Jue_Vie_Sab_Dom".split("_"),
});

const paypal_dev_key =
  "AX-1lDAl3DdCeZ1wa_PTH8jBry2OmlUs6lrbSp2T42FRjvuLRPRAahCZHz1_V665R-U5WINWXVVdALxd";

const paypal_live_key =
  "AU94SbddKFHy_FYksRQCQ2XZGHLOW3DVCcKrew5-egkqAWmJKfEpJSycBH5Ntydtxxj40PHJHjV2pQF-";

const paypal_client_id =
  process.env.NODE_ENV === "development" ? paypal_dev_key : paypal_live_key;

const stripe_dev_key =
  "pk_test_51HmStSKPpBTzo0mTCB7a2Q2Z4J9Yf3BGd5bchAesEpIRJxCMpx4v0odIPAkFb3FL8Rag1LUrhzd5LdDVnMQJRyMl00jVajqjeq";

const stripe_live_key =
  "pk_live_51HmStSKPpBTzo0mTpATTVNNwELwTTGVUaGhmtDzjRT0B4jYGJjcEPbolxOcgdMXeJDT0Ifo5jilJIM0fa9dnKJv900JzvGv6LA";

export const S3_ENDPOINT = "https://thebodymethod.s3.us-west-1.amazonaws.com";

export const STRIPE_KEY =
  process.env.NODE_ENV === "development" ? stripe_dev_key : stripe_live_key;

export const HOME_URL = "https://thebodymethod.mx";

export const PAYPAL_URL = `https://www.paypal.com/sdk/js?client-id=${paypal_client_id}&vault=true&intent=subscription`;

export const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://thebodymethod.mx";

export const BASE_URL =
  (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "") +
  "/api";

export const searchRows = (query, rows) => {
  if (!rows) return;
  if (isNaN(query)) query = query.toLowerCase();
  let searchResult = rows.filter((row) => {
    let result = Object.keys(row).filter((column) => {
      if (Array.isArray(row[column])) {
        return row[column].filter((subcolumn) => {
          if (isNaN(subcolumn)) {
            if (subcolumn.toLowerCase().includes(query)) return row;
          } else if (subcolumn === query) return row;
          return null;
        });
      }
      if (isNaN(row[column])) {
        if (String(row[column]).toLowerCase().includes(query)) {
          return row;
        }
      } else if (String(row[column]) === query) {
        return row;
      } else if (Number(row[column]) === Number(query)) {
        return row;
      }
      return null;
    });
    return result.length > 0;
  });
  return searchResult;
};

export const getArgs = (args) => {
  if (args && args !== null) {
    const array = Object.keys(args)
      .map((key) => {
        if (args[key] !== undefined && args[key] !== null && args[key] !== "") {
          return `${key}=${args[key]}`;
        }
        return null;
      })
      .filter((arg) => arg !== null);
    if (array.length > 0) {
      return `&${array.join("&")}`;
    }
  }
  return "";
};

export const calcularTotal = (productos) => {
  if (productos && productos !== null) {
    let total = 0;
    productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  }
  return 0;
};

export function formatMonto(monto) {
  monto = parseFloat(monto);
  if (!monto || monto === null || isNaN(monto)) monto = 0;
  return numberWithCommas(monto);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const hideModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  }
};

export const showModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  } else {
    const newButton = document.createElement("button");
    newButton.attributes.href = "#modal";
    newButton.id = "main-button";
    newButton.setAttribute("data-toggle", "modal");
    newButton.setAttribute("data-target", "#modal");
    newButton.setAttribute("data-bs-toggle", "modal");
    newButton.setAttribute("data-bs-target", "#modal");
    newButton.style.visibility = "hidden";
    document.body.appendChild(newButton);
    newButton.click();
  }
};

export const misclases = [
  {
    name: "Online",
    handle: "/mytbm/online",
  },
  {
    name: "Presenciales",
    handle: "/mytbm/presencial",
  },
  {
    name: "Reservaciones",
    handle: "/mytbm/reservaciones",
  },
];

export const comprar = [
  {
    name: "Paquetes de Clases",
    handle: "/mytbm/paquetes",
  },
  {
    name: "Merch",
    href: "https://shop.thebodymethod.mx",
  },
  {
    name: "Certificación",
    href: "https://tbmcertifications.com",
  },
];

export const comunidad = [
  {
    name: "Chat",
    handle: "/mytbm/comunidad",
  },
  {
    name: "Leaderboard",
    handle: "/mytbm/leaderboards",
  },
];

export const cuenta = [
  {
    name: "Mi Información",
    handle: "/mytbm/informacion",
  },
  {
    name: "Mi Progreso",
    handle: "/mytbm/tracks",
  },
  {
    name: "Mis Compras",
    handle: "/mytbm/membresias",
  },
  {
    name: "Mis Cargos",
    handle: "/mytbm/pagos",
  },
];

export const adminitems = [
  {
    name: "Clases",
    handle: "mytbm/admin/asistentes",
  },
  {
    name: "Clientes",
    handle: "mytbm/admin/clientes",
  },
];

export const coachitems = [
  {
    name: "Clases",
    handle: "mytbm/admin/asistentes",
  },
];

export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getCardType = (number) =>
  String(number) === "3"
    ? "amex"
    : String(number) === "4"
    ? "visa"
    : "mastercard";

export const categories = {
  dance: [11, 12, 13, 15],
  workout: [14, 15],
  presenciales: [11742, 11743, 11744, 11745],
};

export const getCompradasPresenciales = (paquetes) => {
  const package_ids = categories.presenciales;
  const customer_classes = paquetes.filter((class_category) =>
    package_ids.includes(class_category.package_class_id)
  );
  let total = 0;
  customer_classes.forEach((purchase) => {
    total += purchase.available_class;
  });
  return total;
};

export const getPresencialesVigentes = (paquetes) => {
  const package_ids = categories.presenciales;
  const customer_classes = paquetes.filter(
    (class_category) =>
      package_ids.includes(class_category.package_class_id) &&
      moment(class_category.created_at)
        .add(class_category.package_days, "days")
        .isAfter(moment())
  );
  let total = 0;
  customer_classes.forEach((purchase) => {
    total += purchase.available_class;
  });
  return total;
};

export const getVigencia = (handle, user) => {
  if (user.vigencias) {
    const paquete = user.vigencias.find(
      (class_category) => class_category.handle === handle
    );
    if (paquete) {
      return paquete.expiration;
    }
  }
};

export const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const mapas = {
  1: [4, 6],
  2: [2, 4, 4],
};

export const iconosMapas = {
  1: "fas fa-bicycle",
  2: "fas fa-praying-hands",
};

export const durations = [
  "10 a 19 minutos",
  "20 a 29 minutos",
  "30 a 39 minutos",
  "40 a 49 minutos",
  "50 a 59 minutos",
  "1 hora o mas",
];

export const CANCEL_TIMEFRAME = 4;

export const canCancel = (single_class) => {
  const currentHour = moment();
  const classHour = moment(single_class.class_date);
  const diff = classHour.diff(currentHour, "hours") + 6;
  return diff >= CANCEL_TIMEFRAME;
};

export const getStatusReservacionString = (reservacion) => {
  if (reservacion.deletedAt !== null) {
    return "Cancelada";
  }
  if (reservacion.is_cash) {
    if (!reservacion.is_paid) {
      return "Pago Incompletdo";
    }
  }
  if (
    !reservacion.attend &&
    moment().isAfter(moment(reservacion.single_class.class_date))
  ) {
    return "No Asistí";
  }
  if (reservacion.attend) {
    return "Exitosa";
  }
  return "Próxima";
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePhoneNumber = (input_str) => {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
};

export const renderFirstInvoicePeriod = (product) => {
  let message = "";
  const { subscription_interval, subscription_period } = product;
  if (subscription_interval > 1) {
    message = `los primeros ${subscription_interval}`;
    switch (subscription_period) {
      case "year":
        message = `${message} años`;
        break;
      case "day":
        message = `${message} days`;
        break;
      default:
        message = `${message} meses`;
    }
  } else {
    message = `el primer`;
    switch (subscription_period) {
      case "year":
        message = `${message} año`;
        break;
      case "day":
        message = `${message} día`;
        break;
      default:
        message = `${message} mes`;
    }
  }
  return message;
};

export const renderSubscriptionPeriod = (product) => {
  let message = "";
  const { subscription_interval, subscription_period } = product;
  if (subscription_interval > 1) {
    message = `cada ${subscription_interval}`;
    switch (subscription_period) {
      case "year":
        message = `${message} años`;
        break;
      case "day":
        message = `${message} días`;
        break;
      default:
        message = `${message} meses`;
    }
  } else {
    message = `cada`;
    switch (subscription_period) {
      case "year":
        message = `${message} año`;
        break;
      case "day":
        message = `${message} día`;
        break;
      default:
        message = `${message} mes`;
    }
  }
  return message;
};

export const getValue = (object, key, type) => {
  if (object && object !== null) {
    const value = object[key];
    if (value && value !== null && value !== "") {
      if (type === "boolean") {
        return value === true || parseInt(value) === 1;
      } else if (type === "date") {
        return moment(value).utc().format("YYYY-MM-DD");
      }
      return value;
    }
  }
  if (type === "boolean") return false;
  return "";
};

export const sortByCreatedAt = (items) => {
  return items.sort((a, b) =>
    moment(a.createdAt).isAfter(moment(b.createdAt)) ? 1 : -1
  );
};

export const hasNotch = (device) => {
  let current = String(device);
  if (current.includes("iPhone")) {
    return (
      current.includes("X") ||
      current.includes("11") ||
      current.includes("12") ||
      current.includes("13") ||
      current.includes("14") ||
      current.includes("15")
    );
  }
};

export const getLastTrack = (tracks) => {
  let sortedTracks = tracks.sort((a, b) =>
    moment(a.fecha).isAfter(b.fecha) ? -1 : 1
  );
  let last_track = sortedTracks[0];
  return last_track;
};

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const findExpirationRenewalDate = (purchase) => {
  if (purchase.status !== "active") return "";
  const initialMoment = moment(purchase.createdAt);
  if (purchase.free_trial_length !== null) {
    initialMoment
      .add(purchase.free_trial_length, purchase.free_trial_period)
      .format("YYYY-MM-DD");
    if (initialMoment.isAfter(moment())) {
      return initialMoment.format("DD MMM YYYY");
    }
  }
  const anchordate = initialMoment.date();
  const currentday = moment().date();
  const startDate = moment().startOf("month").add(anchordate, "days");
  if (currentday > anchordate) {
    return startDate
      .add(purchase.subscription_interval, purchase.subscription_period)
      .format("DD MMM YYYY");
  }
  return startDate.format("DD MMM YYYY");
};

export const setupTooltips = () => {
  window.$('[data-bs-toggle="tooltip"]').tooltip({
    trigger: "hover",
  });
  window.$('[rel="tooltip"]').on("click", function () {
    window.$(this).tooltip("hide");
  });
};
