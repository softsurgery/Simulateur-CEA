function calcul_revenu(
  revenu,
  situation,
  enf_en_charge,
  par_a_charge,
  enf_infirme,
  enf_sans_bourse
) {
  if (situation === "Marié") revenu -= 300;

  const parChargeFactor =
    par_a_charge === 1 ? 0.05 : par_a_charge === 2 ? 0.1 : 0;
  const parChargeLimit =
    par_a_charge === 1 ? 450 : par_a_charge === 2 ? 900 : 0;
  revenu -= Math.min(parChargeLimit, parChargeFactor * revenu);

  revenu -= enf_infirme * 2000;

  if (enf_en_charge !== "4+") revenu -= Number(enf_en_charge) * 100;
  else revenu -= 400;

  if (enf_sans_bourse !== "4+") revenu -= Number(enf_sans_bourse) * 1000;
  else revenu -= 4000;

  return revenu;
}

function calcul_impot(revenu_net) {
  let impot;
  switch (true) {
    case revenu_net <= 5000:
      impot = revenu_net * 0.005;
      break;
    case revenu_net <= 20000:
      impot = (revenu_net - 5000.001) * 0.265 + 5000 * 0.005;
      break;
    case revenu_net <= 30000:
      impot =
        (revenu_net - 20000.001) * 0.285 + 14999.999 * 0.265 + 5000 * 0.005;
      break;
    case revenu_net <= 50000:
      impot =
        (revenu_net - 30000.001) * 0.325 +
        9999.999 * 0.285 +
        14999.999 * 0.265 +
        5000 * 0.005;
      break;
    default:
      impot =
        (revenu_net - 50000.001) * 0.355 +
        19999.999 * 0.325 +
        9999.999 * 0.285 +
        14999.999 * 0.265 +
        5000 * 0.005;
  }
  return impot;
}

function run() {
  const val2 = document.getElementById("val2");
  const val3 = document.getElementById("val3");
  const val4 = document.getElementById("val4");
  const val5 = document.getElementById("val5");
  const val6 = document.getElementById("val6");
  const val7 = document.getElementById("val7");

  const revenu = Number(document.getElementById("revenu").value);
  const montant_op = Number(document.getElementById("montant_op").value);
  const situation = get_value_of_checked("situation");
  const enf_en_charge = get_value_of_checked("enfants_en_charge");
  const par_a_charge = Number(get_value_of_checked("parents_en_charge"));
  const enf_infirme = Number(get_value_of_checked("enfants_infirmes"));
  const enf_sans_bourse = Number(get_value_of_checked("enfants_sans_bourse"));

  // Field checking
  if (
    !situation ||
    !enf_en_charge ||
    !par_a_charge ||
    !enf_infirme ||
    !enf_sans_bourse ||
    !revenu ||
    !montant_op
  ) {
    showNotification("Veuillez sélectionner toutes les options.");
    return false;
  }

  if (montant_op > revenu) {
    showNotification(
      "Le Montant d'investissement ne peut pas être supérieur au revenu."
    );
    return false;
  }

  val2.value = calcul_revenu(
    revenu,
    situation,
    enf_en_charge,
    par_a_charge,
    enf_infirme,
    enf_sans_bourse
  ).toFixed(3);
  val3.value = calcul_impot(Number(val2.value)).toFixed(3);
  val4.value = calcul_impot(Number(val2.value) - montant_op).toFixed(3);
  val5.value = (Number(val3.value) - Number(val4.value)).toFixed(3);
  val6.value = (Number(val5.value) / 12).toFixed(3);
  val7.value = (100 - (Number(val4.value) / Number(val3.value)) * 100).toFixed(
    3
  );

  // Approximate
  let montant55 = 0;
  let apres55 = calcul_impot(Number(val2.value) - montant55);
  let gain55 = 100 - (apres55 / Number(val3.value)) * 100;
  let plus = val2.value / 500;
  while (gain55 < 54.9) {
    montant55 += plus;
    apres55 = calcul_impot(Number(val2.value) - montant55);
    gain55 = 100 - (apres55 / Number(val3.value)) * 100;
  }

  val1.value = Math.min(montant55, 100000).toFixed(3) + " DT";
  val2.value += " DT";
  val3.value += " DT";
  val4.value += " DT";
  val5.value += " DT";
  val6.value += " DT";
  val7.value += "%";
  return false;
}

function get_value_of_checked(name) {
  const radios = document.getElementsByName(name);
  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return undefined;
}
